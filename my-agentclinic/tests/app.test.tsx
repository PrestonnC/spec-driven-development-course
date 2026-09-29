import { describe, expect, it } from 'vitest'
import { app } from '../src/app'

describe('GET /', () => {
  it('returns the AgentClinic home page inside the layout', async () => {
    const res = await app.request('/')
    expect(res.status).toBe(200)
    expect(res.headers.get('Content-Type')).toContain('text/html')

    const body = await res.text()
    expect(body.startsWith('<!doctype html>')).toBe(true)
    expect(body).toContain('<title>AgentClinic</title>')
    expect(body).toContain('<h1>Welcome to AgentClinic</h1>')
    expect(body).toContain('<header')
    expect(body).toContain('<main')
    expect(body).toContain('<footer')
    expect(body).toContain('<link rel="stylesheet" href="/styles.css"')
  })
})

describe('GET /styles.css', () => {
  it('serves the stylesheet', async () => {
    const res = await app.request('/styles.css')
    expect(res.status).toBe(200)
    expect(res.headers.get('Content-Type')).toContain('text/css')
  })
})

describe('responsive design', () => {
  it('sets a viewport meta tag so mobile browsers use device width', async () => {
    const body = await (await app.request('/')).text()
    expect(body).toContain('<meta name="viewport" content="width=device-width, initial-scale=1"')
  })

  it('ships mobile-first CSS with min-width media queries', async () => {
    const css = await (await app.request('/styles.css')).text()
    expect(css).toMatch(/@media \(min-width:/)
    expect(css).not.toMatch(/@media \(max-width:/)
  })
})
