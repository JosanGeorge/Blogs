import { CONFIG } from "site.config"
import Image from "next/image"
import React from "react"
import styled from "@emotion/styled"

type Props = {
  className?: string
}

const MobileProfileCard: React.FC<Props> = () => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="avatar-wrap">
          <Image
            src={CONFIG.profile.image}
            width={64}
            height={64}
            css={{ borderRadius: "50%", objectFit: "cover" }}
            alt="profile_image"
          />
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

export default MobileProfileCard

const StyledWrapper = styled.div`
  display: block;
  margin-bottom: 1.25rem;

  @media (min-width: 1024px) {
    display: none;
  }

  > .card {
    display: flex;
    gap: 1rem;
    align-items: center;
    padding: 1rem 1.25rem;
    border-radius: var(--radius-card);
    border: 1px solid ${({ theme }) => theme.colors.gray6};
    background-color: ${({ theme }) =>
      theme.scheme === "light" ? "#ffffff" : theme.colors.gray4};

    .avatar-wrap {
      flex-shrink: 0;
      width: 64px;
      height: 64px;
      border-radius: 50%;
      overflow: hidden;
      box-shadow: ${({ theme }) =>
        theme.scheme === "dark"
          ? "0 0 0 2px var(--accent)"
          : "0 0 0 2px rgba(0,0,0,0.1)"};
    }

    .info {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;

      .name {
        font-size: 1rem;
        font-weight: 700;
        color: ${({ theme }) => theme.colors.gray12};
      }

      .role {
        font-size: 0.72rem;
        color: ${({ theme }) =>
          theme.scheme === "dark" ? "var(--accent)" : theme.colors.gray9};
        font-family: 'SF Mono', 'Fira Code', monospace;
      }

      .bio {
        font-size: 0.8rem;
        color: ${({ theme }) => theme.colors.gray10};
        line-height: 1.4;
      }
    }
  }
`
