import type { Child } from 'hono/jsx'

type MainProps = {
  children?: Child
}

export const Main = ({ children }: MainProps) => (
  <main id="main" class="site-main container" tabindex={-1}>
    {children}
  </main>
)
