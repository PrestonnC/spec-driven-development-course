import type { Agent } from '../db/queries'
import { statusLabel } from './statusLabel'

type AgentsListProps = {
  agents: Agent[]
}

export const AgentsList = ({ agents }: AgentsListProps) => (
  <section>
    <h1>Agents</h1>
    <figure>
      <table>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Model type</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((agent) => (
            <tr>
              <th scope="row">
                <a href={`/agents/${agent.id}`}>{agent.name}</a>
              </th>
              <td>{agent.model_type}</td>
              <td>{statusLabel(agent.status)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  </section>
)
