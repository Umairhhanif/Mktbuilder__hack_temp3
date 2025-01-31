import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

// Read-only client
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})
