export const BASE_FONT_SIZE = 16 // px
export const BASE_REM_SIZE = BASE_FONT_SIZE / 10

export const remToPixels = (remSize: number): number =>
  (remSize * parseFloat(getComputedStyle(document.body).fontSize)) / BASE_REM_SIZE

export const generateMinWidthMediaQuery = (
  minWidth: number // px
): string => `@media (min-width: ${minWidth / BASE_FONT_SIZE}em)`
