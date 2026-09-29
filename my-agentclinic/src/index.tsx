import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from 'hono'
import { Home } from './pages/home'

const app = new Hono()

app.use('/styles.css', serveStatic({ root: './public' }))

app.get('/', (c) => c.html(<Home />))

const port = 3000

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`AgentClinic listening on http://localhost:${info.port}`)
})
