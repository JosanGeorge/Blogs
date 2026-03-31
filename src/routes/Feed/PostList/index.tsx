import { useRouter } from "next/router"
import React, { useMemo } from "react"
import PostCard from "src/routes/Feed/PostList/PostCard"
import { DEFAULT_CATEGORY } from "src/constants"
import usePostsQuery from "src/hooks/usePostsQuery"

type Props = {
  q: string
}

const PostList: React.FC<Props> = ({ q }) => {
  const router = useRouter()
  const data = usePostsQuery()

  const currentTag = `${router.query.tag || ``}` || undefined
  const currentCategory = `${router.query.category || ``}` || DEFAULT_CATEGORY
  const currentOrder = `${router.query.order || ``}` || "desc"

  const filteredPosts = useMemo(() => {
    let posts = data

    // keyword search
    posts = posts.filter((post) => {
      const tagContent = post.tags ? post.tags.join(" ") : ""
      const searchContent = post.title + post.summary + tagContent
      return searchContent.toLowerCase().includes(q.toLowerCase())
    })

    // tag filter
    if (currentTag) {
      posts = posts.filter(
        (post) => post && post.tags && post.tags.includes(currentTag)
      )
    }

    // category filter
    if (currentCategory !== DEFAULT_CATEGORY) {
      posts = posts.filter(
        (post) =>
          post && post.category && post.category.includes(currentCategory)
      )
    }

    // order
    if (currentOrder !== "desc") {
      posts = [...posts].reverse()
    }

    return posts
  }, [data, q, currentTag, currentCategory, currentOrder])

  return (
    <>
      <div className="my-2">
        {!filteredPosts.length && (
          <p className="text-gray-500 dark:text-gray-300">Nothing! 😺</p>
        )}
        {filteredPosts.map((post) => (
          <PostCard key={post.id} data={post} />
        ))}
      </div>
    </>
  )
}

export default PostList
