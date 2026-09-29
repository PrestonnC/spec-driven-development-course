import path from 'node:path'
import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from 'hono'
import { Home } from './pages/home'

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
    rewriteRequestPath: () => '/pico.min.css',
  }),
)
app.use('/styles.css', serveStatic({ root: staticRoot('public') }))

app.get('/', (c) => c.html(<Home />))
