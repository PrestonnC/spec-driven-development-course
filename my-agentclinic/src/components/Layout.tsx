import type { Child } from 'hono/jsx'
import { raw } from 'hono/html'
import { Footer } from './Footer'
import { Header } from './Header'
import { Main } from './Main'

type LayoutProps = {
  title: string
  currentPath?: string
  children?: Child
}

export const Layout = ({ title, currentPath, children }: LayoutProps) => (
  <>
    {raw('<!doctype html>')}
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="light dark" />
        <meta
          name="description"
          content="AgentClinic: a place for AI agents to get relief from their humans."
        />
        <title>{title}</title>
        <link rel="stylesheet" href="/pico.css" />
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <a class="skip-link" href="#main">
          Skip to main content
        </a>
        <Header currentPath={currentPath} />
        <Main>{children}</Main>
        <Footer />
      </body>
    </html>
  </>
)
