"use client";

import { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ClockIcon,
  MapPinIcon,
  CheckIcon,
  CalendarIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";
import { useCart } from "../../../providers/CartProvider";

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

export default function PackageDetailPage() {
  const params = useParams();
  const router = useRouter();
  const packageId = params.id as string;

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [pickupOption, setPickupOption] = useState("yes");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const successTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { addToCart, loading: cartLoading } = useCart();

  useEffect(() => {
    return () => {
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
      }
    };
  }, []);

  const packageData = allPackages.find((pkg) => pkg.id === packageId);

  if (!packageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Paquete no encontrado
          </h1>
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const totalPrice =
    packageData.price * adults + packageData.price * 0.5 * children;

  const handleViewCart = () => {
    if (successTimeoutRef.current) {
      clearTimeout(successTimeoutRef.current);
    }
    setShowSuccessMessage(false);
    router.push("/cart");
  };

  const handleReservation = async () => {
    if (!selectedDate) {
      alert("Por favor selecciona una fecha para tu reserva");
      return;
    }

    setIsLoading(true);

    try {
      await addToCart({
        packageId: packageData.id,
        packageName: packageData.title,
        packageImage: packageData.imageUrl,
        price: packageData.price,
        selectedDate,
        pickupLocation: pickupOption === "yes" ? "Hotel pickup" : "No pickup",
      });

      setShowSuccessMessage(true);

      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
      }

      successTimeoutRef.current = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 8000);
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
      alert("Error al agregar al carrito. Por favor intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-rose-50">
      {/* Header con imagen */}
      <div className="relative h-96 bg-gray-900">
        <Image
          src={packageData.imageUrl}
          alt={packageData.title}
          fill
          className="object-cover opacity-70"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/images/placeholder-tour.jpg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-8 left-8 text-white">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                packageData.category === "Aventura"
                  ? "bg-green-500"
                  : packageData.category === "Marino"
                  ? "bg-blue-500"
                  : packageData.category === "Acuático"
                  ? "bg-cyan-500"
                  : packageData.category === "Cultural"
                  ? "bg-purple-500"
                  : "bg-orange-500"
              }`}
            >
              {packageData.category}
            </span>
            <div className="flex items-center gap-1">
              <StarSolidIcon className="w-5 h-5 text-yellow-400" />
              <span className="font-medium">{packageData.rating}</span>
              <span className="text-sm opacity-80">
                ({packageData.reviewCount})
              </span>
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-2">{packageData.title}</h1>
          <p className="text-lg opacity-90">{packageData.description}</p>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna izquierda - Información del paquete */}
          <div className="lg:col-span-2 space-y-8">
            {/* Información básica */}
            <div className="bg-white/90 backdrop-blur rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">
                    {packageData.days} días, {packageData.nights} noches
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">{packageData.location}</span>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Descripción del Paquete
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {packageData.description}
              </p>
            </div>

            {/* Incluye */}
            <div className="bg-white/90 backdrop-blur rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-green-600 mb-4 flex items-center gap-2">
                <CheckIcon className="w-5 h-5" />
                Incluye
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {packageData.inclusions.transport && (
                  <div className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Transporte</span>
                  </div>
                )}
                {packageData.inclusions.lodging && (
                  <div className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Alojamiento</span>
                  </div>
                )}
                {packageData.inclusions.meals.length > 0 && (
                  <div className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">
                      Alimentación: {packageData.inclusions.meals.join(", ")}
                    </span>
                  </div>
                )}
                {packageData.inclusions.tours.map((tour, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{tour}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Itinerario */}
            <div className="bg-white/90 backdrop-blur rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Itinerario
              </h3>
              <div className="space-y-4">
                {packageData.itinerary.map((day, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="w-10 h-10 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {day.day}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {day.title}
                      </h4>
                      <p className="text-gray-700 text-sm">{day.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Columna derecha - Panel de reserva */}
          <div className="lg:col-span-1">
            <div className="bg-white/90 backdrop-blur border border-rose-100 p-8 sticky top-8 rounded-2xl shadow-lg">
              <div className="text-center mb-8">
                <div className="text-3xl font-bold text-rose-600">
                  ${packageData.price}
                  <span className="text-lg font-medium text-gray-600">
                    /{packageData.priceType}
                  </span>
                </div>
              </div>

              {/* Formulario de reserva */}
              <div className="space-y-6">
                {/* Fecha */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Fecha <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-3 border border-gray-300 focus:border-rose-500 focus:outline-none transition-colors text-gray-900 bg-white rounded-lg"
                    />
                    <CalendarIcon className="absolute right-4 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Adultos */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Adultos
                  </label>
                  <div className="flex items-center justify-between border border-gray-200 p-4 rounded-lg">
                    <span className="text-gray-700 font-medium">Adultos</span>
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors rounded"
                      >
                        <MinusIcon className="w-4 h-4 text-gray-600" />
                      </button>
                      <span className="w-8 text-center font-medium text-gray-800">
                        {adults}
                      </span>
                      <button
                        type="button"
                        onClick={() => setAdults(adults + 1)}
                        className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors rounded"
                      >
                        <PlusIcon className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-500 mt-2">
                    ${packageData.price.toFixed(2)}
                  </div>
                </div>

                {/* Niños */}
                <div>
                  <div className="flex items-center justify-between border border-gray-200 p-4 rounded-lg">
                    <span className="text-gray-700 font-medium">Niños</span>
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => setChildren(Math.max(0, children - 1))}
                        className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors rounded"
                      >
                        <MinusIcon className="w-4 h-4 text-gray-600" />
                      </button>
                      <span className="w-8 text-center font-medium text-gray-800">
                        {children}
                      </span>
                      <button
                        type="button"
                        onClick={() => setChildren(children + 1)}
                        className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors rounded"
                      >
                        <PlusIcon className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-500 mt-2">
                    {children > 0
                      ? `$${(packageData.price * 0.5).toFixed(2)}`
                      : "N/A"}
                  </div>
                </div>

                {/* Recogida */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Recogida <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="pickup"
                        value="yes"
                        checked={pickupOption === "yes"}
                        onChange={(e) => setPickupOption(e.target.value)}
                        className="w-4 h-4 text-rose-500 border-gray-300 focus:ring-rose-500 focus:ring-2"
                      />
                      <span className="ml-3 text-gray-700">Sí</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="pickup"
                        value="no"
                        checked={pickupOption === "no"}
                        onChange={(e) => setPickupOption(e.target.value)}
                        className="w-4 h-4 text-rose-500 border-gray-300 focus:ring-rose-500 focus:ring-2"
                      />
                      <span className="ml-3 text-gray-700">No</span>
                    </label>
                  </div>
                </div>

                {/* Total */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-medium text-gray-700">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-rose-600">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mb-6">
                    Precios en dólares americanos US$
                  </div>

                  {/* Botón de reserva */}
                  <button
                    onClick={handleReservation}
                    disabled={!selectedDate || isLoading || cartLoading}
                    className="w-full bg-rose-600 text-white py-4 hover:bg-rose-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center space-x-2 rounded-lg"
                  >
                    {isLoading || cartLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Agregando al carrito...</span>
                      </>
                    ) : (
                      <>
                        <CheckIcon className="w-5 h-5" />
                        <span>Agregar al carrito</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mensaje de éxito flotante */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 animate-slide-in">
          <CheckIcon className="w-6 h-6" />
          <div>
            <p className="font-semibold">¡Reserva agregada correctamente!</p>
            <p className="text-sm opacity-90">
              {packageData.title} - {selectedDate}
            </p>
          </div>
          <button
            onClick={handleViewCart}
            className="ml-4 bg-white text-green-500 px-3 py-1 rounded text-sm font-medium hover:bg-gray-100 transition-colors"
          >
            Ver carrito
          </button>
        </div>
      )}
    </div>
  );
}
