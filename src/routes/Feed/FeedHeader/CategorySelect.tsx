import useDropdown from "src/hooks/useDropdown"
import { useRouter } from "next/router"
import React from "react"
import { MdExpandMore } from "react-icons/md"
import { DEFAULT_CATEGORY } from "src/constants"
import styled from "@emotion/styled"
import { useCategoriesQuery } from "src/hooks/useCategoriesQuery"

type Props = {}

const CategorySelect: React.FC<Props> = () => {
  const router = useRouter()
  const data = useCategoriesQuery()
  const [dropdownRef, opened, handleOpen] = useDropdown()

  const currentCategory = `${router.query.category || ``}` || DEFAULT_CATEGORY

  const handleOptionClick = (category: string) => {
    router.push({
      query: {
        ...router.query,
        category,
      },
    })
  }
  return (
    <StyledWrapper>
      <div ref={dropdownRef} className="wrapper" onClick={handleOpen}>
        {currentCategory} Posts <MdExpandMore />
      </div>
      {opened && (
        <div className="content">
          {Object.keys(data).map((key, idx) => (
            <div
              className="item"
              key={idx}
              onClick={() => handleOptionClick(key)}
            >
              {`${key} (${data[key]})`}
            </div>
          ))}
        </div>
      )}
    </StyledWrapper>
  )
}

export default CategorySelect

const StyledWrapper = styled.div`
  position: relative;

  > .wrapper {
    display: flex;
    padding: 0.4rem 0;
    gap: 0.3rem;
    align-items: center;
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.gray12};
    cursor: pointer;
    transition: color 0.15s ease;

    &:hover {
      color: ${({ theme }) =>
        theme.scheme === "dark" ? "var(--accent)" : theme.colors.gray9};
    }

    svg {
      font-size: 1.1rem;
      color: ${({ theme }) => theme.colors.gray9};
    }
  }

  > .content {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    z-index: 40;
    padding: 0.35rem;
    border-radius: var(--radius-card);
    background-color: ${({ theme }) => theme.colors.gray3};
    border: 1px solid ${({ theme }) => theme.colors.gray6};
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
    min-width: 160px;

    > .item {
      padding: 0.4rem 0.75rem;
      border-radius: 6px;
      font-size: 0.825rem;
      line-height: 1.25rem;
      white-space: nowrap;
      cursor: pointer;
      color: ${({ theme }) => theme.colors.gray10};
      transition: color 0.12s ease, background-color 0.12s ease;

      &:hover {
        color: ${({ theme }) => theme.colors.gray12};
        background-color: ${({ theme }) => theme.colors.gray5};
      }
    }
  }
`
