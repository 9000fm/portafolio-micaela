import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

// Only create client if projectId is configured
export const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false, // Set to false if statically generating pages, using ISR or using the on-demand revalidation API
    })
  : null

// Helper to check if Sanity is configured
export function isSanityConfigured(): boolean {
  return !!projectId
}

