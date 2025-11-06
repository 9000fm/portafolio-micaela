import imageUrlBuilder from '@sanity/image-url'
import { client } from './sanity.client'

const builder = imageUrlBuilder(client)

export function urlForImage(source: string) {
  return builder.image(source)
}

