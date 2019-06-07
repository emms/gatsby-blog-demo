import React from 'react'
import { graphql, Link } from 'gatsby'
import styled, { ThemeProvider } from 'styled-components'
import Hero from '../components/Hero'
import BlogPost from '../components/BlogPost'
import Footer from '../components/Footer'
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

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const BackLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: #000;
  padding-bottom: 30px;
`

const CategoryList = ({ data, pageContext }) => {
  return (
    <>
      <SEO title={`Category: ${pageContext.categoryTitle}`} />
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyle />
          <Hero siteTitle={data.site.siteMetadata.title} />
          <Content>
            <BackLink to="/">← Back to the front page</BackLink>
            <SectionTitle>{`Category: ${
              pageContext.categoryTitle
            }`}</SectionTitle>
            {data.allContentfulBlogPost.edges.length === 0 && (
              <p>{`No posts were found in category ${
                pageContext.categoryTitle
              }.`}</p>
            )}
            {data.allContentfulBlogPost.edges.map((blogPost, i) => (
              <BlogPost
                key={i}
                id={blogPost.node.id}
                title={blogPost.node.title}
                postedAt={blogPost.node.postedAt}
                jsonContent={blogPost.node.bodyContent.json}
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

export const categoryListQuery = graphql`
  query categoryListQuery($categoryId: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulBlogPost(
      filter: { category: { elemMatch: { id: { eq: $categoryId } } } }
    ) {
      edges {
        node {
          bodyContent {
            json
          }
          title
          postedAt
          id
          category {
            url
            id
          }
        }
      }
    }
  }
`

export default CategoryList
