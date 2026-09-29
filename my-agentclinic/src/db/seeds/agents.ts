import type { Db } from '../index'

export const agentSeeds = [
  { name: 'Aria-7', model_type: 'Large language model', status: 'active' },
  { name: 'Bolt', model_type: 'Code assistant', status: 'active' },
  { name: 'Clio', model_type: 'Summarizer', status: 'on_leave' },
  { name: 'Dexter', model_type: 'Research agent', status: 'active' },
  { name: 'Echo', model_type: 'Chatbot', status: 'discharged' },
  { name: 'Fig', model_type: 'Small language model', status: 'active' },
  { name: 'Juniper', model_type: 'Planner', status: 'on_leave' },
] as const

export const seedAgents = (db: Db): void => {
  const insert = db.prepare('INSERT OR IGNORE INTO agents (name, model_type, status) VALUES (?, ?, ?)')
  for (const agent of agentSeeds) insert.run(agent.name, agent.model_type, agent.status)
}
