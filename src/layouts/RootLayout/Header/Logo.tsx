import Link from "next/link"
import { CONFIG } from "site.config"
import styled from "@emotion/styled"

const Logo = () => {
  return (
    <StyledWrapper href="/" aria-label={CONFIG.blog.title}>
      <span className="prompt">~/</span>
      <span className="name">{CONFIG.profile.github || "blog"}</span>
      <span className="cursor" aria-hidden="true">█</span>
    </StyledWrapper>
  )
}

export default Logo

const StyledWrapper = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0;
  font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  text-decoration: none;

  .prompt {
    color: ${({ theme }) =>
      theme.scheme === "dark" ? "var(--accent)" : theme.colors.gray8};
  }

  .name {
    color: ${({ theme }) => theme.colors.gray12};
  }

  .cursor {
    color: ${({ theme }) =>
      theme.scheme === "dark" ? "var(--accent)" : theme.colors.gray10};
    animation: blink 1.2s step-end infinite;
    margin-left: 1px;
    font-size: 0.75rem;
    line-height: 1;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`
