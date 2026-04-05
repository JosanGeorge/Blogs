import { NotionAPI } from "notion-client"
import { ExtendedRecordMap } from "notion-types"

/**
 * The Notion API (via notion-client) now wraps every record in an extra layer:
 *   block[id] = { spaceId, value: { role, value: { ...actualData } } }
 *
 * react-notion-x expects the standard single-nesting:
 *   block[id] = { role, value: { ...actualData } }
 *
 * This normalizer collapses the extra layer so react-notion-x can render correctly.
 */
function normalizeRecordMap(recordMap: ExtendedRecordMap): ExtendedRecordMap {
  if (!recordMap) return recordMap

  // Normalize blocks
  if (recordMap.block) {
    const normalizedBlock: typeof recordMap.block = {}
    for (const [id, entry] of Object.entries(recordMap.block)) {
      const e = entry as any
      if (e?.value?.role !== undefined && e?.value?.value !== undefined) {
        // Double-nested → flatten to { role, value: actualData }
        // Only include spaceId if it is actually defined (undefined breaks JSON serialization)
        normalizedBlock[id] = {
          role: e.value.role,
          value: e.value.value,
          ...(e.spaceId != null ? { spaceId: e.spaceId } : {}),
        } as any
      } else {
        normalizedBlock[id] = entry
      }
    }
    recordMap = { ...recordMap, block: normalizedBlock }
  }

  // Normalize collection (same double-nesting pattern)
  if (recordMap.collection) {
    const normalizedCollection: typeof recordMap.collection = {}
    for (const [id, entry] of Object.entries(recordMap.collection)) {
      const e = entry as any
      if (e?.value?.role !== undefined && e?.value?.value !== undefined) {
        normalizedCollection[id] = {
          role: e.value.role,
          value: e.value.value,
          ...(e.spaceId != null ? { spaceId: e.spaceId } : {}),
        } as any
      } else {
        normalizedCollection[id] = entry
      }
    }
    recordMap = { ...recordMap, collection: normalizedCollection }
  }

  return recordMap
}

export const getRecordMap = async (pageId: string) => {
  const api = new NotionAPI()
  const recordMap = await api.getPage(pageId)
  const normalized = normalizeRecordMap(recordMap)
  // JSON round-trip strips every `undefined` value so Next.js serialization never throws
  return JSON.parse(JSON.stringify(normalized))
}
