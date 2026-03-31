import styled from "@emotion/styled"
import { useRouter } from "next/router"
import React from "react"
import { useTagsQuery } from "src/hooks/useTagsQuery"

type Props = {}

const TagList: React.FC<Props> = () => {
  const router = useRouter()
  const currentTag = router.query.tag || undefined
  const data = useTagsQuery()

  const handleClickTag = (value: any) => {
    if (currentTag === value) {
      router.replace({ query: { ...router.query, tag: undefined } }, undefined, { shallow: true })
    } else {
      router.replace({ query: { ...router.query, tag: value } }, undefined, { shallow: true })
    }
  }

  return (
    <StyledWrapper>
      <div className="label">Tags</div>
      <div className="list">
        {Object.keys(data).map((key) => (
          <a
            key={key}
            data-active={key === currentTag}
            onClick={() => handleClickTag(key)}
          >
            <span className="hash">#</span>{key}
            <span className="count">{data[key]}</span>
          </a>
        ))}
      </div>
    </StyledWrapper>
  )
}

export default TagList

const StyledWrapper = styled.div`
  .label {
    display: none;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.gray9};
    margin-bottom: 0.75rem;
    padding-left: 0.5rem;

    @media (min-width: 1024px) {
      display: block;
    }
  }

  .list {
    display: flex;
    margin-bottom: 1.5rem;
    gap: 0.35rem;
    overflow-x: auto;
    flex-wrap: nowrap;

    scrollbar-width: none;
    -ms-overflow-style: none;
    ::-webkit-scrollbar { display: none; }

    @media (min-width: 1024px) {
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
      flex-wrap: wrap;
      overflow: visible;
    }

    a {
      display: inline-flex;
      align-items: center;
      gap: 0.3rem;
      padding: 0.3rem 0.7rem;
      border-radius: 6px;
      font-size: 0.8rem;
      line-height: 1.4;
      color: ${({ theme }) => theme.colors.gray10};
      flex-shrink: 0;
      cursor: pointer;
      transition: color 0.15s ease, background-color 0.15s ease;
      font-family: 'SF Mono', 'Fira Code', monospace;
      border: 1px solid transparent;

      .hash {
        color: ${({ theme }) =>
          theme.scheme === "dark" ? "var(--accent)" : theme.colors.gray8};
        font-weight: 600;
        font-size: 0.75rem;
      }

      .count {
        margin-left: auto;
        display: none;
        font-size: 0.7rem;
        color: ${({ theme }) => theme.colors.gray8};

        @media (min-width: 1024px) {
          display: inline;
        }
      }

      &:hover {
        color: ${({ theme }) => theme.colors.gray12};
        background-color: ${({ theme }) => theme.colors.gray5};
      }

      &[data-active="true"] {
        color: ${({ theme }) =>
          theme.scheme === "dark" ? "var(--accent)" : theme.colors.gray12};
        background-color: ${({ theme }) =>
          theme.scheme === "dark" ? "var(--accent-dim)" : theme.colors.gray4};
        border-color: ${({ theme }) =>
          theme.scheme === "dark" ? "var(--accent-border)" : "transparent"};

        &:hover {
          background-color: ${({ theme }) =>
            theme.scheme === "dark" ? "var(--accent-dim)" : theme.colors.gray4};
        }
      }
    }
  }
`
