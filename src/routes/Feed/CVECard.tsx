import styled from "@emotion/styled"
import React from "react"
import { CONFIG } from "site.config"
import { FaShieldVirus } from "react-icons/fa"

const SEVERITY_COLOR: Record<string, string> = {
  Critical: "#ff4444",
  High: "#ff8c00",
  Medium: "#f5c400",
  Low: "#00b894",
}

const CVECard: React.FC = () => {
  const cves = CONFIG.cves ?? []
  if (cves.length === 0) return null

  return (
    <StyledWrapper>
      <div className="section-label">CVE Discoveries</div>
      <div className="card">
        {cves.map((cve: any) => (
          <a
            key={cve.id}
            href={cve.url}
            target="_blank"
            rel="noreferrer"
            title={cve.description}
          >
            <span className="icon">
              <FaShieldVirus />
            </span>
            <span className="content">
              <span className="cve-id">{cve.id}</span>
              <span
                className="severity"
                style={{ color: SEVERITY_COLOR[cve.severity] ?? "#888" }}
              >
                {cve.severity}
              </span>
            </span>
          </a>
        ))}
      </div>
    </StyledWrapper>
  )
}

export default CVECard

const StyledWrapper = styled.div`
  margin-bottom: 1.5rem;

  .section-label {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.gray9};
    margin-bottom: 0.6rem;
    padding-left: 0.25rem;
  }

  .card {
    display: flex;
    flex-direction: column;
    border-radius: var(--radius-card);
    background-color: ${({ theme }) =>
      theme.scheme === "light" ? "#ffffff" : theme.colors.gray4};
    border: 1px solid ${({ theme }) => theme.colors.gray6};
    padding: 0.35rem;
    overflow: hidden;

    a {
      display: flex;
      padding: 0.55rem 0.75rem;
      gap: 0.75rem;
      align-items: center;
      border-radius: 6px;
      color: ${({ theme }) => theme.colors.gray10};
      cursor: pointer;
      transition: color 0.15s ease, background-color 0.15s ease;
      text-decoration: none;

      &:hover {
        color: ${({ theme }) =>
          theme.scheme === "dark" ? "var(--accent)" : theme.colors.gray12};
        background-color: ${({ theme }) =>
          theme.scheme === "dark" ? "var(--accent-dim)" : theme.colors.gray4};
      }

      .icon {
        display: flex;
        align-items: center;
        font-size: 1.1rem;
        flex-shrink: 0;
        color: #ff8c00;
      }

      .content {
        display: flex;
        flex-direction: column;
        gap: 0.1rem;

        .cve-id {
          font-size: 0.8rem;
          font-weight: 600;
          font-family: 'SF Mono', 'Fira Code', monospace;
          letter-spacing: 0.01em;
        }

        .severity {
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
      }
    }
  }
`
