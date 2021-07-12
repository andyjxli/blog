module.exports = {
  siteMetadata: {
    // title: `细草微风`,
    title: `寻常巷陌`,
    description: `记录、总结日常生活、工作所思所得.`,
    author: `andyjxli ❤️❤️`,
    email: `cuteblackcat9@gmail.com`,
    lang: 'en',
    social: [
      {
        name: 'github',
        url: 'https://github.com/andyjxli'
      }
    ]
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    // markdown
    `gatsby-transformer-remark`,
    // jss
    `gatsby-plugin-styled-components`,
    // typescript
    `gatsby-plugin-typescript`,
    // less
    `gatsby-plugin-less`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `${__dirname}/src/images/avatar.jpeg` // This path is relative to the root of the site.
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
              languageExtensions: [
                {
                  language: 'typescript',
                  extend: 'javascript',
                  definition: {
                    superscript_types: /(SuperType)/
                  },
                  insertBefore: {
                    function: {
                      superscript_keywords: /(superif|superelse)/
                    }
                  }
                }
              ],
              prompt: {
                user: 'root',
                host: 'localhost',
                global: false
              }
            }
          }
        ]
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
  pathPrefix: `/blog`
}
