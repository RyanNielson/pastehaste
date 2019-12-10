import 'sanitize.css/sanitize.css';
// import 'typeface-source-sans-pro/index.css';

import { createGlobalStyle } from 'styled-components';

const CssBaseline = createGlobalStyle`
  html {
    height: 100%;
  }

  body {
    // font-family: Source Sans Pro,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Droid Sans,Helvetica Neue,Fira Sans,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    height: 100%;
  }

  #root {
    height: 100%;
  }

  a:focus {
    outline: none;
  }
  input:focus {
    outline: none;
  }
  select:focus {
    outline: none;
  }
  select:-moz-focusring {
    outline: none;
    color: transparent;
  }

  * {
    font-family: monospace, monospace;
    font-size: 1em;
  }

`;

export default CssBaseline;
