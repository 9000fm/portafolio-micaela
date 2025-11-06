# Sanity CMS Setup Guide

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

### Getting Your Project ID

1. Go to https://www.sanity.io/manage
2. Sign in or create an account
3. Create a new project named "portafolio-micaela"
4. Copy the Project ID from the project settings
5. Paste it into your `.env.local` file

## Accessing Sanity Studio

Once the environment variables are set, run:

```bash
npm run dev
```

Then visit: http://localhost:3000/studio

## Content Structure

The CMS includes three document types:

1. **Photo** - Individual photos with title, image, alt text, and optional caption
2. **Gallery (Proyectos)** - Project galleries with title, description, year, cover image, and an array of gallery images
3. **Biography** - Biography content with heading, portrait image, and rich text content

