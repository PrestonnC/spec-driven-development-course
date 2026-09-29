import { Hono } from 'hono'
import { AilmentsList } from '../components/AilmentsList'
import { Layout } from '../components/Layout'
import { listAilments } from '../db/queries'

export const ailmentsRoutes = new Hono()

ailmentsRoutes.get('/ailments', (c) =>
  c.html(
    <Layout title="Ailments - AgentClinic" currentPath="/ailments">
      <AilmentsList ailments={listAilments()} />
    </Layout>,
  ),
)
