// Smoke check: page renders every section, no console errors.
// Run: node scripts/smoke.mjs (dev server must be up on :5173)
import assert from 'node:assert'
import { chromium } from 'playwright-core'

// full chromium + software WebGL: the default headless shell ships without SwiftShader
const browser = await chromium.launch({ channel: 'chromium', args: ['--disable-gpu', '--enable-unsafe-swiftshader'] })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const errors = []
page.on('console', (msg) => msg.type() === 'error' && errors.push(msg.text()))
page.on('pageerror', (err) => errors.push(String(err)))

await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })

for (const id of ['top', 'agents', 'features', 'demos', 'how-it-works', 'get-started']) {
  assert(await page.locator(`#${id}`).count(), `missing section #${id}`)
}
assert((await page.title()).includes('PoseGraft'), 'bad title')
// video slots fall back to placeholders when mp4s are absent
await page.locator('#demos').scrollIntoViewIfNeeded()
await page.waitForTimeout(600)
assert.equal(await page.getByText('10-sec demo coming soon').count(), 3, 'video placeholders missing')

// filter out the expected failed mp4 fetches; anything else is a real error
const real = errors.filter((e) => !/videos\/.*\.mp4|Failed to load resource/.test(e))
assert.deepEqual(real, [], `console errors: ${real.join(' | ')}`)

await page.screenshot({ path: '/tmp/posegraft-landing-full.png', fullPage: true })
await browser.close()
console.log('smoke ok')
