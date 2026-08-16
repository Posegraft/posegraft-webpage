// Theme check: WCAG AA contrast sweep of every text node in BOTH themes,
// plus toggle behaviour (OS default, persistence, no-flash boot) and the
// dark-mode dot-field canvas. Run: node scripts/theme-check.mjs
// (dev server must be up on :5173)
import assert from 'node:assert'
import { chromium } from 'playwright-core'

const URL = process.env.URL ?? 'http://localhost:5173/'
// headless shell is enough — nothing here needs WebGL
const browser = await chromium.launch({ args: ['--disable-gpu'] })

/* ── in-page contrast audit ──────────────────────────────────────────────── */

const audit = () => {
  // canvas parses any CSS color Chromium can compute (rgb, oklab, color-mix…)
  const cv = document.createElement('canvas')
  cv.width = cv.height = 1
  const cx = cv.getContext('2d', { willReadFrequently: true })
  const parse = (str) => {
    cx.clearRect(0, 0, 1, 1)
    cx.fillStyle = '#000'
    cx.fillStyle = str
    cx.fillRect(0, 0, 1, 1)
    const [r, g, b, a] = cx.getImageData(0, 0, 1, 1).data
    return [r, g, b, a / 255]
  }
  const over = (fg, bg) => {
    const a = fg[3]
    return [0, 1, 2].map((i) => fg[i] * a + bg[i] * (1 - a)).concat(1)
  }
  const lum = ([r, g, b]) => {
    const f = (c) => {
      c /= 255
      return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
    }
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
  }
  const ratio = (a, b) => {
    const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x)
    return (hi + 0.05) / (lo + 0.05)
  }

  // effective background: composite ancestor backgrounds bottom-up until opaque
  const bgOf = (el) => {
    const layers = []
    for (let n = el; n; n = n.parentElement) {
      const c = parse(getComputedStyle(n).backgroundColor)
      if (c[3] > 0) layers.push(c)
      if (c[3] >= 1) break
    }
    let bg = parse(getComputedStyle(document.body).backgroundColor)
    for (const layer of layers.reverse()) bg = over(layer, bg)
    return bg
  }

  const failures = []
  let audited = 0
  let skippedTransparent = 0

  for (const el of document.querySelectorAll('body *')) {
    const hasText = [...el.childNodes].some(
      (n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim(),
    )
    if (!hasText || !el.checkVisibility()) continue

    // transient animation states (fade-up delays etc.) — skip but count
    let op = 1
    for (let n = el; n && n !== document.body; n = n.parentElement)
      op *= parseFloat(getComputedStyle(n).opacity)
    if (op < 0.99) {
      skippedTransparent++
      continue
    }

    const cs = getComputedStyle(el)
    const bg = bgOf(el)
    const fg = over(parse(cs.color), bg)
    const size = parseFloat(cs.fontSize)
    const weight = parseInt(cs.fontWeight, 10)
    const large = size >= 24 || (size >= 18.66 && weight >= 700)
    const need = large ? 3 : 4.5
    const got = ratio(fg, bg)
    audited++
    if (got < need) {
      failures.push({
        text: el.textContent.trim().slice(0, 60),
        cls: (el.className || '').toString().slice(0, 80),
        fg: fg.slice(0, 3).map(Math.round).join(','),
        bg: bg.slice(0, 3).map(Math.round).join(','),
        size: `${size}px/${weight}`,
        got: got.toFixed(2),
        need,
      })
    }
  }
  return { failures, audited, skippedTransparent }
}

const auditTheme = async (theme) => {
  // reduced motion: reveals/animations settle instantly, so nothing hides text
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce',
  })
  await ctx.addInitScript((t) => localStorage.setItem('theme', t), theme)
  const page = await ctx.newPage()
  await page.goto(URL, { waitUntil: 'networkidle' })

  assert.equal(
    await page.evaluate(() => document.documentElement.classList.contains('dark')),
    theme === 'dark',
    `${theme}: html.dark class wrong for stored preference`,
  )

  // expand the full tool index so its text is audited too
  await page.getByRole('button', { name: /show all/i }).click()
  // scroll through so IntersectionObserver-gated sections mount their content
  await page.evaluate(async () => {
    for (let y = 0; y <= document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 40))
    }
  })
  await page.waitForTimeout(800)

  const { failures, audited, skippedTransparent } = await page.evaluate(audit)
  assert(audited > 200, `${theme}: only ${audited} elements audited — page did not render fully`)
  assert(
    skippedTransparent < audited * 0.2,
    `${theme}: ${skippedTransparent}/${audited} elements skipped as transparent — audit is blind`,
  )
  assert.deepEqual(
    failures,
    [],
    `${theme}: ${failures.length} AA contrast failures:\n${failures
      .map((f) => `  ${f.got} (need ${f.need}) ${f.size} fg(${f.fg}) bg(${f.bg}) "${f.text}" [${f.cls}]`)
      .join('\n')}`,
  )

  if (theme === 'dark') {
    // the dot field must actually paint on a dark page (regression: invisible lines)
    const lit = await page.locator('canvas').evaluate((c) => {
      const px = c.getContext('2d').getImageData(0, 0, c.width, c.height).data
      let n = 0
      for (let i = 3; i < px.length; i += 4) if (px[i] > 0) n++
      return n
    })
    assert(lit > 1000, `dark: dot-field canvas looks blank (${lit} lit pixels)`)
  }

  await ctx.close()
  console.log(`${theme}: ${audited} elements pass AA`)
}

await auditTheme('light')
await auditTheme('dark')

/* ── behaviour: OS default, no-flash boot, toggle, persistence ───────────── */

{
  // fresh visitor with a dark OS: boots dark before first paint
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: 'dark',
  })
  const page = await ctx.newPage()
  await page.goto(URL, { waitUntil: 'domcontentloaded' })
  assert(
    await page.evaluate(() => document.documentElement.classList.contains('dark')),
    'OS dark preference not applied on first visit',
  )
  const bodyBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor)
  assert.equal(bodyBg, 'rgb(13, 17, 23)', `dark boot painted ${bodyBg}, expected the dark paper`)

  // toggle to light, persist across reload
  await page.getByRole('button', { name: /switch to light mode/i }).click()
  assert(
    !(await page.evaluate(() => document.documentElement.classList.contains('dark'))),
    'toggle did not remove html.dark',
  )
  await page.reload({ waitUntil: 'domcontentloaded' })
  assert(
    !(await page.evaluate(() => document.documentElement.classList.contains('dark'))),
    'light choice did not survive reload (localStorage)',
  )

  // and back to dark
  await page.getByRole('button', { name: /switch to dark mode/i }).click()
  assert(
    await page.evaluate(() => document.documentElement.classList.contains('dark')),
    'toggle did not re-apply html.dark',
  )
  await ctx.close()
  console.log('toggle: OS default, no-flash boot, persistence ok')
}

await browser.close()
console.log('theme ok')
