import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled, { ThemeProvider } from 'styled-components'
import Hero from '../components/Hero'
import BlogPost from '../components/BlogPost'
import Footer from '../components/Footer'
import CategoryLink from '../components/CategoryLink'
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

const SectionTitle = styled.h3`
  padding-bottom: 30px;
`

const CategoriesContainer = styled.div`
  width: 100%;
  height: 200px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
  padding-bottom: 60px;
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
          allContentfulBlogPostCategory {
            edges {
              node {
                coverImage {
                  file {
                    url
                  }
                }
                title
                url
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
                <SectionTitle>Categories</SectionTitle>
                <CategoriesContainer>
                  {data.allContentfulBlogPostCategory.edges.map(
                    (category, i) => (
                      <CategoryLink
                        key={i}
                        title={category.node.title}
                        coverimage={category.node.coverImage.file.url}
                        url={category.node.url}
                      />
                    )
                  )}
                </CategoriesContainer>
                <SectionTitle>Latest</SectionTitle>
                {data.allContentfulBlogPost.edges
                  .sort(
                    (a, b) =>
                      new Date(b.node.postedAt).getTime() -
                      new Date(a.node.postedAt).getTime()
                  )
                  .map((blogPost, i) => (
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
