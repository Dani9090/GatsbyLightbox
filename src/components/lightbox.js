// import React, { Component, Fragment } from "react"
// import PropTypes from "prop-types"
// import Img from "gatsby-image"
// import styled from "styled-components"
// import { Dialog } from "@reach/dialog"
// import "@reach/dialog/styles.css"

// const LightboxContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(5, 1fr);
//   grid-gap: 5px;
// `

// const PreviewButton = styled.button`
//   background: transparent;
//   border: none;
//   padding: 0;
//   margin: 0;
// `

// export default class Lightbox extends Component {
//   static propTypes = {
//     carImages: PropTypes.array.isRequired, // eslint-disable-line
//   }

//   constructor(props) {
//     super(props)

//     this.state = {
//       showLightbox: false,
//       selectedImage: null,
//     }
//   }

//   render() {
//     const { carImages } = this.props
//     const { selectedImage, showLightbox } = this.state
//     return (
//       <Fragment>
//         <LightboxContainer>
//           {carImages.map(image => (
//             <PreviewButton                   
//               key={image.node.childImageSharp.fluid.src}
//               type="button"
//               onClick={() =>
//                 this.setState({ showLightbox: true, selectedImage: image })
//               }
//             >
//               <Img fluid={image.node.childImageSharp.fluid} />
//             </PreviewButton>
//           ))}
//         </LightboxContainer>
//         {showLightbox && (
//           <Dialog>
//             <Img fluid={selectedImage.node.childImageSharp.fluid} />
//             <button
//               type="button"
//               onClick={() => this.setState({ showLightbox: false })}
//             >
//               Close
//             </button>
//           </Dialog>
//         )}
//       </Fragment>
//     )
//   }
// }

import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from "styled-components"
import Img from 'gatsby-image'

class Lightbox extends Component {
  state = {
    showLightbox: false,
    selectedImage: 0,
  }

  componentDidMount = () => {
    window.addEventListener('keyup', this.handleKeyUp, false)
  }

  componentWillUnmount = () => {
    window.removeEventListener('keyup', this.handleKeyUp, false)
  }

  handleClick = (e, index) => {
    e.preventDefault()
    this.setState({ showLightbox: !this.state.showLightbox, selectedImage: index })
  }

  closeModal = () => {
    this.setState({ showLightbox: false })
  }

  goBack = () => {
    this.setState({ selectedImage: this.state.selectedImage - 1 })
  }

  goForward = () => {
    this.setState({ selectedImage: this.state.selectedImage + 1 })
  }

  handleKeyUp = e => {
    e.preventDefault()
    const { keyCode } = e
    if (this.state.showLightbox) {
      if (keyCode === 37) {
        // Left Arrow Key
        if (this.state.selectedImage > 0) {
          this.setState({ selectedImage: this.state.selectedImage - 1 })
        }
      }
      if (keyCode === 39) {
        // Right Arrow Key
        if (this.state.selectedImage < this.props.images.length - 1) {
          this.setState({ selectedImage: this.state.selectedImage + 1 })
        }
      }
      if (keyCode === 27) {
        // Escape key
        this.setState({ showLightbox: false })
      }
    }
  }

  render() {
    const { images } = this.props
    const { showLightbox, selectedImage } = this.state
    return (
      <Fragment>
        <Gallery>

            {images.map((img, i) => (
           
            <GalleryItem key={img.headerimg.fluid.src}>
              <a href={img.headerimg.fluid.src} alt="Car Image" onClick={e => this.handleClick(e, i)}>
                <StyledImg fluid={img.headerimg.fluid} />
              </a>
            </GalleryItem>
          ))}
        </Gallery>

        <LightboxModal visible={showLightbox} onKeyUp={e => this.handleKeyDown(e)}>
          <LightboxContent>
          <Button className="close" onClick={this.closeModal}>Close</Button>
            <Imgs fluid={images[selectedImage].headerimg.fluid} />
            <Controls>
              {/* <Button onClick={this.closeModal}>Close</Button> */}
              <LeftRight>
                <Button onClick={this.goBack} disabled={selectedImage === 0}>
                  Previous
                </Button>
                <Button onClick={this.goForward} disabled={selectedImage === images.length - 1}>
                  Next
                </Button>
              </LeftRight>
            </Controls>
          </LightboxContent>
        </LightboxModal>
      </Fragment>
    )
  }
}

const StyledImg = styled(Img)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
   z-index: -1;
  height: 100%; // or whatever
  & > img {
    object-fit: cover !important; // or whatever
    object-position: 0% 0% !important; // or whatever
  }
`
const Imgs = styled(Img)`
object-fit: cover !important;
object-position: 50% 50% !important; 
max-height:800px;
border:1px red solid;
`

const Gallery = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media (min-width: 700px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (min-width: 1100px) {
      width: 1000px;
    grid-template-columns: repeat(7, 1fr);
  }
  grid-gap: 15px;
  .gatsby-image-outer-wrapper {
    height: 100%;
  }
`

const GalleryItem = styled.div`
  position: relative;
  
`

const Button = styled.button`
width:100px;

&.close{
position:absolute;
top:0%;
right: 0%;
opacity: 0.7;
z-index: 999;
}
`

const LightboxModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  opacity: ${props => (props.visible ? '1' : '0')};
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
`
const LightboxContent = styled.div`
  margin: 15px; 
  width: 50%;
  height:60%;
  position:relative;

`

const Controls = styled.div`
  display: flex;
  justify-content: space-space-around;


`

const LeftRight = styled.div`
  button:first-child {
    margin-right: 90%;
    
  }
`

Lightbox.propTypes = {
  images: PropTypes.array.isRequired,
}

export default Lightbox