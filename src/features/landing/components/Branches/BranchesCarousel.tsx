// src/features/landing/components/BranchesCarousel.tsx
import { useEffect, useRef, useState } from "react";
import BranchCard from "./BranchCard";
import { FadeInItem } from "@/shared/ui/Animation/FadeInItem";

interface Branch {
  image: string;
  title: string;
  address: string;
  email: string;
  phone: string;
}

interface BranchesCarouselProps {
  branches: Branch[];
  lang?: string;
}

const BranchesCarousel = ({ branches, lang = "es" }: BranchesCarouselProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const isSpanish = lang === "es";
  const totalPages = Math.ceil(branches.length / cardsPerView);

  useEffect(() => {
    const calculateCardsPerView = () => {
      const width = window.innerWidth;
      if (width >= 1280) return 3;
      if (width >= 1024) return 3;
      if (width >= 768) return 2;
      return 1;
    };
    
    const handleResize = () => {
      setCardsPerView(calculateCardsPerView());
      setCurrentPage(0);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getCurrentPageCards = () => {
    const start = currentPage * cardsPerView;
    const end = start + cardsPerView;
    return branches.slice(start, end);
  };

  const goToPage = (page: number) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentPage(Math.max(0, Math.min(page, totalPages - 1)));
    
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 400);
  };

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);

  if (!branches?.length) return null;

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Grid de cards con animaciones */}
      <div className="px-4 md:px-6 lg:px-8">
        <div 
          key={currentPage}
          className={`
            grid gap-6 md:gap-8
            ${cardsPerView === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : ''}
            ${cardsPerView === 2 ? 'grid-cols-1 md:grid-cols-2' : ''}
            ${cardsPerView === 1 ? 'grid-cols-1 max-w-md mx-auto' : ''}
          `}
        >
          {getCurrentPageCards().map((branch, idx) => (
            <FadeInItem 
              key={`${currentPage}-${idx}`}
              delay={idx * 100}
              animation="slideUp"
            >
              <BranchCard 
                branch={branch}
                index={currentPage * cardsPerView + idx}
                lang={lang}
              />
            </FadeInItem>
          ))}
        </div>
      </div>

      {/* Navegación */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-6 mt-10 md:mt-12">
          <button
            onClick={prevPage}
            disabled={currentPage === 0 || isAnimating}
            className={`
              flex items-center justify-center w-10 h-10 rounded-full
              transition-all duration-300
              ${currentPage === 0 || isAnimating
                ? 'bg-white/10 text-white/30 cursor-not-allowed' 
                : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white hover:text-primary hover:scale-110 border border-white/20'
              }
            `}
            aria-label={isSpanish ? "Anterior" : "Previous"}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToPage(idx)}
                disabled={isAnimating}
                className={`
                  rounded-full transition-all duration-300
                  ${idx === currentPage 
                    ? 'w-8 h-2 bg-white' 
                    : 'w-2 h-2 bg-white/40 hover:bg-white/60'
                  }
                  ${isAnimating ? 'cursor-wait' : ''}
                `}
                aria-label={`Ir a página ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages - 1 || isAnimating}
            className={`
              flex items-center justify-center w-10 h-10 rounded-full
              transition-all duration-300
              ${currentPage === totalPages - 1 || isAnimating
                ? 'bg-white/10 text-white/30 cursor-not-allowed' 
                : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white hover:text-primary hover:scale-110 border border-white/20'
              }
            `}
            aria-label={isSpanish ? "Siguiente" : "Next"}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default BranchesCarousel;