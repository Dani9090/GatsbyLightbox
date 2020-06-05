import React from "react"
import { Link } from "gatsby"
// import { graphql } from 'gatsby'
// import PropTypes from 'prop-types'

import Layout from "../components/layout"
import Image from "../components/image"
// import Lightbox from '../components/lightbox';
import Cars from '../components/cars';

const IndexPage = () => (
  <Layout>
    
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
      <Cars />
    </div>
    {/* <Lightbox images={data.allImageSharp.edges} /> */}
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

// IndexPage.propTypes = {
//   data: PropTypes.object.isRequired,
// }

export default IndexPage

// export const pageQuery = graphql`
//   query IndexQuery {
//     site {
//       siteMetadata {
//         title
//       }
//     }
//     allImageSharp {
//       edges {
//         node {
//           sizes(maxWidth: 1800) {
//             ...GatsbyImageSharpSizes
//           }
//         }
//       }
//     }
//   }
// `
