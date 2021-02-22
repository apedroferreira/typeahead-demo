import React, { useState, useCallback, useContext, useRef, useMemo } from 'react'
import styled, { keyframes } from 'styled-components'

import { mediaQueries } from 'common/globalStyles'
import { FormContext } from 'context/formContext'
import { ENTER_KEY, ARROW_UP_KEY, ARROW_DOWN_KEY } from 'utils/keyboardUtils'

import { CloseIcon } from './icons/CloseIcon'

const Wrapper = styled.div`
  margin: 0 0rem;
  max-width: 100%;
  position: relative;

  ${mediaQueries.sm} {
    width: 46rem;
  }
`

const Label = styled.label<{ isVisible: boolean }>`
  color: ${({ theme }) => theme.color.light};
  display: flex;
  flex-direction: column;
  ${({ theme }) => theme.font.body.semiBold}
  font-size: 1.6rem;
  margin-bottom: 0.6rem;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: translateY(${({ isVisible }) => (isVisible ? 0 : '2rem')});
  transition: 0.2s ease opacity, 0.2s ease transform;

  ${mediaQueries.sm} {
    font-size: 1.8rem;
  }
`

const InputWrapper = styled.div`
  position: relative;
`

const Input = styled.input<{ hasTemporaryValue: boolean }>`
  border: none;
  border-radius: 1rem;
  color: ${({ theme, hasTemporaryValue }) => (hasTemporaryValue ? theme.color.primary : theme.color.dark)};
  ${({ theme }) => theme.font.body.regular}
  font-size: 2rem;
  padding: 1.8rem;
  width: 100%;

  ${mediaQueries.sm} {
    font-size: 2.2rem;
    padding: 2rem;
  }
`

const HighlightedText = styled.span`
  color: ${({ theme }) => theme.color.primary};
  ${({ theme }) => theme.font.body.medium}
`

const popoverInAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(-2rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const Popover = styled.ul`
  animation: ${popoverInAnimation} 0.2s ease;
  background-color: ${({ theme }) => theme.color.light};
  border-radius: 1rem;
  box-shadow: 0 0.3rem 0.6rem ${({ theme }) => theme.color.shadowMedium};
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

const PopoverItem = styled.li<{ isActive: boolean }>`
  background-color: ${({ theme, isActive }) => (isActive ? theme.color.primaryTransparentLight : 'none')};
  cursor: pointer;
  padding: 1rem 2rem;

  &:hover {
    background-color: ${({ theme, isActive }) =>
      isActive ? theme.color.primaryTransparentMedium : theme.color.contrastLight};
  }
`

const ClearButton = styled.button.attrs({ type: 'button' })`
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
