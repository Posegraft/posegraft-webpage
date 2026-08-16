// Checks the page-wide dot field actually paints, animates, and freezes under
// prefers-reduced-motion. Run: node scripts/dotfield-check.mjs (dev server on :5173)
import assert from 'node:assert'
import { chromium } from 'playwright-core'

const url = process.env.URL ?? 'http://localhost:5173/'
// headless shell is enough — this canvas is 2D, no WebGL needed
const browser = await chromium.launch({ args: ['--disable-gpu'] })

const frames = async (reducedMotion) => {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion })
  await page.goto(url, { waitUntil: 'load' })
  const canvas = page.locator('canvas')
  assert.equal(await canvas.count(), 1, 'expected exactly one backdrop canvas')

  const shot = () => canvas.evaluate((c) => c.toDataURL())
  const a = await shot()
  await page.waitForTimeout(700)
  const b = await shot()

  const painted = await canvas.evaluate((c) => {
    const px = c.getContext('2d').getImageData(0, 0, c.width, c.height).data
    let lit = 0
    for (let i = 3; i < px.length; i += 4) if (px[i] > 0) lit++
    return lit
  })
  await page.close()
  return { a, b, painted }
}

const normal = await frames('no-preference')
assert(normal.painted > 1000, `canvas looks blank (${normal.painted} lit pixels)`)
assert.notEqual(normal.a, normal.b, 'dots are not animating')

const reduced = await frames('reduce')
assert(reduced.painted > 1000, 'canvas blank under reduced motion — should still draw one frame')
assert.equal(reduced.a, reduced.b, 'dots still animating under prefers-reduced-motion')

// opacity is full strength over the hero, pulled back on the sections below
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto(url, { waitUntil: 'load' })
// tolerant compare: the 500ms transition means the value can still be settling
const opacity = async () =>
  Number(await page.locator('canvas').evaluate((c) => getComputedStyle(c).opacity))
const near = (got, want, what) =>
  assert(Math.abs(got - want) < 0.02, `${what}: expected ~${want}, got ${got}`)

near(await opacity(), 0.85, 'hero should get the full-strength dot field')
await page.evaluate(() => window.scrollTo(0, window.innerHeight * 2))
await page.waitForTimeout(900)
near(await opacity(), 0.35, 'dot field should dim past the hero')

await browser.close()
console.log('dotfield ok')
