const queryAllPageQL = `{
  allMarkdownRemark {
    nodes {
      html
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
    }
  }
  site {
    id
    siteMetadata {
      description
      author
      social {
        name
        url
      }
      title
    }
  }
}`

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  try {
    const result = await graphql(queryAllPageQL)

    if (result.error) return

    const nodes = result.data.allMarkdownRemark.nodes

    const categories = []
    let allTags = []

    nodes.forEach(node => {
      const { frontmatter } = node
      const { title, category, path, tags } = frontmatter
      const existCategory = categories.some(item => item.name === category.name)
      !existCategory && categories.push(category)
      allTags = Array.from(new Set([...allTags, ...tags]))

      createPage({
        path: `/${category.name}/${(path || title).replace(/\s/g, '-')}/`,
        component: require.resolve(`./src/templates/article.tsx`),
        context: { ...node }
      })
    })
    console.log(allTags, categories)

    // 生成分类索引页
    categories.forEach(item => {
      createPage({
        path: `/list/${item.name}/`,
        component: require.resolve(`./src/templates/list.tsx`),
        context: {
          category: item.name
        }
      })
    })

    // 生成标签索引页
    allTags.forEach(tag => {
      createPage({
        path: `/list/${tag}/`,
        component: require.resolve(`./src/templates/list.tsx`),
        context: {
          tag
        }
      })
    })

    createPage({
      path: `/`,
      component: require.resolve(`./src/templates/list.tsx`),
      context: {}
    })
  } catch (_err) {
    console.log(_err)
  }
}
