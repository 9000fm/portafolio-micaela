import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

if (!projectId) {
  console.warn(
    '⚠️  Sanity project ID not found. Please set NEXT_PUBLIC_SANITY_PROJECT_ID in your .env.local file'
  )
}

export default defineConfig({
  name: 'portafolio-micaela',
  title: 'Portafolio Micaela',

  projectId: projectId || 'placeholder',
  dataset,

  basePath: '/studio',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})

