import styled from "@emotion/styled"
import { useRouter } from "next/router"
import React from "react"

type Props = {}

const Footer: React.FC<Props> = () => {
  const router = useRouter()
  return (
    <StyledWrapper>
      <a onClick={() => router.push("/")}>← Back</a>
      <a onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        ↑ Top
      </a>
    </StyledWrapper>
  )
}

export default Footer

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.gray6};

  a {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.825rem;
    font-weight: 500;
    font-family: 'SF Mono', 'Fira Code', monospace;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.gray9};
    padding: 0.4rem 0.75rem;
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.colors.gray6};
    transition: color 0.15s ease, background-color 0.15s ease, border-color 0.15s ease;

    &:hover {
      color: ${({ theme }) =>
        theme.scheme === "dark" ? "var(--accent)" : theme.colors.gray12};
      background-color: ${({ theme }) =>
        theme.scheme === "dark" ? "var(--accent-dim)" : theme.colors.gray4};
      border-color: ${({ theme }) =>
        theme.scheme === "dark" ? "var(--accent-border)" : theme.colors.gray7};
    }
  }
`
