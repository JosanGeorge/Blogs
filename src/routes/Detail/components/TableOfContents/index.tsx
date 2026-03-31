import styled from "@emotion/styled"
import { uuidToId } from "notion-utils"
import React, { useEffect, useRef, useState } from "react"

/** Shape returned by notion-utils getPageTableOfContents */
export type TocHeading = {
  id: string
  type: "header" | "sub_header" | "sub_sub_header"
  text: string
  indentLevel: number
}

type Props = {
  headings: TocHeading[]
}

const TableOfContents: React.FC<Props> = ({ headings }) => {
  const [activeId, setActiveId] = useState<string>("")
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Track which heading is in the viewport
  useEffect(() => {
    if (headings.length === 0) return

    observerRef.current?.disconnect()

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the topmost visible heading
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: "-72px 0px -55% 0px", threshold: 0 }
    )

    headings.forEach(({ id }) => {
      // react-notion-x strips dashes from block IDs for anchor elements
      const anchorId = uuidToId(id)
      const el = document.getElementById(anchorId)
      if (el) observer.observe(el)
    })

    observerRef.current = observer
    return () => observer.disconnect()
  }, [headings])

  const handleClick = (id: string) => {
    const anchorId = uuidToId(id)
    const el = document.getElementById(anchorId)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
      setActiveId(anchorId)
    }
  }

  if (headings.length === 0) return null

  return (
    <StyledWrapper>
      <div className="toc-label">
        <span className="toc-prefix">{">"}</span>&nbsp;on this page
      </div>
      <nav aria-label="Table of contents">
        {headings.map((heading) => {
          const anchorId = uuidToId(heading.id)
          return (
            <button
              key={heading.id}
              className="toc-item"
              data-level={heading.indentLevel}
              data-active={anchorId === activeId}
              onClick={() => handleClick(heading.id)}
            >
              <span className="toc-indicator" />
              <span className="toc-text">{heading.text}</span>
            </button>
          )
        })}
      </nav>
    </StyledWrapper>
  )
}

export default TableOfContents

const StyledWrapper = styled.div`
  /* Fixed panel — only visible on screens wide enough to not overlap the article */
  display: none;

  /* 82rem ≈ 1312px — safe minimum for a 56rem article + 10rem TOC + gaps */
  @media (min-width: 82rem) {
    display: block;
    position: fixed;
    top: 5.5rem;
    left: 1.5rem;
    width: 10rem;
    max-height: calc(100vh - 7rem);
    overflow-y: auto;
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }

    /* Glass panel */
    background: rgba(10, 10, 18, 0.76);
    backdrop-filter: blur(20px) saturate(140%);
    -webkit-backdrop-filter: blur(20px) saturate(140%);
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 0.75rem;
    padding: 0.85rem 0.35rem;
    box-shadow: 0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05);
  }

  .toc-label {
    font-family: 'SF Mono', 'Fira Code', monospace;
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${({ theme }) =>
      theme.scheme === "dark" ? "var(--accent)" : theme.colors.gray9};
    margin-bottom: 0.75rem;
    padding-left: 0.6rem;

    .toc-prefix {
      opacity: 0.65;
    }
  }

  nav {
    display: flex;
    flex-direction: column;
  }

  .toc-item {
    display: flex;
    align-items: flex-start;
    gap: 0.45rem;
    width: 100%;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.25rem 0.6rem;
    border-radius: 4px;
    text-align: left;
    transition: background-color 0.15s ease, color 0.15s ease;
    color: ${({ theme }) => theme.colors.gray9};

    /* indent sub-headings */
    &[data-level="1"] { padding-left: 1rem; }
    &[data-level="2"] { padding-left: 1.5rem; }

    .toc-indicator {
      flex-shrink: 0;
      width: 2px;
      min-height: 0.8rem;
      margin-top: 0.22rem;
      border-radius: 2px;
      background-color: ${({ theme }) => theme.colors.gray5};
      transition: background-color 0.15s ease, box-shadow 0.15s ease;
    }

    .toc-text {
      font-size: 0.72rem;
      line-height: 1.45;
      font-family: 'SF Mono', 'Fira Code', monospace;
      word-break: break-word;
    }

    &:hover {
      background-color: ${({ theme }) => theme.colors.gray3};
      color: ${({ theme }) => theme.colors.gray12};
      .toc-indicator {
        background-color: ${({ theme }) =>
          theme.scheme === "dark" ? "var(--accent)" : theme.colors.gray8};
      }
    }

    &[data-active="true"] {
      color: ${({ theme }) =>
        theme.scheme === "dark" ? "var(--accent)" : theme.colors.gray12};
      .toc-indicator {
        background-color: ${({ theme }) =>
          theme.scheme === "dark" ? "var(--accent)" : theme.colors.gray12};
        box-shadow: ${({ theme }) =>
          theme.scheme === "dark" ? "0 0 8px var(--accent)" : "none"};
      }
    }
  }
`

