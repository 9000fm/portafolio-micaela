# How CMS Integration Works (Sanity + Next.js)

This document explains the process of integrating a headless CMS like Sanity with Next.js.

## Overview

A **headless CMS** is a content management system that separates content storage from presentation. Instead of managing content and website design in one place, you:
1. **Store content** in Sanity (the CMS)
2. **Display content** in your Next.js website (the frontend)

## The Integration Process

### 1. **Content Structure (Schemas)**
   - **Location**: `sanity/schemas/`
   - **Purpose**: Define what types of content you can store (like "Gallery", "Photo", "Biography")
   - **How it works**: Each schema defines fields (title, image, description, etc.) that editors will fill in
   - **Example**: The `gallery.ts` schema defines that a gallery has: title, slug, description, year, coverImage, and an array of gallery images

### 2. **Content Studio (Sanity Studio)**
   - **Location**: Embedded at `/studio` route (`app/studio/[[...index]]/page.tsx`)
   - **Purpose**: Admin interface where you add/edit content
   - **How it works**: 
     - Sanity Studio reads your schemas
     - Creates forms based on those schemas
     - Saves content to Sanity's cloud database
   - **Access**: Go to http://localhost:3000/studio after setting up environment variables

### 3. **Client Connection**
   - **Location**: `lib/sanity.client.ts`
   - **Purpose**: Connects your Next.js app to Sanity's API
   - **How it works**:
     - Uses your Project ID and Dataset to authenticate
     - Provides functions to fetch data from Sanity
     - Similar to connecting to any API, but specifically for Sanity

### 4. **Data Queries**
   - **Location**: `lib/sanity.queries.ts`
   - **Purpose**: Define what data to fetch from Sanity
   - **How it works**:
     - Uses GROQ (Sanity's query language, like SQL for databases)
     - Queries specify: "Get all galleries, ordered by year"
     - Returns structured data ready for your components

### 5. **Display Content**
   - **Location**: `app/page.tsx` and `components/GallerySection.tsx`
   - **Purpose**: Fetch and render content from Sanity
   - **How it works**:
     - Server Component (`page.tsx`) fetches data using the client and queries
     - Passes data to Client Components (`GallerySection.tsx`) for rendering
     - Updates automatically when content changes in Sanity

## The Flow

```
1. Content Editor → Opens /studio
2. Adds content → Saves to Sanity cloud database
3. Next.js app → Fetches data via sanity.client.ts
4. Uses queries → Gets specific content (galleries, etc.)
5. Renders → Displays in GallerySection component
6. User sees → Content on website
```

## Key Concepts

### Environment Variables
- **Why**: Keep sensitive data (Project ID) out of code
- **Where**: `.env.local` (not committed to Git)
- **What**: Project ID tells Sanity which database to use

### Server vs Client Components
- **Server Components** (`app/page.tsx`): Fetch data, run on server
- **Client Components** (`components/GallerySection.tsx`): Handle interactions, animations

### Image Optimization
- **Why**: Sanity images are large, need optimization
- **How**: `@sanity/image-url` builder + Next.js Image component
- **Result**: Fast-loading, responsive images

## Benefits of This Approach

1. **Separation of Concerns**: Designers edit content without touching code
2. **Performance**: Content cached and optimized automatically
3. **Flexibility**: Change content without redeploying site
4. **Type Safety**: TypeScript ensures data structure matches schemas
5. **Scalability**: Sanity handles hosting, backups, CDN for images

## Common Workflow

1. **Development**: Create schemas, build components
2. **Content Creation**: Add content in Studio
3. **Deployment**: Site automatically uses latest content
4. **Updates**: Edit content in Studio, changes appear on site

This architecture allows non-technical users to manage content while developers focus on design and functionality.

