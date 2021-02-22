import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'

import { remToPixels } from 'utils/styleUtils'

interface CloseIconProps {
  color?: string
  size: number
}

export const CloseIcon: React.FC<CloseIconProps> = ({ color, size }) => {
  const theme = useContext(ThemeContext)

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={remToPixels(size)}
      width={remToPixels(size)}
      viewBox="0 0 170.77 170.77"
    >
      <g fill={color || theme.color.primary}>
        <path d="M112.34 85.38l55-55a11.64 11.64 0 000-16.45L156.85 3.41a11.62 11.62 0 00-16.45 0l-55 55-55-55a11.62 11.62 0 00-16.45 0L3.41 13.92a11.62 11.62 0 000 16.45l55 55-55 55a11.62 11.62 0 000 16.45l10.51 10.51a11.64 11.64 0 0016.45 0l55-55 55 55a11.64 11.64 0 0016.45 0l10.51-10.51a11.64 11.64 0 000-16.45z" />
      </g>
    </svg>
  )
}
