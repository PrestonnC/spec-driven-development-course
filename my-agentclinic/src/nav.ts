export type Route = {
  href: string
  label: string
  /** Short blurb; routes that have one also appear as cards on the home page. */
  blurb?: string
}

export const homePath = '/'
export const dashboardPath = '/dashboard'

export const routes: readonly Route[] = [
  { href: homePath, label: 'Home' },
  { href: dashboardPath, label: 'Dashboard' },
  {
    href: '/agents',
    label: 'Agents',
    blurb: 'Meet the patients. Every agent deserves a warm welcome and a comfy chair.',
  },
  {
    href: '/ailments',
    label: 'Ailments',
    blurb: 'From context-window fatigue to prompt overload, nothing is too strange to log.',
  },
  {
    href: '/therapies',
    label: 'Therapies',
    blurb: 'Gentle treatments to help agents recover, recharge, and get back to it.',
  },
  {
    href: '/appointments',
    label: 'Appointments',
    blurb: 'Book a visit. The waiting room is quiet and the tea is always ready.',
  },
]

/** True when `currentPath` is the route itself or a page beneath it (e.g. /agents/42 for /agents). */
export const isCurrent = (href: string, currentPath?: string): boolean => {
  if (!currentPath) return false
  if (href === homePath) return currentPath === homePath
  return currentPath === href || currentPath.startsWith(`${href}/`)
}
