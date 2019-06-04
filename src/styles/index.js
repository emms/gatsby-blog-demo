import { createGlobalStyle, css } from 'styled-components'

export const sizes = {
  largeDesktopUp: 1600,
  desktopUp: 1200,
  tabletLandscapeUp: 900,
  tabletPortraitUp: 600
}

export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${sizes[label]}px) {
      ${css(...args)}
    }
  `
  return acc
}, {})

export const theme = {
  headingFontFamily: 'Futura',
  bodyFontFamily: 'Open Sans',
  colorAccent: '#FFB078'
}

export const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    font-family: ${props => props.theme.bodyFontFamily};
  }

  h1 {
    text-transform: uppercase;
    font-family: ${props => props.theme.headingFontFamily};
    font-size: 36px;
  }

  h2 {
    text-transform: uppercase;
    font-family: ${props => props.theme.headingFontFamily};
    font-size: 26px;
    margin: 0;
  }

  h3 {
    text-transform: uppercase;
    font-family: ${props => props.theme.headingFontFamily};
    font-size: 16px;
    margin: 0;
  }

  p {
    font-family: ${props => props.theme.bodyFontFamily};
    letter-spacing: 0.7px;
    font-size: 14px;
  }
`
