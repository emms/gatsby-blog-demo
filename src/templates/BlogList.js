import React from 'react'
import { graphql, Link } from 'gatsby'
import styled, { ThemeProvider, css } from 'styled-components'
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

const sharedNavLinkStyle = css`
  text-decoration: none;
  text-transform: uppercase;
  padding: 15px 20px;
  background-color: ${props => props.theme.colorAccent};
  border-radius: 4px;
`

const PrevPageLink = styled(Link)`
  ${sharedNavLinkStyle}
  align-self: flex-start;

  > span {
    font-size: 16px;
    color: #fff;
  }
`

const NextPageLink = styled(Link)`
  ${sharedNavLinkStyle}
  align-self: flex-end;

  > span {
    font-size: 16px;
    color: #fff;
  }
`

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const BlogList = ({ data, pageContext }) => {
  console.log(data)
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
            <SectionTitle>Latest</SectionTitle>
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
                  <PrevPageLink to={pageContext.prevPageLink}>
                    <span>Previous page</span>
                  </PrevPageLink>
                )}
                {pageContext.currentPage < pageContext.numPages && (
                  <NextPageLink to={pageContext.nextPageLink}>
                    <span>Next page</span>
                  </NextPageLink>
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
