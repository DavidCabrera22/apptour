"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
import { ClockIcon, MapPinIcon } from "@heroicons/react/24/outline";

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

interface PackageInclusions {
  transport: boolean;
  lodging: boolean;
  meals: ("desayuno" | "almuerzo" | "cena")[];
  tours: string[];
}

interface TourPackage {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  location: string;
  days: number;
  nights: number;
  price: number;
  priceType: "por persona" | "por pareja";
  rating: number;
  reviewCount: number;
  inclusions: PackageInclusions;
  itinerary: ItineraryDay[];
}

const allPackages: TourPackage[] = [
  {
    id: "cartagena-3d2n",
    title: "Cartagena 3 días / 2 noches",
    description:
      "Incluye vuelos ida y regreso, hotel con desayuno, city tour y paseo en chiva nocturna.",
    category: "Cultural",
    imageUrl: "/images/hero-beach.jpg",
    location: "Cartagena, Colombia",
    days: 3,
    nights: 2,
    price: 499,
    priceType: "por persona",
    rating: 4.8,
    reviewCount: 320,
    inclusions: {
      transport: true,
      lodging: true,
      meals: ["desayuno"],
      tours: ["City tour histórico", "Paseo en chiva", "Murallas y Getsemaní"],
    },
    itinerary: [
      {
        day: 1,
        title: "Llegada y city tour",
        description:
          "Arribo, traslado al hotel y recorrido por el Centro Histórico.",
      },
      {
        day: 2,
        title: "Playas e islas",
        description: "Día libre opcional a Islas del Rosario o playa urbana.",
      },
      {
        day: 3,
        title: "Chiva nocturna y regreso",
        description: "Actividad nocturna y vuelo de retorno.",
      },
    ],
  },
  {
    id: "riviera-4d3n",
    title: "Riviera Maya 4 días / 3 noches",
    description:
      "Paquete con traslados, hotel all-inclusive, cenote tour y visita a Tulum.",
    category: "Acuático",
    imageUrl: "/images/cenote-experience.jpg",
    location: "Riviera Maya, México",
    days: 4,
    nights: 3,
    price: 899,
    priceType: "por persona",
    rating: 4.9,
    reviewCount: 580,
    inclusions: {
      transport: true,
      lodging: true,
      meals: ["desayuno", "almuerzo", "cena"],
      tours: ["Cenotes", "Tulum arqueológico", "Nado con snorkel"],
    },
    itinerary: [
      {
        day: 1,
        title: "Check-in y descanso",
        description: "Traslado al resort y tarde libre en la playa.",
      },
      {
        day: 2,
        title: "Tour cenotes",
        description: "Exploración de cenotes con guía y equipo incluido.",
      },
      {
        day: 3,
        title: "Tulum arqueológico",
        description: "Visita guiada al sitio arqueológico frente al mar.",
      },
      {
        day: 4,
        title: "Compras y salida",
        description: "Mañana libre, traslado al aeropuerto.",
      },
    ],
  },
  {
    id: "andes-5d4n",
    title: "Aventura Andes 5 días / 4 noches",
    description:
      "Incluye buses locales, cabañas, desayunos y treks con guía por valles andinos.",
    category: "Aventura",
    imageUrl: "/images/jungle-adventure.jpg",
    location: "Cordillera de los Andes",
    days: 5,
    nights: 4,
    price: 749,
    priceType: "por persona",
    rating: 4.7,
    reviewCount: 210,
    inclusions: {
      transport: true,
      lodging: true,
      meals: ["desayuno"],
      tours: ["Trekking de altura", "Miradores", "Ríos y cascadas"],
    },
    itinerary: [
      {
        day: 1,
        title: "Llegada y aclimatación",
        description: "Recepción y caminata ligera de reconocimiento.",
      },
      {
        day: 2,
        title: "Valle principal",
        description: "Trekking guiado con vistas panorámicas.",
      },
      {
        day: 3,
        title: "Cascadas",
        description: "Ruta hacia saltos de agua y picnic al aire libre.",
      },
      {
        day: 4,
        title: "Cumbres",
        description: "Ascenso opcional y jornada fotográfica.",
      },
      {
        day: 5,
        title: "Retorno",
        description: "Desayuno y traslado de salida.",
      },
    ],
  },
  {
    id: "pareja-3d2n",
    title: "Escapada Romántica 3 días / 2 noches",
    description:
      "Ideal para parejas: traslados, hotel boutique, desayunos y cena especial.",
    category: "Cultural",
    imageUrl: "/images/hero-beach.jpg",
    location: "Costa Caribe",
    days: 3,
    nights: 2,
    price: 999,
    priceType: "por pareja",
    rating: 4.8,
    reviewCount: 95,
    inclusions: {
      transport: true,
      lodging: true,
      meals: ["desayuno", "cena"],
      tours: ["City walk", "Puesta de sol en mirador"],
    },
    itinerary: [
      {
        day: 1,
        title: "Check-in y spa",
        description: "Bienvenida con amenidad y sesión de spa (opcional).",
      },
      {
        day: 2,
        title: "Día libre y cena",
        description: "Playa y cena romántica incluida.",
      },
      {
        day: 3,
        title: "Desayuno y salida",
        description: "Despedida y traslado al aeropuerto.",
      },
    ],
  },
];

export default function PackagesSection() {
  const packages = allPackages;
  const [openId, setOpenId] = useState<string | null>(null);
  const openPackage = packages.find((p) => p.id === openId) || null;

  return (
    <section
      id="paquetes"
      className="pt-32 pb-20 bg-gradient-to-br from-amber-50 via-white to-rose-50 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute -top-10 -left-10 w-48 h-48 bg-amber-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-0 w-56 h-56 bg-rose-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-orange-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-full lg:max-w-[85%] xl:max-w-[80%] 2xl:max-w-[75%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
              Paquetes
            </span>
            <br />
            <span className="bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent">
              Para Cada Estilo
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Combos listos con vuelos, hoteles y experiencias. Ahorra tiempo y
            dinero.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg border border-rose-100">
            <div className="text-2xl md:text-3xl font-bold text-rose-600 mb-1">
              10+
            </div>
            <div className="text-sm md:text-base text-gray-600">
              Paquetes Disponibles
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg border border-amber-100">
            <div className="text-2xl md:text-3xl font-bold text-amber-600 mb-1">
              50K+
            </div>
            <div className="text-sm md:text-base text-gray-600">
              Clientes Satisfechos
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg border border-orange-100">
            <div className="text-2xl md:text-3xl font-bold text-orange-600 mb-1">
              4.8★
            </div>
            <div className="text-sm md:text-base text-gray-600">
              Calificación Promedio
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg border border-pink-100">
            <div className="text-2xl md:text-3xl font-bold text-pink-600 mb-1">
              Ahorras
            </div>
            <div className="text-sm md:text-base text-gray-600">
              vs reservar por separado
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white/90 backdrop-blur rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-rose-100 hover:border-rose-200 h-full flex flex-col hover:-translate-y-0.5"
            >
              <div className="relative px-3 pt-3 sm:px-4 sm:pt-4">
                <div className="h-36 sm:h-40 md:h-44 lg:h-52 bg-gray-200 relative overflow-hidden rounded-lg sm:rounded-xl">
                  <Image
                    src={pkg.imageUrl}
                    alt={pkg.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/images/placeholder-tour.jpg";
                    }}
                  />
                  <span className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2 py-1 rounded-full text-[9px] sm:text-[10px] font-semibold tracking-wide bg-white/90 text-rose-700 border border-rose-200 shadow-sm">
                    Paquete
                  </span>
                </div>
              </div>

              <div className="p-3 sm:p-4 lg:p-6 flex-1 flex flex-col">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-gray-600 mb-2 sm:mb-3">
                  <div className="flex items-center gap-1">
                    <ClockIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm">
                      {pkg.days} días, {pkg.nights} noches
                    </span>
                  </div>
                </div>

                <div className="flex items-start justify-between gap-2 sm:gap-3 mb-1">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 line-clamp-2 flex-1">
                    {pkg.title}
                  </h3>
                  <span className="px-2 py-1 rounded-full text-[9px] sm:text-[10px] font-medium text-rose-700 bg-rose-50 border border-rose-200 flex-shrink-0">
                    {pkg.category}
                  </span>
                </div>

                <div className="flex items-center gap-1 sm:gap-2 text-gray-700 mb-2 text-xs sm:text-sm">
                  <div className="flex items-center gap-1">
                    <StarIcon className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                    <span className="font-medium">{pkg.rating}</span>
                  </div>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">
                    {pkg.reviewCount} reseñas
                  </span>
                </div>

                <div className="flex items-center gap-1 text-gray-600 mb-2 sm:mb-3">
                  <MapPinIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm">{pkg.location}</span>
                </div>

                <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 flex-1">
                  {pkg.description}
                </p>

                <div className="mb-3 sm:mb-4">
                  <div className="text-xs font-semibold text-gray-700 mb-1 sm:mb-2">
                    Incluye
                  </div>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {pkg.inclusions.transport && (
                      <span className="px-2 py-1 bg-rose-50 text-rose-700 text-[10px] sm:text-xs rounded-full border border-rose-100">
                        Transporte
                      </span>
                    )}
                    {pkg.inclusions.lodging && (
                      <span className="px-2 py-1 bg-rose-50 text-rose-700 text-[10px] sm:text-xs rounded-full border border-rose-100">
                        Alojamiento
                      </span>
                    )}
                    {pkg.inclusions.meals.length > 0 && (
                      <span className="px-2 py-1 bg-rose-50 text-rose-700 text-[10px] sm:text-xs rounded-full border border-rose-100">
                        Alimentación: {pkg.inclusions.meals.join(", ")}
                      </span>
                    )}
                    {pkg.inclusions.tours.slice(0, 2).map((tour, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-rose-50 text-rose-700 text-[10px] sm:text-xs rounded-full border border-rose-100"
                      >
                        {tour}
                      </span>
                    ))}
                    {pkg.inclusions.tours.length > 2 && (
                      <span className="px-1 py-1 text-[10px] sm:text-xs text-gray-600">
                        +{pkg.inclusions.tours.length - 2} más
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between mt-auto pt-3 sm:pt-4 lg:pt-6 border-t border-gray-100 gap-3">
                  <div className="min-w-0 mb-2 sm:mb-0">
                    <span className="text-xl sm:text-2xl font-bold text-rose-600">
                      ${pkg.price}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-600 ml-1">
                      {pkg.priceType}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => setOpenId(pkg.id)}
                      className="px-3 py-2 text-xs sm:text-sm text-gray-700 hover:text-rose-700 underline underline-offset-2 text-center sm:text-left"
                    >
                      Ver itinerario
                    </button>
                    <Link
                      href={`/paquete/${pkg.id}`}
                      className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-full font-medium transition-all duration-300 shadow-sm hover:shadow text-center text-sm"
                    >
                      Reservar
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              ¿Necesitas ayuda para elegir?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Te orientamos al paquete ideal para tu viaje.
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-rose-600 font-medium rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Hablar con un asesor
            </Link>
          </div>
        </div>
      </div>

      {/* Modal de Itinerario */}
      {openPackage && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            {/* Header del Modal */}
            <div className="relative h-48 bg-gray-900">
              <Image
                src={openPackage.imageUrl}
                alt={openPackage.title}
                fill
                className="object-cover opacity-70"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/images/placeholder-tour.jpg";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-2xl font-bold mb-1">{openPackage.title}</h3>
                <p className="text-sm opacity-90">
                  {openPackage.days} días, {openPackage.nights} noches
                </p>
              </div>
              <button
                onClick={() => setOpenId(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
              >
                ×
              </button>
            </div>

            {/* Contenido del Modal */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">
                      {openPackage.days} días, {openPackage.nights} noches
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">
                      {openPackage.location}
                    </span>
                  </div>
                </div>

                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Itinerario Detallado
                </h4>
                <div className="space-y-4">
                  {openPackage.itinerary.map((day, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="w-10 h-10 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {day.day}
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-1">
                          {day.title}
                        </h5>
                        <p className="text-gray-700 text-sm">
                          {day.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Incluye */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Incluye
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {openPackage.inclusions.transport && (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700 text-sm">Transporte</span>
                    </div>
                  )}
                  {openPackage.inclusions.lodging && (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700 text-sm">Alojamiento</span>
                    </div>
                  )}
                  {openPackage.inclusions.meals.length > 0 && (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700 text-sm">
                        Alimentación: {openPackage.inclusions.meals.join(", ")}
                      </span>
                    </div>
                  )}
                  {openPackage.inclusions.tours.map((tour, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700 text-sm">{tour}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer del Modal */}
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-rose-600">
                    ${openPackage.price}
                  </span>
                  <span className="text-sm text-gray-600 ml-1">
                    {openPackage.priceType}
                  </span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setOpenId(null)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cerrar
                  </button>
                  <Link
                    href={`/paquete/${openPackage.id}`}
                    className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    onClick={() => setOpenId(null)}
                  >
                    Reservar Ahora
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export {};
