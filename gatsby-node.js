/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)
const ArticleTemplate = path.resolve("./src/template/article.js")

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode, basePath: "index" })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const res = await graphql(`
    {
      allMarkdownRemark {
        totalCount
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  const article = res.data.allMarkdownRemark.edges
  article.forEach(({ node: article }) => {
    createPage({
      path: `articles${article.fields.slug}`,
      component: ArticleTemplate,
      context: {
        slug: article.fields.slug,
      },
    })
  })
}
