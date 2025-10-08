"use client";

import Image from "next/image";
import {
  StarIcon,
  UsersIcon,
  GlobeAltIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-rose-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute -top-10 -left-10 w-48 h-48 bg-amber-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-0 w-56 h-56 bg-rose-400 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-orange-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
                Conoce
              </span>
              <br />
              <span className="bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent">
                Nuestra Historia
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Más de 10 años creando experiencias únicas y memorables para
              viajeros de todo el mundo.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/hero-beach.jpg"
                  alt="Nuestro equipo"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/placeholder-tour.jpg";
                  }}
                />
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Pasión por los Viajes
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Desde nuestros inicios, hemos estado comprometidos con crear
                experiencias de viaje auténticas y transformadoras. Nuestro
                equipo de expertos locales y guías certificados trabaja
                incansablemente para ofrecerte aventuras que van más allá de lo
                ordinario.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Creemos que cada viaje debe ser una oportunidad para descubrir,
                aprender y conectar con culturas, paisajes y personas
                extraordinarias. Por eso, cada paquete que diseñamos está
                pensado para brindarte momentos únicos e inolvidables.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valores Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nuestros Valores
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Los principios que guían cada experiencia que creamos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-rose-100 text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <HeartIcon className="w-8 h-8 text-rose-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Pasión</h3>
              <p className="text-gray-600">
                Amamos lo que hacemos y eso se refleja en cada detalle de
                nuestros viajes.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-100 text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <UsersIcon className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Comunidad
              </h3>
              <p className="text-gray-600">
                Trabajamos con comunidades locales para crear un impacto
                positivo y sostenible.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-green-100 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <GlobeAltIcon className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Sostenibilidad
              </h3>
              <p className="text-gray-600">
                Protegemos y respetamos el medio ambiente en cada destino que
                visitamos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Estadísticas Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nuestros Logros
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Números que respaldan nuestra experiencia y compromiso
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-rose-600 mb-2">
                50K+
              </div>
              <div className="text-gray-600">Viajeros Felices</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-amber-600 mb-2">
                10+
              </div>
              <div className="text-gray-600">Años de Experiencia</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">
                4.8★
              </div>
              <div className="text-gray-600">Calificación Promedio</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                25+
              </div>
              <div className="text-gray-600">Destinos Únicos</div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipo Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nuestro Equipo
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Profesionales apasionados que hacen posible cada experiencia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
              <div className="w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UsersIcon className="w-12 h-12 text-rose-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Guías Expertos
              </h3>
              <p className="text-gray-600">
                Más de 50 guías certificados con conocimiento profundo de cada
                destino.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
              <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <StarIcon className="w-12 h-12 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Especialistas
              </h3>
              <p className="text-gray-600">
                Expertos en aventura, cultura, naturaleza y experiencias
                gastronómicas.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeartIcon className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Atención 24/7
              </h3>
              <p className="text-gray-600">
                Soporte completo durante todo tu viaje, siempre disponible para
                ti.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ¿Listo para tu próxima aventura?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Únete a miles de viajeros que han confiado en nosotros para crear
              recuerdos inolvidables.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/paquetes"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-rose-600 font-medium rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Ver Paquetes
              </a>
              <a
                href="/contacto"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-medium rounded-full hover:bg-white hover:text-rose-600 transition-all duration-300"
              >
                Contactar
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
