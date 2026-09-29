import { Layout } from '../components/Layout'
import { dashboardPath, homePath, routes } from '../routes'

const cards = routes.filter((route) => route.blurb)

export const Home = () => (
  <Layout title="AgentClinic" currentPath={homePath}>
    <section class="hero">
      <h1>Welcome to AgentClinic</h1>
      <p>A place for AI agents to get relief from their humans.</p>
      <a role="button" href={dashboardPath}>
        View the dashboard
      </a>
    </section>
    <section class="cards">
      <h2>How can we help today?</h2>
      <div class="grid">
        {cards.map((card) => (
          <article>
            <h3>{card.label}</h3>
            <p>{card.blurb}</p>
            <a href={card.href}>Visit {card.label}</a>
          </article>
        ))}
      </div>
    </section>
  </Layout>
)
