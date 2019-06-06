const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allContentfulBlogPost(sort: { order: DESC, fields: [postedAt] }) {
              edges {
                node {
                  id
                }
              }
            }
            allContentfulBlogPostCategory {
              edges {
                node {
                  url
                  id
                  title
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        const posts = result.data.allContentfulBlogPost.edges

        posts.map((post, i) => {
          const next = i === posts.length - 1 ? null : posts[i + 1].node
          const previous = i === 0 ? null : posts[i - 1].node

          createPage({
            path: `/post/${post.node.id}`,
            component: path.resolve('./src/templates/BlogPostPage.js'),
            context: {
              id: post.node.id,
              currentPage: i + 1,
              numPages: posts.length,
              nextPageLink: next ? `/post/${next.id}` : null,
              prevPageLink: previous ? `/post/${previous.id}` : null
            }
          })
        })

        const postsPerPage = 3
        const numPages = Math.ceil(posts.length / postsPerPage)

        Array.from({ length: numPages }).forEach((_, i) => {
          createPage({
            path: i === 0 ? `/` : `/${i + 1}`,
            component: path.resolve('./src/templates/BlogList.js'),
            context: {
              limit: postsPerPage,
              skip: i * postsPerPage,
              numPages,
              currentPage: i + 1,
              nextPageLink: `/${i + 2}`,
              prevPageLink: i === 1 ? `/` : `/${i}`
            }
          })
        })

        const categories = result.data.allContentfulBlogPostCategory.edges

        categories.map(category => {
          createPage({
            path: `/category/${category.node.url}`,
            component: path.resolve('./src/templates/CategoryList.js'),
            context: {
              categoryId: category.node.id,
              categoryTitle: category.node.title
            }
          })
        })
      })
    )
  })
}
