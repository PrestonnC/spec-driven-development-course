import { Hono } from 'hono'
import { AgentDetail } from '../components/AgentDetail'
import { AgentsList } from '../components/AgentsList'
import { Layout } from '../components/Layout'
import { getAgent, listAgents, listAilmentsForAgent } from '../db/queries'

export const agentsRoutes = new Hono()

agentsRoutes.get('/agents', (c) =>
  c.html(
    <Layout title="Agents - AgentClinic" currentPath="/agents">
      <AgentsList agents={listAgents()} />
    </Layout>,
  ),
)

agentsRoutes.get('/agents/:id', (c) => {
  const idParam = c.req.param('id')
  const agent = /^\d+$/.test(idParam) ? getAgent(Number(idParam)) : undefined
  if (!agent) {
    return c.html(
      <Layout title="Agent not found - AgentClinic" currentPath={c.req.path}>
        <h1>Agent not found</h1>
        <p>
          We couldn't find that agent. <a href="/agents">Back to all agents</a>
        </p>
      </Layout>,
      404,
    )
  }
  return c.html(
    <Layout title={`${agent.name} - AgentClinic`} currentPath={c.req.path}>
      <AgentDetail agent={agent} ailments={listAilmentsForAgent(agent.id)} />
    </Layout>,
  )
})
