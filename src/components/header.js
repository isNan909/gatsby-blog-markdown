import React from "react"
import Image from "./image"
import { useStaticQuery, graphql } from "gatsby"

const Header = () => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <header
      sitetitle={data.site.siteMetadata?.title || `Title`}
      style={{
        background: `rebeccapurple`,
        marginBottom: `2rem`,
      }}
    >
      <div
        style={{
          padding: `10px`,
        }}
      >
        <Image />
      </div>
    </header>
  )
}

export default Header
