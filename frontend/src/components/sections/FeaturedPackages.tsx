'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { StarIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { ClockIcon, UsersIcon, MapPinIcon } from '@heroicons/react/24/outline';

interface TourPackage {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  maxParticipants: number;
  location: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  highlights: string[];
  category: string;
}

// Paquetes de ejemplo (luego los reemplazaremos con las fotos reales)
const examplePackages: TourPackage[] = [
  {
    id: '1',
    title: 'FULL ADMISSION',
    description: 'Acceso completo a todas las atracciones del parque acuático. Disfruta de cenotes cristalinos, tirolesas y aventuras extremas.',
    price: 89,
    duration: 'Todo el día',
    maxParticipants: 50,
    location: 'Riviera Maya',
    rating: 4.8,
    reviewCount: 1250,
    imageUrl: '/images/cenote-experience.jpg',
    highlights: ['Cenotes', 'Tirolesas', 'Snorkel'],
    category: 'Acuático'
  },
  {
    id: '2',
    title: 'FULL ADMISSION + BUGGY',
    description: 'La aventura completa más emocionante experiencia en buggy por la selva maya. Adrenalina pura en la naturaleza.',
    price: 129,
    duration: 'Todo el día',
    maxParticipants: 30,
    location: 'Selva Maya',
    rating: 4.9,
    reviewCount: 890,
    imageUrl: '/images/jungle-adventure.jpg',
    highlights: ['Buggy', 'Selva', 'Aventura'],
    category: 'Extremo'
  },
  {
    id: '3',
    title: 'CENOTE EXPERIENCE',
    description: 'Sumérgete en las aguas cristalinas de los cenotes sagrados mayas. Una experiencia mística y refrescante.',
    price: 65,
    duration: '6 horas',
    maxParticipants: 25,
    location: 'Cenotes Sagrados',
    rating: 4.7,
    reviewCount: 650,
    imageUrl: '/images/cenote-experience.jpg',
    highlights: ['Cenotes', 'Snorkel', 'Historia Maya'],
    category: 'Cultural'
  },
  {
    id: '4',
    title: 'JUNGLE ADVENTURE',
    description: 'Explora la selva tropical en una aventura épica. Tirolesas, rappel y encuentros con la vida silvestre.',
    price: 95,
    duration: '8 horas',
    maxParticipants: 20,
    location: 'Selva Tropical',
    rating: 4.8,
    reviewCount: 420,
    imageUrl: '/images/jungle-adventure.jpg',
    highlights: ['Tirolesas', 'Rappel', 'Vida Silvestre'],
    category: 'Aventura'
  },
  {
    id: '5',
    title: 'BEACH & REEF',
    description: 'Combina playa paradisíaca con snorkel en arrecifes de coral. La perfecta mezcla de relajación y aventura.',
    price: 75,
    duration: '7 horas',
    maxParticipants: 40,
    location: 'Arrecife Mesoamericano',
    rating: 4.6,
    reviewCount: 780,
    imageUrl: '/images/hero-beach.jpg',
    highlights: ['Playa', 'Snorkel', 'Arrecife'],
    category: 'Marino'
  }
];

export default function FeaturedPackages() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [packages] = useState<TourPackage[]>(examplePackages);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-scroll del carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % packages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [packages.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % packages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + packages.length) % packages.length);
  };

  const getVisibleCards = () => {
    if (isMobile) return 1;
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024 ? 3 : 2;
    }
    return 2; // Valor por defecto para server-side rendering
  };

  return (
    <section className="py-16 pb-32 lg:pb-48 xl:pb-64 bg-gradient-to-br from-blue-50 to-green-50">
      {/* Contenedor principal más ancho */}
      <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-6 xl:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Aventuras Destacadas
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubre experiencias únicas diseñadas para crear recuerdos inolvidables.
          </p>
        </div>

        <div className="relative">
          {/* Navigation Buttons - Ajustados para el nuevo ancho */}
          <button
            onClick={prevSlide}
            className="absolute left-1 lg:left-2 xl:left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-1 lg:right-2 xl:right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>

          {/* Carousel Container - Sin márgenes internos para usar todo el espacio */}
          <div className="overflow-hidden rounded-2xl mx-1 lg:mx-2 xl:mx-4">
            <div 
              className="flex transition-transform duration-500 ease-in-out gap-2 lg:gap-3 xl:gap-4"
              style={{ transform: `translateX(-${currentIndex * (100 / getVisibleCards())}%)` }}
            >
              {packages.map((pkg, index) => (
                <div 
                  key={index} 
                  className={`flex-shrink-0 ${
                    getVisibleCards() === 1 ? 'w-full' : 
                    getVisibleCards() === 2 ? 'w-1/2' : 
                    'w-1/3'
                  } px-1 lg:px-2 xl:px-3`}
                >
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 h-full flex flex-col">
                    {/* Category Badge */}
                    <div className="relative">
                      <div className="absolute top-4 left-4 z-10">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${
                          pkg.category === 'Aventura' ? 'bg-green-500' :
                          pkg.category === 'Marino' ? 'bg-blue-500' :
                          pkg.category === 'Acuático' ? 'bg-cyan-500' :
                          pkg.category === 'Cultural' ? 'bg-purple-500' :
                          'bg-orange-500'
                        }`}>
                          {pkg.category}
                        </span>
                      </div>
                      
                      {/* Rating Badge */}
                      <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                        <StarIcon className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm font-medium text-gray-900">{pkg.rating}</span>
                        <span className="text-xs text-gray-600">({pkg.reviewCount})</span>
                      </div>

                      {/* Package Image */}
                      <div className="h-48 sm:h-56 bg-gray-200 relative overflow-hidden">
                        <Image
                          src={pkg.imageUrl}
                          alt={pkg.title}
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-105"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/images/placeholder-tour.jpg';
                          }}
                        />
                      </div>
                    </div>

                    {/* Package Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      {/* Package Details */}
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <ClockIcon className="w-4 h-4" />
                          <span>{pkg.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <UsersIcon className="w-4 h-4" />
                          <span>Máx. {pkg.maxParticipants}</span>
                        </div>
                      </div>

                      {/* Title and Location */}
                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                        {pkg.title}
                      </h3>
                      
                      <div className="flex items-center gap-1 text-gray-600 mb-3">
                        <MapPinIcon className="w-4 h-4" />
                        <span className="text-sm">{pkg.location}</span>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-1">
                        {pkg.description}
                      </p>

                      {/* Highlights - Con más espaciado arriba y abajo */}
                      <div className="flex flex-wrap gap-2 mb-6 mt-2">
                        {pkg.highlights.slice(0, 3).map((highlight, idx) => (
                          <span 
                            key={idx}
                            className="px-3 py-2 bg-green-100 text-green-700 text-xs rounded-full"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>

                      {/* Price and Button - También con más espaciado */}
                      <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100">
                        <div>
                          <span className="text-2xl font-bold text-green-600">
                            ${pkg.price}
                          </span>
                          <span className="text-sm text-gray-600 ml-1">por persona</span>
                        </div>
                        <Link 
                          href={`/paquete/${pkg.id}`}
                          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-2 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap text-sm lg:text-base lg:px-6 lg:py-3"
                        >
                          Reservar Ahora
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ver Todas las Aventuras Button */}
        <div className="text-center mt-16 lg:mt-20 xl:mt-24">
          <Link
            href="/aventuras"
            className="inline-flex items-center justify-center px-8 py-3 border-2 border-green-500 text-green-600 font-medium rounded-full hover:bg-green-500 hover:text-white transition-all duration-300"
          >
            Ver Todas las Aventuras
          </Link>
        </div>
      </div>
    </section>
  );
}