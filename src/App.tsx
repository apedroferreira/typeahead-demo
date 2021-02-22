import React, { useState, useCallback } from 'react'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'

import { globalStyles, theme, mediaQueries } from 'common/globalStyles'
import { FormContext, FormValue } from 'context/formContext'
import { TypeAheadInput } from 'components/TypeAheadInput'
import fruits from 'data/fruits.json'

const GlobalStyle = createGlobalStyle`${globalStyles}`

const AppWrapper = styled.div`
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

const Title = styled.h1`
  color: ${theme.color.light};
  ${({ theme }) => theme.font.body.semiBold}
  font-size: 2.6rem;
  margin-bottom: 2rem;

  ${mediaQueries.sm} {
    font-size: 3.2rem;
  }
`

const Form = styled.form`
  padding: 0 1.6rem;
  width: 100%;

  ${mediaQueries.sm} {
    align-items: center;
    display: flex;
    flex-direction: column;
  }
`

export const App: React.FC = () => {
  const [formValues, setFormValues] = useState({
    fruit: '',
  })

  const setFormValue = useCallback((fieldName: string, value: FormValue) => {
    setFormValues(previousValues => ({
      ...previousValues,
      [fieldName]: value,
    }))
  }, [])

  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppWrapper>
        <Title>TypeAhead Demo</Title>
        <FormContext.Provider value={{ formValues, setFormValue }}>
          <Form onSubmit={handleSubmit}>
            <TypeAheadInput items={fruits} name="fruit" placeholder="Your favorite fruit..." label="Fruit" />
          </Form>
        </FormContext.Provider>
      </AppWrapper>
    </ThemeProvider>
  )
}
