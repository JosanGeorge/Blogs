import styled from "@emotion/styled"
import Link from "next/link"
import { useRouter } from "next/router"

const NavBar: React.FC = () => {
  const router = useRouter()
  const links: { id: number; name: string; to: string }[] = []

  return (
    <StyledWrapper>
      <ul>
        {links.map((link) => (
          <li key={link.id}>
            <Link
              href={link.to}
              data-active={router.pathname === link.to}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </StyledWrapper>
  )
}

export default NavBar

const StyledWrapper = styled.div`
  flex-shrink: 0;
  ul {
    display: flex;
    flex-direction: row;
    gap: 0.25rem;
    li {
      display: block;
      a {
        display: inline-flex;
        align-items: center;
        padding: 0.35rem 0.75rem;
        border-radius: 6px;
        font-size: 0.875rem;
        font-weight: 500;
        color: ${({ theme }) => theme.colors.gray10};
        transition: color var(--transition), background-color var(--transition);

        &:hover {
          color: ${({ theme }) => theme.colors.gray12};
          background-color: ${({ theme }) => theme.colors.gray4};
        }

        &[data-active="true"] {
          color: ${({ theme }) =>
            theme.scheme === "dark" ? "var(--accent)" : theme.colors.gray12};
          background-color: ${({ theme }) =>
            theme.scheme === "dark" ? "var(--accent-dim)" : theme.colors.gray3};
        }
      }
    }
  }
`
