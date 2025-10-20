"use client";

import Image from "next/image";
import {
  StarIcon,
  UsersIcon,
  GlobeAltIcon,
  HeartIcon,
  SparklesIcon,
  ShieldCheckIcon,
  TrophyIcon,
  RocketLaunchIcon,
  MapPinIcon,
  CameraIcon,
} from "@heroicons/react/24/solid";
import {
  UserGroupIcon,
  AcademicCapIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";

export default function NosotrosPage() {
  const teamMembers = [
    {
      name: "María González",
      role: "CEO & Fundadora",
      description: "15 años de experiencia en turismo internacional. Apasionada por crear experiencias transformadoras.",
      icon: RocketLaunchIcon,
      color: "rose"
    },
    {
      name: "Carlos Méndez",
      role: "Director de Operaciones",
      description: "Experto en logística de viajes con certificaciones en 20+ países.",
      icon: ShieldCheckIcon,
      color: "amber"
    },
    {
      name: "Ana Sofía Torres",
      role: "Jefa de Guías",
      description: "Guía certificada con especialización en ecoturismo y cultura local.",
      icon: MapPinIcon,
      color: "green"
    },
    {
      name: "Diego Ramírez",
      role: "Director de Experiencias",
      description: "Diseñador de experiencias únicas que conectan con el alma de cada destino.",
      icon: SparklesIcon,
      color: "blue"
    },
  ];

  const testimonials = [
    {
      name: "Laura Martínez",
      location: "Ciudad de México",
      text: "La mejor experiencia de viaje de mi vida. El equipo de AppTour cuidó cada detalle y nos hizo sentir como en casa en cada destino.",
      rating: 5,
    },
    {
      name: "Roberto Silva",
      location: "Buenos Aires",
      text: "Profesionalismo y calidez humana. Los guías son increíbles y realmente conocen los lugares. 100% recomendable.",
      rating: 5,
    },
    {
      name: "Carmen Ruiz",
      location: "Madrid",
      text: "Viajé sola y me sentí segura todo el tiempo. La atención personalizada y el grupo de viajeros fueron maravillosos.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-rose-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute -top-10 -left-10 w-48 h-48 bg-amber-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-0 w-56 h-56 bg-rose-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-orange-500 rounded-full blur-3xl animate-pulse"></div>
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
              viajeros de todo el mundo. Somos más que una agencia de viajes,
              somos creadores de recuerdos inolvidables.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/hero-beach.jpg"
                  alt="Nuestro equipo"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
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
                Desde nuestros inicios en 2014, hemos estado comprometidos con crear
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
              <p className="text-lg text-gray-600 leading-relaxed">
                Trabajamos con comunidades locales, promovemos el turismo sostenible
                y nos esforzamos por dejar una huella positiva en cada destino que visitamos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Misión y Visión Section */}
      <section className="py-20 bg-gradient-to-br from-rose-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-rose-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <TrophyIcon className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Nuestra Misión</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed mb-4">
                Crear experiencias de viaje excepcionales que inspiren, eduquen y transformen
                la vida de nuestros viajeros, mientras promovemos el turismo responsable y
                sostenible.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Nos comprometemos a ofrecer servicios de la más alta calidad, trabajando
                estrechamente con comunidades locales para generar un impacto positivo
                en cada destino que visitamos.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-600 rounded-xl flex items-center justify-center">
                  <LightBulbIcon className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Nuestra Visión</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed mb-4">
                Ser la agencia de viajes líder en Latinoamérica, reconocida por nuestra
                excelencia en servicio, innovación constante y compromiso inquebrantable
                con el turismo sostenible.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Aspiramos a conectar a millones de viajeros con experiencias auténticas
                que enriquezcan sus vidas y contribuyan al desarrollo de las comunidades
                que nos acogen.
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-rose-100 text-center hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <HeartIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Pasión</h3>
              <p className="text-gray-600">
                Amamos lo que hacemos y eso se refleja en cada detalle de
                nuestros viajes. Cada experiencia es diseñada con amor.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-100 text-center hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <UsersIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Comunidad
              </h3>
              <p className="text-gray-600">
                Trabajamos con comunidades locales para crear un impacto
                positivo y sostenible en cada destino.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-green-100 text-center hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <GlobeAltIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Sostenibilidad
              </h3>
              <p className="text-gray-600">
                Protegemos y respetamos el medio ambiente en cada destino que
                visitamos con prácticas responsables.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-blue-100 text-center hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <StarIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Excelencia
              </h3>
              <p className="text-gray-600">
                Nos esforzamos por superar expectativas en cada servicio,
                brindando calidad y atención excepcional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Estadísticas Section */}
      <section className="py-20 bg-gradient-to-br from-rose-500 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Nuestros Logros
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Números que respaldan nuestra experiencia y compromiso con la excelencia
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                50K+
              </div>
              <div className="text-white/90 font-medium">Viajeros Felices</div>
              <p className="text-white/70 text-sm mt-2">En más de 25 países</p>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                10+
              </div>
              <div className="text-white/90 font-medium">Años de Experiencia</div>
              <p className="text-white/70 text-sm mt-2">Creando recuerdos</p>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                4.9★
              </div>
              <div className="text-white/90 font-medium">Calificación</div>
              <p className="text-white/70 text-sm mt-2">De nuestros clientes</p>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                100+
              </div>
              <div className="text-white/90 font-medium">Destinos</div>
              <p className="text-white/70 text-sm mt-2">En todo el mundo</p>
            </div>
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-3xl font-bold text-white mb-1">98%</div>
              <div className="text-white/90 text-sm">Satisfacción del Cliente</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-3xl font-bold text-white mb-1">50+</div>
              <div className="text-white/90 text-sm">Guías Certificados</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-3xl font-bold text-white mb-1">24/7</div>
              <div className="text-white/90 text-sm">Soporte al Cliente</div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipo Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Conoce a Nuestro Equipo
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Profesionales apasionados dedicados a hacer realidad tus sueños de viaje
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {teamMembers.map((member, index) => {
              const Icon = member.icon;
              const colors: { [key: string]: string } = {
                rose: "from-rose-500 to-pink-600",
                amber: "from-amber-400 to-orange-600",
                green: "from-green-500 to-emerald-600",
                blue: "from-blue-500 to-indigo-600",
              };
              
              return (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <div className={`w-20 h-20 bg-gradient-to-br ${colors[member.color]} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-rose-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </div>
              );
            })}
          </div>

          {/* Team Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserGroupIcon className="w-8 h-8 text-rose-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                50+ Guías Expertos
              </h3>
              <p className="text-gray-600">
                Guías certificados con conocimiento profundo de cada destino y cultura local.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AcademicCapIcon className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Especialistas Certificados
              </h3>
              <p className="text-gray-600">
                Expertos en aventura, cultura, gastronomía y experiencias únicas.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeartIcon className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Atención Personalizada 24/7
              </h3>
              <p className="text-gray-600">
                Soporte completo durante todo tu viaje, siempre disponibles para ti.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Lo Que Dicen Nuestros Viajeros
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Historias reales de personas que vivieron experiencias inolvidables
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic leading-relaxed">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="border-t border-gray-200 pt-4">
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Testimonial Stats */}
          <div className="mt-16 bg-gradient-to-r from-amber-50 to-rose-50 rounded-2xl p-8 text-center">
            <p className="text-2xl font-bold text-gray-900 mb-2">
              Más de 10,000 reseñas positivas
            </p>
            <p className="text-gray-600">
              en Google, TripAdvisor y redes sociales
            </p>
          </div>
        </div>
      </section>

      {/* Galería de Experiencias */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Momentos Inolvidables
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Capturando la esencia de cada aventura
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={item}
                className="relative h-64 rounded-xl overflow-hidden group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <CameraIcon className="w-12 h-12 text-white" />
                </div>
                <Image
                  src={`/images/hero-beach.jpg`}
                  alt={`Experiencia ${item}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/placeholder-tour.jpg";
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-rose-500 via-pink-600 to-orange-500 rounded-3xl p-12 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                ¿Listo para tu Próxima Aventura?
              </h2>
              <p className="text-xl mb-8 opacity-95 max-w-2xl mx-auto leading-relaxed">
                Únete a miles de viajeros que han confiado en nosotros para crear
                recuerdos inolvidables. Tu próxima gran historia comienza aquí.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/paquetes"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-rose-600 font-bold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105"
                >
                  Explorar Paquetes
                </a>
                <a
                  href="/contacto"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-rose-600 transition-all duration-300 hover:scale-105"
                >
                  Contactar Ahora
                </a>
              </div>

              {/* Trust badges */}
              <div className="mt-12 pt-8 border-t border-white/20">
                <p className="text-white/90 mb-4">Confían en nosotros:</p>
                <div className="flex flex-wrap justify-center gap-6 text-white/80 text-sm">
                  <div className="flex items-center gap-2">
                    <ShieldCheckIcon className="w-5 h-5" />
                    <span>Pagos Seguros</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <StarIcon className="w-5 h-5" />
                    <span>Mejor Valorados</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrophyIcon className="w-5 h-5" />
                    <span>Certificados</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
