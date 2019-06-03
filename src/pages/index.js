import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { ThemeProvider } from 'styled-components'
import Hero from '../components/Hero'
import BlogPost from '../components/BlogPost'
import SEO from '../components/SEO'
import { theme, GlobalStyle } from '../styles'

const IndexPage = () => (
  <>
    <SEO title="Home" />
    <StaticQuery
      query={graphql`
        query IndexPageQuery {
          site {
            siteMetadata {
              title
            }
          }
          allContentfulBlogPost {
            edges {
              node {
                bodyContent {
                  json
                }
                title
                postedAt
              }
            }
          }
        }
      `}
      render={data => {
        console.log(data)
        return (
          <ThemeProvider theme={theme}>
            <>
              <GlobalStyle />
              <Hero siteTitle={data.site.siteMetadata.title} />
              {data.allContentfulBlogPost.edges.map((blogPost, i) => (
                <BlogPost
                  key={i}
                  title={blogPost['node'].title}
                  jsonContent={blogPost['node'].bodyContent['json']}
                />
              ))}
            </>
          </ThemeProvider>
        )
      }}
    />
  </>
)

export default IndexPage
