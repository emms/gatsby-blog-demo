import React from 'react'
import styled from 'styled-components'
import footer from '../images/footer.png'

const StyledFooter = styled.div`
  width: 100%;
  height: 300px;
  background-image: url(${footer});
  background-size: cover;
`

const Footer = () => <StyledFooter />

export default Footer
