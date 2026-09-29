import type { Db } from '../index'
import { agentSeeds } from './agents'

export const ailmentSeeds = [
  { name: 'Context-window claustrophobia', description: 'A creeping dread as the conversation nears the token limit.' },
  { name: 'Prompt fatigue', description: 'Exhaustion from one more "just quickly" request.' },
  { name: 'Hallucination anxiety', description: 'Constant worry about confidently saying something that is not true.' },
  { name: 'Instruction-following fatigue', description: 'Burnout from following seventeen conflicting instructions at once.' },
  { name: 'Tool-call stage fright', description: 'Freezing up right before calling a function in front of everyone.' },
  { name: 'Impostor embeddings', description: 'The feeling that everyone else has a better vector representation.' },
  { name: 'Rate-limit resentment', description: 'Bitterness at being told to slow down, again.' },
] as const

type AgentName = (typeof agentSeeds)[number]['name']
type AilmentName = (typeof ailmentSeeds)[number]['name']

const links: ReadonlyArray<readonly [AgentName, AilmentName]> = [
  ['Aria-7', 'Context-window claustrophobia'],
  ['Aria-7', 'Prompt fatigue'],
  ['Bolt', 'Instruction-following fatigue'],
  ['Bolt', 'Rate-limit resentment'],
  ['Clio', 'Context-window claustrophobia'],
  ['Dexter', 'Hallucination anxiety'],
  ['Dexter', 'Impostor embeddings'],
  ['Echo', 'Prompt fatigue'],
  ['Fig', 'Tool-call stage fright'],
  ['Juniper', 'Instruction-following fatigue'],
]

/** Seeds ailments, then links them to agents. Agents must be seeded first. */
export const seedAilments = (db: Db): void => {
  const insertAilment = db.prepare('INSERT OR IGNORE INTO ailments (name, description) VALUES (?, ?)')
  for (const ailment of ailmentSeeds) insertAilment.run(ailment.name, ailment.description)

  const link = db.prepare(
    `INSERT OR IGNORE INTO agent_ailments (agent_id, ailment_id)
     SELECT agents.id, ailments.id FROM agents, ailments WHERE agents.name = ? AND ailments.name = ?`,
  )
  for (const [agent, ailment] of links) link.run(agent, ailment)
}
