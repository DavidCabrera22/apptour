import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...');

  // Crear paquetes turísticos
  const packages = [
    {
      title: 'Aventura en Cartagena',
      description: 'Explora la ciudad amurallada, disfruta de playas paradisíacas y sumérgete en la cultura caribeña de Cartagena. Incluye tours históricos, paseos en lancha por las islas y cenas en restaurantes típicos.',
      price: 850.00,
      duration: 5,
      maxPeople: 15,
      location: 'Cartagena, Colombia',
      imageUrl: 'https://images.unsplash.com/photo-1568632234157-ce7aecd03d0d',
      itinerary: [
        {
          day: 1,
          title: 'Llegada y City Tour',
          description: 'Recepción en el aeropuerto, check-in en hotel boutique en el centro histórico. Por la tarde, tour guiado por la Ciudad Amurallada, visitando el Castillo San Felipe y las murallas.',
        },
        {
          day: 2,
          title: 'Playas e Islas del Rosario',
          description: 'Excursión en lancha a las Islas del Rosario. Snorkel, almuerzo en la playa y tiempo libre para nadar. Regreso al atardecer.',
        },
        {
          day: 3,
          title: 'Tour Cultural y Gastronómico',
          description: 'Visita al Palacio de la Inquisición y Museo del Oro. Por la noche, cena en restaurante gourmet con cocina fusión caribeña.',
        },
        {
          day: 4,
          title: 'Playa Blanca y Relax',
          description: 'Día completo en Playa Blanca en Barú. Almuerzo incluido, actividades acuáticas opcionales. Noche libre en Getsemaní.',
        },
        {
          day: 5,
          title: 'Despedida',
          description: 'Mañana libre para compras de souvenirs. Traslado al aeropuerto.',
        },
      ],
    },
    {
      title: 'Magia del Eje Cafetero',
      description: 'Descubre los paisajes cafeteros de Colombia, visita fincas tradicionales, disfruta del Valle de Cocora y relájate en aguas termales. Una experiencia inolvidable entre montañas y café.',
      price: 1200.00,
      duration: 6,
      maxPeople: 12,
      location: 'Eje Cafetero, Colombia',
      imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19',
      itinerary: [
        {
          day: 1,
          title: 'Llegada a Pereira',
          description: 'Recepción en el aeropuerto de Pereira, traslado al hotel. Cena de bienvenida con degustación de café.',
        },
        {
          day: 2,
          title: 'Tour del Café',
          description: 'Visita a una finca cafetera tradicional. Aprende todo el proceso del café: desde la semilla hasta la taza. Almuerzo campestre incluido.',
        },
        {
          day: 3,
          title: 'Valle de Cocora',
          description: 'Excursión al Valle de Cocora para ver las palmas de cera. Caminata ecológica por el bosque nublado. Visita al pueblo de Salento.',
        },
        {
          day: 4,
          title: 'Aguas Termales de Santa Rosa',
          description: 'Día de relax en las termas de Santa Rosa de Cabal. Spa natural, piscinas termales y tratamientos opcionales.',
        },
        {
          day: 5,
          title: 'Parque del Café',
          description: 'Día completo en el Parque del Café. Atracciones mecánicas, shows culturales y más degustaciones de café.',
        },
        {
          day: 6,
          title: 'Regreso',
          description: 'Desayuno y traslado al aeropuerto. Fin del tour.',
        },
      ],
    },
    {
      title: 'Tayrona y Santa Marta Mágica',
      description: 'Combina playas vírgenes del Parque Tayrona con la historia de Santa Marta, la ciudad más antigua de Colombia. Incluye senderismo, playas paradisíacas y cultura indígena.',
      price: 950.00,
      duration: 4,
      maxPeople: 20,
      location: 'Santa Marta, Colombia',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
      itinerary: [
        {
          day: 1,
          title: 'Llegada a Santa Marta',
          description: 'Recepción en el aeropuerto, traslado al hotel en el Rodadero. Tarde libre en la playa.',
        },
        {
          day: 2,
          title: 'Parque Tayrona - Día 1',
          description: 'Ingreso temprano al Parque Tayrona. Caminata hasta Cabo San Juan pasando por las playas Cañaveral y Arrecifes. Noche en ecohabs dentro del parque.',
        },
        {
          day: 3,
          title: 'Parque Tayrona - Día 2',
          description: 'Amanecer en Cabo San Juan, baño en la playa y snorkel. Regreso a Santa Marta por la tarde. Cena en el centro histórico.',
        },
        {
          day: 4,
          title: 'Despedida',
          description: 'Tour por el centro histórico de Santa Marta. Visita a la Quinta de San Pedro Alejandrino. Traslado al aeropuerto.',
        },
      ],
    },
    {
      title: 'Bogotá Colonial y Moderna',
      description: 'Explora la capital colombiana: desde La Candelaria histórica hasta la modernidad de la Zona T. Incluye Monserrate, museos de clase mundial y gastronomía de alto nivel.',
      price: 600.00,
      duration: 3,
      maxPeople: 25,
      location: 'Bogotá, Colombia',
      imageUrl: 'https://images.unsplash.com/photo-1568632234157-ce7aecd03d0d',
      itinerary: [
        {
          day: 1,
          title: 'Bogotá Histórica',
          description: 'Tour por La Candelaria: Plaza Bolívar, Museo del Oro, Casa de la Moneda. Almuerzo en restaurante típico. Ascenso a Monserrate al atardecer.',
        },
        {
          day: 2,
          title: 'Arte y Cultura',
          description: 'Visita al Museo Botero y Museo Nacional. Tarde de compras en la Zona Rosa. Cena en restaurante gourmet.',
        },
        {
          day: 3,
          title: 'Zipaquirá y Despedida',
          description: 'Excursión a la Catedral de Sal de Zipaquirá. Almuerzo en el pueblo. Regreso a Bogotá y traslado al aeropuerto.',
        },
      ],
    },
    {
      title: 'Amazonas Salvaje',
      description: 'Adéntrate en la selva amazónica desde Leticia. Experimenta la vida silvestre, comunidades indígenas y la triple frontera. Una aventura única en uno de los pulmones del planeta.',
      price: 1500.00,
      duration: 7,
      maxPeople: 10,
      location: 'Leticia, Amazonas, Colombia',
      imageUrl: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5',
      itinerary: [
        {
          day: 1,
          title: 'Llegada a Leticia',
          description: 'Vuelo a Leticia, check-in en hotel. Tarde libre para explorar el malecón del río Amazonas.',
        },
        {
          day: 2,
          title: 'Triple Frontera',
          description: 'Tour por la triple frontera: Colombia, Brasil y Perú. Visita a Tabatinga (Brasil) e isla de Santa Rosa (Perú).',
        },
        {
          day: 3,
          title: 'Comunidad Indígena',
          description: 'Visita a comunidad indígena tikuna. Aprende sobre sus tradiciones, artesanías y cosmovisión. Almuerzo tradicional.',
        },
        {
          day: 4,
          title: 'Selva Profunda',
          description: 'Expedición en lancha río arriba. Avistamiento de delfines rosados. Noche en lodge en medio de la selva.',
        },
        {
          day: 5,
          title: 'Caminata Nocturna',
          description: 'Caminata diurna por la selva con guía experto. Por la noche, safari nocturno para observar fauna.',
        },
        {
          day: 6,
          title: 'Pesca Pirañas',
          description: 'Excursión de pesca de pirañas. Visita al Victoria amazónica. Regreso a Leticia.',
        },
        {
          day: 7,
          title: 'Despedida Amazónica',
          description: 'Mañana libre, compra de artesanías. Vuelo de regreso.',
        },
      ],
    },
  ];

  for (const pkg of packages) {
    const { itinerary, ...packageData } = pkg;
    
    const createdPackage = await prisma.tourPackage.create({
      data: {
        ...packageData,
        itinerary: {
          create: itinerary,
        },
      },
    });

    console.log(`✅ Paquete creado: ${createdPackage.title}`);
  }

  console.log('🎉 Seed completado exitosamente!');
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
