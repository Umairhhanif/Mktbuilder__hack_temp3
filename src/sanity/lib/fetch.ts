import { createClient } from "next-sanity";


const client = createClient({


    projectId: "p6gpa97n",
    dataset: "production",
    useCdn: true,
    apiVersion: "2023-10.10",

}) 

export  async function  sanityFetch({query, params= {}}:{query: string, params?: any}) {
    return await client.fetch(query, params)
}