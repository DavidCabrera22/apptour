import HeroSection from '@/components/sections/HeroSection';
import FeaturedPackages from '@/components/sections/FeaturedPackages';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedPackages />
      {/* Más secciones se agregarán aquí */}
    </div>
  );
}
