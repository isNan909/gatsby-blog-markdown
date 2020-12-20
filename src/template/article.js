import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"

import Layout from "../layouts/layout"

const ArticleTemplate = ({ data: article }) => (
  <Layout>
    <Link to={"/"}>Go back</Link>
    <Img
      fluid={
        article.markdownRemark.frontmatter.banner.childImageSharp.fluid
      }
      alt={article.markdownRemark.frontmatter.title}
    />
    <h4>{article.markdownRemark.frontmatter.title}</h4>
    <div dangerouslySetInnerHTML={{ __html: article.markdownRemark.html }} />
  </Layout>
)

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        banner {
          childImageSharp {
            fluid(maxWidth: 750) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
export default ArticleTemplate
