import Image from 'next/image';
import { client, isSanityConfigured } from '@/lib/sanity.client';
import { galleriesQuery } from '@/lib/sanity.queries';
import GallerySection from '@/components/GallerySection';
import Hero from '@/components/Hero';
import ProjectImage from '@/components/ProjectImage';

// Placeholder images - using Unsplash URLs for placeholder images
const placeholderImages = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80',
  'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1920&q=80',
];

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
      {/* Full-Screen Hero Section */}
      <Hero 
        imageUrl={placeholderImages[0]} 
        title="Featured Project" 
      />

      {/* Content Sections */}
      {!isSanityConfigured() ? (
        <section className="w-full bg-white py-20 lg:py-24">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
            <div className="bg-gray-50 p-6 rounded">
              <h2 className="text-lg font-medium mb-2 text-[#111]">Sanity CMS Not Configured</h2>
              <p className="text-sm text-[#111]/70 mb-4">
                To connect Sanity CMS, create a <code className="bg-gray-200 px-2 py-1 rounded">.env.local</code> file with:
              </p>
              <pre className="bg-black text-white p-4 rounded text-xs overflow-x-auto">
{`NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01`}
              </pre>
              <p className="text-xs text-[#111]/60 mt-4">
                See <code className="bg-gray-200 px-1 rounded">SANITY_SETUP.md</code> for detailed instructions.
              </p>
            </div>
          </div>
        </section>
      ) : galleries.length > 0 ? (
        <GallerySection galleries={galleries} />
      ) : (
        <section className="w-full bg-white py-20 lg:py-24">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
            <p className="text-[#111]/60">No galleries found. Add content in Sanity Studio at /studio</p>
          </div>
        </section>
      )}

      {/* Placeholder Image Sections */}
      <section className="w-full bg-white">
        <div className="space-y-0">
          {placeholderImages.slice(1).map((imageUrl, index) => (
            <ProjectImage
              key={index}
              imageUrl={imageUrl}
              title={`Project ${index + 2}`}
              alt={`Placeholder ${index + 2}`}
              priority={false}
              aspectRatio="h-screen"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
