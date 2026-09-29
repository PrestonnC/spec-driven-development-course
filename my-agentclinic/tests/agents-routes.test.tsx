import { beforeAll, describe, expect, it } from 'vitest'
import { app } from '../src/app'
import { db } from '../src/db'
import { migrate } from '../src/db/migrate'
import { seedAgents } from '../src/db/seeds/agents'
import { seedAilments } from '../src/db/seeds/ailments'

beforeAll(() => {
  migrate(db)
  seedAgents(db)
  seedAilments(db)
})

const html = async (url: string) => {
  const res = await app.request(url)
  return { res, body: await res.text() }
}

describe('GET /', () => {
  it('renders layout landmarks', async () => {
    const { res, body } = await html('/')
    expect(res.status).toBe(200)
    for (const tag of ['<header', '<main', '<footer']) expect(body).toContain(tag)
  })
})

describe('GET /agents', () => {
  it('lists agent names, model types, and statuses', async () => {
    const { res, body } = await html('/agents')
    expect(res.status).toBe(200)
    for (const name of ['Aria-7', 'Bolt', 'Clio', 'Dexter', 'Echo']) expect(body).toContain(name)
    expect(body).toContain('Code assistant')
    expect(body).toContain('On leave')
    expect(body).toContain('aria-current="page"')
  })
})

describe('GET /agents/:id', () => {
  it("shows the agent's name and ailments", async () => {
    const { id } = db.prepare("SELECT id FROM agents WHERE name = 'Aria-7'").get() as { id: number }
    const { res, body } = await html(`/agents/${id}`)
    expect(res.status).toBe(200)
    expect(body).toContain('Aria-7')
    expect(body).toContain('Context-window claustrophobia')
  })

  it('returns 404 for a missing agent', async () => {
    const { res, body } = await html('/agents/999')
    expect(res.status).toBe(404)
    expect(body).toContain('Agent not found')
  })

  it('returns 404 for a non-numeric id', async () => {
    expect((await app.request('/agents/abc')).status).toBe(404)
  })
})

describe('GET /ailments', () => {
  it('lists ailment names and descriptions', async () => {
    const { res, body } = await html('/ailments')
    expect(res.status).toBe(200)
    expect(body).toContain('Prompt fatigue')
    expect(body).toContain('Hallucination anxiety')
    expect(body).toContain('Exhaustion from one more')
  })
})
