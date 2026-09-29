import { db, type Db } from './index'

export type Agent = { id: number; name: string; model_type: string; status: string }
export type Ailment = { id: number; name: string; description: string }

export const listAgents = (database: Db = db) =>
  database.prepare('SELECT id, name, model_type, status FROM agents ORDER BY name').all() as Agent[]

export const getAgent = (id: number, database: Db = db) =>
  database.prepare('SELECT id, name, model_type, status FROM agents WHERE id = ?').get(id) as Agent | undefined

export const listAilments = (database: Db = db) =>
  database.prepare('SELECT id, name, description FROM ailments ORDER BY name').all() as Ailment[]

export const listAilmentsForAgent = (agentId: number, database: Db = db) =>
  database
    .prepare(
      `SELECT ailments.id, ailments.name, ailments.description FROM ailments
       JOIN agent_ailments ON agent_ailments.ailment_id = ailments.id
       WHERE agent_ailments.agent_id = ? ORDER BY ailments.name`,
    )
    .all(agentId) as Ailment[]
