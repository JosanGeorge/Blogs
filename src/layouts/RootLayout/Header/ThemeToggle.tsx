import styled from "@emotion/styled"
import React from "react"
import useScheme from "src/hooks/useScheme"
import { BsSun, BsMoon } from "react-icons/bs"

type Props = {}

const ThemeToggle: React.FC<Props> = () => {
  const [scheme, setScheme] = useScheme()

  const handleClick = () => {
    setScheme(scheme === "light" ? "dark" : "light")
  }

  return (
    <StyledWrapper
      onClick={handleClick}
      title={scheme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      aria-label={scheme === "light" ? "Switch to dark mode" : "Switch to light mode"}
    >
      {scheme === "light" ? <BsMoon /> : <BsSun />}
    </StyledWrapper>
  )
}

export default ThemeToggle

const StyledWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 6px;
  color: ${({ theme }) => theme.colors.gray10};
  background: transparent;
  transition: color var(--transition), background-color var(--transition);
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    color: ${({ theme }) =>
      theme.scheme === "dark" ? "var(--accent)" : theme.colors.gray12};
    background-color: ${({ theme }) => theme.colors.gray4};
  }
`
