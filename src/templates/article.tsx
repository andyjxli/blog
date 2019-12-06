import React from "react"
import Layout from "../components/layout"

interface Context {
  pageContext: {
    frontmatter: {
      title: string
      date: string
      tags: string[]
      layout: string
      image: string
      author: string
      category: string
    }
    html: string
  }
}

const Article = (context: Context) => {
  const { frontmatter, html } = context.pageContext

  return (
    <Layout>
      <section>dasdaa</section>
      <article>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: html }}
        ></div>
      </article>
    </Layout>
  )
}

export default Article
