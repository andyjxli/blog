export const linkTo = (path: string) =>
  location.href.includes('/localhost') ? path : `/blog/${path}`
