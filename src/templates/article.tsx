import React from "react"
import Layout from "../components/layout"
import dayjs from "dayjs"

import "./index.css"

interface Context {
  pageContext: {
    frontmatter: {
      title: string
      date: string
      tags: string[]
      layout: string
      image: string
      author: string
      category: {
        zh_name: string
        en_name: string
      }
    }
    html: string
  }
}

const Article = (context: Context) => {
  const { frontmatter, html } = context.pageContext
  const { author, category, tags = [], date, title } = frontmatter

  return (
    <Layout>
      <header className="article__header">
        <h1>{title}</h1>
        <p className="article__info">
          <span>{author}</span>
          <span>{dayjs(date).format("YYYY-MM-DD")}</span>
          <span>{category.zh_name}</span>
          <span>{tags[0]}</span>
        </p>
      </header>
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
