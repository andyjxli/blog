import React from 'react'
import Layout from '../components/layout/'
import dayjs from 'dayjs'
import SEO from '../components/seo'

import styles from './index.module.scss'

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
        name: string
        title: string
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
      <SEO title={title}></SEO>
      <header className={styles.articleHeader}>
        <h1>{title}</h1>
        <p className={styles.articleInfo}>
          <span>{author}</span>
          <span>{dayjs(date).format('YYYY-MM-DD')}</span>
          <span>{category.title}</span>
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
