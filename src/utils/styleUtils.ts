const BASE_FONT_SIZE = 16 // px

export const generateMinWidthMediaQuery = (
  minWidth: number // px
): string => `@media (min-width: ${minWidth / BASE_FONT_SIZE}em)`
