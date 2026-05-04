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
}

interface AutoCarouselProps {
  items: CarouselItem[];
  autoRotateInterval?: number;
}

export default function AutoCarousel({ items, autoRotateInterval = 5000 }: AutoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoRotateRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isAutoRotating) return;

    autoRotateRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, autoRotateInterval);

    return () => {
      if (autoRotateRef.current !== null) {
        window.clearInterval(autoRotateRef.current);
      }
    };
  }, [isAutoRotating, items.length, autoRotateInterval]);

  const pauseAutoRotate = () => {
    setIsAutoRotating(false);
    if (autoRotateRef.current !== null) {
      window.clearInterval(autoRotateRef.current);
    }
  };

  const resumeAutoRotate = () => {
    setIsAutoRotating(true);
  };

  const goToPrevious = () => {
    pauseAutoRotate();
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    setTimeout(resumeAutoRotate, 5000);
  };

  const goToNext = () => {
    pauseAutoRotate();
    setCurrentIndex((prev) => (prev + 1) % items.length);
    setTimeout(resumeAutoRotate, 5000);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEnd(e.changedTouches[0].clientX);
    handleSwipe(e.changedTouches[0].clientX);
  };

  const handleSwipe = (endX: number) => {
    if (touchStart === null) return;

    const distance = touchStart - endX;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  const currentItem = items[currentIndex];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-96 md:h-[500px] rounded-xl overflow-hidden shadow-2xl"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={pauseAutoRotate}
      onMouseLeave={resumeAutoRotate}
    >
      <Link href={currentItem.link}>
        <a className="block w-full h-full">
          <div className="relative w-full h-full cursor-pointer">
            <img
              src={currentItem.image}
              alt={currentItem.title}
              className="w-full h-full object-cover transition-opacity duration-500"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />

            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: 'Poppins' }}>
                {currentItem.title}
              </h2>
              <p className="text-lg text-gray-200 mb-4">
                {currentItem.subtitle}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-amber-400 font-bold text-2xl">{currentItem.price}</span>
                <span className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                  Explorar
                </span>
              </div>
            </div>

            <div className="absolute top-4 right-4 bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-bold">
              {currentItem.price}
            </div>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {items.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    pauseAutoRotate();
                    setCurrentIndex(index);
                    setTimeout(resumeAutoRotate, 5000);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-amber-500 w-8'
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </a>
      </Link>

      <button
        onClick={(e) => {
          e.preventDefault();
          goToPrevious();
        }}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-amber-500 hover:bg-amber-600 text-white rounded-full transition-colors shadow-lg"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={(e) => {
          e.preventDefault();
          goToNext();
        }}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-amber-500 hover:bg-amber-600 text-white rounded-full transition-colors shadow-lg"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute top-4 left-4 text-white text-xs bg-black/50 px-3 py-1 rounded-full">
        {currentIndex + 1} / {items.length}
      </div>
    </div>
  );
}
