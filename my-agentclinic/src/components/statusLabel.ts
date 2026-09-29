/** "on_leave" -> "On leave" */
export const statusLabel = (status: string): string => {
  const words = status.replace(/_/g, ' ')
  return words.charAt(0).toUpperCase() + words.slice(1)
}
