'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/solid';
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

const allPackages: TourPackage[] = [
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
  },
  {
    id: '6',
    title: 'EXTREME ZIPLINE',
    description: 'Vuela sobre la selva en las tirolesas más largas del Caribe. Una experiencia de adrenalina pura a 50 metros de altura.',
    price: 110,
    duration: '5 horas',
    maxParticipants: 15,
    location: 'Canopy Selvático',
    rating: 4.9,
    reviewCount: 320,
    imageUrl: '/images/jungle-adventure.jpg',
    highlights: ['Tirolesas', 'Altura', 'Adrenalina'],
    category: 'Extremo'
  },
  {
    id: '7',
    title: 'MAYA CULTURAL TOUR',
    description: 'Descubre los secretos de la civilización maya visitando ruinas ancestrales y participando en ceremonias tradicionales.',
    price: 85,
    duration: '9 horas',
    maxParticipants: 35,
    location: 'Zona Arqueológica',
    rating: 4.5,
    reviewCount: 540,
    imageUrl: '/images/cenote-experience.jpg',
    highlights: ['Historia', 'Cultura', 'Arqueología'],
    category: 'Cultural'
  },
  {
    id: '8',
    title: 'DEEP SEA DIVING',
    description: 'Sumérgete en las profundidades del mar Caribe y explora arrecifes de coral únicos con vida marina espectacular.',
    price: 150,
    duration: '6 horas',
    maxParticipants: 12,
    location: 'Arrecife de Coral',
    rating: 4.8,
    reviewCount: 280,
    imageUrl: '/images/hero-beach.jpg',
    highlights: ['Buceo', 'Arrecifes', 'Vida Marina'],
    category: 'Marino'
  },
  {
    id: '9',
    title: 'NIGHT JUNGLE SAFARI',
    description: 'Aventura nocturna por la selva tropical. Observa la vida silvestre en su hábitat natural bajo la luz de la luna.',
    price: 95,
    duration: '4 horas',
    maxParticipants: 18,
    location: 'Reserva Natural',
    rating: 4.7,
    reviewCount: 190,
    imageUrl: '/images/jungle-adventure.jpg',
    highlights: ['Nocturno', 'Safari', 'Vida Silvestre'],
    category: 'Aventura'
  },
  {
    id: '10',
    title: 'CENOTE CAVE DIVING',
    description: 'Explora las cuevas subacuáticas más impresionantes del mundo. Una experiencia única para buzos certificados.',
    price: 180,
    duration: '8 horas',
    maxParticipants: 8,
    location: 'Sistema de Cuevas',
    rating: 4.9,
    reviewCount: 150,
    imageUrl: '/images/cenote-experience.jpg',
    highlights: ['Cuevas', 'Buceo Técnico', 'Exclusivo'],
    category: 'Extremo'
  }
];

export default function AdventuresSection() {
  // Removemos el estado de categoría seleccionada ya que no habrá filtros
  // const [selectedCategory, setSelectedCategory] = useState('Todos');
  
  // Removemos el array de categorías
  // const categories = ['Todos', 'Acuático', 'Aventura', 'Extremo', 'Cultural', 'Marino'];
  
  // Simplificamos para mostrar todos los paquetes sin filtrado
  const packages = allPackages.slice(0, 8);

  return (
    <section id="aventuras" className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-green-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-green-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-orange-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-full lg:max-w-[85%] xl:max-w-[80%] 2xl:max-w-[75%] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
              Todas Nuestras
            </span>
            <br />
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Aventuras
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Descubre experiencias únicas en la Riviera Maya. Desde aventuras extremas hasta 
            relajantes encuentros con la naturaleza.
          </p>
        </div>

        {/* Removemos completamente la sección de filtros de categorías */}
        {/* Category Filter - ELIMINADO */}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg border border-blue-100">
            <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">10+</div>
            <div className="text-sm md:text-base text-gray-600">Aventuras Únicas</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg border border-green-100">
            <div className="text-2xl md:text-3xl font-bold text-green-600 mb-1">50K+</div>
            <div className="text-sm md:text-base text-gray-600">Aventureros Felices</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg border border-orange-100">
            <div className="text-2xl md:text-3xl font-bold text-orange-500 mb-1">4.8★</div>
            <div className="text-sm md:text-base text-gray-600">Calificación Promedio</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg border border-teal-100">
            <div className="text-2xl md:text-3xl font-bold text-teal-600 mb-1">100%</div>
            <div className="text-sm md:text-base text-gray-600">Diversión Garantizada</div>
          </div>
        </div>
        
        {/* Grid de paquetes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {packages.map((pkg, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 h-full flex flex-col">
              {/* Category Badge */}
              <div className="relative">
                <div className="absolute top-4 left-4 z-10">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${
                    pkg.category === 'Aventura' ? 'bg-green-500' :
                    pkg.category === 'Marino' ? 'bg-blue-500' :
                    pkg.category === 'Acuático' ? 'bg-cyan-500' :
                    pkg.category === 'Cultural' ? 'bg-purple-500' :
                    pkg.category === 'Extremo' ? 'bg-red-500' :
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

                {/* Highlights */}
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

                {/* Price and Button */}
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
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              ¿No encuentras lo que buscas?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Creamos experiencias personalizadas según tus preferencias y necesidades
            </p>
            <Link 
              href="/contacto"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-green-600 font-medium rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Solicitar Tour Personalizado
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}