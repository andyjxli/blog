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
      category {
        name
        title
      }
      tags {
        category
        tags {
          title
          name
        }
      }
    }
  }
}`

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  try {
    const result = await graphql(queryAllPageQL)

    if (result.error) return

    const nodes = result.data.allMarkdownRemark.nodes

    nodes.forEach(node => {
      const { frontmatter } = node
      const { title, category, path } = frontmatter
      createPage({
        path: `/${category.name}/${(path || title).replace(/\s/g, '-')}/`,
        component: require.resolve(`./src/templates/article.tsx`),
        context: { ...node },
      })
    })

    const siteMetadata = result.data.site.siteMetadata
    const { category, tags } = siteMetadata

    // 生成分类索引页
    category.forEach(item => {
      createPage({
        path: `/list/${item.name}/`,
        component: require.resolve(`./src/templates/list.tsx`),
        context: {
          category: item.name,
        },
      })
    })

    // 生成标签索引页
    tags.forEach(tagItem => {
      tagItem.tags.forEach(tag => {
        createPage({
          path: `/list/${tag.name}/`,
          component: require.resolve(`./src/templates/list.tsx`),
          context: {
            tag: tag.name,
          },
        })
      })
    })

    createPage({
      path: `/`,
      component: require.resolve(`./src/templates/list.tsx`),
      context: {},
    })
  } catch (_err) {
    console.log(_err)
  }
}
