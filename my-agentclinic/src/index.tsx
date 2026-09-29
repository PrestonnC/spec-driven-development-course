import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from 'hono'
import { Layout } from './components/Layout.js'

const app = new Hono()

app.use('/styles.css', serveStatic({ root: './static' }))

app.get('/', (c) =>
  c.html(
    <Layout>
      <h1>Welcome to AgentClinic</h1>
      <p>Your agent is fine. Probably. Please take a seat.</p>
    </Layout>,
  ),
)

const port = Number(process.env.PORT) || 3000

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`AgentClinic is open at http://localhost:${info.port}`)
})
