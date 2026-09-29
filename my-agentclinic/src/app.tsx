import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from 'hono'
import { Home } from './pages/home'

export const app = new Hono()

app.use('/styles.css', serveStatic({ root: './public' }))

app.get('/', (c) => c.html(<Home />))
