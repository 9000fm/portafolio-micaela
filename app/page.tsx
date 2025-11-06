import { client, isSanityConfigured } from '@/lib/sanity.client';
import { galleriesQuery } from '@/lib/sanity.queries';
import GallerySection from '@/components/GallerySection';

async function getGalleries() {
  if (!isSanityConfigured() || !client) {
    return [];
  }
  
  try {
    const galleries = await client.fetch(galleriesQuery);
    return galleries || [];
  } catch (error) {
    console.error('Error fetching galleries:', error);
    return [];
  }
}

export default async function Home() {
  const galleries = await getGalleries();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24 mb-32">
        <h1 className="text-4xl lg:text-6xl font-light tracking-tight text-black mb-8" style={{ fontFamily: 'var(--font-display)' }}>
          Micaela Lucia
        </h1>
      </section>

      {/* Galleries Section */}
      {!isSanityConfigured() ? (
        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="bg-gray-50 p-6 rounded">
            <h2 className="text-lg font-medium mb-2">Sanity CMS Not Configured</h2>
            <p className="text-sm text-black/70 mb-4">
              To connect Sanity CMS, create a <code className="bg-gray-200 px-2 py-1 rounded">.env.local</code> file with:
            </p>
            <pre className="bg-black text-white p-4 rounded text-xs overflow-x-auto">
{`NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01`}
            </pre>
            <p className="text-xs text-black/60 mt-4">
              See <code className="bg-gray-200 px-1 rounded">SANITY_SETUP.md</code> for detailed instructions.
            </p>
          </div>
        </section>
      ) : galleries.length > 0 ? (
        <GallerySection galleries={galleries} />
      ) : (
        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <p className="text-black/60">No galleries found. Add content in Sanity Studio at /studio</p>
        </section>
      )}
    </div>
  );
}
