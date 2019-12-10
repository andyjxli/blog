const caterory = require('./config/static/category')
const tags = require('./config/static/tags')

module.exports = {
  siteMetadata: {
    title: `细草微风`,
    description: `记录、总结日常生活、工作所思所得.`,
    author: `云浅`,
    email: `cuteblackcat9@gmail.com`,
    lang: 'en',
    caterory,
    tags,
    social: [
      {
        name: 'github',
        url: 'https://github.com/fyber-LJX',
      },
    ],
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    // markdown
    `gatsby-transformer-remark`,
    // jss
    `gatsby-plugin-styled-components`,
    // typescript
    `gatsby-plugin-typescript`,
    // scss
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src`,
      },
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
        // icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
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
                    superscript_types: /(SuperType)/,
                  },
                  insertBefore: {
                    function: {
                      superscript_keywords: /(superif|superelse)/,
                    },
                  },
                },
              ],
              prompt: {
                user: 'root',
                host: 'localhost',
                global: false,
              },
            },
          },
        ],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
  pathPrefix: `/blog`,
}
