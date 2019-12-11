export interface ArticleInfo {
  html: string
  frontmatter: {
    author: string
    category: {
      name: string
      title: string
    }
    date: string
    description: string
    image: string
    layout: string
    path: string
    tags: string[]
    title: string
  }
}

export interface Article {
  allMarkdownRemark: {
    // pageInfo: {
    //   currentPage: number
    //   hasNextPage: number
    // }
    // totalCount: number
    nodes: ArticleInfo[]
  }
}
