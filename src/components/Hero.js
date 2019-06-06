import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import heroImg from '../images/hero.png'
import { media } from '../styles'

const StyledHero = styled.div`
  height: 800px;
  max-height: 88vh;
  background-color: #999;
  background-image: url(${heroImg});
  background-size: cover;
  background-position: right -250px top;

  ${media.tabletPortraitUp`
    background-position: center;
  `}

  > h1 {
    text-transform: uppercase;
    letter-spacing: 4px;
    margin: 0;
    padding: 300px 30px 0;
    max-width: 470px;

    ${media.tabletPortraitUp`
      padding: 330px 100px 0;
    `}

    > a {
      text-decoration: none;
      color: #fff;
    }
  }
`

const AccentRow = styled.div`
  width: 100%;
  height: 15px;
  background-color: ${props => props.theme.colorAccent};
`

const Hero = ({ siteTitle }) => (
  <>
    <StyledHero>
      <h1>
        <Link to="/">{siteTitle}</Link>
      </h1>
    </StyledHero>
    <AccentRow />
  </>
)

Hero.propTypes = {
  siteTitle: PropTypes.string
}

Hero.defaultProps = {
  siteTitle: ``
}

export default Hero
