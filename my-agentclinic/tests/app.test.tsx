import os from 'node:os'
import { describe, expect, it, vi } from 'vitest'
import { app } from '../src/app'

describe('GET /', () => {
  it('returns the AgentClinic home page inside the layout', async () => {
    const res = await app.request('/')
    expect(res.status).toBe(200)
    expect(res.headers.get('Content-Type')).toContain('text/html')

    const body = await res.text()
    expect(body.startsWith('<!doctype html>')).toBe(true)
    expect(body).toContain('<title>AgentClinic</title>')
    expect(body).toContain('<meta name="description"')
    expect(body).toContain('<h1>Welcome to AgentClinic</h1>')
    expect(body).toContain('<header')
    expect(body).toContain('<main id="main"')
    expect(body).toContain('<footer')
    expect(body).toContain('href="#main"')
    expect(body.indexOf('href="/pico.css"')).toBeGreaterThan(-1)
    expect(body.indexOf('href="/styles.css"')).toBeGreaterThan(body.indexOf('href="/pico.css"'))
  })

  it('shows the full navigation', async () => {
    const body = await (await app.request('/')).text()
    const nav = /<nav[^]*?<\/nav>/.exec(body)?.[0] ?? ''
    for (const href of ['/', '/dashboard', '/agents', '/ailments', '/therapies', '/appointments']) {
      expect(nav).toContain(`href="${href}"`)
    }
  })

  it('shows one card per section, each linking to its own page', async () => {
    const body = await (await app.request('/')).text()
    const cards = body.split('<article').slice(1).map((chunk) => chunk.split('</article>')[0])
    expect(cards).toHaveLength(4)
    const expected = ['/agents', '/ailments', '/therapies', '/appointments']
    cards.forEach((card, i) => {
      expect(card).toContain(`<a href="${expected[i]}">`)
    })
  })
})

describe('stylesheets', () => {
  it('serves our stylesheet', async () => {
    const res = await app.request('/styles.css')
    expect(res.status).toBe(200)
    expect(res.headers.get('Content-Type')).toContain('text/css')
  })

  it('serves PicoCSS locally', async () => {
    const res = await app.request('/pico.css')
    expect(res.status).toBe(200)
    expect(res.headers.get('Content-Type')).toContain('text/css')
    expect(await res.text()).toContain('--pico-')
  })
})

describe('responsive design', () => {
  it('sets a viewport meta tag so mobile browsers use device width', async () => {
    const body = await (await app.request('/')).text()
    expect(body).toContain('<meta name="viewport" content="width=device-width, initial-scale=1"')
  })

  it('opts in to light and dark color schemes', async () => {
    const body = await (await app.request('/')).text()
    expect(body).toContain('<meta name="color-scheme" content="light dark"')
  })

  it('ships mobile-first CSS with min-width media queries', async () => {
    const css = await (await app.request('/styles.css')).text()
    expect(css).toMatch(/@media \(min-width: 48em\)/)
    expect(css).toMatch(/@media \(min-width: 80em\)/)
    expect(css).not.toMatch(/max-width\s*:/)
  })
})

describe('brand colours', () => {
  it('override Pico with selectors at least as specific as its own palettes', async () => {
    const css = await (await app.request('/styles.css')).text()
    expect(css).toContain(':root:not([data-theme="dark"])')
    expect(css).toContain('[data-theme="dark"]')
    expect(css).toMatch(/@media \(prefers-color-scheme: dark\)\s*\{\s*:root:not\(\[data-theme\]\)/)
    expect(css).toContain('--pico-primary-background: var(--brand-orange)')
    expect(css).toContain('--pico-primary-inverse: #000')
  })
})

describe('static assets', () => {
  it('are found no matter which directory the app is started from', async () => {
    const original = process.cwd()
    vi.resetModules()
    process.chdir(os.tmpdir())
    try {
      const { app: appFromElsewhere } = await import('../src/app')
      for (const url of ['/styles.css', '/pico.css']) {
        const res = await appFromElsewhere.request(url)
        expect(res.status, url).toBe(200)
      }
    } finally {
      process.chdir(original)
    }
  })
})
