import type { Agent, Ailment } from '../db/queries'
import { statusLabel } from './statusLabel'

type AgentDetailProps = {
  agent: Agent
  ailments: Ailment[]
}

export const AgentDetail = ({ agent, ailments }: AgentDetailProps) => (
  <article>
    <header>
      <h1>{agent.name}</h1>
    </header>
    <dl>
      <dt>Model type</dt>
      <dd>{agent.model_type}</dd>
      <dt>Status</dt>
      <dd>{statusLabel(agent.status)}</dd>
    </dl>
    <h2>Presenting ailments</h2>
    {ailments.length === 0 ? (
      <p>No ailments on record.</p>
    ) : (
      <ul>
        {ailments.map((ailment) => (
          <li>
            <strong>{ailment.name}</strong>: {ailment.description}
          </li>
        ))}
      </ul>
    )}
    <footer>
      <a href="/agents">Back to all agents</a>
    </footer>
  </article>
)
