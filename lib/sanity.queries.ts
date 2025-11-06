import { groq } from 'next-sanity'

export const galleriesQuery = groq`*[_type == "gallery"] | order(year desc) {
  _id,
  title,
  slug,
  description,
  year,
  coverImage,
  "coverImageUrl": coverImage.asset->url,
  gallery[] {
    "imageUrl": image.asset->url,
    alt,
    caption
  }
}`

export const galleryBySlugQuery = groq`*[_type == "gallery" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  year,
  coverImage,
  "coverImageUrl": coverImage.asset->url,
  gallery[] {
    "imageUrl": image.asset->url,
    alt,
    caption
  }
}`

export const biographyQuery = groq`*[_type == "biography"][0] {
  _id,
  heading,
  portrait,
  "portraitUrl": portrait.asset->url,
  content
}`

