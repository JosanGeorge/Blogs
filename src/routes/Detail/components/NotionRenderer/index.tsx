import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { ExtendedRecordMap } from "notion-types"
import useScheme from "src/hooks/useScheme"

// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css"

// used for code syntax highlighting (optional)
import "prismjs/themes/prism-tomorrow.css"

// used for rendering equations (optional)

import "katex/dist/katex.min.css"
import { FC } from "react"
import styled from "@emotion/styled"

const _NotionRenderer = dynamic(
  () => import("react-notion-x").then((m) => m.NotionRenderer),
  { ssr: false }
)

const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then(async (m) => m.Code)
)

const Collection = dynamic(() =>
  import("react-notion-x/build/third-party/collection").then(
    (m) => m.Collection
  )
)
const Equation = dynamic(() =>
  import("react-notion-x/build/third-party/equation").then((m) => m.Equation)
)
const Pdf = dynamic(
  () => import("react-notion-x/build/third-party/pdf").then((m) => m.Pdf),
  {
    ssr: false,
  }
)
const Modal = dynamic(
  () => import("react-notion-x/build/third-party/modal").then((m) => m.Modal),
  {
    ssr: false,
  }
)

const mapPageUrl = (id: string) => {
  return "https://www.notion.so/" + id.replace(/-/g, "")
}

type Props = {
  recordMap: ExtendedRecordMap
}

const NotionRenderer: FC<Props> = ({ recordMap }) => {
  const [scheme] = useScheme()
  return (
    <StyledWrapper>
      <_NotionRenderer
        darkMode={scheme === "dark"}
        recordMap={recordMap}
        components={{
          Code,
          Collection,
          Equation,
          Modal,
          Pdf,
          nextImage: Image,
          nextLink: Link,
        }}
        mapPageUrl={mapPageUrl}
      />
    </StyledWrapper>
  )
}

export default NotionRenderer

const StyledWrapper = styled.div`
  /* // TODO: why render? */
  .notion-collection-page-properties {
    display: none !important;
  }
  .notion-page {
    padding: 0;
  }
  .notion-list {
    width: 100%;
  }

  /* Scroll offset to clear the sticky header (≈73px) */
  .notion-h1,
  .notion-h2,
  .notion-h3 {
    scroll-margin-top: 5rem;
  }

  /* Make heading anchor targets (used by TOC) also clear the header */
  [id] {
    scroll-margin-top: 5rem;
  }

  /* ─────────────────────────────────────────────
     HEADINGS — Zero-Day Dark cyber style
  ───────────────────────────────────────────── */

  /* H1 — primary section title */
  .notion-h1 {
    display: block !important;
    font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', 'JetBrains Mono', monospace !important;
    font-size: 1.75rem !important;
    font-weight: 700 !important;
    letter-spacing: -0.01em;
    color: #e2e8f0 !important;
    /* cyber-green left accent bar */
    border-left: 3px solid #00e5a0;
    padding-left: 0.85rem !important;
    margin-top: 2.5rem !important;
    margin-bottom: 0.6rem !important;
    /* subtle green text glow */
    text-shadow: 0 0 28px rgba(0, 229, 160, 0.22);
    /* dim green underline on the bottom */
    border-bottom: 1px solid rgba(0, 229, 160, 0.12);
    padding-bottom: 0.45rem !important;
  }

  /* H2 — sub-section */
  .notion-h2 {
    display: block !important;
    font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', 'JetBrains Mono', monospace !important;
    font-size: 1.25rem !important;
    font-weight: 600 !important;
    letter-spacing: 0.01em;
    /* cyber-green tinted, slightly dimmer */
    color: #00e5a0 !important;
    border-left: 2px solid rgba(0, 229, 160, 0.55);
    padding-left: 0.75rem !important;
    margin-top: 2rem !important;
    margin-bottom: 0.4rem !important;
    text-shadow: 0 0 18px rgba(0, 229, 160, 0.18);
  }

  /* H3 — minor heading */
  .notion-h3 {
    display: block !important;
    font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', 'JetBrains Mono', monospace !important;
    font-size: 1.05rem !important;
    font-weight: 500 !important;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    /* muted accent — distinguishable but quieter */
    color: rgba(0, 229, 160, 0.65) !important;
    border-left: 2px solid rgba(0, 229, 160, 0.28);
    padding-left: 0.65rem !important;
    margin-top: 1.6rem !important;
    margin-bottom: 0.3rem !important;
    text-shadow: none;
  }

  /* Hide manually-created Notion Table of Contents blocks —
     the sidebar TOC is auto-generated instead */
  .notion-table-of-contents {
    display: none !important;
  }

  /* ─────────────────────────────────────────────
     CODE BLOCKS — Sleek accent-bar style
  ───────────────────────────────────────────── */
  .notion-code {
    position: relative;
    margin: 2rem 0;
    border-radius: 0.6rem;
    /* overflow: auto makes .notion-code the scroll container (same as the
       react-notion-x default). This is the only reliable way to get
       horizontal scrolling while keeping border-radius corner clipping. */
    overflow: auto !important;

    background: linear-gradient(160deg, #0c0c18 0%, #0a0a14 100%) !important;

    /* Visible green border + bright accent top-line */
    border: 1px solid rgba(0, 229, 160, 0.35) !important;
    box-shadow:
      0 -2px 0 0 rgba(0, 229, 160, 0.7) inset,   /* bright accent top-line inside */
      0 12px 40px rgba(0, 0, 0, 0.6),
      0 0 0 1px rgba(0, 229, 160, 0.08);

    /* Scrollbar — floats inside with gap from all edges */
    padding-bottom: 6px;   /* gap so scrollbar doesn't touch the bottom border */

    &::-webkit-scrollbar {
      height: 8px;
      width: 8px;
    }
    &::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.04);
      border-radius: 999px;
      margin: 0 10px;   /* gap from left/right borders */
    }
    &::-webkit-scrollbar-thumb {
      /* transparent border + background-clip creates the floating/oval pill look */
      background: rgba(0, 210, 155, 0.55);
      border-radius: 999px;
      border: 2px solid transparent;
      background-clip: content-box;
    }
    &::-webkit-scrollbar-thumb:hover {
      background: rgba(0, 229, 160, 0.8);
      background-clip: content-box;
    }
    scrollbar-width: thin;
    scrollbar-color: rgba(0, 210, 155, 0.55) rgba(255, 255, 255, 0.04);

    /* Language label — top-right pill badge */
    &::after {
      content: attr(data-language);
      position: absolute;
      top: 0.6rem;
      right: 0.75rem;
      padding: 0.12em 0.65em;
      border-radius: 999px;
      font-family: 'SF Mono', 'Fira Code', monospace;
      font-size: 0.6rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: rgba(0, 229, 160, 0.9);
      background: rgba(0, 229, 160, 0.1);
      border: 1px solid rgba(0, 229, 160, 0.3);
      pointer-events: none;
    }

    pre {
      margin: 0 !important;
      padding: 1.4rem 1.5rem 1.5rem !important;
      background: transparent !important;
      /* Let content flow out so .notion-code (the scroll container) handles it */
      overflow: visible !important;
      white-space: pre !important;
      word-break: normal !important;
      word-wrap: normal !important;
      font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', 'JetBrains Mono', monospace !important;
      font-size: 0.83rem !important;
      line-height: 1.75 !important;
    }

    code {
      font-family: inherit !important;
      font-size: inherit !important;
      background: transparent !important;
      padding: 0 !important;
      white-space: inherit !important;
    }

    /* ── Token colours ── */
    .token.comment,
    .token.prolog,
    .token.doctype,
    .token.cdata             { color: #4b5563; font-style: italic; }

    .token.punctuation       { color: #6b7280; }

    .token.property,
    .token.tag,
    .token.boolean,
    .token.number,
    .token.constant,
    .token.symbol,
    .token.deleted           { color: #79c0ff; }

    .token.selector,
    .token.attr-name,
    .token.string,
    .token.char,
    .token.builtin,
    .token.inserted          { color: #00e5a0; }

    .token.operator,
    .token.entity,
    .token.url               { color: #ffa657; }

    .token.atrule,
    .token.attr-value,
    .token.keyword           { color: #d2a8ff; }

    .token.function,
    .token.class-name        { color: #f78166; }

    .token.regex,
    .token.variable          { color: #ffa657; }

    .token.bold              { font-weight: bold; }
    .token.italic            { font-style: italic; }

    /* ── Copy button ── */
    .notion-code-copy {
      position: absolute;
      top: 0.55rem;
      right: 5rem;   /* clear the language badge */
      opacity: 0;
      transition: opacity 0.2s ease;
    }
    &:hover .notion-code-copy {
      opacity: 1;
    }

    .notion-code-copy-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2rem;
      height: 2rem;
      padding: 0;
      border-radius: 0.4rem;
      background: rgba(0, 229, 160, 0.08);
      border: 1px solid rgba(0, 229, 160, 0.3) !important;
      box-shadow: none;
      color: rgba(0, 229, 160, 0.75);
      cursor: pointer;
      transition: background 0.18s ease, border-color 0.18s ease,
                  box-shadow 0.18s ease, color 0.18s ease;

      svg {
        width: 14px;
        height: 14px;
        stroke: currentColor;
        fill: none;
        color: inherit;
      }

      &:hover {
        background: rgba(0, 229, 160, 0.16);
        border-color: rgba(0, 229, 160, 0.65) !important;
        box-shadow: 0 0 10px rgba(0, 229, 160, 0.25);
        color: #00e5a0;
      }

      &:active {
        background: rgba(0, 229, 160, 0.24);
        box-shadow: 0 0 18px rgba(0, 229, 160, 0.4);
        transition: none;
      }
    }

    .notion-code-copy-tooltip > div {
      background: rgba(10, 10, 18, 0.95);
      border: 1px solid rgba(0, 229, 160, 0.3);
      color: #00e5a0;
      font-family: 'SF Mono', 'Fira Code', monospace;
      font-size: 0.65rem;
      letter-spacing: 0.06em;
      border-radius: 5px;
      padding: 4px 10px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.5), 0 0 8px rgba(0,229,160,0.15);
    }
  }

  /* Inline code */
  .notion-inline-code {
    font-family: 'SF Mono', 'Fira Code', monospace;
    font-size: 0.82em;
    padding: 0.15em 0.45em;
    border-radius: 4px;
    background: rgba(0, 229, 160, 0.08);
    border: 1px solid rgba(0, 229, 160, 0.18);
    color: #00e5a0;
  }

  /* ─────────────────────────────────────────────
     IMAGES — glow border + hover lift
  ───────────────────────────────────────────── */
  .notion-asset-wrapper,
  .notion-image-inset {
    margin: 1.75rem 0;
    border-radius: 0.65rem;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.07);
    box-shadow:
      0 4px 24px rgba(0, 0, 0, 0.45),
      inset 0 1px 0 rgba(255, 255, 255, 0.04);
    transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
    background: #0d0d17;

    &:hover {
      transform: translateY(-3px) scale(1.005);
      border-color: rgba(0, 229, 160, 0.28);
      box-shadow:
        0 0 0 1px rgba(0, 229, 160, 0.12),
        0 0 32px rgba(0, 229, 160, 0.08),
        0 16px 48px rgba(0, 0, 0, 0.55);
    }

    img {
      display: block;
      width: 100%;
      height: auto;
    }
  }

  /* Figure caption — monospace prefix style */
  .notion-image-caption {
    display: block;
    font-family: 'SF Mono', 'Fira Code', monospace;
    font-size: 0.72rem;
    color: rgba(0, 229, 160, 0.55);
    text-align: center;
    margin-top: 0.55rem;
    letter-spacing: 0.04em;

    &::before {
      content: "// ";
      opacity: 0.5;
    }
  }
`
