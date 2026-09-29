import type { PropsWithChildren } from 'hono/jsx'
import { Footer } from './Footer.js'
import { Header } from './Header.js'
import { Main } from './Main.js'

type LayoutProps = PropsWithChildren<{ title?: string }>

export const Layout = ({ title = 'AgentClinic', children }: LayoutProps) => (
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{title}</title>
      <link rel="stylesheet" href="/styles.css" />
    </head>
    <body>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </body>
  </html>
)
