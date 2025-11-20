import imageUrlBuilder from '@sanity/image-url'
import { client } from './sanity.client'

export function urlForImage(source: any) {
  if (!client) {
    throw new Error('Sanity client is not configured');
  }
  const builder = imageUrlBuilder(client)
  return builder.image(source)
}

