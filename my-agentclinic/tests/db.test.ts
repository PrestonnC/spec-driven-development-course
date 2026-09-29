import { describe, expect, it } from 'vitest'
import { openDb, type Db } from '../src/db'
import { migrate } from '../src/db/migrate'
import { seedAgents } from '../src/db/seeds/agents'
import { seedAilments } from '../src/db/seeds/ailments'

const columns = (db: Db, table: string) =>
  (db.prepare(`PRAGMA table_info(${table})`).all() as { name: string }[]).map((c) => c.name)

const count = (db: Db, table: string) =>
  (db.prepare(`SELECT COUNT(*) AS n FROM ${table}`).get() as { n: number }).n

const freshDb = () => {
  const db = openDb(':memory:')
  migrate(db)
  return db
}

describe('migrate', () => {
  it('runs without error against an in-memory database', () => {
    expect(() => migrate(openDb(':memory:'))).not.toThrow()
  })

  it('is idempotent', () => {
    const db = openDb(':memory:')
    migrate(db)
    expect(() => migrate(db)).not.toThrow()
    expect(count(db, '_migrations')).toBe(3)
  })

  it('creates the agents table', () => {
    expect(columns(freshDb(), 'agents')).toEqual(['id', 'name', 'model_type', 'status', 'created_at'])
  })

  it('creates the ailments table', () => {
    expect(columns(freshDb(), 'ailments')).toEqual(['id', 'name', 'description'])
  })

  it('creates the agent_ailments join table', () => {
    expect(columns(freshDb(), 'agent_ailments')).toEqual(['agent_id', 'ailment_id'])
  })

  it('rejects an unknown agent status', () => {
    const db = freshDb()
    expect(() =>
      db.prepare("INSERT INTO agents (name, model_type, status) VALUES ('X', 'Y', 'lost')").run(),
    ).toThrow()
  })
})

describe('seeds', () => {
  const seeded = () => {
    const db = freshDb()
    seedAgents(db)
    seedAilments(db)
    return db
  }

  it('seeds at least five agents and five ailments, with links', () => {
    const db = seeded()
    expect(count(db, 'agents')).toBeGreaterThanOrEqual(5)
    expect(count(db, 'ailments')).toBeGreaterThanOrEqual(5)
    expect(count(db, 'agent_ailments')).toBeGreaterThanOrEqual(1)
  })

  it('does not duplicate rows when run twice', () => {
    const db = seeded()
    const before = [count(db, 'agents'), count(db, 'ailments'), count(db, 'agent_ailments')]
    seedAgents(db)
    seedAilments(db)
    expect([count(db, 'agents'), count(db, 'ailments'), count(db, 'agent_ailments')]).toEqual(before)
  })
})
