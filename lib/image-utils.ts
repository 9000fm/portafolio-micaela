import { urlForImage } from './sanity.image';

/**
 * Helper function to get image URL from Sanity image object
 * Handles various formats: string URLs, Sanity image objects, and references
 */
export function getImageUrl(image: any, width: number = 1920): string {
  if (!image) return '';
  
  // If it's already a full URL string, return it
  if (typeof image === 'string') {
    return image.startsWith('http') ? image : urlForImage(image).width(width).url();
  }
  
  // Handle Sanity image reference object
  if (image.asset) {
    return urlForImage(image).width(width).url();
  }
  
  // Handle Sanity image reference string
  if (image.asset?._ref || image._ref) {
    return urlForImage(image).width(width).url();
  }
  
  return '';
}

