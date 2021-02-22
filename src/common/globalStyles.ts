import { css } from 'styled-components'

import { generateMinWidthMediaQuery } from 'utils/styleUtils'

export const theme = {
  color: {
    primary: '#845adb',
    dark: '#323232',
    light: '#fff',
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
    font-size: 1.6rem;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ${globalAnimations}
`

export const BREAKPOINTS = {
  SM: 576,
  MD: 768,
  LG: 992,
  XL: 1200,
}

type BreakpointNameType = keyof typeof BREAKPOINTS

export const mediaQueries = Object.keys(BREAKPOINTS).reduce(
  (acc, breakpointName) => ({
    ...acc,
    [breakpointName.toLowerCase()]: generateMinWidthMediaQuery(
      BREAKPOINTS[breakpointName as BreakpointNameType]
    ),
  }),
  {} as Record<'sm' | 'md' | 'lg' | 'xl' | 'xxl', string>
)
