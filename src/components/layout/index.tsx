import React, { useEffect, useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import './../../styles/index.less'
import * as styles from './index.module.less'
import { SiteInfo } from '../../type/site'

console.log(styles)

const Layout = ({ children, layout = 'index' }) => {
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
    document.querySelector('body').classList.remove(theme ? 'dark' : 'light')
    document.querySelector('body').classList.add(theme ? 'light' : 'dark')
  }, [theme])

  const { description, author, social, title } = data.site.siteMetadata

  const style = layout === 'index' ? { fontSize: '1.8rem' } : { fontSize: '1.5rem' }

  return (
    <div className={styles.layout__container}>
      <header>
        <h1 style={style} className={styles.logo}>
          <a href="/">{title}</a>
        </h1>
      </header>
      {layout === 'index' && (
        <aside>
          <div className={styles.introduction}>
            <div className={styles.avatar}></div>
            <div className={styles.info}>
              <div className={styles.person}>
                <span>
                  <a target="_blank" href={social[0].url}>
                    {author}
                  </a>{' '}
                  的个人博客
                </span>
                {social.map(item => (
                  <span key={item.name}>
                    <a target="_blank" href={item.url}>
                      {item.name}
                    </a>
                  </span>
                ))}
              </div>
              <div>{description}</div>
            </div>
          </div>
        </aside>
      )}
      <main>{children}</main>
      {/* <footer>
        
      </footer> */}
    </div>
  )
}

export default Layout
