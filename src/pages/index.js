import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"

import Intro from "../components/intro"
import Layout from "../layouts/layout"
import SEO from "../components/seo"

const getMarkdownArticles = graphql`
  {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date
            publisher
            published
            thumbnail {
              childImageSharp {
                fluid(maxWidth: 750) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          excerpt
        }
      }
    }
  }
`

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Intro />
    <div>
      <StaticQuery
        query={getMarkdownArticles}
        render={data => (
          <>
            <h3
              style={{
                margin: `2.5rem 0px`,
              }}
            >
              My Articles
            </h3>
            <div className="flex-wrapper">
              {data.allMarkdownRemark.edges.map(({ node }) => (
                <div key={node.id}>
                  <Link to={`/articles${node.fields.slug}`}>
                    <div>
                      <Img
                        fluid={node.frontmatter.thumbnail.childImageSharp.fluid}
                        alt={node.frontmatter.title}
                      />
                      <h5
                        style={{
                          padding: `15px 0px 0px`,
                        }}
                      >
                        {node.frontmatter.title}
                      </h5>
                      <p>{node.excerpt}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      />
    </div>
  </Layout>
)

export default IndexPage
