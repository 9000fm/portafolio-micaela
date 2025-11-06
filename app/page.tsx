import { client } from '@/lib/sanity.client';
import { galleriesQuery } from '@/lib/sanity.queries';
import GallerySection from '@/components/GallerySection';

async function getGalleries() {
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
      {galleries.length > 0 ? (
        <GallerySection galleries={galleries} />
      ) : (
        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <p className="text-black/60">No galleries found. Add content in Sanity Studio at /studio</p>
        </section>
      )}
    </div>
  );
}
