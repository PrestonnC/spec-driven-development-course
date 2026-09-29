import path from 'node:path'
import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from 'hono'
import { Home } from './pages/Home'
import { agentsRoutes } from './routes/agents'
import { ailmentsRoutes } from './routes/ailments'

// serveStatic roots are resolved against process.cwd(), so build them from this file's
// location instead: the app then serves its assets no matter where it is started from.
const projectRoot = path.resolve(__dirname, '..')
const staticRoot = (...segments: string[]) =>
  path.relative(process.cwd(), path.join(projectRoot, ...segments)) || '.'

export const app = new Hono()

app.use(
  '/pico.css',
  serveStatic({
    root: staticRoot('node_modules', '@picocss', 'pico', 'css'),
    rewriteRequestPath: () => '/pico.classless.min.css',
  }),
)
app.use(
  '/static/*',
  serveStatic({
    root: staticRoot('static'),
    rewriteRequestPath: (p) => p.replace(/^\/static/, ''),
  }),
)

app.get('/', (c) => c.html(<Home />))
app.route('/', agentsRoutes)
app.route('/', ailmentsRoutes)
