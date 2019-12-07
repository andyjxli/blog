const queryAllPageQL = `{
  allMarkdownRemark {
    edges {
      node {
        fileAbsolutePath
        frontmatter {
          title
          date(fromNow: false, locale: "")
          tags
          layout
          image
          author
          category {
            zh_name
            en_name
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
      const { title, category } = frontmatter
      createPage({
        path: `/${category.en_name}/${title.replace(/\s/g, "-")}/`,
        component: require.resolve(`./src/templates/article.tsx`),
        context: { ...node },
      })
    })
  } catch (_err) {
    console.log(_err)
  }
}
