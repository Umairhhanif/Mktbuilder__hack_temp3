"use server";

import { client } from "@/sanity/lib/client";
import { Product } from "../../../../types/products";
import { groq } from "next-sanity";
import ProductPageComponent from "./ProductPageComponent";

async function getProduct(slug: string): Promise<Product> {
  return client.fetch(
    groq`*[_type == "product" && slug.current == $slug][0]{
    _id,
    productName,
    _type,
    image,
    price,
    description
    }`,
    { slug }
  );
}

export default async function Page({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);
  return <ProductPageComponent product={product} />;
}
