import { describe, expect, it } from 'vitest'
import { Footer } from '../src/components/Footer'
import { Header } from '../src/components/Header'
import { Layout } from '../src/components/Layout'
import { Main } from '../src/components/Main'
import { Home } from '../src/pages/home'

describe('Header', () => {
  it('renders a header with a brand link to /', () => {
    const html = (<Header />).toString()
    expect(html).toContain('<header class="site-header">')
    expect(html).toContain('<a class="brand" href="/">AgentClinic</a>')
  })
})

describe('Main', () => {
  it('wraps its children in a main element', () => {
    const html = (
      <Main>
        <p>Hello</p>
      </Main>
    ).toString()
    expect(html).toBe('<main class="site-main"><p>Hello</p></main>')
  })
})

describe('Footer', () => {
  it('renders a footer', () => {
    const html = (<Footer />).toString()
    expect(html).toContain('<footer class="site-footer">')
  })
})

describe('Layout', () => {
  const html = (
    <Layout title="Test Title">
      <p>Page content</p>
    </Layout>
  ).toString()

  it('starts with the doctype and sets the language', () => {
    expect(html.startsWith('<!doctype html><html lang="en">')).toBe(true)
  })

  it('uses the title prop and links the stylesheet in the head', () => {
    expect(html).toContain('<title>Test Title</title>')
    expect(html).toContain('<link rel="stylesheet" href="/styles.css"/>')
  })

  it('composes header, main (with children), and footer in order', () => {
    const header = html.indexOf('<header')
    const main = html.indexOf('<main')
    const footer = html.indexOf('<footer')
    expect(header).toBeGreaterThan(-1)
    expect(main).toBeGreaterThan(header)
    expect(footer).toBeGreaterThan(main)
    expect(html).toContain('<main class="site-main"><p>Page content</p></main>')
  })
})

describe('Home', () => {
  it('renders the welcome heading and tagline inside the layout', () => {
    const html = (<Home />).toString()
    expect(html).toContain('<title>AgentClinic</title>')
    expect(html).toContain('<h1>Welcome to AgentClinic</h1>')
    expect(html).toContain('A place for AI agents to get relief from their humans.')
  })
})
