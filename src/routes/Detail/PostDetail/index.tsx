import React, { useMemo } from "react"
import PostHeader from "./PostHeader"
import Footer from "./PostFooter"
import CommentBox from "./CommentBox"
import Category from "src/components/Category"
import styled from "@emotion/styled"
import NotionRenderer from "../components/NotionRenderer"
import TableOfContents, { TocHeading } from "../components/TableOfContents"
import usePostQuery from "src/hooks/usePostQuery"
import { getPageTableOfContents } from "notion-utils"

type Props = {}

const PostDetail: React.FC<Props> = () => {
  const data = usePostQuery()

  // Extract TOC headings directly from the Notion recordMap —
  // uses the same utility react-notion-x itself uses internally.
  const headings = useMemo(() => {
    if (!data?.recordMap?.block) return []
    const firstId = Object.keys(data.recordMap.block)[0]
    const pageBlock = data.recordMap.block[firstId]?.value
    if (!pageBlock) return []
    try {
      return getPageTableOfContents(pageBlock as any, data.recordMap) as TocHeading[]
    } catch {
      return []
    }
  }, [data?.recordMap])

  if (!data) return null

  const category = (data.category && data.category?.[0]) || undefined

  return (
    <>
      <StyledWrapper>
        <article>
          {category && (
            <div css={{ marginBottom: "0.5rem" }}>
              <Category readOnly={data.status?.[0] === "PublicOnDetail"}>
                {category}
              </Category>
            </div>
          )}
          {data.type[0] === "Post" && <PostHeader data={data} />}
          <div>
            <NotionRenderer recordMap={data.recordMap} />
          </div>
          {data.type[0] === "Post" && (
            <>
              <Footer />
              <CommentBox data={data} />
            </>
          )}
        </article>
      </StyledWrapper>
      {/* Fixed TOC sidebar — shown via CSS only on screens ≥ 82rem */}
      <TableOfContents headings={headings} />
    </>
  )
}

export default PostDetail

const StyledWrapper = styled.div`
  padding: 2.5rem 1.75rem 3.5rem;
  border-radius: var(--radius-card);
  max-width: 56rem;
  margin: 0 auto;

  /* Glassmorphism */
  background: ${({ theme }) =>
    theme.scheme === "dark"
      ? "linear-gradient(145deg, rgba(20,20,32,0.82) 0%, rgba(10,10,18,0.88) 100%)"
      : "rgba(255,255,255,0.88)"};
  backdrop-filter: blur(24px) saturate(160%);
  -webkit-backdrop-filter: blur(24px) saturate(160%);
  border: 1px solid ${({ theme }) =>
    theme.scheme === "dark" ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"};
  box-shadow: ${({ theme }) =>
    theme.scheme === "dark"
      ? "0 0 0 1px rgba(0,229,160,0.05), 0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)"
      : "0 8px 40px rgba(0,0,0,0.08)"};

  @media (min-width: 768px) {
    padding: 3.5rem 3rem 4rem;
  }

  > article {
    margin: 0 auto;
    max-width: 42rem;
  }
`
