import React, { useState, useCallback, useContext, useRef, useMemo } from 'react'

import { FormContext } from 'context/formContext'
import { ENTER_KEY, ARROW_UP_KEY, ARROW_DOWN_KEY } from 'utils/keyboardUtils'

import { CloseIcon } from '../icons/CloseIcon'
import {
  ClearButton,
  HighlightedText,
  Input,
  InputWrapper,
  Label,
  Popover,
  PopoverItem,
  Wrapper,
} from './TypeAheadInput.styles'

interface TypeAheadInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  items: string[]
  label: string
}

export const TypeAheadInput: React.FC<TypeAheadInputProps> = ({ items, label, name, ...rest }) => {
  const { formValues, setFormValue } = useContext(FormContext)
  const value = formValues[name] as string

  const [isFocused, setIsFocused] = useState(false)
  const [selectedItemIndex, setSelectedItemIndex] = useState(0)
  const [temporaryValue, setTemporaryValue] = useState(value)

  const inputRef = useRef<HTMLInputElement | null>(null)

  const visibleItems = useMemo(
    () =>
      value ? items.filter(item => item !== value && item.toLowerCase().includes(value.toLowerCase())) : [],
    [value]
  )

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue(name, event.target.value)
    setTemporaryValue('')
    setSelectedItemIndex(0)
  }, [])

  const handleFocus = useCallback(() => {
    setIsFocused(true)
    setSelectedItemIndex(0)
  }, [])

  const handleBlur = useCallback(() => {
    setIsFocused(false)
  }, [])

  const handleKeyUp = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === ENTER_KEY) {
        setFormValue(name, visibleItems[selectedItemIndex])
        setTemporaryValue('')

        const inputElement = inputRef.current
        if (inputElement) {
          inputElement.blur()
        }
      }
      if (event.key === ARROW_UP_KEY) {
        const newIndex = selectedItemIndex > 0 ? selectedItemIndex - 1 : selectedItemIndex
        setSelectedItemIndex(newIndex)
        setTemporaryValue(visibleItems[newIndex])
      }
      if (event.key === ARROW_DOWN_KEY) {
        const newIndex =
          selectedItemIndex < visibleItems.length - 1 ? selectedItemIndex + 1 : selectedItemIndex
        setSelectedItemIndex(newIndex)
        setTemporaryValue(visibleItems[newIndex])
      }
    },
    [selectedItemIndex, visibleItems.length]
  )

  const handleItemSelect = useCallback(
    (item: string) => () => {
      setFormValue(name, item)
      setTemporaryValue('')
    },
    []
  )

  const handleClear = useCallback(() => {
    setFormValue(name, '')

    const inputElement = inputRef.current
    if (inputElement) {
      inputElement.focus()
    }
  }, [])

  const handleItemMouseEnter = useCallback(
    (item: string) => () => {
      setTemporaryValue(item)
    },
    []
  )

  const handleItemMouseLeave = useCallback(() => {
    setTemporaryValue('')
  }, [])

  const renderItem = (item: string, index: number): JSX.Element => {
    const matchIndex = item.toLowerCase().indexOf(value.toLowerCase())
    const splitItemText = [
      item.slice(0, matchIndex),
      item.slice(matchIndex, matchIndex + value.length),
      item.slice(matchIndex + value.length, item.length),
    ]

    return (
      <PopoverItem
        key={item}
        isActive={index === selectedItemIndex}
        onMouseDown={handleItemSelect(item)}
        onMouseEnter={handleItemMouseEnter(item)}
        onMouseLeave={handleItemMouseLeave}
      >
        {splitItemText[0]}
        <HighlightedText>{splitItemText[1]}</HighlightedText>
        {splitItemText[2]}
      </PopoverItem>
    )
  }

  const isPopoverVisible = isFocused && visibleItems.length > 0

  return (
    <Wrapper>
      <Label htmlFor={name} isVisible={Boolean(value)}>
        {label}
      </Label>
      <InputWrapper>
        <Input
          ref={inputRef}
          {...rest}
          type="text"
          value={temporaryValue || value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyUp={handleKeyUp}
          hasTemporaryValue={Boolean(temporaryValue)}
        />
        {value && (
          <ClearButton onClick={handleClear}>
            <CloseIcon size={1.6} />
          </ClearButton>
        )}
      </InputWrapper>
      {isPopoverVisible && <Popover>{visibleItems.map(renderItem)}</Popover>}
    </Wrapper>
  )
}
