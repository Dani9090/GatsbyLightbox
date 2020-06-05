import React from "react"
import {useStaticQuery, graphql } from "gatsby"
import Lightbox from "./lightbox"
import PropTypes from 'prop-types'
import styled from "styled-components"

const StyleImg=styled.div`
width: 300px;
`

const Cars = () => {
    const data = useStaticQuery(graphql`
    query{
      allImageSharp {
           edges {
             node {
               sizes(maxWidth: 1000) {
                 ...GatsbyImageSharpSizes
               }
             }
           }
         }     
          allDatoCmsHeader {
            nodes {
              headerimg {
                fluid(maxWidth: 500) {
                  ...GatsbyDatoCmsFluid_tracedSVG
                }
              }
            }
          }      
     }     
      
 `)
  
    return ( 
    <StyleImg>
      <Lightbox images={data.allDatoCmsHeader.nodes} />
    </StyleImg>
    )}
Cars.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Cars

// const Cars = () => {
//   const data = useStaticQuery(graphql`
//     query {
//       allImageSharp {
//      edges {
//        node {
//          sizes(maxWidth: 1000) {
//            ...GatsbyImageSharpSizes
//          }
//        }
//      }
//    }
//  }
// `)

//   return ( 
//   <StyleImg>
//   <Lightbox images={data.allImageSharp.edges} />
//   </StyleImg>
//   )}



// Cars.propTypes = {
//   data: PropTypes.object.isRequired,
// }


// export default Cars

