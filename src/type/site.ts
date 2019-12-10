export interface SiteInfo {
  site: {
    id: number
    siteMetadata: {
      description: string
      author: string
      social: {
        name: string
        url: string
      }[]
      title: string
    }
  }
}
