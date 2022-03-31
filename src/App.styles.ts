import styled from 'styled-components'

import { mediaQueries } from 'common/globalStyles'

export const AppWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  min-height: 50rem;
  padding-top: 14rem;
  width: 100%;

  ${mediaQueries.sm} {
    padding-top: 20rem;
  }
`

export const Title = styled.h1(
  ({ theme }) => `
  color: ${theme.color.light};
  ${theme.font.body.semiBold}
  font-size: 2.6rem;
  margin-bottom: 2rem;

  ${mediaQueries.sm} {
    font-size: 3.2rem;
  }
`
)

export const Form = styled.form`
  padding: 0 1.6rem;
  width: 100%;

  ${mediaQueries.sm} {
    align-items: center;
    display: flex;
    flex-direction: column;
  }
`
