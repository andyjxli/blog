import React, { useEffect, useState } from "react"
import { useStaticQuery, graphql } from "gatsby"

import "./../styles/index.css"
import "./index.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
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
    console.log(11)
    document.querySelector("body").classList.add(theme ? "light" : "dark")
  }, [theme])

  return (
    <div className="layout__container">
      <main>{children}</main>
    </div>
  )
}

export default Layout
