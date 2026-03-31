import styled from "@emotion/styled"
import { useRouter } from "next/router"
import React from "react"

type Props = {
  children: string
}

const Tag: React.FC<Props> = ({ children }) => {
  const router = useRouter()

  const handleClick = (value: string) => {
    router.push(`/?tag=${value}`)
  }

  return (
    <StyledWrapper onClick={() => handleClick(children)}>
      <span className="hash">#</span>{children}
    </StyledWrapper>
  )
}

export default Tag

const StyledWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.1rem;
  padding: 0.2rem 0.55rem;
  border-radius: var(--radius-pill);
  font-size: 0.72rem;
  line-height: 1rem;
  font-weight: 500;
  font-family: 'SF Mono', 'Fira Code', monospace;
  color: ${({ theme }) => theme.colors.gray10};
  background-color: ${({ theme }) => theme.colors.gray5};
  border: 1px solid ${({ theme }) => theme.colors.gray6};
  cursor: pointer;
  transition: color 0.15s ease, background-color 0.15s ease, border-color 0.15s ease;

  .hash {
    color: ${({ theme }) =>
      theme.scheme === "dark" ? "var(--accent)" : theme.colors.gray8};
    font-weight: 600;
  }

  &:hover {
    color: ${({ theme }) =>
      theme.scheme === "dark" ? "var(--accent)" : theme.colors.gray12};
    background-color: ${({ theme }) =>
      theme.scheme === "dark" ? "var(--accent-dim)" : theme.colors.gray4};
    border-color: ${({ theme }) =>
      theme.scheme === "dark" ? "var(--accent-border)" : theme.colors.gray7};
  }
`
