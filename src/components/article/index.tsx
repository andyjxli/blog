import { ArticleInfo } from '../../type/article'
import dayjs from 'dayjs'
import React from 'react'
import * as styles from './index.module.less'
import { linkTo } from '../../utils/link'

const ArticleComponent = (props: { article: ArticleInfo }) => {
  const { frontmatter } = props.article
  const { title, description, category, tags, date, path } = frontmatter

  return (
    <article className={styles.article}>
      <header>
        <h3>
          <a href={linkTo(`/${category.name}/${path || title}`)}>{title}</a>
        </h3>
        <small>
          <span>{dayjs(date).format('YYYY-MM-DD')}</span>
          <span
            className={styles.link}
            onClick={() => (location.href = `${linkTo(`/list/${category.name}`)}`)}
          >
            {category.title}
          </span>
          {tags &&
            tags.map((item, index) => (
              <span
                key={index}
                onClick={() => (location.href = `${linkTo(`/list/${item}`)}`)}
                className={styles.link}
              >
                {item}
              </span>
            ))}
        </small>
      </header>
      <p>{description}</p>
    </article>
  )
}

export default ArticleComponent
