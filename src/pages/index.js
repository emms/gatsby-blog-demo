import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled, { ThemeProvider } from 'styled-components'
import Hero from '../components/Hero'
import BlogPost from '../components/BlogPost'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import { theme, GlobalStyle, media } from '../styles'

const Content = styled.div`
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto;
  padding: 30px;

  ${media.tabletPortraitUp`
    max-width: 700px;
    padding: 60px;
  `}

  ${media.tabletLandscapeUp`
    padding: 80px;
    max-width: 1200px;
  `}

  ${media.largeDesktopUp`
    padding: 100px;
    max-width: 1400px;
  `}
`

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
              <Content>
                {data.allContentfulBlogPost.edges.map((blogPost, i) => (
                  <BlogPost
                    key={i}
                    title={blogPost.node.title}
                    postedAt={blogPost.node.postedAt}
                    jsonContent={blogPost.node.bodyContent.json}
                  />
                ))}
              </Content>
              <Footer />
            </>
          </ThemeProvider>
        )
      }}
    />
  </>
)

export default IndexPage
