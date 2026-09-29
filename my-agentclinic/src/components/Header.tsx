import { Nav } from './Nav'

type HeaderProps = {
  currentPath?: string
}

export const Header = ({ currentPath }: HeaderProps) => (
  <header class="site-header">
    <div class="container">
      <Nav currentPath={currentPath} />
    </div>
  </header>
)
