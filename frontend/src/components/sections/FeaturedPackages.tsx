
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  StarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import { ClockIcon, UsersIcon, MapPinIcon } from "@heroicons/react/24/outline";

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

const examplePackages: TourPackage[] = [
  {
    id: "1",
    title: "FULL ADMISSION",
    description:
      "Acceso completo a todas las atracciones del parque acuático. Disfruta de cenotes cristalinos, tirolesas y aventuras extremas.",
    price: 89,
    duration: "Todo el día",
    maxParticipants: 50,
    location: "Riviera Maya",
    rating: 4.8,
    reviewCount: 1250,
    imageUrl: "/images/cenote-experience.jpg",
    highlights: ["Cenotes", "Tirolesas", "Snorkel"],
    category: "Acuático",
  },
  {
    id: "2",
    title: "FULL ADMISSION + BUGGY",
    description:
      "La aventura completa más emocionante experiencia en buggy por la selva maya. Adrenalina pura en la naturaleza.",
    price: 129,
    duration: "Todo el día",
    maxParticipants: 30,
    location: "Selva Maya",
    rating: 4.9,
    reviewCount: 890,
    imageUrl: "/images/jungle-adventure.jpg",
    highlights: ["Buggy", "Selva", "Aventura"],
    category: "Extremo",
  },
  {
    id: "3",
    title: "CENOTE EXPERIENCE",
    description:
      "Sumérgete en las aguas cristalinas de los cenotes sagrados mayas. Una experiencia mística y refrescante.",
    price: 65,
    duration: "6 horas",
    maxParticipants: 25,
    location: "Cenotes Sagrados",
    rating: 4.7,
    reviewCount: 650,
    imageUrl: "/images/cenote-experience.jpg",
    highlights: ["Cenotes", "Snorkel", "Historia Maya"],
    category: "Cultural",
  },
  {
    id: "4",
    title: "JUNGLE ADVENTURE",
    description:
      "Explora la selva tropical en una aventura épica. Tirolesas, rappel y encuentros con la vida silvestre.",
    price: 95,
    duration: "8 horas",
    maxParticipants: 20,
    location: "Selva Tropical",
    rating: 4.8,
    reviewCount: 420,
    imageUrl: "/images/jungle-adventure.jpg",
    highlights: ["Tirolesas", "Rappel", "Vida Silvestre"],
    category: "Aventura",
  },
  {
    id: "5",
    title: "BEACH & REEF",
    description:
      "Combina playa paradisíaca con snorkel en arrecifes de coral. La perfecta mezcla de relajación y aventura.",
    price: 75,
    duration: "7 horas",
    maxParticipants: 40,
    location: "Arrecife Mesoamericano",
    rating: 4.6,
    reviewCount: 780,
    imageUrl: "/images/hero-beach.jpg",
    highlights: ["Playa", "Snorkel", "Arrecife"],
    category: "Marino",
  },
];

export default function FeaturedPackages() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [packages] = useState<TourPackage[]>(examplePackages);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isInteractingRef = useRef(false);

  const [slideWidthPx, setSlideWidthPx] = useState(0);
  const [gapPx, setGapPx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [maxIndex, setMaxIndex] = useState(Math.max(packages.length - 3, 0));

  const computeVisibleCount = useCallback(() => {
    if (typeof window === "undefined") return 2;
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth >= 1024) return 3;
    return 2;
  }, []);

  const updateLayout = useCallback(() => {
    const vc = computeVisibleCount();

    const container = containerRef.current;
    const track = trackRef.current;

    const containerWidth = container ? container.clientWidth : 0;

    const computedGap =
      track && window.getComputedStyle(track).gap
        ? parseFloat(window.getComputedStyle(track).gap)
        : 0;
    const totalGaps = computedGap * Math.max(vc - 1, 0);
    const widthPerSlide =
      containerWidth && vc ? Math.floor((containerWidth - totalGaps) / vc) : 0;

    setSlideWidthPx(widthPerSlide);
    setGapPx(computedGap);

    const newMaxIndex = Math.max(packages.length - vc, 0);
    setMaxIndex(newMaxIndex);

    setCurrentIndex((prev) => (prev > newMaxIndex ? newMaxIndex : prev));
  }, [computeVisibleCount, packages.length]);

  useEffect(() => {
    updateLayout();
    const onResize = () => updateLayout();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [updateLayout]);

  // pausa y reanuda auto-scroll
  const pauseAutoScroll = (ms = 4000) => {
    isInteractingRef.current = true;
    setIsPaused(true);
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      isInteractingRef.current = false;
      setIsPaused(false);
      resumeTimeoutRef.current = null;
    }, ms);
  };

  const nextSlide = () => {
    if (maxIndex <= 0) return;
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
    pauseAutoScroll();
  };

  const prevSlide = () => {
    if (maxIndex <= 0) return;
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
    pauseAutoScroll();
  };

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (isPaused || maxIndex <= 0) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPaused, maxIndex]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
    isInteractingRef.current = true;
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      isInteractingRef.current = false;
      setIsPaused(false);
      resumeTimeoutRef.current = null;
    }, 1500);
  };

  const handleTouchStart = () => handleMouseEnter();
  const handleTouchEnd = () => handleMouseLeave();

  // movimiento en pixeles (ancho por slide + gap)
  const translateX = -currentIndex * (slideWidthPx + gapPx);
  const effectiveTranslate = maxIndex <= 0 ? 0 : translateX;
  const itemStyle = { width: slideWidthPx ? `${slideWidthPx}px` : undefined };

  return (
    <section className="py-12 lg:py-16 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-full mx-auto px-4 md:px-6 lg:px-10 xl:px-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            Aventuras Destacadas
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubre experiencias únicas diseñadas para crear recuerdos
            inolvidables.
          </p>
        </div>

        <div className="relative">
          <button
            onClick={prevSlide}
            disabled={maxIndex <= 0}
            aria-label="Anterior"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-30 bg-white shadow-md rounded-full p-3 border border-gray-100 hover:scale-105 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeftIcon className="w-5 h-5 text-gray-700" />
          </button>

          <button
            onClick={nextSlide}
            disabled={maxIndex <= 0}
            aria-label="Siguiente"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-30 bg-white shadow-md rounded-full p-3 border border-gray-100 hover:scale-105 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronRightIcon className="w-5 h-5 text-gray-700" />
          </button>

          <div
            ref={containerRef}
            className="overflow-hidden rounded-2xl mx-0 lg:mx-2 xl:mx-4 py-14"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              ref={trackRef}
              className="flex transition-transform duration-500 ease-in-out gap-3 md:gap-4 lg:gap-6"
              style={{
                transform: `translateX(${effectiveTranslate}px)`,
                transformStyle: "preserve-3d",
                whiteSpace: "nowrap",
              }}
            >
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="flex-shrink-0 px-1 md:px-2"
                  style={itemStyle}
                >
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 h-full flex flex-col min-h-[470px]">
                    <div className="relative">
                      <div className="absolute top-4 left-4 z-10">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium text-white ${
                            pkg.category === "Aventura"
                              ? "bg-green-500"
                              : pkg.category === "Marino"
                              ? "bg-blue-500"
                              : pkg.category === "Acuático"
                              ? "bg-cyan-500"
                              : pkg.category === "Cultural"
                              ? "bg-purple-500"
                              : "bg-orange-500"
                          }`}
                        >
                          {pkg.category}
                        </span>
                      </div>

                      <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1 border border-gray-100">
                        <StarIcon className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm font-medium text-gray-900">
                          {pkg.rating}
                        </span>
                        <span className="text-xs text-gray-600">
                          ({pkg.reviewCount})
                        </span>
                      </div>

                      <div className="h-48 sm:h-56 bg-gray-100 relative overflow-hidden">
                        <Image
                          src={pkg.imageUrl}
                          alt={pkg.title}
                          fill
                          className="object-cover object-center transition-transform duration-300 hover:scale-105"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/images/placeholder-tour.jpg";
                          }}
                        />
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
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

                      <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                        {pkg.title}
                      </h3>

                      <div className="flex items-center gap-1 text-gray-600 mb-3">
                        <MapPinIcon className="w-4 h-4" />
                        <span className="text-sm">{pkg.location}</span>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                        {pkg.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-5 mt-1">
                        {pkg.highlights.slice(0, 3).map((highlight, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-green-50 text-green-700 text-xs rounded-full border border-green-100"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                        <div>
                          <span className="text-2xl font-bold text-green-600">
                            ${pkg.price}
                          </span>
                          <span className="text-sm text-gray-600 ml-2">
                            por persona
                          </span>
                        </div>
                        <Link
                          href={`/paquete/${pkg.id}`}
                          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-5 py-3 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg whitespace-nowrap text-sm"
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

        <div className="text-center mt-8">
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
