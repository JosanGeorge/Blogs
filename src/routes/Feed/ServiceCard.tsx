import { CONFIG } from "site.config"
import React from "react"
import { TbExternalLink } from "react-icons/tb"
import styled from "@emotion/styled"

const ServiceCard: React.FC = () => {
  if (!CONFIG.projects || CONFIG.projects.length === 0) return null

  return (
    <StyledWrapper>
      <div className="section-label">Projects</div>
      <div className="card">
        {CONFIG.projects.map((project, idx) => (
          <a
            key={idx}
            href={project.href}
            rel="noreferrer"
            target="_blank"
          >
            <span className="dot" />
            <span className="name">{project.name}</span>
            <TbExternalLink className="ext-icon" />
          </a>
        ))}
      </div>
    </StyledWrapper>
  )
}

export default ServiceCard

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

    a {
      display: flex;
      padding: 0.55rem 0.75rem;
      gap: 0.65rem;
      align-items: center;
      border-radius: 6px;
      color: ${({ theme }) => theme.colors.gray10};
      cursor: pointer;
      transition: color 0.15s ease, background-color 0.15s ease;

      &:hover {
        color: ${({ theme }) =>
          theme.scheme === "dark" ? "var(--accent)" : theme.colors.gray12};
        background-color: ${({ theme }) =>
          theme.scheme === "dark" ? "var(--accent-dim)" : theme.colors.gray4};

        .dot {
          background-color: ${({ theme }) =>
            theme.scheme === "dark" ? "var(--accent)" : theme.colors.gray9};
        }
      }

      .dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: ${({ theme }) => theme.colors.gray7};
        flex-shrink: 0;
        transition: background-color 0.15s ease;
      }

      .name {
        font-size: 0.8rem;
        font-weight: 500;
        flex: 1;
      }

      .ext-icon {
        font-size: 0.85rem;
        opacity: 0.5;
        flex-shrink: 0;
      }
    }
  }
`
