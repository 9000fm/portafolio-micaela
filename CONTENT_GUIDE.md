# Adding Content to Sanity Studio

## Setup Instructions

1. **Create your Sanity project** (if you haven't already):
   - Go to https://www.sanity.io/manage
   - Create a new project named "portafolio-micaela"
   - Copy your Project ID

2. **Set up environment variables**:
   - Create a `.env.local` file in the root directory
   - Add:
     ```
     NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
     NEXT_PUBLIC_SANITY_DATASET=production
     NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
     ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Access Sanity Studio**:
   - Navigate to http://localhost:3000/studio
   - You'll be prompted to authenticate with Sanity

## Adding Placeholder Galleries

### Create 4-5 Galleries:

1. **Go to "Gallery (Proyectos)" in the sidebar**
2. **Click "Create new"**
3. **For each gallery, add:**
   - **Title**: Use names like "memoria", "retratos", "lugares", "archivos", "moda", "libre"
   - **Slug**: Auto-generated from title (or customize)
   - **Description**: Brief description of the project
   - **Year**: Year of the project (e.g., "2024")
   - **Cover Image**: Upload a main image for the gallery
   - **Gallery Images**: Add 2-3 placeholder images
     - For each image, add:
       - **Image**: Upload from Unsplash or Pexels (royalty-free)
       - **Alt Text**: Describe the image (required)
       - **Caption**: Optional caption

### Example Gallery Structure:

**Gallery 1: "memoria"**
- Title: memoria
- Description: A collection exploring memory and time
- Year: 2024
- Cover Image: [Main memory-themed photo]
- Gallery Images:
  - Image 1: [Memory photo 1] with alt text
  - Image 2: [Memory photo 2] with alt text

**Repeat for**: retratos, lugares, archivos, moda, libre

## Adding Biography

1. **Go to "Biography" in the sidebar**
2. **Click "Create new"**
3. **Add:**
   - **Heading**: Main heading for the biography
   - **Portrait Image**: Upload a portrait photo
   - **Content**: Rich text content (artist statement, bio, etc.)

## Tips for Placeholder Images

- Use Unsplash (https://unsplash.com) or Pexels (https://pexels.com)
- Search for photography-related terms: "portrait", "landscape", "artistic", "minimalist"
- Download high-quality images
- Ensure images are relevant to photography portfolio aesthetics

## Testing

After adding content:
1. Visit http://localhost:3000
2. Scroll through the galleries
3. Verify images load correctly
4. Test on mobile and tablet views
5. Check that the header stays fixed and footer appears at the bottom

