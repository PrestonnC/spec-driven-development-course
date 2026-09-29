import path from 'node:path'
import Database from 'better-sqlite3'

export type Db = Database.Database

export const openDb = (file: string): Db => {
  const database = new Database(file)
  database.pragma('foreign_keys = ON')
  return database
}

// Tests get a throwaway in-memory database; everything else uses agentclinic.db in the
// project root, wherever the process was started from.
const file = process.env.VITEST ? ':memory:' : path.resolve(__dirname, '..', '..', 'agentclinic.db')

export const db: Db = openDb(file)
