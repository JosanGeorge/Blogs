import styled from "@emotion/styled"
import Image from "next/image"
import React from "react"
import { CONFIG } from "site.config"

type Props = {}

const ProfileCard: React.FC<Props> = () => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="avatar-wrap">
          <Image src={CONFIG.profile.image} fill alt={CONFIG.profile.name} css={{ objectFit: "cover", borderRadius: "50%" }} />
        </div>
        <div className="info">
          <div className="name">{CONFIG.profile.name}</div>
          <div className="role">{CONFIG.profile.role}</div>
          <div className="bio">{CONFIG.profile.bio}</div>
        </div>
      </div>
    </StyledWrapper>
  )
}

export default ProfileCard

const StyledWrapper = styled.div`
  margin-bottom: 1.5rem;

  > .card {
    border-radius: var(--radius-card);
    width: 100%;
    background-color: ${({ theme }) =>
      theme.scheme === "light" ? "#ffffff" : theme.colors.gray4};
    border: 1px solid ${({ theme }) => theme.colors.gray6};
    padding: 1.5rem 1.25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    .avatar-wrap {
      position: relative;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      flex-shrink: 0;
      box-shadow: ${({ theme }) =>
        theme.scheme === "dark"
          ? "0 0 0 2px var(--accent), 0 0 18px var(--accent-border)"
          : "0 0 0 2px rgba(0,0,0,0.15)"};
    }

    .info {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 0.3rem;

      .name {
        font-size: 1rem;
        font-weight: 700;
        color: ${({ theme }) => theme.colors.gray12};
        letter-spacing: -0.01em;
      }

      .role {
        font-size: 0.75rem;
        color: ${({ theme }) =>
          theme.scheme === "dark" ? "var(--accent)" : theme.colors.gray9};
        font-family: 'SF Mono', 'Fira Code', monospace;
        letter-spacing: 0.02em;
      }

      .bio {
        margin-top: 0.25rem;
        font-size: 0.8rem;
        color: ${({ theme }) => theme.colors.gray10};
        line-height: 1.5;
      }
    }
  }
`
