'use client';

import { useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { StarIcon, ClockIcon, UsersIcon, MapPinIcon, CheckIcon, CalendarIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import { useCart } from '../../../providers/CartProvider';

interface TourPackage {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  price: number;
  duration: string;
  maxParticipants: number;
  location: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  highlights: string[];
  category: string;
  includes: string[];
  notIncludes: string[];
  schedule: string[];
  requirements: string[];
  gallery: string[];
}

const allPackages: TourPackage[] = [
  {
    id: '1',
    title: 'FULL ADMISSION',
    description: 'Acceso completo a todas las atracciones del parque acuático.',
    fullDescription: 'Embárcate en un viaje inolvidable desde la marina más grande y lujosa del caribe. Sube a bordo de nuestro espectacular catamarán de dos pisos y navega por las impresionantes aguas turquesas de la impresionante costa de Cap Cana. Tu aventura continúa con una sesión de snorkel relajante en un vibrante arrecife de coral, donde tendrás la oportunidad de ver la vida marina tropical de cerca. A continuación, disfruta de una relajante parada en la arena blanca, perfecta para descansar en aguas cristalinas.',
    price: 89,
    duration: 'Todo el día',
    maxParticipants: 50,
    location: 'Riviera Maya',
    rating: 4.8,
    reviewCount: 1250,
    imageUrl: '/images/cenote-experience.jpg',
    highlights: ['Cenotes', 'Tirolesas', 'Snorkel'],
    category: 'Acuático',
    includes: [
      'Transporte desde hoteles seleccionados',
      'Acceso a todas las atracciones',
      'Equipo de snorkel',
      'Almuerzo buffet',
      'Bebidas ilimitadas',
      'Guía certificado',
      'Seguro de viaje'
    ],
    notIncludes: [
      'Propinas',
      'Fotos profesionales',
      'Transporte desde hoteles no incluidos',
      'Actividades opcionales'
    ],
    schedule: [
      '8:00 AM - Recogida en hoteles',
      '9:30 AM - Llegada al parque',
      '10:00 AM - Bienvenida y briefing',
      '10:30 AM - Actividades acuáticas',
      '1:00 PM - Almuerzo buffet',
      '2:30 PM - Tirolesas y aventuras',
      '4:30 PM - Tiempo libre',
      '5:30 PM - Regreso a hoteles'
    ],
    requirements: [
      'Edad mínima: 8 años',
      'Saber nadar (obligatorio)',
      'Condición física básica',
      'No mujeres embarazadas',
      'No problemas cardíacos'
    ],
    gallery: [
      '/images/cenote-experience.jpg',
      '/images/jungle-adventure.jpg',
      '/images/hero-beach.jpg'
    ]
  },
  {
    id: '2',
    title: 'FULL ADMISSION + BUGGY',
    description: 'La aventura completa más emocionante experiencia en buggy por la selva maya.',
    fullDescription: 'El FULL ADMISSION + BUGGY de Scape Park at Cap Cana, ofrece desde emocionantes aventuras llenas de adrenalina hasta experiencias culturales y educativas. Deja que tus sentidos se escapen mientras te deslizas en zip lines sobre un acantilado, explorando cavernas antiguas, nadando en cuevas subterráneas, saltando de zip line acuáticos y montando nuestras hamacas de agua. Además de todas estas aventuras únicas, también tendrás incluido el circuito buggy que va por senderos y charcos de agua a través de la jungla.',
    price: 129,
    duration: 'Todo el día',
    maxParticipants: 30,
    location: 'Selva Maya',
    rating: 4.9,
    reviewCount: 890,
    imageUrl: '/images/jungle-adventure.jpg',
    highlights: ['Buggy', 'Selva', 'Aventura'],
    category: 'Extremo',
    includes: [
      'Transporte, crucero relajante, snorkel, barra libre/bote, piscina natural',
      'Almuerzo en la playa y cenote Blue Hole',
      'Circuito buggy por senderos de jungla',
      'Equipo de seguridad completo',
      'Guía bilingüe especializado'
    ],
    notIncludes: [
      'Palos de selfie, drones, equipos de video',
      'Mascotas ni alimentos y bebidas',
      'Transporte desde ubicaciones no especificadas'
    ],
    schedule: [
      '7:30 AM - Recogida en hoteles',
      '9:00 AM - Llegada y registro',
      '9:30 AM - Briefing de seguridad',
      '10:00 AM - Aventura en buggy',
      '12:30 PM - Almuerzo',
      '2:00 PM - Actividades acuáticas',
      '4:00 PM - Tiempo libre',
      '5:00 PM - Regreso'
    ],
    requirements: [
      'Licencia de conducir válida',
      'Edad mínima: 18 años (conductor)',
      'Edad mínima: 8 años (pasajero)',
      'Condición física buena',
      'Ropa cómoda y cerrada'
    ],
    gallery: [
      '/images/jungle-adventure.jpg',
      '/images/cenote-experience.jpg',
      '/images/hero-beach.jpg'
    ]
  },
  {
    id: '3',
    title: 'CENOTE EXPERIENCE',
    description: 'Sumérgete en las aguas cristalinas de los cenotes sagrados mayas.',
    fullDescription: 'Descubre la magia de los cenotes sagrados mayas en esta experiencia única. Sumérgete en aguas cristalinas de temperatura perfecta, explora formaciones rocosas milenarias y conecta con la espiritualidad ancestral de estos lugares sagrados. Incluye snorkel en cenotes abiertos y cerrados, con guías especializados en historia maya.',
    price: 65,
    duration: '6 horas',
    maxParticipants: 25,
    location: 'Cenotes Sagrados',
    rating: 4.7,
    reviewCount: 650,
    imageUrl: '/images/cenote-experience.jpg',
    highlights: ['Cenotes', 'Snorkel', 'Historia Maya'],
    category: 'Cultural',
    includes: [
      'Transporte desde hoteles seleccionados',
      'Acceso a 3 cenotes diferentes',
      'Equipo de snorkel completo',
      'Guía especializado en cultura maya',
      'Almuerzo tradicional',
      'Bebidas naturales',
      'Ceremonia maya opcional'
    ],
    notIncludes: [
      'Cámara subacuática',
      'Propinas',
      'Souvenirs',
      'Transporte desde ubicaciones remotas'
    ],
    schedule: [
      '8:30 AM - Recogida en hoteles',
      '10:00 AM - Primer cenote abierto',
      '11:30 AM - Cenote cerrado con estalactitas',
      '1:00 PM - Almuerzo tradicional',
      '2:30 PM - Tercer cenote y ceremonia',
      '4:00 PM - Tiempo libre y compras',
      '5:00 PM - Regreso a hoteles'
    ],
    requirements: [
      'Edad mínima: 6 años',
      'Saber nadar básico',
      'No claustrofobia',
      'Condición física básica',
      'Respeto por sitios sagrados'
    ],
    gallery: [
      '/images/cenote-experience.jpg',
      '/images/jungle-adventure.jpg',
      '/images/hero-beach.jpg'
    ]
  },
  {
    id: '4',
    title: 'JUNGLE ADVENTURE',
    description: 'Explora la selva tropical en una aventura épica.',
    fullDescription: 'Adéntrate en la selva tropical más biodiversa del Caribe en una aventura épica llena de adrenalina. Vuela sobre el dosel forestal en tirolesas de última generación, desciende por rappel desde plataformas de 30 metros, y descubre la increíble vida silvestre en su hábitat natural. Una experiencia perfecta para los amantes de la naturaleza y la aventura.',
    price: 95,
    duration: '8 horas',
    maxParticipants: 20,
    location: 'Selva Tropical',
    rating: 4.8,
    reviewCount: 420,
    imageUrl: '/images/jungle-adventure.jpg',
    highlights: ['Tirolesas', 'Rappel', 'Vida Silvestre'],
    category: 'Aventura',
    includes: [
      'Transporte especializado 4x4',
      '6 tirolesas de diferentes alturas',
      'Equipo de rappel profesional',
      'Caminata guiada por naturalista',
      'Almuerzo en la selva',
      'Equipo de seguridad certificado',
      'Seguro de aventura'
    ],
    notIncludes: [
      'Repelente de insectos',
      'Ropa de cambio',
      'Cámara deportiva',
      'Medicamentos personales'
    ],
    schedule: [
      '7:00 AM - Recogida en hoteles',
      '8:30 AM - Llegada al campamento base',
      '9:00 AM - Briefing y equipamiento',
      '9:30 AM - Primera serie de tirolesas',
      '11:00 AM - Rappel y caminata',
      '1:00 PM - Almuerzo en la selva',
      '2:30 PM - Observación de vida silvestre',
      '4:30 PM - Regreso'
    ],
    requirements: [
      'Edad mínima: 12 años',
      'Peso máximo: 120 kg',
      'Condición física buena',
      'No miedo a las alturas',
      'Calzado cerrado obligatorio'
    ],
    gallery: [
      '/images/jungle-adventure.jpg',
      '/images/cenote-experience.jpg',
      '/images/hero-beach.jpg'
    ]
  },
  {
    id: '5',
    title: 'BEACH & REEF',
    description: 'Combina playa paradisíaca con snorkel en arrecifes de coral.',
    fullDescription: 'La perfecta combinación de relajación y aventura marina. Disfruta de playas de arena blanca y aguas turquesas, seguido de una experiencia de snorkel en el segundo arrecife de coral más grande del mundo. Observa peces tropicales, tortugas marinas y mantarrayas en su hábitat natural, mientras te relajas en un paraíso caribeño.',
    price: 75,
    duration: '7 horas',
    maxParticipants: 40,
    location: 'Arrecife Mesoamericano',
    rating: 4.6,
    reviewCount: 780,
    imageUrl: '/images/hero-beach.jpg',
    highlights: ['Playa', 'Snorkel', 'Arrecife'],
    category: 'Marino',
    includes: [
      'Transporte en catamarán',
      'Acceso a playa privada',
      'Equipo de snorkel premium',
      'Almuerzo frente al mar',
      'Barra libre nacional',
      'Guía marino certificado',
      'Toallas y sombrillas'
    ],
    notIncludes: [
      'Protector solar biodegradable',
      'Masaje en la playa',
      'Actividades acuáticas motorizadas',
      'Cámara subacuática'
    ],
    schedule: [
      '8:00 AM - Recogida en hoteles',
      '9:30 AM - Embarque en catamarán',
      '10:30 AM - Primera parada de snorkel',
      '12:00 PM - Llegada a playa privada',
      '12:30 PM - Almuerzo frente al mar',
      '2:00 PM - Tiempo libre en playa',
      '3:30 PM - Segunda sesión de snorkel',
      '5:00 PM - Regreso'
    ],
    requirements: [
      'Edad mínima: 8 años',
      'Saber nadar',
      'No problemas respiratorios',
      'Protector solar biodegradable',
      'Respeto por vida marina'
    ],
    gallery: [
      '/images/hero-beach.jpg',
      '/images/cenote-experience.jpg',
      '/images/jungle-adventure.jpg'
    ]
  },
  {
    id: '6',
    title: 'EXTREME ZIPLINE',
    description: 'Vuela sobre la selva en las tirolesas más largas del Caribe.',
    fullDescription: 'Experimenta la adrenalina pura volando sobre la selva en las tirolesas más largas y emocionantes del Caribe. Con líneas de hasta 800 metros de longitud y alturas de 50 metros, esta aventura te llevará a través del dosel forestal con vistas espectaculares. Incluye 8 tirolesas de diferentes niveles de dificultad y una plataforma de observación panorámica.',
    price: 110,
    duration: '5 horas',
    maxParticipants: 15,
    location: 'Canopy Selvático',
    rating: 4.9,
    reviewCount: 320,
    imageUrl: '/images/jungle-adventure.jpg',
    highlights: ['Tirolesas', 'Altura', 'Adrenalina'],
    category: 'Extremo',
    includes: [
      'Transporte especializado',
      '8 tirolesas de diferentes niveles',
      'Equipo de seguridad certificado',
      'Instructor profesional',
      'Snack energético',
      'Agua purificada',
      'Seguro de aventura extrema'
    ],
    notIncludes: [
      'Cámara deportiva',
      'Ropa especializada',
      'Calzado de aventura',
      'Medicamentos para vértigo'
    ],
    schedule: [
      '8:00 AM - Recogida en hoteles',
      '9:00 AM - Llegada y registro',
      '9:30 AM - Briefing de seguridad',
      '10:00 AM - Primeras 4 tirolesas',
      '11:30 AM - Descanso y snack',
      '12:00 PM - Últimas 4 tirolesas',
      '1:30 PM - Regreso'
    ],
    requirements: [
      'Edad mínima: 16 años',
      'Peso máximo: 110 kg',
      'No miedo extremo a alturas',
      'Condición física excelente',
      'Firmar descargo de responsabilidad'
    ],
    gallery: [
      '/images/jungle-adventure.jpg',
      '/images/cenote-experience.jpg',
      '/images/hero-beach.jpg'
    ]
  },
  {
    id: '7',
    title: 'MAYA CULTURAL TOUR',
    description: 'Descubre los secretos de la civilización maya.',
    fullDescription: 'Sumérgete en la rica historia y cultura de la civilización maya en este tour educativo y espiritual. Visita ruinas arqueológicas auténticas, participa en ceremonias tradicionales, aprende sobre astronomía maya y disfruta de gastronomía ancestral. Incluye la visita a un pueblo maya contemporáneo donde conocerás las tradiciones que perduran hasta hoy.',
    price: 85,
    duration: '9 horas',
    maxParticipants: 35,
    location: 'Zona Arqueológica',
    rating: 4.5,
    reviewCount: 540,
    imageUrl: '/images/cenote-experience.jpg',
    highlights: ['Historia', 'Cultura', 'Arqueología'],
    category: 'Cultural',
    includes: [
      'Transporte con aire acondicionado',
      'Guía arqueólogo certificado',
      'Entrada a sitios arqueológicos',
      'Ceremonia maya auténtica',
      'Almuerzo tradicional maya',
      'Visita a pueblo maya actual',
      'Taller de artesanías'
    ],
    notIncludes: [
      'Souvenirs y artesanías',
      'Bebidas alcohólicas',
      'Propinas para guías locales',
      'Transporte desde hoteles remotos'
    ],
    schedule: [
      '7:00 AM - Recogida en hoteles',
      '8:30 AM - Primera zona arqueológica',
      '10:30 AM - Ceremonia maya',
      '12:00 PM - Pueblo maya contemporáneo',
      '1:30 PM - Almuerzo tradicional',
      '3:00 PM - Taller de artesanías',
      '4:30 PM - Segunda zona arqueológica',
      '6:00 PM - Regreso'
    ],
    requirements: [
      'Edad mínima: 8 años',
      'Interés en historia y cultura',
      'Respeto por tradiciones ancestrales',
      'Calzado cómodo para caminar',
      'Protección solar'
    ],
    gallery: [
      '/images/cenote-experience.jpg',
      '/images/jungle-adventure.jpg',
      '/images/hero-beach.jpg'
    ]
  },
  {
    id: '8',
    title: 'DEEP SEA DIVING',
    description: 'Sumérgete en las profundidades del mar Caribe.',
    fullDescription: 'Explora las profundidades del mar Caribe en esta experiencia de buceo avanzado. Descubre arrecifes de coral prístinos, naufragios históricos y una biodiversidad marina excepcional. Con visibilidad de hasta 40 metros, tendrás encuentros únicos con tiburones nodriza, tortugas marinas, mantarrayas y una variedad increíble de peces tropicales.',
    price: 150,
    duration: '6 horas',
    maxParticipants: 12,
    location: 'Arrecife de Coral',
    rating: 4.8,
    reviewCount: 280,
    imageUrl: '/images/hero-beach.jpg',
    highlights: ['Buceo', 'Arrecifes', 'Vida Marina'],
    category: 'Marino',
    includes: [
      'Transporte marítimo especializado',
      'Equipo de buceo completo',
      'Instructor PADI certificado',
      '2 inmersiones profundas',
      'Almuerzo a bordo',
      'Bebidas y snacks',
      'Certificado de inmersión'
    ],
    notIncludes: [
      'Certificación PADI (si no la tienes)',
      'Cámara subacuática',
      'Traje de neopreno (opcional)',
      'Seguro de buceo especializado'
    ],
    schedule: [
      '7:30 AM - Recogida en hoteles',
      '8:30 AM - Briefing y equipamiento',
      '9:00 AM - Navegación al arrecife',
      '10:00 AM - Primera inmersión',
      '12:00 PM - Almuerzo a bordo',
      '1:00 PM - Segunda inmersión',
      '3:30 PM - Regreso al puerto'
    ],
    requirements: [
      'Certificación de buceo válida',
      'Edad mínima: 18 años',
      'Examen médico reciente',
      'Experiencia mínima 20 inmersiones',
      'No problemas de oído'
    ],
    gallery: [
      '/images/hero-beach.jpg',
      '/images/cenote-experience.jpg',
      '/images/jungle-adventure.jpg'
    ]
  },
  {
    id: '9',
    title: 'NIGHT JUNGLE SAFARI',
    description: 'Aventura nocturna por la selva tropical.',
    fullDescription: 'Descubre la selva tropical como nunca antes en esta emocionante aventura nocturna. Cuando el sol se oculta, la selva cobra vida con sonidos misteriosos y criaturas fascinantes. Observa jaguares, ocelotes, monos aulladores y una variedad de aves nocturnas en su hábitat natural, guiado por expertos naturalistas con equipo de visión nocturna.',
    price: 95,
    duration: '4 horas',
    maxParticipants: 18,
    location: 'Reserva Natural',
    rating: 4.7,
    reviewCount: 190,
    imageUrl: '/images/jungle-adventure.jpg',
    highlights: ['Nocturno', 'Safari', 'Vida Silvestre'],
    category: 'Aventura',
    includes: [
      'Transporte nocturno especializado',
      'Guía naturalista experto',
      'Equipo de visión nocturna',
      'Linternas profesionales',
      'Cena ligera pre-safari',
      'Bebidas calientes',
      'Repelente natural'
    ],
    notIncludes: [
      'Cámara con flash infrarrojo',
      'Ropa de abrigo',
      'Calzado impermeable',
      'Medicamentos para insectos'
    ],
    schedule: [
      '5:00 PM - Recogida en hoteles',
      '6:00 PM - Cena ligera',
      '6:30 PM - Briefing nocturno',
      '7:00 PM - Inicio del safari',
      '9:30 PM - Descanso y bebidas',
      '10:00 PM - Segunda parte del safari',
      '11:30 PM - Regreso'
    ],
    requirements: [
      'Edad mínima: 12 años',
      'No claustrofobia',
      'Silencio absoluto durante observación',
      'Ropa oscura obligatoria',
      'Condición física básica'
    ],
    gallery: [
      '/images/jungle-adventure.jpg',
      '/images/cenote-experience.jpg',
      '/images/hero-beach.jpg'
    ]
  },
  {
    id: '10',
    title: 'CENOTE CAVE DIVING',
    description: 'Explora las cuevas subacuáticas más impresionantes del mundo.',
    fullDescription: 'La experiencia de buceo más exclusiva y desafiante del mundo maya. Explora sistemas de cuevas subacuáticas con formaciones geológicas de millones de años, estalactitas y estalagmitas sumergidas, y cámaras de aire cristalino. Esta aventura está reservada para buzos técnicos certificados que buscan la experiencia definitiva en buceo en cavernas.',
    price: 180,
    duration: '8 horas',
    maxParticipants: 8,
    location: 'Sistema de Cuevas',
    rating: 4.9,
    reviewCount: 150,
    imageUrl: '/images/cenote-experience.jpg',
    highlights: ['Cuevas', 'Buceo Técnico', 'Exclusivo'],
    category: 'Extremo',
    includes: [
      'Transporte especializado',
      'Equipo de buceo técnico completo',
      'Instructor de buceo en cavernas',
      'Lámparas subacuáticas profesionales',
      'Líneas de seguridad',
      'Almuerzo gourmet',
      'Seguro especializado'
    ],
    notIncludes: [
      'Certificación de buceo en cavernas',
      'Equipo personal especializado',
      'Cámara subacuática profesional',
      'Análisis de gases'
    ],
    schedule: [
      '7:00 AM - Recogida en hoteles',
      '8:00 AM - Briefing técnico',
      '8:30 AM - Preparación de equipo',
      '9:30 AM - Primera inmersión en caverna',
      '12:00 PM - Almuerzo y descanso',
      '1:30 PM - Segunda inmersión profunda',
      '4:00 PM - Debriefing y certificados',
      '5:00 PM - Regreso'
    ],
    requirements: [
      'Certificación Advanced Open Water',
      'Certificación de buceo en cavernas',
      'Mínimo 50 inmersiones registradas',
      'Examen médico especializado',
      'Edad mínima: 21 años'
    ],
    gallery: [
      '/images/cenote-experience.jpg',
      '/images/hero-beach.jpg',
      '/images/jungle-adventure.jpg'
    ]
  }
  // Continúa con los paquetes 6-10...
];

export default function PackageDetailPage() {
  const params = useParams();
  const router = useRouter();
  const packageId = params.id as string;
  
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [pickupOption, setPickupOption] = useState('yes');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Referencia para el timeout del mensaje de éxito
  const successTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { addToCart, loading: cartLoading, openCart } = useCart();

  // Limpiar timeout al desmontar el componente - MOVER ANTES DEL RETURN CONDICIONAL
  useEffect(() => {
    return () => {
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
      }
    };
  }, []);

  const packageData = allPackages.find(pkg => pkg.id === packageId);

  if (!packageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Paquete no encontrado</h1>
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const totalPrice = (packageData.price * adults) + (packageData.price * 0.5 * children);

  const handleViewCart = () => {
    // Limpiar el timeout antes de navegar
    if (successTimeoutRef.current) {
      clearTimeout(successTimeoutRef.current);
    }
    // Ocultar el mensaje inmediatamente antes de navegar
    setShowSuccessMessage(false);
    // Navegar al carrito
    router.push('/cart');
  };

  const handleReservation = async () => {
    if (!selectedDate) {
      alert('Por favor selecciona una fecha para tu reserva');
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
        pickupLocation: pickupOption === 'yes' ? 'Hotel pickup' : 'No pickup'
      });
  
      // Mostrar mensaje de éxito
      setShowSuccessMessage(true);
      
      // Limpiar timeout anterior si existe
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
      }
      
      // Auto-ocultar después de 8 segundos (más tiempo para que el usuario pueda hacer click)
      successTimeoutRef.current = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 8000);
      
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
      alert('Error al agregar al carrito. Por favor intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con imagen */}
      <div className="relative h-96 bg-gray-900">
        <Image
          src={packageData.imageUrl}
          alt={packageData.title}
          fill
          className="object-cover opacity-70"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/images/placeholder-tour.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-8 left-8 text-white">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              packageData.category === 'Aventura' ? 'bg-green-500' :
              packageData.category === 'Marino' ? 'bg-blue-500' :
              packageData.category === 'Acuático' ? 'bg-cyan-500' :
              packageData.category === 'Cultural' ? 'bg-purple-500' :
              'bg-orange-500'
            }`}>
              {packageData.category}
            </span>
            <div className="flex items-center gap-1">
              <StarSolidIcon className="w-5 h-5 text-yellow-400" />
              <span className="font-medium">{packageData.rating}</span>
              <span className="text-sm opacity-80">({packageData.reviewCount})</span>
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
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">{packageData.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <UsersIcon className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">Máx. {packageData.maxParticipants} personas</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">{packageData.location}</span>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Descripción</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{packageData.fullDescription}</p>
              
              {/* Highlights */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Highlights</h3>
                <div className="flex flex-wrap gap-2">
                  {packageData.highlights.map((highlight, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Incluye y No incluye */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-green-600 mb-4 flex items-center gap-2">
                  <CheckIcon className="w-5 h-5" />
                  Incluye
                </h3>
                <ul className="space-y-2">
                  {packageData.includes.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckIcon className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-red-600 mb-4">No incluye</h3>
                <ul className="space-y-2">
                  {packageData.notIncludes.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0">×</span>
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Itinerario */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Itinerario</h3>
              <div className="space-y-3">
                {packageData.schedule.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Requisitos */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Requisitos</h3>
              <ul className="space-y-2">
                {packageData.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Columna derecha - Panel de reserva */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-stone-200 p-8 sticky top-8">
              <div className="text-center mb-8">
                <div className="text-3xl font-light text-stone-800">
                  ${packageData.price}
                  <span className="text-lg font-light text-stone-600">/persona</span>
                </div>
              </div>

              {/* Formulario de reserva */}
              <div className="space-y-6">
                {/* Fecha */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-3">
                    Fecha <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-stone-300 focus:border-emerald-500 focus:outline-none transition-colors text-stone-900 bg-white"
                    />
                    <CalendarIcon className="absolute right-4 top-3.5 w-5 h-5 text-stone-400 pointer-events-none" />
                  </div>
                </div>

                {/* Adultos */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-3">
                    Adultos
                  </label>
                  <div className="flex items-center justify-between border border-stone-200 p-4">
                    <span className="text-stone-700 font-medium">Adultos</span>
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        className="w-8 h-8 border border-stone-300 flex items-center justify-center hover:bg-stone-50 transition-colors"
                      >
                        <MinusIcon className="w-4 h-4 text-stone-600" />
                      </button>
                      <span className="w-8 text-center font-medium text-stone-800">{adults}</span>
                      <button
                        type="button"
                        onClick={() => setAdults(adults + 1)}
                        className="w-8 h-8 border border-stone-300 flex items-center justify-center hover:bg-stone-50 transition-colors"
                      >
                        <PlusIcon className="w-4 h-4 text-stone-600" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right text-sm text-stone-500 mt-2">
                    ${packageData.price.toFixed(2)}
                  </div>
                </div>

                {/* Niños */}
                <div>
                  <div className="flex items-center justify-between border border-stone-200 p-4">
                    <span className="text-stone-700 font-medium">Niños</span>
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => setChildren(Math.max(0, children - 1))}
                        className="w-8 h-8 border border-stone-300 flex items-center justify-center hover:bg-stone-50 transition-colors"
                      >
                        <MinusIcon className="w-4 h-4 text-stone-600" />
                      </button>
                      <span className="w-8 text-center font-medium text-stone-800">{children}</span>
                      <button
                        type="button"
                        onClick={() => setChildren(children + 1)}
                        className="w-8 h-8 border border-stone-300 flex items-center justify-center hover:bg-stone-50 transition-colors"
                      >
                        <PlusIcon className="w-4 h-4 text-stone-600" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right text-sm text-stone-500 mt-2">
                    {children > 0 ? `$${(packageData.price * 0.5).toFixed(2)}` : 'N/A'}
                  </div>
                </div>

                {/* Recogida */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-3">
                    Recogida <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="pickup"
                        value="yes"
                        checked={pickupOption === 'yes'}
                        onChange={(e) => setPickupOption(e.target.value)}
                        className="w-4 h-4 text-emerald-500 border-stone-300 focus:ring-emerald-500 focus:ring-2"
                      />
                      <span className="ml-3 text-stone-700">Sí</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="pickup"
                        value="no"
                        checked={pickupOption === 'no'}
                        onChange={(e) => setPickupOption(e.target.value)}
                        className="w-4 h-4 text-emerald-500 border-stone-300 focus:ring-emerald-500 focus:ring-2"
                      />
                      <span className="ml-3 text-stone-700">No</span>
                    </label>
                  </div>
                </div>

                {/* Total */}
                <div className="border-t border-stone-200 pt-6">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-medium text-stone-700">Total</span>
                    <span className="text-2xl font-light text-stone-900">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-xs text-stone-500 mb-6">
                    Precios en dólares americanos US$
                  </div>

                  {/* Botón de reserva */}
                  <button
                    onClick={handleReservation}
                    disabled={!selectedDate || isLoading || cartLoading}
                    className="w-full bg-emerald-500 text-white py-4 hover:bg-emerald-600 disabled:bg-stone-400 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center space-x-2"
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
            <p className="text-sm opacity-90">{packageData.title} - {selectedDate}</p>
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