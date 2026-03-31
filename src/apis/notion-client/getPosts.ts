import { CONFIG } from "site.config"
import { NotionAPI } from "notion-client"
import { idToUuid } from "notion-utils"

import getAllPageIds from "src/libs/utils/notion/getAllPageIds"
import getPageProperties from "src/libs/utils/notion/getPageProperties"
import { TPosts } from "src/types"

/**
 * @param {{ includePages: boolean }} - false: posts only / true: include pages
 */

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
  id = idToUuid(id)
  // The Notion API returns an extra nesting layer: block[id].value.value is the actual block
  const collection = Object.values(response.collection)[0]?.value?.value
  const block = response.block
  const schema = collection?.schema

  const rawMetadata = (block[id] as any)?.value?.value

  // Check Type
  if (
    rawMetadata?.type !== "collection_view_page" &&
    rawMetadata?.type !== "collection_view"
  ) {
    return []
  } else {
    // Construct Data
    const pageIds = getAllPageIds(response)
    const data = []
    for (let i = 0; i < pageIds.length; i++) {
      const id = pageIds[i]
      const properties = (await getPageProperties(id, block, schema)) || null
      // Add fullwidth, createdtime to properties
      properties.createdTime = new Date(
        (block[id] as any)?.value?.value?.created_time
      ).toString()
      properties.fullWidth =
        ((block[id] as any)?.value?.value?.format as any)?.page_full_width ?? false

      data.push(properties)
    }

    // Sort by date
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
}
