// src/features/stores/components/StoreHero.tsx
import React, { useState, useEffect } from "react";
import { svgs } from "@/mediaRoutes";

interface StoreHeroProps {
  store: {
    image: string;
    title: string;
    address: string;
    email: string;
    phone: string;
  };
  city: string;
  lang?: string;
}

const StoreHero: React.FC<StoreHeroProps> = ({ store, city, lang = "es" }) => {
  const isSpanish = lang === "es";
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = store.image;
    img.onload = () => setImageLoaded(true);
  }, [store.image]);

  return (
    <section 
      className="relative w-full flex items-center overflow-hidden bg-black"
      style={{ 
        height: '80vh',
        minHeight: '600px',
        backgroundColor: '#0a0a0a'
      }}
    >
      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
          style={{
            backgroundImage: `url(${store.image})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            opacity: imageLoaded ? 1 : 0,
          }}
        />
        
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse" />
        )}
      </div>

      {/* Gradiente mejorado */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 py-12">
        <div className="max-w-2xl">
          {/* Títulos */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              {store.title}
            </h1>
            <div className="flex items-center gap-3 mt-3">
              <span className="text-primary text-xl md:text-2xl font-semibold">
                {city}
              </span>
            </div>
          </div>

          {/* Línea decorativa */}
          <div className="w-16 h-1 bg-primary mb-8" />

          {/* Información de contacto - Mejorada */}
          <div className="space-y-5 mb-10">
            {/* Teléfono */}
            <a
              href={`https://wa.me/${store.phone.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-white/80 hover:text-white transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary transition-all duration-300 group-hover:scale-110">
                <img src={svgs.whatsapp} alt="WhatsApp" className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-white/50 uppercase tracking-wider mb-0.5">
                  {isSpanish ? "WHATSAPP" : "WHATSAPP"}
                </p>
                <span className="text-base md:text-lg font-medium">
                  {store.phone}
                </span>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${store.email}`}
              className="flex items-center gap-4 text-white/80 hover:text-white transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary transition-all duration-300 group-hover:scale-110">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-white/50 uppercase tracking-wider mb-0.5">
                  {isSpanish ? "CORREO ELECTRÓNICO" : "EMAIL"}
                </p>
                <span className="text-base md:text-lg break-all">
                  {store.email}
                </span>
              </div>
            </a>

            {/* Ubicación */}
            <div className="flex items-start gap-4 text-white/80">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-white/50 uppercase tracking-wider mb-0.5">
                  {isSpanish ? "UBICACIÓN" : "LOCATION"}
                </p>
                <p className="text-base md:text-lg leading-relaxed max-w-md whitespace-pre-line">
                  {store.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreHero;