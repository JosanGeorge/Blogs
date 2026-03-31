import Link from "next/link"
import { CONFIG } from "site.config"
import { formatDate } from "src/libs/utils"
import Tag from "../../../components/Tag"
import { TPost } from "../../../types"
import Image from "next/image"
import Category from "../../../components/Category"
import styled from "@emotion/styled"

type Props = {
  data: TPost
}

const PostCard: React.FC<Props> = ({ data }) => {
  const category = (data.category && data.category?.[0]) || undefined

  return (
    <StyledWrapper href={`/${data.slug}`}>
      <article>
        {category && (
          <div className="category">
            <Category>{category}</Category>
          </div>
        )}
        {data.thumbnail && (
          <div className="thumbnail">
            <Image
              src={data.thumbnail}
              fill
              alt={data.title}
              css={{ objectFit: "cover" }}
            />
          </div>
        )}
        <div data-thumb={!!data.thumbnail} data-category={!!category} className="content">
          <header className="top">
            <h2>{data.title}</h2>
          </header>
          <div className="date">
            <span className="date-prefix">—</span>
            <div className="date-text">
              {formatDate(
                data?.date?.start_date || data.createdTime,
                CONFIG.lang
              )}
            </div>
          </div>
          <div className="summary">
            <p>{data.summary}</p>
          </div>
          <div className="tags">
            {data.tags &&
              data.tags.map((tag: string, idx: number) => (
                <Tag key={idx}>{tag}</Tag>
              ))}
          </div>
        </div>
      </article>
    </StyledWrapper>
  )
}

export default PostCard

const StyledWrapper = styled(Link)`
  display: block;

  article {
    overflow: hidden;
    position: relative;
    margin-bottom: 1rem;
    border-radius: var(--radius-card);

    /* Glassmorphism */
    background: ${({ theme }) =>
      theme.scheme === "dark"
        ? "linear-gradient(145deg, rgba(20,20,32,0.76) 0%, rgba(12,12,20,0.84) 100%)"
        : "rgba(255,255,255,0.85)"};
    backdrop-filter: blur(18px) saturate(150%);
    -webkit-backdrop-filter: blur(18px) saturate(150%);
    border: 1px solid ${({ theme }) =>
      theme.scheme === "dark" ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"};
    box-shadow: ${({ theme }) =>
      theme.scheme === "dark"
        ? "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)"
        : "0 4px 16px rgba(0,0,0,0.06)"};
    transition: border-color 0.22s ease, box-shadow 0.22s ease, transform 0.22s ease;

    @media (min-width: 768px) {
      margin-bottom: 1.25rem;
    }

    &:hover {
      border-color: ${({ theme }) =>
        theme.scheme === "dark" ? "rgba(0,229,160,0.25)" : theme.colors.gray8};
      box-shadow: ${({ theme }) =>
        theme.scheme === "dark"
          ? "0 0 0 1px rgba(0,229,160,0.15), 0 0 28px rgba(0,229,160,0.08), 0 12px 40px rgba(0,0,0,0.5)"
          : "0 8px 30px rgba(0,0,0,0.10)"};
      transform: translateY(-2px);
    }

    > .category {
      position: absolute;
      top: 1rem;
      left: 1rem;
      z-index: 10;
    }

    > .thumbnail {
      position: relative;
      width: 100%;
      background-color: ${({ theme }) => theme.colors.gray3};
      padding-bottom: 52%;
      overflow: hidden;

      @media (min-width: 1024px) {
        padding-bottom: 44%;
      }
    }

    > .content {
      padding: 1.25rem;

      &[data-thumb="false"] {
        padding-top: 2.75rem;
      }
      &[data-category="false"] {
        padding-top: 1.5rem;
      }

      > .top {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        @media (min-width: 768px) {
          flex-direction: row;
          align-items: baseline;
        }

        h2 {
          margin-bottom: 0.5rem;
          font-size: 1.05rem;
          line-height: 1.6rem;
          font-weight: 600;
          color: ${({ theme }) => theme.colors.gray12};
          cursor: pointer;
          transition: color 0.18s ease;

          @media (min-width: 768px) {
            font-size: 1.15rem;
            line-height: 1.7rem;
          }
        }
      }

      > .date {
        display: flex;
        margin-bottom: 0.75rem;
        gap: 0.4rem;
        align-items: center;

        .date-prefix {
          font-size: 0.8rem;
          color: ${({ theme }) =>
            theme.scheme === "dark" ? "var(--accent)" : theme.colors.gray8};
          font-family: monospace;
        }

        .date-text {
          font-size: 0.78rem;
          line-height: 1.25rem;
          color: ${({ theme }) => theme.colors.gray10};
          font-family: 'SF Mono', 'Fira Code', monospace;
          letter-spacing: 0.02em;
        }
      }

      > .summary {
        margin-bottom: 1rem;
        p {
          display: none;
          font-size: 0.875rem;
          line-height: 1.75rem;
          color: ${({ theme }) => theme.colors.gray10};

          @media (min-width: 768px) {
            display: block;
          }
        }
      }

      > .tags {
        display: flex;
        gap: 0.4rem;
        flex-wrap: wrap;
      }
    }
  }
`
