import { CONFIG } from "site.config"
import { NotionAPI } from "notion-client"
import { idToUuid } from "notion-utils"

import getPageProperties from "src/libs/utils/notion/getPageProperties"
import { TPosts } from "src/types"

// Module-level cache — avoids re-fetching the entire Notion database on every
// request during development (ISR revalidation handles freshness in production).
let _cachedPosts: TPosts | null = null
let _cacheTime = 0
const CACHE_TTL_MS = 60 * 1000 // 60 seconds

export const getPosts = async () => {
  const now = Date.now()
  if (_cachedPosts && now - _cacheTime < CACHE_TTL_MS) {
    return _cachedPosts
  }

  let id = CONFIG.notionConfig.pageId as string
  const api = new NotionAPI()

  const response = await api.getPage(id)
  // Guard: if NOTION_PAGE_ID is missing/wrong the API returns an empty response
  if (!response?.collection || !response?.block) return []

  id = idToUuid(id)
  // The Notion API wraps all data in an extra .value layer: actual data is at .value.value
  const collection = (Object.values(response.collection)[0] as any)?.value?.value
  const block = response.block
  const schema = collection?.schema

  const rawMetadata = (block[id] as any)?.value?.value

  // Verify this is a Notion database page
  if (
    rawMetadata?.type !== "collection_view_page" &&
    rawMetadata?.type !== "collection_view"
  ) {
    return []
  }

  // getPage's collection_query comes back empty — explicitly fetch page IDs
  const collectionId = rawMetadata.collection_id as string
  const viewId = (rawMetadata.view_ids as string[])?.[0]
  if (!collectionId || !viewId) return []

  const collectionData = await (api as any).getCollectionData(collectionId, viewId, { limit: 999 })
  const pageIds: string[] =
    collectionData?.result?.reducerResults?.collection_group_results?.blockIds ?? []

  if (pageIds.length === 0) return []

  // Merge block data from collectionData so getPageProperties can access all pages
  const mergedBlock = {
    ...block,
    ...(collectionData?.recordMap?.block ?? {}),
  }

  const data = []
  for (let i = 0; i < pageIds.length; i++) {
    const pageId = pageIds[i]
    const properties = (await getPageProperties(pageId, mergedBlock, schema)) || null
    if (!properties) continue
    properties.createdTime = new Date(
      (mergedBlock[pageId] as any)?.value?.value?.created_time
    ).toString()
    properties.fullWidth =
      ((mergedBlock[pageId] as any)?.value?.value?.format as any)?.page_full_width ?? false
    data.push(properties)
  }

  // Sort by date descending
  data.sort((a: any, b: any) => {
    const dateA: any = new Date(a?.date?.start_date || a.createdTime)
    const dateB: any = new Date(b?.date?.start_date || b.createdTime)
    return dateB - dateA
  })

  const posts = data as TPosts
  _cachedPosts = posts
  _cacheTime = Date.now()
  return posts
}
