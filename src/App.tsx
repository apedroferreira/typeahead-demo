import React from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

import { globalStyles, theme } from 'common/globalStyles'

const GlobalStyle = createGlobalStyle`${globalStyles}`

export const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <div>hi</div>
  </ThemeProvider>
)
