import { homePath, isCurrent, routes } from '../routes'

type NavProps = {
  currentPath?: string
}

export const Nav = ({ currentPath }: NavProps) => (
  <nav aria-label="Main">
    <ul>
      <li>
        <a class="brand" href={homePath}>
          <strong>AgentClinic</strong>
        </a>
      </li>
    </ul>
    <ul class="nav-links">
      {routes.map((route) => (
        <li>
          <a href={route.href} aria-current={isCurrent(route.href, currentPath) ? 'page' : undefined}>
            {route.label}
          </a>
        </li>
      ))}
    </ul>
  </nav>
)
