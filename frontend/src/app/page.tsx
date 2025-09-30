"use client";

import TestimonialsSection from "@/components/sections/TestimonialsSecion";
import ExploreCategories from "@/components/sections/ExploreCategories";
import FeaturedPackages from "@/components/sections/FeaturedPackages";
import BenefitsSection from "@/components/sections/BenefitsSection";
import HeroSection from "@/components/sections/HeroSection";
import WhySection from "@/components/sections/WhySection";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <HeroSection />
      <FeaturedPackages />
      <ExploreCategories />
      <WhySection />
      <BenefitsSection />
      <TestimonialsSection />
    </div>
  );
}
