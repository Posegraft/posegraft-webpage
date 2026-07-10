// Hover check for the 3D audience section: hovering each half of the canvas
// must activate the matching panel. Run: node scripts/hover-check.mjs
// (dev server must be up on :5173)
import assert from 'node:assert'
import { chromium } from 'playwright-core'

// full chromium + software WebGL: the default headless shell ships without SwiftShader
const browser = await chromium.launch({ channel: 'chromium', args: ['--disable-gpu', '--enable-unsafe-swiftshader'] })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })

const section = page.locator('#agents')
await section.scrollIntoViewIfNeeded()
await page.waitForTimeout(800)

const canvas = section.locator('canvas')
const box = await canvas.boundingBox()
assert(box, 'head canvas not found')

const activeSide = async () => {
  const h = await page.locator('[data-side="human"]').getAttribute('data-active')
  const r = await page.locator('[data-side="robot"]').getAttribute('data-active')
  return h === 'true' ? 'human' : r === 'true' ? 'robot' : null
}

assert.equal(await activeSide(), null, 'no side should be active before hover')

await page.mouse.move(box.x + box.width * 0.25, box.y + box.height / 2)
await page.waitForTimeout(200)
assert.equal(await activeSide(), 'human', 'left hover should activate human panel')

await page.mouse.move(box.x + box.width * 0.75, box.y + box.height / 2)
await page.waitForTimeout(200)
assert.equal(await activeSide(), 'robot', 'right hover should activate robot panel')

await page.screenshot({ path: '/tmp/posegraft-audience-robot-hover.png' })
await browser.close()
console.log('hover check ok')
