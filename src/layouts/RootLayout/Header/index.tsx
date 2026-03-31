import NavBar from "./NavBar"
import Logo from "./Logo"
import ThemeToggle from "./ThemeToggle"
import styled from "@emotion/styled"
import { zIndexes } from "src/styles/zIndexes"

type Props = {
  fullWidth: boolean
}

const Header: React.FC<Props> = ({ fullWidth }) => {
  return (
    <StyledWrapper>
      <div data-full-width={fullWidth} className="container">
        <Logo />
        <div className="nav">
          <NavBar />
          <ThemeToggle />
        </div>
      </div>
    </StyledWrapper>
  )
}

export default Header

const StyledWrapper = styled.div`
  z-index: ${zIndexes.header};
  position: sticky;
  top: 0;
  background-color: ${({ theme }) =>
    theme.scheme === "dark"
      ? "rgba(12, 12, 18, 0.92)"
      : "rgba(255, 255, 255, 0.92)"};
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid ${({ theme }) =>
    theme.scheme === "dark"
      ? "rgba(255, 255, 255, 0.06)"
      : "rgba(0, 0, 0, 0.06)"};

  .container {
    display: flex;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1120px;
    height: 3.5rem;
    margin: 0 auto;

    &[data-full-width="true"] {
      @media (min-width: 768px) {
        padding-left: 6rem;
        padding-right: 6rem;
      }
    }

    .nav {
      display: flex;
      gap: 1rem;
      align-items: center;
    }
  }
`
