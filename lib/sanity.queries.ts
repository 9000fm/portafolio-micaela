import { groq } from 'next-sanity'

export const projectsQuery = groq`*[_type == "project"] | order(year desc) {
  _id,
  title,
  slug,
  description,
  year,
  featured,
  images[] {
    image,
    alt,
    caption
  }
}`

export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  year,
  featured,
  images[] {
    image,
    alt,
    caption
  }
}`

export const biographyQuery = groq`*[_type == "biography"][0] {
  _id,
  heading,
  portrait,
  content
}`

