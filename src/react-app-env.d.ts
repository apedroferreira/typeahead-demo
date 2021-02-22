/// <reference types="react-scripts" />

import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    font: {
      body: Record<string, FlattenSimpleInterpolation>
    }
    color: Record<string, string>
  }
}
