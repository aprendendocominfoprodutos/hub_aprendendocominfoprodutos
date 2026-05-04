import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';

interface CarouselItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  price: string;
  link: string;
  accentColor?: string;
}

interface CarouselProps {
  title: string;
  items: CarouselItem[];
  itemsPerView?: number;
}

export default function Carousel({ title, items, itemsPerView = 4 }: CarouselProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;

    const scrollAmount = 336; // Card width (320px) + gap (16px)
    const currentScroll = containerRef.current.scrollLeft;
    const newPosition = direction === 'left' 
      ? currentScroll - scrollAmount 
      : currentScroll + scrollAmount;

    containerRef.current.scrollTo({
      left: newPosition,
      behavior: 'smooth',
    });
  };

  const checkScroll = () => {
    if (!containerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      return () => container.removeEventListener('scroll', checkScroll);
    }
  }, []);

  return (
    <div className="py-12">
      {/* Título da Seção */}
      <div className="mb-6 flex items-center justify-between px-4">
        <h2 className="text-3xl font-bold text-white">{title}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`p-2 rounded-full transition-all ${
              canScrollLeft
                ? 'bg-amber-500 hover:bg-amber-600 text-white cursor-pointer'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`p-2 rounded-full transition-all ${
              canScrollRight
                ? 'bg-amber-500 hover:bg-amber-600 text-white cursor-pointer'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Carousel Container */}
      <div
        ref={containerRef}
        className="overflow-x-auto scroll-smooth flex gap-4 px-4"
        style={{ scrollBehavior: 'smooth', scrollSnapType: 'x mandatory' }}
      >
        {items.map((item) => (
          <Link key={item.id} href={item.link}>
            <a className="flex-shrink-0 w-80 group cursor-pointer" style={{ scrollSnapAlign: 'start' }}>
              {/* Card */}
              <div className="relative h-96 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                {/* Imagem */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />

                {/* Overlay Gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Conteúdo */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 text-white transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-200 mb-3">{item.subtitle}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-amber-400 font-bold text-lg">{item.price}</span>
                    <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                      Explorar
                    </button>
                  </div>
                </div>

                {/* Badge de Preço (sempre visível) */}
                <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {item.price}
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
