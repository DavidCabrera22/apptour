import Image from "next/image";
import Link from "next/link";

export default function ExploreCategories() {
  const categories = [
    { title: "Aventura", img: "/images/jungle-adventure.jpg" },
    { title: "Cultural", img: "/images/cenote-experience.jpg" },
    { title: "Marino", img: "/images/hero-beach.jpg" },
    { title: "Extremo", img: "/images/jungle-adventure.jpg" },
  ];

  return (
    <section
      id="categories"
      aria-labelledby="explore-categories"
      className="container mx-auto px-4 md:px-6 lg:px-10 py-20"
    >
      <h3
        id="explore-categories"
        className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-900"
      >
        Explora nuestras categorías
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
        {categories.map((c) => (
          <article
            key={c.title}
            className="relative rounded-xl overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-emerald-400"
          >
            <div className="relative h-40 sm:h-44">
              <Image
                src={c.img}
                alt={c.title}
                fill
                className="object-cover object-center"
              />
            </div>

            <div className="absolute bottom-3 left-3 right-3">
              <div className="bg-white/95 px-3 py-2 rounded-md flex items-center justify-between border border-gray-100">
                <span className="font-medium text-sm text-gray-900">
                  {c.title}
                </span>
                <Link
                  href="#"
                  className="text-xs text-emerald-600 font-semibold"
                >
                  Ver
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
