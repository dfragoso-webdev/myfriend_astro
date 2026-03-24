// src/features/landing/components/FollowUs/FollowUs.tsx
import { svgs } from "@/mediaRoutes";
import { useState, useEffect } from "react";
import { useTranslation } from "@/i18n";

interface SocialIcon {
  src: string;
  alt: string;
  color: string;
  url: string;
  stats: string;
}

interface MousePosition {
  x: number;
  y: number;
}

const FollowUs = () => {
  const { t } = useTranslation('followUs');   // ← cambiamos a 'followUs'
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 50,
    y: 50,
  });
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const socialIcons: SocialIcon[] = [
    {
      src: svgs.fbIcon,
      alt: "Facebook",
      color: "from-blue-600 to-blue-700",
      url: "https://facebook.com",
      stats: "355",
    },
    {
      src: svgs.tiktokIcon,
      alt: "TikTok",
      color: "from-black to-gray-800",
      url: "https://tiktok.com",
      stats: "10.2K",
    },
    {
      src: svgs.igIcon,
      alt: "Instagram",
      color: "from-pink-500 via-purple-500 to-orange-500",
      url: "https://instagram.com",
      stats: "5.8K",
    },
  ];

  return (
    <section className="relative w-full py-20 px-4 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Elementos decorativos de fondo */}
      <div
        className="absolute inset-0 opacity-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59,130,246,0.1) 0%, transparent 50%)`,
        }}
      />

      {/* Patrón de puntos */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      {/* Contenido principal */}
      <div
        className={`
          relative z-10 max-w-6xl mx-auto 
          transition-all duration-1000 transform 
          ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
        `}
      >
        {/* Encabezado */}
        <div className="text-center mb-16">
          {/* Título principal con gradiente */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-primary bg-clip-text">
              {t('follow_us_title')}
            </span>
          </h1>

          {/* Descripción */}
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t('follow_us_text')}
          </p>
        </div>

        {/* Grid de redes sociales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
          {socialIcons.map((icon, index) => (
            <a
              key={icon.alt}
              href={icon.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              style={{
                animationDelay: `${index * 150}ms`,
                animation: isVisible
                  ? "fadeInUp 0.6s ease-out forwards"
                  : "none",
              }}
              aria-label={`Síguenos en ${icon.alt}`}
            >
              {/* Efecto de brillo detrás */}
              <div
                className={`
                  absolute -inset-1 bg-gradient-to-r 
                  rounded-2xl blur-xl opacity-0 group-hover:opacity-70 
                  transition duration-500
                `}
                aria-hidden="true"
              />

              {/* Contenedor principal */}
              <div className="relative p-8 transform hover:-translate-y-2 transition-transform duration-500">
                {/* Círculo decorativo */}
                <div
                  className={`
                    absolute top-0 right-0 w-24 h-24 
                    rounded-full filter blur-3xl opacity-0 group-hover:opacity-20 
                    transition duration-500
                  `}
                  aria-hidden="true"
                />

                {/* Contenido */}
                <div className="relative z-10">
                  {/* Icono con animación */}
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <div
                        className={`
                          relative w-24 h-24 bg-gradient-to-br ${icon.color} 
                          rounded-2xl flex items-center justify-center
                          group-hover:scale-110 transition-transform duration-300
                        `}
                      >
                        <img
                          src={icon.src}
                          alt=""
                          className="w-10 h-10 md:w-12 md:h-12 filter brightness-0 invert"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Estadísticas */}
                  <div className="flex items-center justify-center gap-2 text-gray-600">
                    <span className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                      {icon.stats}
                    </span>
                    <span className="text-sm">{t('followers')}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Estilos para animaciones */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </section>
  );
};

export default FollowUs;