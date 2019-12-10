const queryAllPageQL = `{
  allMarkdownRemark {
    edges {
      node {
        fileAbsolutePath
        frontmatter {
          title
          path
          date(fromNow: false, locale: "")
          tags
          layout
          image
          author
          category {
            title
            name
          }
        }
        html
      }
    }
  }
}`

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  try {
    const result = await graphql(queryAllPageQL)

    if (result.error) return

    const edges = result.data.allMarkdownRemark.edges

    edges.forEach(edge => {
      const { node } = edge
      const { frontmatter } = node
      const { title, category, path } = frontmatter
      createPage({
        path: `/${category.name}/${(path || title).replace(/\s/g, '-')}/`,
        component: require.resolve(`./src/templates/article.tsx`),
        context: { ...node },
      })
    })
  } catch (_err) {
    console.log(_err)
  }
}
