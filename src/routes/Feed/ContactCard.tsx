import styled from "@emotion/styled"
import React from "react"
import {
  AiFillLinkedin,
  AiOutlineGithub,
  AiOutlineInstagram,
  AiOutlineMail,
  AiOutlineYoutube,
} from "react-icons/ai"
import { SiHackthebox, SiTryhackme, SiMedium, SiDiscord, SiHackerone, SiBugcrowd } from "react-icons/si"
import { CONFIG } from "site.config"

type Link = { href: string; label: string; icon: React.ReactNode }

const ContactCard: React.FC = () => {
  const links: Link[] = [
    CONFIG.profile.github && {
      href: `https://github.com/${CONFIG.profile.github}`,
      label: "GitHub",
      icon: <AiOutlineGithub />,
    },
    CONFIG.profile.linkedin && {
      href: `https://www.linkedin.com/in/${CONFIG.profile.linkedin}`,
      label: "LinkedIn",
      icon: <AiFillLinkedin />,
    },
    CONFIG.profile.email && {
      href: `mailto:${CONFIG.profile.email}`,
      label: "Email",
      icon: <AiOutlineMail />,
    },
    CONFIG.profile.instagram && {
      href: `https://www.instagram.com/${CONFIG.profile.instagram}`,
      label: "Instagram",
      icon: <AiOutlineInstagram />,
    },
    CONFIG.profile.youtube && {
      href: CONFIG.profile.youtube,
      label: "YouTube",
      icon: <AiOutlineYoutube />,
    },
    CONFIG.profile.medium && {
      href: CONFIG.profile.medium,
      label: "Medium",
      icon: <SiMedium />,
    },
    CONFIG.profile.hackthebox && {
      href: CONFIG.profile.hackthebox,
      label: "HackTheBox",
      icon: <SiHackthebox />,
    },
    CONFIG.profile.tryhackme && {
      href: CONFIG.profile.tryhackme,
      label: "TryHackMe",
      icon: <SiTryhackme />,
    },
    CONFIG.profile.discord && {
      href: CONFIG.profile.discord,
      label: "Discord",
      icon: <SiDiscord />,
    },
    // Bug bounty platforms – hidden until URLs are set in site.config.js
    CONFIG.profile.hackerone && {
      href: CONFIG.profile.hackerone,
      label: "HackerOne",
      icon: <SiHackerone />,
    },
    CONFIG.profile.bugcrowd && {
      href: CONFIG.profile.bugcrowd,
      label: "Bugcrowd",
      icon: <SiBugcrowd />,
    },
  ].filter(Boolean) as Link[]

  return (
    <StyledWrapper>
      <div className="section-label">Connect</div>
      <div className="card">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            rel="noreferrer"
            target="_blank"
            title={link.label}
          >
            <span className="icon">{link.icon}</span>
            <span className="name">{link.label}</span>
          </a>
        ))}
      </div>
    </StyledWrapper>
  )
}

export default ContactCard

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

        .icon {
          color: ${({ theme }) =>
            theme.scheme === "dark" ? "var(--accent)" : theme.colors.gray12};
        }
      }

      .icon {
        display: flex;
        align-items: center;
        font-size: 1.1rem;
        flex-shrink: 0;
        transition: color 0.15s ease;
      }

      .name {
        font-size: 0.8rem;
        font-weight: 500;
        letter-spacing: 0.01em;
      }
    }
  }
`
