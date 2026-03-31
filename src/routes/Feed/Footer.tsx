import { CONFIG } from "site.config"
import React from "react"
import styled from "@emotion/styled"

const d = new Date()
const y = d.getFullYear()
const from = +CONFIG.since

type Props = {
  className?: string
}

const Footer: React.FC<Props> = ({ className }) => {
  return (
    <StyledWrapper className={className}>
      <a
        href={`https://github.com/${CONFIG.profile.github}`}
        target="_blank"
        rel="noreferrer"
      >
        <span className="copy">©</span>
        <span className="name">{CONFIG.profile.name}</span>
        <span className="year">{from === y || !from ? y : `${from} – ${y}`}</span>
      </a>
    </StyledWrapper>
  )
}

export default Footer

const StyledWrapper = styled.div`
  padding-top: 1.5rem;

  a {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.75rem;
    font-family: 'SF Mono', 'Fira Code', monospace;
    color: ${({ theme }) => theme.colors.gray8};
    transition: color 0.15s ease;

    &:hover {
      color: ${({ theme }) =>
        theme.scheme === "dark" ? "var(--accent)" : theme.colors.gray10};
    }

    .copy {
      color: ${({ theme }) => theme.colors.gray7};
    }
    .name {
      font-weight: 500;
    }
    .year {
      color: ${({ theme }) => theme.colors.gray7};
    }
  }
`
