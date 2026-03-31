import styled from "@emotion/styled"
import { useRouter } from "next/router"
import React from "react"

type TOrder = "asc" | "desc"

type Props = {}

const OrderButtons: React.FC<Props> = () => {
  const router = useRouter()

  const currentOrder = `${router.query.order || ``}` || ("desc" as TOrder)

  const handleClickOrderBy = (value: TOrder) => {
    router.push({
      query: {
        ...router.query,
        order: value,
      },
    })
  }
  return (
    <StyledWrapper>
      <a
        data-active={currentOrder === "desc"}
        onClick={() => handleClickOrderBy("desc")}
      >
        Desc
      </a>
      <a
        data-active={currentOrder === "asc"}
        onClick={() => handleClickOrderBy("asc")}
      >
        Asc
      </a>
    </StyledWrapper>
  )
}

export default OrderButtons

const StyledWrapper = styled.div`
  display: flex;
  gap: 0.25rem;
  align-items: center;

  a {
    cursor: pointer;
    font-size: 0.75rem;
    font-weight: 500;
    padding: 0.3rem 0.6rem;
    border-radius: 6px;
    color: ${({ theme }) => theme.colors.gray9};
    font-family: 'SF Mono', 'Fira Code', monospace;
    transition: color 0.15s ease, background-color 0.15s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.gray12};
      background-color: ${({ theme }) => theme.colors.gray5};
    }

    &[data-active="true"] {
      font-weight: 700;
      color: ${({ theme }) =>
        theme.scheme === "dark" ? "var(--accent)" : theme.colors.gray12};
      background-color: ${({ theme }) =>
        theme.scheme === "dark" ? "var(--accent-dim)" : theme.colors.gray4};
    }
  }
`
