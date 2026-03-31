import { CONFIG } from "site.config"
import Tag from "src/components/Tag"
import { TPost } from "src/types"
import { formatDate } from "src/libs/utils"
import Image from "next/image"
import React from "react"
import styled from "@emotion/styled"

type Props = {
  data: TPost
}

const PostHeader: React.FC<Props> = ({ data }) => {
  return (
    <StyledWrapper>
      <h1 className="title">{data.title}</h1>
      {data.type[0] !== "Paper" && (
        <nav>
          <div className="top">
            {data.author && data.author[0] && data.author[0].name && (
              <>
                <div className="author">
                  <Image
                    css={{ borderRadius: "50%" }}
                    src={data.author[0].profile_photo || CONFIG.profile.image}
                    alt="profile_photo"
                    width={24}
                    height={24}
                  />
                  <div className="">{data.author[0].name}</div>
                </div>
                <div className="hr"></div>
              </>
            )}
            <div className="date">
              {formatDate(
                data?.date?.start_date || data.createdTime,
                CONFIG.lang
              )}
            </div>
          </div>
          <div className="mid">
            {data.tags && (
              <div className="tags">
                {data.tags.map((tag: string) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            )}
          </div>
          {data.thumbnail && (
            <div className="thumbnail">
              <Image
                src={data.thumbnail}
                css={{ objectFit: "cover" }}
                fill
                alt={data.title}
              />
            </div>
          )}
        </nav>
      )}
    </StyledWrapper>
  )
}

export default PostHeader

const StyledWrapper = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray6};

  .title {
    font-size: 1.75rem;
    line-height: 2.4rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.gray12};
    letter-spacing: -0.02em;
    margin-bottom: 1.25rem;

    @media (min-width: 768px) {
      font-size: 2rem;
      line-height: 2.75rem;
    }
  }

  nav {
    color: ${({ theme }) => theme.colors.gray10};

    > .top {
      display: flex;
      margin-bottom: 1rem;
      gap: 0.75rem;
      align-items: center;

      .author {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        font-size: 0.875rem;
      }

      .hr {
        align-self: stretch;
        width: 1px;
        background-color: ${({ theme }) => theme.colors.gray6};
      }

      .date {
        font-size: 0.8rem;
        font-family: 'SF Mono', 'Fira Code', monospace;
        color: ${({ theme }) =>
          theme.scheme === "dark" ? "var(--accent)" : theme.colors.gray9};
        letter-spacing: 0.02em;
      }
    }

    > .mid {
      display: flex;
      margin-bottom: 1.25rem;
      align-items: center;

      .tags {
        display: flex;
        overflow-x: auto;
        flex-wrap: wrap;
        gap: 0.4rem;
        max-width: 100%;
      }
    }

    .thumbnail {
      overflow: hidden;
      position: relative;
      margin-bottom: 2rem;
      border-radius: var(--radius-card);
      width: 100%;
      background-color: ${({ theme }) => theme.colors.gray3};
      padding-bottom: 52%;
      border: 1px solid ${({ theme }) => theme.colors.gray6};

      @media (min-width: 1024px) {
        padding-bottom: 44%;
      }
    }
  }
`
