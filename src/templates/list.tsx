import React, { useState } from 'react'
// import { Link } from "gatsby"

import Layout from '../components/layout'
import SEO from '../components/seo'
import { Article } from '../type/article'
import { graphql } from 'gatsby'
import ArticleComponent from '../components/article'

interface ListProps {
  data: Article
  pageContext: {
    category: string
    tag?: string
  }
}

const IndexPage = (props: ListProps) => {
  const { data, pageContext } = props
  const { category, tag } = pageContext
  const { nodes } = data.allMarkdownRemark

  return (
    <Layout>
      <SEO title={tag || category || '前端'} />
      {nodes.map(item => (
        <ArticleComponent key={item.frontmatter.title} article={item} />
      ))}
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query blogPageQuery($category: [String], $tag: [String]) {
    allMarkdownRemark(
      filter: {
        frontmatter: {
          category: { name: { in: $category } }
          tags: { in: $tag }
        }
      }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
        frontmatter {
          category {
            name
            title
          }
          path
          author
          date
          description
          layout
          tags
          title
        }
      }
    }
  }
`
