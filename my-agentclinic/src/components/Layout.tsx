import type { Child } from 'hono/jsx'
import { raw } from 'hono/html'
import { Footer } from './Footer'
import { Header } from './Header'
import { Main } from './Main'

export const Layout = ({ title, children }: { title: string; children?: Child }) => (
  <>
    {raw('<!doctype html>')}
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
  </>
)
