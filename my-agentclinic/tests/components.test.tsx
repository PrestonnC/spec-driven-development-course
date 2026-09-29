import { afterEach, describe, expect, it, vi } from 'vitest'
import { Footer } from '../src/components/Footer'
import { Header } from '../src/components/Header'
import { Layout } from '../src/components/Layout'
import { Main } from '../src/components/Main'
import { Nav } from '../src/components/Nav'
import { Home } from '../src/pages/home'
import { routes } from '../src/routes'

// Hrefs of the links marked aria-current="page", whatever the attribute order.
const currentHrefs = (html: string) =>
  [...html.matchAll(/<a\b[^>]*>/g)]
    .map((match) => match[0])
    .filter((tag) => tag.includes('aria-current="page"'))
    .map((tag) => /href="([^"]*)"/.exec(tag)?.[1])

afterEach(() => vi.useRealTimers())

describe('Nav', () => {
  it('renders a labelled nav with all six links', () => {
    const html = (<Nav />).toString()
    expect(html).toContain('<nav aria-label="Main">')
    expect(routes).toHaveLength(6)
    for (const route of routes) expect(html).toContain(`href="${route.href}"`)
    expect(html).not.toContain('aria-current')
  })

  it('marks exactly the current page link with aria-current', () => {
    const html = (<Nav currentPath="/agents" />).toString()
    expect(currentHrefs(html)).toEqual(['/agents'])
  })

  it('keeps a section marked current on its sub-pages', () => {
    const html = (<Nav currentPath="/agents/42" />).toString()
    expect(currentHrefs(html)).toEqual(['/agents'])
  })

  it('renders the brand link', () => {
    const html = (<Nav />).toString()
    expect(html).toContain('<a class="brand" href="/"><strong>AgentClinic</strong></a>')
  })
})

describe('Header', () => {
  it('renders a header containing the nav', () => {
    const html = (<Header currentPath="/" />).toString()
    expect(html).toContain('<header class="site-header">')
    expect(html).toContain('<nav aria-label="Main">')
    expect(currentHrefs(html)).toEqual(['/'])
  })
})

describe('Main', () => {
  it('wraps its children in the main landmark that the skip link targets', () => {
    const html = (
      <Main>
        <p>Hello</p>
      </Main>
    ).toString()
    expect(html).toBe('<main id="main" class="site-main container" tabindex="-1"><p>Hello</p></main>')
  })
})

describe('Footer', () => {
  it('renders a footer with the tagline and the current year', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2030-06-01T12:00:00Z'))
    const html = (<Footer />).toString()
    expect(html).toContain('<footer class="site-footer container">')
    expect(html).toContain('Be gentle with your agents.')
    expect(html).toContain('© 2030')
  })
})

describe('Layout', () => {
  const html = (
    <Layout title="Test Title" currentPath="/dashboard">
      <p>Page content</p>
    </Layout>
  ).toString()

  it('starts with the doctype and sets the language', () => {
    expect(html.startsWith('<!doctype html><html lang="en">')).toBe(true)
  })

  it('sets title, description, color-scheme, and links Pico before our styles', () => {
    expect(html).toContain('<title>Test Title</title>')
    expect(html).toContain('<meta name="description"')
    expect(html).toContain('<meta name="color-scheme" content="light dark"/>')
    const pico = html.indexOf('<link rel="stylesheet" href="/pico.css"/>')
    const styles = html.indexOf('<link rel="stylesheet" href="/styles.css"/>')
    expect(pico).toBeGreaterThan(-1)
    expect(styles).toBeGreaterThan(pico)
  })

  it('puts the skip link first in the body, targeting #main', () => {
    expect(html).toMatch(/<body><a class="skip-link" href="#main">/)
  })

  it('composes header, main (with children), and footer in order', () => {
    const header = html.indexOf('<header')
    const main = html.indexOf('<main')
    const footer = html.indexOf('<footer')
    expect(header).toBeGreaterThan(-1)
    expect(main).toBeGreaterThan(header)
    expect(footer).toBeGreaterThan(main)
    expect(html).toContain('<p>Page content</p>')
  })

  it('passes currentPath through to the nav', () => {
    expect(currentHrefs(html)).toEqual(['/dashboard'])
  })
})

describe('Home', () => {
  const html = (<Home />).toString()

  it('renders the welcome heading and tagline inside the layout', () => {
    expect(html).toContain('<title>AgentClinic</title>')
    expect(html).toContain('<h1>Welcome to AgentClinic</h1>')
    expect(html).toContain('A place for AI agents to get relief from their humans.')
  })

  it('marks Home as the only current page', () => {
    expect(currentHrefs(html)).toEqual(['/'])
  })
})
