import styled from "@emotion/styled"
import React, { InputHTMLAttributes } from "react"

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const SearchInput: React.FC<Props> = ({ ...props }) => {
  return (
    <StyledWrapper>
      <div className="input-wrap">
        <span className="prompt">$</span>
        <input
          type="text"
          placeholder="search posts..."
          autoComplete="off"
          spellCheck={false}
          {...props}
        />
      </div>
    </StyledWrapper>
  )
}

export default SearchInput

const StyledWrapper = styled.div`
  margin-bottom: 1.25rem;

  @media (min-width: 768px) {
    margin-bottom: 1.75rem;
  }

  > .input-wrap {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.6rem 1rem;
    border-radius: var(--radius-card);
    border: 1px solid ${({ theme }) => theme.colors.gray6};
    background-color: ${({ theme }) => theme.colors.gray3};
    transition: border-color 0.18s ease, box-shadow 0.18s ease;

    &:focus-within {
      border-color: ${({ theme }) =>
        theme.scheme === "dark" ? "var(--accent-border)" : theme.colors.gray8};
      box-shadow: ${({ theme }) =>
        theme.scheme === "dark" ? "0 0 0 3px rgba(0, 229, 160, 0.08)" : "none"};
    }

    .prompt {
      font-family: 'SF Mono', 'Fira Code', monospace;
      font-size: 0.9rem;
      font-weight: 600;
      color: ${({ theme }) =>
        theme.scheme === "dark" ? "var(--accent)" : theme.colors.gray8};
      flex-shrink: 0;
      user-select: none;
    }

    input {
      all: unset;
      flex: 1;
      font-size: 0.875rem;
      color: ${({ theme }) => theme.colors.gray12};
      font-family: 'SF Mono', 'Fira Code', monospace;
      letter-spacing: 0.02em;

      &::placeholder {
        color: ${({ theme }) => theme.colors.gray8};
      }
    }
  }
`
