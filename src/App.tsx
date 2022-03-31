import React, { useState, useCallback } from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

import { AppWrapper, Form, Title } from 'App.styles'
import { globalStyles, theme } from 'common/globalStyles'
import { TypeAheadInput } from 'components/TypeAheadInput'
import { FormContext, FormValue } from 'context/formContext'
import fruits from 'data/fruits.json'

const GlobalStyle = createGlobalStyle`${globalStyles}`

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
