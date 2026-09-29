import { serve } from '@hono/node-server'
import { app } from './app'
import { migrate } from './db/migrate'

const port = 3000

migrate()

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`AgentClinic listening on http://localhost:${info.port}`)
})
