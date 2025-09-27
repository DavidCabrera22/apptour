'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PlayIcon } from '@heroicons/react/24/outline';

const heroImages = [
  '/images/hero-beach.jpg', // Tu imagen principal de playa paradisíaca
  '/images/hero-adventure.jpg', // Aventura en la naturaleza
  '/images/hero-cenote.jpg', // Cascadas y cenotes
];

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 6000); // Cambio cada 6 segundos para apreciar mejor la imagen
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-24">
      {/* Background Images with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-2000 ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat transform scale-105 hover:scale-110 transition-transform duration-[10000ms]"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), url(${image})`,
                backgroundAttachment: 'fixed', // Efecto parallax
              }}
            />
          </div>
        ))}
      </div>

      {/* Overlay con gradiente más fuerte para mejor legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50 z-5" />

      {/* Content - Ajustado para móvil y desktop */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 max-w-6xl mx-auto mt-8 sm:mt-12">
        <div className="mb-6 sm:mb-8">
          {/* Título más visible con mejor contraste y responsive */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 leading-tight">
            <span className="block text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] filter brightness-110">
              ¡Bienvenido a
            </span>
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] filter brightness-125">
              AppTour!
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 leading-relaxed max-w-4xl mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] text-gray-100 px-2">
            Donde la naturaleza se une con la aventura y tus vacaciones acaban de recibir una mejora épica. 
            Descubre playas paradisíacas, aguas cristalinas y experiencias únicas en los destinos más espectaculares del Caribe.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16">
          <Link
            href="/paquetes"
            className="group relative px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500 text-white font-bold rounded-full text-lg sm:text-xl shadow-2xl hover:from-cyan-600 hover:via-blue-600 hover:to-emerald-600 transition-all duration-500 transform hover:scale-110 hover:shadow-cyan-500/25 w-full sm:w-auto"
          >
            <span className="relative z-10 flex items-center justify-center space-x-2">
              <span>🏖️ Explorar Paraísos</span>
            </span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-600 via-blue-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
          </Link>
          
          <button className="group flex items-center justify-center space-x-3 px-8 sm:px-10 py-4 sm:py-5 border-2 sm:border-3 border-white/80 text-white font-bold rounded-full text-lg sm:text-xl hover:bg-white/20 hover:border-white backdrop-blur-sm transition-all duration-500 transform hover:scale-105 w-full sm:w-auto">
            <PlayIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>🎥 Ver Video</span>
          </button>
        </div>

        {/* Stats con tema playero - Responsive grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
          <div className="text-center backdrop-blur-sm bg-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-cyan-300 mb-1 sm:mb-2">15+</div>
            <div className="text-xs sm:text-sm md:text-base opacity-90">🏝️ Destinos Paradisíacos</div>
          </div>
          <div className="text-center backdrop-blur-sm bg-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-300 mb-1 sm:mb-2">100K+</div>
            <div className="text-xs sm:text-sm md:text-base opacity-90">🌊 Aventureros Felices</div>
          </div>
          <div className="text-center backdrop-blur-sm bg-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-300 mb-1 sm:mb-2">100%</div>
            <div className="text-xs sm:text-sm md:text-base opacity-90">☀️ Diversión Garantizada</div>
          </div>
          <div className="text-center backdrop-blur-sm bg-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-teal-300 mb-1 sm:mb-2">24/7</div>
            <div className="text-xs sm:text-sm md:text-base opacity-90">🏖️ Soporte</div>
          </div>
        </div>

        {/* Características destacadas - Responsive */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-16 sm:mb-20">
          <span className="px-4 sm:px-6 py-2 sm:py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold border border-white/30 text-sm sm:text-base">
            🏊‍♂️ Aguas Cristalinas
          </span>
          <span className="px-4 sm:px-6 py-2 sm:py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold border border-white/30 text-sm sm:text-base">
            🌴 Playas Vírgenes
          </span>
          <span className="px-4 sm:px-6 py-2 sm:py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold border border-white/30 text-sm sm:text-base">
            🐠 Vida Marina
          </span>
          <span className="px-4 sm:px-6 py-2 sm:py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold border border-white/30 text-sm sm:text-base">
            🏄‍♀️ Deportes Acuáticos
          </span>
        </div>
      </div>

      {/* Image Indicators mejorados - Responsive */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2 sm:space-x-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-500 border-2 ${
              index === currentImage 
                ? 'bg-cyan-400 border-cyan-400 scale-125 shadow-lg shadow-cyan-400/50' 
                : 'bg-white/30 border-white/50 hover:bg-white/50 hover:border-white/70'
            }`}
            onClick={() => setCurrentImage(index)}
          />
        ))}
      </div>

      {/* Floating elements para dar más vida - Ocultos en móvil */}
      <div className="hidden sm:block absolute top-20 left-10 animate-float">
        <div className="w-4 h-4 bg-cyan-300/30 rounded-full blur-sm"></div>
      </div>
      <div className="hidden sm:block absolute top-40 right-20 animate-float-delayed">
        <div className="w-6 h-6 bg-blue-300/20 rounded-full blur-sm"></div>
      </div>
      <div className="hidden sm:block absolute bottom-40 left-20 animate-float">
        <div className="w-3 h-3 bg-emerald-300/40 rounded-full blur-sm"></div>
      </div>
    </section>
  );
}