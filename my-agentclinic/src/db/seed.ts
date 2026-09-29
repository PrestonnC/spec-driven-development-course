import { db } from './index'
import { migrate } from './migrate'
import { seedAgents } from './seeds/agents'
import { seedAilments } from './seeds/ailments'

migrate(db)
seedAgents(db)
seedAilments(db)
console.log('Seeded agents, ailments, and their links.')
