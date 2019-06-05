import React from 'react'
import { graphql } from 'gatsby'
import styled, { ThemeProvider } from 'styled-components'
import Hero from '../components/Hero'
import BlogPost from '../components/BlogPost'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import { NextPageLink, PrevPageLink } from '../components/NavLinks'
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

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const BlogPostPage = ({ data, pageContext }) => {
  console.log(data, pageContext)
  return (
    <>
      <SEO title="Post" />
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyle />
          <Hero siteTitle={data.site.siteMetadata.title} />
          <Content>
            {data.contentfulBlogPost && (
              <BlogPost
                id={data.contentfulBlogPost.id}
                title={data.contentfulBlogPost.title}
                postedAt={data.contentfulBlogPost.postedAt}
                jsonContent={data.contentfulBlogPost.bodyContent.json}
              />
            )}
            {pageContext && (
              <ButtonsContainer>
                {pageContext.currentPage > 1 && (
                  <PrevPageLink to={pageContext.prevPageLink} />
                )}
                {pageContext.currentPage < pageContext.numPages && (
                  <NextPageLink to={pageContext.nextPageLink} />
                )}
              </ButtonsContainer>
            )}
          </Content>
          <Footer />
        </>
      </ThemeProvider>
    </>
  )
}

export const blogPostQuery = graphql`
  query blogPostQuery($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulBlogPost(id: { eq: $id }) {
      bodyContent {
        json
      }
      title
      postedAt
      id
    }
  }
`

export default BlogPostPage
