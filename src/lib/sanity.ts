import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03', // use current date (YYYY-MM-DD) to target the latest API version
  useCdn: false, // set to `false` to bypass the edge cache
  token: process.env.SANITY_API_TOKEN // Only if you want to update content with the client
})
