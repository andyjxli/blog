import React, { useEffect, useState } from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import './../../styles/index.scss'
import styles from './index.module.scss'
import { SiteInfo } from '../../type/site'

const Layout = ({ children }) => {
  const data: SiteInfo = useStaticQuery(graphql`
    {
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
    }
  `)

  const [theme, setTheme] = useState<0 | 1>(1)

  useEffect(() => {
    document.querySelector('body').classList.toggle(theme ? 'light' : 'dark')
  }, [theme])

  const { description, author, social, title } = data.site.siteMetadata

  return (
    <div className={styles.layout__container}>
      <header>
        <h1>
          <a href="/">{title}</a>
        </h1>
      </header>
      <aside>
        <div className={styles.introduction}>
          <div className={styles.avatar}></div>
          <div className={styles.info}>
            <div className={styles.person}>
              <span>
                <a href={social[0].url}>{author}'</a> 个人博客
              </span>
              {social.map(item => (
                <span>
                  <a href={item.url}>{item.name}</a>
                </span>
              ))}
            </div>
            <div>{description}</div>
          </div>
        </div>
      </aside>
      <main>{children}</main>
      {/* <footer>
        
      </footer> */}
    </div>
  )
}

export default Layout
