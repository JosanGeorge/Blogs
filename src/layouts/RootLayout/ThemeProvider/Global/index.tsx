import { Global as _Global, css, useTheme } from "@emotion/react"
import { pretendard } from "src/assets"

export const Global = () => {
  const theme = useTheme()
  const isDark = theme.scheme === "dark"

  return (
    <_Global
      styles={css`
        :root {
          --accent: #00e5a0;
          --accent-dim: rgba(0, 229, 160, 0.08);
          --accent-border: rgba(0, 229, 160, 0.22);
          --accent-glow: 0 0 24px rgba(0, 229, 160, 0.14);
          --accent-red: #ff4757;
          --accent-blue: #79c0ff;
          --radius-card: 0.75rem;
          --radius-pill: 9999px;
          --transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          /* Glass */
          --glass-bg: rgba(14, 14, 24, 0.72);
          --glass-border: rgba(255, 255, 255, 0.07);
          --glass-highlight: rgba(255, 255, 255, 0.05);
          --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        body {
          margin: 0;
          padding: 0;
          color: ${theme.colors.gray12};
          background:
            radial-gradient(ellipse at 15% 45%, rgba(0, 229, 160, 0.04) 0%, transparent 55%),
            radial-gradient(ellipse at 85% 15%, rgba(121, 192, 255, 0.035) 0%, transparent 50%),
            ${theme.colors.gray2};
          font-family: ${pretendard.style.fontFamily};
          font-weight: ${pretendard.style.fontWeight};
          font-style: ${pretendard.style.fontStyle};
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        * {
          color-scheme: ${theme.scheme};
          box-sizing: border-box;
        }

        h1, h2, h3, h4, h5, h6 {
          margin: 0;
          font-weight: inherit;
          font-style: inherit;
        }

        a {
          all: unset;
          cursor: pointer;
        }

        ul {
          padding: 0;
          margin: 0;
          list-style: none;
        }

        button {
          all: unset;
          cursor: pointer;
        }

        input {
          all: unset;
          box-sizing: border-box;
        }

        textarea {
          border: none;
          background-color: transparent;
          font-family: inherit;
          padding: 0;
          outline: none;
          resize: none;
          color: inherit;
        }

        hr {
          width: 100%;
          border: none;
          margin: 0;
          border-top: 1px solid ${theme.colors.gray6};
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: ${theme.colors.gray6};
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: ${isDark ? "var(--accent)" : theme.colors.gray8};
        }

        /* Text selection */
        ::selection {
          background: ${isDark ? "rgba(0, 229, 160, 0.18)" : "rgba(0, 0, 0, 0.12)"};
          color: ${isDark ? "var(--accent)" : "inherit"};
        }
      `}
    />
  )
}
