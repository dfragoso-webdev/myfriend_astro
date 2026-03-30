// src/features/landing/components/Branches/BranchCard.tsx
import { svgs } from "@/mediaRoutes";
import { ProgressiveImage } from "@/shared/ui/ProgressiveImage/ProgressiveImage";
import { slugify } from "@/utils/slugify";

interface BranchCardProps {
  branch: {
    image: string;
    title: string;
    address: string;
    email: string;
    phone: string;
  };
  cityId: string;
  index: number;
  lang?: string;
}

const BranchCard = ({ branch, cityId, index, lang = "es" }: BranchCardProps) => {
  const imageSrc = branch.image;
  const storeSlug = slugify(branch.title);
  
  const handleCardClick = () => {
    if (!cityId || !storeSlug) {
      console.error('Error: cityId o storeSlug es undefined', { cityId, storeSlug });
      return;
    }
    const url = `/${lang}/${cityId}/${storeSlug}`;
    window.location.href = url;
  };

  return (
    <div 
      className="group relative w-full h-[420px] rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
      onClick={handleCardClick}
    >
      <ProgressiveImage
        src={imageSrc}
        alt={branch.title}
        width={600}
        height={420}
        className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-110"
        placeholderColor="#1a1a1a"
        loading="lazy"
        fetchPriority="auto"
        decoding="async"
        objectFit="cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      {/* Contenido */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
        <div className="mb-4">
          <h3 className="text-xl md:text-2xl font-bold mb-2 line-clamp-1 tracking-tight">
            {branch.title}
          </h3>
        </div>

        <div className="mb-4">
          <div className="flex items-start gap-2 text-white/80">
            <svg
              className="w-4 h-4 mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-sm md:text-base leading-relaxed line-clamp-2">
              {branch.address}
            </p>
          </div>
        </div>

        <div className="space-y-2 mb-5">
          <a
            href={`mailto:${branch.email}`}
            className="flex items-center gap-2 text-sm md:text-base text-white/70 hover:text-white transition-all duration-300 group/email"
            onClick={(e) => e.stopPropagation()}
          >
            <svg
              className="w-4 h-4 flex-shrink-0 group-hover/email:scale-110 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="truncate">{branch.email}</span>
          </a>

          <a
            href={`https://wa.me/${branch.phone.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm md:text-base text-white/70 hover:text-white transition-all duration-300 group/phone"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={svgs.whatsapp}
              alt=""
              className="w-4 h-4 group-hover/phone:scale-110 transition-transform"
            />
            <span>{branch.phone}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default BranchCard;