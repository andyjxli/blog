export const linkTo = (path: string) => {
  if (typeof window === 'undefined') return path
  return location.href.includes('/localhost') ? path : `/blog/${path}`
}
