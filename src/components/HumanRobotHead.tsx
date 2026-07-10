import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js'

export type Side = 'human' | 'robot' | null

const PLATE = 0xb7bdca
const PLATE_DARK = 0x8b93a6
const IRIS = 0x2b7fd7
const ACCENT = 0x4f46e5

const ASSET_DIR = '/models/LeePerrySmith'
const BUST_HEIGHT = 2.7 // world height of the scanned bust (head + shoulders)
const SEAM = 0.005 // half-width of the glowing gap between the two halves

/**
 * Half-human / half-robot bust built from the Lee Perry-Smith head scan
 * (Infinite Realities, CC-BY — the same asset the three.js normal-map demo
 * uses, served from public/models). The left half renders the scan with its
 * photographic diffuse/specular/normal maps; the right half re-renders the
 * same geometry as brushed metal via clipping planes, with a glowing seam
 * and robot detailing raycast onto the scanned surface. The head tracks the
 * cursor; hovering a side of the canvas reports it via onSide.
 */
export default function HumanRobotHead({ onSide }: { onSide: (s: Side) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // ponytail: hover side = which half of the canvas the pointer is over.
    // Ceiling: counts blank canvas corners as a "side"; upgrade path is a
    // raycast against the head. DOM-only, so it works even without WebGL.
    let lastSide: Side = null
    const report = (s: Side) => {
      if (s !== lastSide) {
        lastSide = s
        onSide(s)
      }
    }
    const sideFromEvent = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      report(e.clientX < r.left + r.width / 2 ? 'human' : 'robot')
    }
    const onLeave = () => report(null)
    canvas.addEventListener('pointermove', sideFromEvent)
    canvas.addEventListener('pointerdown', sideFromEvent)
    canvas.addEventListener('pointerleave', onLeave)
    const removeSideListeners = () => {
      canvas.removeEventListener('pointermove', sideFromEvent)
      canvas.removeEventListener('pointerdown', sideFromEvent)
      canvas.removeEventListener('pointerleave', onLeave)
    }

    // no WebGL (old GPU, blocked context): skip the 3D head instead of
    // crashing the whole React tree from inside this effect
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    } catch {
      return removeSideListeners
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.05
    renderer.localClippingEnabled = true

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 20)
    camera.position.set(0, 0.12, 3.9)

    // studio reflections for the metal half — no HDRI asset needed
    const pmrem = new THREE.PMREMGenerator(renderer)
    const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04)
    pmrem.dispose()
    scene.environment = envRT.texture
    scene.environmentIntensity = 0.35

    // warm direct lights carry the Phong skin so it reads as living flesh, not
    // a morgue cast (env IBL only affects the PBR metal half)
    scene.add(new THREE.AmbientLight(0xfff3ea, 0.8))
    const pointLight = new THREE.PointLight(0xfff1e0, 11)
    pointLight.position.set(0, 0.5, 4.5)
    scene.add(pointLight)
    const keyLight = new THREE.DirectionalLight(0xfff0e2, 1.1)
    keyLight.position.set(2.5, 3, 4)
    scene.add(keyLight)
    const rimLight = new THREE.DirectionalLight(0xdfe4ff, 0.7)
    rimLight.position.set(1, -0.5, -1)
    scene.add(rimLight)

    const texLoader = new THREE.TextureLoader()
    const diffuseMap = texLoader.load(`${ASSET_DIR}/Map-COL.jpg`)
    diffuseMap.colorSpace = THREE.SRGBColorSpace
    const specularMap = texLoader.load(`${ASSET_DIR}/Map-SPEC.jpg`)
    specularMap.colorSpace = THREE.SRGBColorSpace
    const normalMap = texLoader.load(`${ASSET_DIR}/Infinite-Level_02_Tangent_SmoothUV.jpg`)

    // keep local x <= -SEAM (human) / x >= SEAM (robot); the gap glows via the
    // cap. Clip planes are world-space, so syncClips re-aims them along the
    // head's local X axis every time the head rotates.
    const humanClip = new THREE.Plane(new THREE.Vector3(-1, 0, 0), -SEAM)
    const robotClip = new THREE.Plane(new THREE.Vector3(1, 0, 0), -SEAM)
    const headAxisX = new THREE.Vector3()
    const syncClips = (headGroup: THREE.Group) => {
      headGroup.updateMatrixWorld()
      headAxisX.setFromMatrixColumn(headGroup.matrixWorld, 0).normalize()
      humanClip.normal.copy(headAxisX).negate()
      humanClip.constant = headAxisX.dot(headGroup.position) - SEAM
      robotClip.normal.copy(headAxisX)
      robotClip.constant = -headAxisX.dot(headGroup.position) - SEAM
    }

    // Phong + the scan's photographic maps. color 0xffffff shows the true
    // photographic skin tone (0xefefef greyed it toward a corpse pallor)
    const skinMat = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      specular: 0x2a2320,
      shininess: 26,
      map: diffuseMap,
      specularMap,
      normalMap,
      side: THREE.DoubleSide,
      clippingPlanes: [humanClip],
    })
    // same geometry as machined metal; higher roughness keeps it a clean
    // brushed casting instead of a blown-out chrome mirror
    const robotMat = new THREE.MeshPhysicalMaterial({
      color: PLATE,
      metalness: 0.82,
      roughness: 0.52,
      normalMap,
      normalScale: new THREE.Vector2(0.35, 0.35),
      side: THREE.DoubleSide,
      clippingPlanes: [robotClip],
    })
    const plateDarkMat = new THREE.MeshPhysicalMaterial({ color: PLATE_DARK, roughness: 0.4, metalness: 0.9 })
    const accentMat = new THREE.MeshPhysicalMaterial({
      color: ACCENT,
      emissive: ACCENT,
      emissiveIntensity: 3,
      roughness: 0.35,
      metalness: 0.2,
    })
    const lensMat = new THREE.MeshPhysicalMaterial({ color: IRIS, emissive: IRIS, emissiveIntensity: 2.5, roughness: 0.3 })

    const head = new THREE.Group()
    head.position.y = -0.12
    scene.add(head)

    let disposed = false
    const loadedGeos: THREE.BufferGeometry[] = []
    let humanEye: THREE.Object3D | null = null
    let robotEye: THREE.Object3D | null = null
    const robotIrisMat = lensMat // pulsing glow lives on the robot iris

    new GLTFLoader().load(
      `${ASSET_DIR}/LeePerrySmith.glb`,
      (gltf) => {
        if (disposed) return
        const geometry = (gltf.scene.children[0] as THREE.Mesh).geometry
        geometry.computeBoundingBox()
        const bb = geometry.boundingBox!
        const scale = BUST_HEIGHT / (bb.max.y - bb.min.y)
        geometry.center()
        loadedGeos.push(geometry)

        // nose tip = frontmost vertex. A real, stable landmark to anchor the
        // eyes to, so their position is mapped to the model instead of guessed.
        const posAttr = geometry.attributes.position
        const noseTip = new THREE.Vector3(0, 0, -Infinity)
        for (let i = 0; i < posAttr.count; i++) {
          const z = posAttr.getZ(i)
          if (z > noseTip.z) noseTip.set(posAttr.getX(i), posAttr.getY(i), z)
        }
        noseTip.multiplyScalar(scale) // into head space (mesh is scaled by `scale`)

        const humanHalf = new THREE.Mesh(geometry, skinMat)
        const robotHalf = new THREE.Mesh(geometry, robotMat)
        humanHalf.scale.setScalar(scale)
        robotHalf.scale.setScalar(scale)
        head.add(humanHalf, robotHalf)

        // thin indigo cap hidden inside the bust: only the narrow clip gap
        // reveals it, so the seam reads as a crisp line along the profile
        // rather than a fat glowing stripe
        const capGeo = new THREE.CircleGeometry(BUST_HEIGHT / 2, 48)
        capGeo.rotateY(Math.PI / 2)
        loadedGeos.push(capGeo)
        // dark blue-steel so a turned head reveals a subtle seam, not a bright
        // purple wedge (the interior used to glow through when yawed)
        const cap = new THREE.Mesh(capGeo, new THREE.MeshBasicMaterial({ color: 0x2a2f45, side: THREE.DoubleSide }))
        cap.scale.set(1, 1, 0.75)
        head.add(cap)

        // greeble anchors: orthographic raycasts against the scanned surface.
        // Coordinates are fractions of the bust half-height, so they are
        // independent of BUST_HEIGHT. Front rays aim -z, side rays aim -x.
        head.updateMatrixWorld(true)
        const u = BUST_HEIGHT / 2
        const ray = new THREE.Raycaster()
        let anchorMisses = 0
        const cast = (origin: THREE.Vector3, dir: THREE.Vector3, target: THREE.Mesh = robotHalf) => {
          ray.set(origin.add(head.position), dir)
          const hit = ray.intersectObject(target, false)[0]
          if (!hit) {
            anchorMisses++
            return { p: new THREE.Vector3(), n: new THREE.Vector3(0, 0, 1) }
          }
          // face.normal is object-space; the head is unrotated at build time
          return { p: head.worldToLocal(hit.point.clone()), n: hit.face!.normal.clone() }
        }
        const sideCast = (fy: number, fz: number) =>
          cast(new THREE.Vector3(4, fy * u, fz * u), new THREE.Vector3(-1, 0, 0))

        // open, cursor-tracking eyes on both sides (the scan's own eyes are
        // closed, which is what made the human read as dead). Iris sits at +z;
        // Object3D.lookAt points a non-camera's +z at the target, so the eye
        // faces the cursor. Oriented every frame in the draw loop.
        // flattened in z so the ball reads as an eye set into the socket
        // rather than a sphere sitting proud of the closed lids
        // fully spherical eyeball (uniform scale only). The eye group is
        // rotated every frame by lookAt, so any non-uniform scale here would
        // shear it into a distorted blob when the head/eye turns.
        // human: white sclera + blue iris. robot: a glowing optical sensor —
        // dark lens housing with a bright emissive core, no metal ring.
        const makeEye = (radius: number, glow: boolean) => {
          const g = new THREE.Group()
          g.add(
            new THREE.Mesh(
              new THREE.SphereGeometry(radius, 32, 24),
              new THREE.MeshPhongMaterial({
                color: glow ? 0x14171f : 0xcac6bd,
                specular: glow ? 0x334155 : 0x555555,
                shininess: glow ? 120 : 40,
              }),
            ),
          )
          // iris/lens sits proud of the front, forming a cornea bump
          const iris = new THREE.Mesh(
            new THREE.SphereGeometry(radius * (glow ? 0.74 : 0.58), 32, 24),
            glow ? robotIrisMat : new THREE.MeshStandardMaterial({ color: IRIS, roughness: 0.22 }),
          )
          iris.position.z = radius * (glow ? 0.45 : 0.62)
          // human pupil is a dark dot; robot core is a bright glowing point
          const pupil = new THREE.Mesh(
            new THREE.SphereGeometry(radius * (glow ? 0.22 : 0.3), 24, 16),
            new THREE.MeshBasicMaterial({ color: glow ? 0xdff1ff : 0x0a0f1a }),
          )
          pupil.position.z = radius * 0.86
          g.add(iris, pupil)
          return g
        }

        // eyes mapped from the nose-tip landmark: sockets sit a fixed offset
        // up from the nose tip and a fixed spacing either side of the midline.
        // We raycast the face at that (x, y) to land each eyeball on the real
        // socket surface, then sink it in slightly.
        const EYE_ABOVE_NOSE = 0.165 // head-space, calibrated to this scan
        const EYE_SPACING = 0.31 // head-space distance of each eye from midline
        const eyeY = noseTip.y + EYE_ABOVE_NOSE
        const eyeAnchor = (x: number, target: THREE.Mesh) =>
          cast(new THREE.Vector3(x, eyeY, 4), new THREE.Vector3(0, 0, -1), target)

        const humanEyeA = eyeAnchor(-EYE_SPACING, humanHalf)
        humanEye = makeEye(0.07, false)
        humanEye.position.copy(humanEyeA.p).addScaledVector(humanEyeA.n, -0.025)
        head.add(humanEye)

        // robot eye: glowing optical sensor recessed into the plate
        const robotEyeA = eyeAnchor(EYE_SPACING, robotHalf)
        robotEye = makeEye(0.075, true)
        robotEye.position.copy(robotEyeA.p).addScaledVector(robotEyeA.n, -0.025)
        head.add(robotEye)

        // ear puck: the only robot detail beyond the eye, for a sleek android
        // look (the old purple brow/speaker bars read as scratches)
        const ear = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.08, 32), plateDarkMat)
        const earA = sideCast(0.33, -0.02)
        ear.position.copy(earA.p)
        ear.rotation.z = Math.PI / 2
        const earDot = new THREE.Mesh(new THREE.CircleGeometry(0.06, 24), accentMat)
        earDot.rotation.y = Math.PI / 2
        earDot.position.set(0.05, 0, 0)
        ear.add(earDot)
        head.add(ear)

        // ponytail: dev-only self-check — a console error here fails the
        // smoke script. Every greeble anchor must hit the scanned surface.
        if (import.meta.env.DEV && anchorMisses > 0) {
          console.error(`HumanRobotHead: ${anchorMisses} greeble anchors missed the head mesh`)
        }

        if (reduced) composer.render()
      },
      undefined,
      () => console.warn('HumanRobotHead: failed to load head model'),
    )

    // post: render + subtle bloom carried by the emissive accents.
    // threshold > 1: only HDR emissives (seam, lens, bars) bloom, never skin
    const composer = new EffectComposer(renderer)
    composer.addPass(new RenderPass(scene, camera))
    composer.addPass(new UnrealBloomPass(new THREE.Vector2(1, 1), 0.4, 0.35, 1.1))
    composer.addPass(new OutputPass())

    const resize = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      renderer.setSize(w, h, false)
      composer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    resize()
    window.addEventListener('resize', resize)

    const disposeAll = () => {
      disposed = true
      removeSideListeners()
      window.removeEventListener('resize', resize)
      for (const g of loadedGeos) g.dispose()
      for (const t of [diffuseMap, specularMap, normalMap]) t.dispose()
      composer.dispose()
      envRT.dispose()
      renderer.dispose()
    }

    if (reduced) {
      composer.render() // model renders again from the load callback
      return disposeAll
    }

    // cursor target, normalized to the canvas center and smoothed each frame
    const desired = new THREE.Vector2()
    const current = new THREE.Vector2()
    const eyeTarget = new THREE.Vector3()
    const onPointerMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      desired.set(
        (e.clientX - (r.left + r.width / 2)) / window.innerWidth,
        (e.clientY - (r.top + r.height / 2)) / window.innerHeight,
      )
    }
    window.addEventListener('pointermove', onPointerMove)

    let raf = 0
    const draw = (t: number) => {
      current.lerp(desired, 0.08)
      head.rotation.y += (current.x * 0.3 - head.rotation.y) * 0.06
      head.rotation.x += (current.y * 0.2 - head.rotation.x) * 0.06
      head.position.y = -0.12 + Math.sin(t / 1600) * 0.022
      if (humanEye && robotEye) {
        eyeTarget.set(current.x * 3.5, head.position.y + 0.35 - current.y * 3, 6)
        humanEye.lookAt(eyeTarget)
        robotEye.lookAt(eyeTarget)
      }
      robotIrisMat.emissiveIntensity = 2.5 + Math.sin(t / 520) * 1.2
      accentMat.emissiveIntensity = 3 + Math.sin(t / 900) * 1
      syncClips(head)
      composer.render()
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onPointerMove)
      disposeAll()
    }
  }, [onSide])

  return <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
}
