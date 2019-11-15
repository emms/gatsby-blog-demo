import React from 'react'
import { graphql } from 'gatsby'
import styled, { ThemeProvider } from 'styled-components'
import Hero from '../components/Hero'
import BlogPost from '../components/BlogPost'
import Footer from '../components/Footer'
import CategoryLink from '../components/CategoryLink'
import { NextPageLink, PrevPageLink } from '../components/NavLinks'
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
  display: grid;
  grid-template-rows: 200px 200px 200px 200px;
  grid-template-columns: auto;
  grid-gap: 20px;
  padding-bottom: 60px;

  ${media.tabletPortraitUp`
    grid-template-rows: 150px;
    grid-gap: 10px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  `}

  ${media.tabletLandscapeUp`
    grid-template-rows: 200px;
    grid-gap: 20px;
  `}
`

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const BlogList = ({ data, pageContext }) => {
  return (
    <>
      <SEO title="Home" />
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyle />
          <Hero siteTitle={data.site.siteMetadata.title} />
          <Content>
            <SectionTitle>Categories</SectionTitle>
            <CategoriesContainer>
              {data.allContentfulBlogPostCategory.edges.map((category, i) => (
                <CategoryLink
                  key={i}
                  title={category.node.title}
                  coverimage={category.node.coverImage.file.url}
                  url={category.node.url}
                />
              ))}
            </CategoriesContainer>
            <SectionTitle>
              {pageContext.currentPage > 1
                ? `Latest, page ${pageContext.currentPage}`
                : 'Latest'}
            </SectionTitle>
            {data.allContentfulBlogPost.edges.map((blogPost, i) => (
              <BlogPost
                key={i}
                id={blogPost.node.id}
                title={blogPost.node.title}
                postedAt={blogPost.node.postedAt}
                jsonContent={
                  blogPost.node.bodyContent
                    ? blogPost.node.bodyContent.json
                    : null
                }
              />
            ))}
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

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulBlogPost(
      sort: { order: DESC, fields: [postedAt] }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          bodyContent {
            json
          }
          title
          postedAt
          id
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
`

export default BlogList
