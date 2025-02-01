import { groq } from "next-sanity";

// Get all products
export const allproduct = groq`*[_type == "product"]`;

// Get first 4 products
export const four = groq`*[_type == "product"] [0..3]`;

// Get product suggestions based on search term
export const productSuggestions = groq`*[_type == "product" && (
  productName match $searchTerm + "*" ||
  category match $searchTerm + "*" ||
  description match $searchTerm + "*"
)] {
  _id,
  productName,
  category,
  price,
  "slug": slug.current,
  "imageUrl": image.asset->url
}[0...5]`;

// Get products by category
export const productsByCategory = groq`*[_type == "product" && category == $category] {
  _id,
  productName,
  category,
  price,
  "slug": slug.current,
  "imageUrl": image.asset->url
}`;

// Get featured products
export const featuredProducts = groq`*[_type == "product" && status == "featured"] {
  _id,
  productName,
  category,
  price,
  "slug": slug.current,
  "imageUrl": image.asset->url
}[0...8]`;

// Get related products
export const relatedProducts = groq`*[_type == "product" && category == $category && _id != $currentId] {
  _id,
  productName,
  category,
  price,
  "slug": slug.current,
  "imageUrl": image.asset->url
}[0...4]`;
