import { createContext } from 'react'

import { NO_OP } from 'common/constants'

export type FormValue = number | string | boolean

export const FormContext: React.Context<{
  formValues: Record<string, FormValue>
  setFormValue: (fieldName: string, value: FormValue) => void
}> = createContext({
  formValues: {},
  setFormValue: NO_OP as (fieldName: string, value: FormValue) => void,
})
