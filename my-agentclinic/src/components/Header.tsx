import { Nav } from './Nav'

type HeaderProps = {
  currentPath?: string
}

export const Header = ({ currentPath }: HeaderProps) => (
  <header class="site-header">
    <Nav currentPath={currentPath} />
  </header>
)
