import { describe, expect, it } from 'vitest'
import { isCurrent, routes } from '../src/nav'

describe('routes', () => {
  it('lists every planned section with unique hrefs', () => {
    const hrefs = routes.map((r) => r.href)
    expect(hrefs).toEqual(['/', '/dashboard', '/agents', '/ailments', '/therapies', '/appointments'])
    expect(new Set(hrefs).size).toBe(hrefs.length)
  })

  it('gives the four home-page sections a blurb', () => {
    const withBlurb = routes.filter((r) => r.blurb).map((r) => r.href)
    expect(withBlurb).toEqual(['/agents', '/ailments', '/therapies', '/appointments'])
  })
})

describe('isCurrent', () => {
  it('matches the exact path', () => {
    expect(isCurrent('/agents', '/agents')).toBe(true)
    expect(isCurrent('/', '/')).toBe(true)
  })

  it('matches pages beneath a section', () => {
    expect(isCurrent('/agents', '/agents/42')).toBe(true)
  })

  it('does not match lookalike prefixes or other sections', () => {
    expect(isCurrent('/agents', '/agentsmith')).toBe(false)
    expect(isCurrent('/agents', '/ailments')).toBe(false)
  })

  it('never treats Home as a prefix of everything', () => {
    expect(isCurrent('/', '/agents')).toBe(false)
  })

  it('is false without a current path', () => {
    expect(isCurrent('/', undefined)).toBe(false)
  })
})
