import fs from 'node:fs'
import path from 'node:path'
import { db, type Db } from './index'

const migrationsDir = path.join(__dirname, 'migrations')

/** Applies each unapplied `migrations/*.sql` file, in sorted order, one transaction apiece. */
export const migrate = (database: Db = db): void => {
  database.exec(
    `CREATE TABLE IF NOT EXISTS _migrations (
       name TEXT PRIMARY KEY,
       applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
     )`,
  )
  const applied = new Set(
    database
      .prepare('SELECT name FROM _migrations')
      .all()
      .map((row) => (row as { name: string }).name),
  )
  const files = fs
    .readdirSync(migrationsDir)
    .filter((name) => name.endsWith('.sql'))
    .sort()

  for (const name of files) {
    if (applied.has(name)) continue
    const sql = fs.readFileSync(path.join(migrationsDir, name), 'utf8')
    database.transaction(() => {
      database.exec(sql)
      database.prepare('INSERT INTO _migrations (name) VALUES (?)').run(name)
    })()
  }
}
