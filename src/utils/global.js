import { createGlobalStyle } from 'styled-components/macro'

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: transparent;
  }
  *:focus {
  outline: 0;
  outline: none;
  }
  html {
    font-size: 62.5%;
    box-sizing: border-box;
    --color-main: ${props => props.theme.colors.main}
    --color-mainDark: ${props => props.theme.colors.mainDark};
    --color-mainLight: ${props => props.theme.colors.mainLight};
    --color-mainLighter: ${props => props.theme.colors.mainLighter};
    --color-mainPale: ${props => props.theme.colors.mainPale};
    --color-errorRed: ${props => props.theme.colors.errorRed};
    --shadow: ${props => props.theme.colors.shadow};
  }
  body {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    line-height: 1.6;
  }
  a, button {
    cursor: pointer;
  }
  a, input, textarea, button {
    outline: none;
    text-decoration: none;
    font-family: inherit;
  }
`
