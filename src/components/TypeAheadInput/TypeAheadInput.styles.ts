import styled, { css, keyframes } from 'styled-components'

import { mediaQueries } from 'common/globalStyles'

export const Wrapper = styled.div`
  margin: 0 0rem;
  max-width: 100%;
  position: relative;

  ${mediaQueries.sm} {
    width: 46rem;
  }
`

export const Label = styled.label<{ isVisible: boolean }>(
  ({ isVisible, theme }) => `
  color: ${theme.color.light};
  display: flex;
  flex-direction: column;
  ${theme.font.body.semiBold}
  font-size: 1.6rem;
  margin-bottom: 0.6rem;
  opacity: ${isVisible ? 1 : 0};
  transform: translateY(${isVisible ? 0 : '2rem'});
  transition: 0.2s ease opacity, 0.2s ease transform;

  ${mediaQueries.sm} {
    font-size: 1.8rem;
  }
`
)

export const InputWrapper = styled.div`
  position: relative;
`

export const Input = styled.input<{ hasTemporaryValue: boolean }>(
  ({ hasTemporaryValue, theme }) => `
  border: none;
  border-radius: 1rem;
  color: ${hasTemporaryValue ? theme.color.primary : theme.color.dark};
  ${theme.font.body.regular}
  font-size: 2rem;
  padding: 1.8rem;
  width: 100%;

  ${mediaQueries.sm} {
    font-size: 2.2rem;
    padding: 2rem;
  }
`
)

export const HighlightedText = styled.span(
  ({ theme }) => `
  color: ${theme.color.primary};
  ${theme.font.body.medium}
`
)

export const popoverInAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(-2rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

export const Popover = styled.ul(
  ({ theme }) => css`
    animation: ${popoverInAnimation} 0.2s ease;
    background-color: ${theme.color.light};
    border-radius: 1rem;
    box-shadow: 0 0.3rem 0.6rem ${theme.color.shadowMedium};
    font-size: 2rem;
    list-style-type: none;
    margin: 0;
    max-height: 26rem;
    -webkit-overflow-scrolling: touch;
    overflow-y: scroll;
    padding: 0.6rem 0rem;
    position: absolute;
    top: calc(100% + 1rem);
    width: 100%;

    ${mediaQueries.sm} {
      font-size: 2.2rem;
      max-height: 30rem;
    }
  `
)

export const PopoverItem = styled.li<{ isActive: boolean }>(
  ({ isActive, theme }) => `
  background-color: ${isActive ? theme.color.primaryTransparentLight : 'none'};
  cursor: pointer;
  padding: 1rem 2rem;

  &:hover {
    background-color: ${isActive ? theme.color.primaryTransparentMedium : theme.color.contrastLight};
  }
`
)

export const ClearButton = styled.button.attrs({ type: 'button' })`
  align-items: center;
  animation: fadeIn 0.2s ease;
  display: flex;
  justify-content: center;
  padding: 1rem;
  position: absolute;
  right: 0.6rem;
  top: 50%;
  transform: translateY(-50%);
`
