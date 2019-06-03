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
  colorAccent: '#FFB078'
}

export const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }

  h1 {
    font-family: ${props => props.theme.headingFontFamily};
  }
`
