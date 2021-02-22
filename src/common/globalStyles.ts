import { css } from 'styled-components'

import { BASE_REM_SIZE, generateMinWidthMediaQuery } from 'utils/styleUtils'

export const theme = {
  color: {
    contrastLight: '#e6e6e6',
    dark: '#323232',
    light: '#fff',
    primary: '#845adb',
    primaryTransparentLight: 'rgba(132, 90, 219, .4)',
    primaryTransparentMedium: 'rgba(132, 90, 219, .6)',
    shadowMedium: 'rgba(50, 50, 50, .3)',
    transparent: 'transparent',
  },
  font: {
    body: {
      regular: css`
        font-family: 'Livvic', sans-serif;
        font-style: normal;
        font-weight: 400;
      `,
      medium: css`
        font-family: 'Livvic', sans-serif;
        font-style: normal;
        font-weight: 500;
      `,
      semiBold: css`
        font-family: 'Livvic', sans-serif;
        font-style: normal;
        font-weight: 600;
      `,
    },
  },
}

const globalAnimations = css`
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`

export const globalStyles = css`
  html {
    background-color: ${({ theme }) => theme.color.primary};
    font-size: 62.5%;
    scroll-behavior: smooth;
  }

  body {
    font-size: ${BASE_REM_SIZE}rem;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    ${({ theme }) => theme.font.body.regular}
  }

  button {
    background-color: ${({ theme }) => theme.color.transparent};
    border: none;
    cursor: pointer;
  }

  ${globalAnimations}
`

export const BREAKPOINTS = {
  SM: 576,
  MD: 768,
  LG: 992,
  XL: 1200,
}

type BreakpointName = keyof typeof BREAKPOINTS

export const mediaQueries = Object.keys(BREAKPOINTS).reduce(
  (acc, breakpointName) => ({
    ...acc,
    [breakpointName.toLowerCase()]: generateMinWidthMediaQuery(BREAKPOINTS[breakpointName as BreakpointName]),
  }),
  {} as Record<'sm' | 'md' | 'lg' | 'xl', string>
)
