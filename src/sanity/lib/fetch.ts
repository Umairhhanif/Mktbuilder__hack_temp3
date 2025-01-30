import { createClient } from "next-sanity";


const client = createClient({


    projectId: "p6gpa97n",
    dataset: "production",
    useCdn: true,
    apiVersion: "2023-10.10",

}) 

export async function sanityFetch<T>({ 
    query, 
    params = {} 
  }: { 
    query: string; 
    params?: Record<string, string | number | boolean | null | undefined> 
  }): Promise<T> {
      return await client.fetch<T>(query, params);
  }