// src/shared/ui/LanguageSwitcher/LanguageSwitcher.tsx
import { useState, useRef, useEffect } from "react";
import { useTranslation, LANGUAGE_META, type Language } from "@/i18n";
import { cn } from "@/shared/lib/cn";

interface LanguageSwitcherProps {
  onChange?: () => void;
  mobile?: boolean;
  onSelect?: () => void;
  className?: string;
}

export function LanguageSwitcher({ 
  onChange, 
  mobile = false, 
  onSelect,
  className = "" 
}: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Usar el hook de traducción
  const { currentLang, changeLanguage } = useTranslation();

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const current = LANGUAGE_META[currentLang];

  // Click fuera para desktop
  useEffect(() => {
    if (isMobile) return;
    
    function onClickOutside(e: MouseEvent) {
      if (open && containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open, isMobile]);

  // ESC key
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const handleLanguageChange = (code: Language) => {
    changeLanguage(code);
    
    if (onChange) onChange();
    if (onSelect) onSelect();
    setOpen(false);
  };

  // VERSIÓN MÓVIL
  if (mobile || isMobile) {
    return (
      <div className={`relative w-fit group ${className}`}>
        <select
          value={currentLang}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
            handleLanguageChange(e.target.value as Language)
          }
          className="w-full appearance-none bg-gradient-to-b from-white to-gray-50/80 border border-gray-200 rounded-2xl px-8 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#A91D3A]/20 focus:border-[#A91D3A] cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
          aria-label="Seleccionar idioma"
        >
          {Object.entries(LANGUAGE_META).map(([code, { label, flag }]) => (
            <option key={code} value={code}>
              {flag} {label}
            </option>
          ))}
        </select>
        
        
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <div className="relative">
            <svg className="w-4 h-4 text-gray-400 group-hover:text-[#A91D3A] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  // VERSIÓN DESKTOP
  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex items-center gap-3 rounded-full px-5 py-2.5 text-sm transition-all duration-300",
          "border border-gray-200/80 hover:border-[#A91D3A]/30",
          "bg-white shadow-sm hover:shadow-md",
          "relative overflow-hidden group",
          open && "border-[#A91D3A] shadow-lg shadow-[#A91D3A]/10"
        )}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-[#A91D3A]/0 via-[#A91D3A]/5 to-[#A91D3A]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
        
        <span className="relative text-lg filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300">
          {current.flag}
        </span>
        
        <span className="font-medium text-gray-700 group-hover:text-[#A91D3A] transition-colors duration-300">
          {current.label}
        </span>
        
        <svg 
          className={cn(
            "w-4 h-4 text-gray-500 transition-all duration-300",
            open ? "rotate-180 text-[#A91D3A]" : "group-hover:text-[#A91D3A]"
          )} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <ul
        className={cn(
          "absolute right-0 mt-3 w-56 rounded-2xl border border-gray-100 bg-white shadow-xl z-50",
          "transition-all duration-300 origin-top-right",
          "max-h-[350px] overflow-y-auto custom-scrollbar",
          "divide-y divide-gray-100",
          open
            ? "opacity-100 scale-100 translate-y-0 visible"
            : "opacity-0 scale-95 -translate-y-2 invisible pointer-events-none"
        )}
        role="listbox"
      >
        {Object.entries(LANGUAGE_META).map(([code, { label, flag }], index) => (
          <li
            key={code}
            onClick={() => handleLanguageChange(code as Language)}
            className={cn(
              "cursor-pointer px-4 py-3.5 text-sm transition-all duration-300",
              "flex items-center gap-3 relative overflow-hidden group",
              "hover:pl-6",
              code === currentLang 
                ? "bg-gradient-to-r from-[#A91D3A]/5 to-transparent text-[#A91D3A] font-medium" 
                : "hover:bg-gray-50/80 text-gray-700"
            )}
            style={{ transitionDelay: `${index * 30}ms` }}
            role="option"
            aria-selected={code === currentLang}
          >
            <span className={cn(
              "absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-[#A91D3A] to-[#8B1E3A] transition-all duration-300",
              code === currentLang ? "opacity-100" : "opacity-0 group-hover:opacity-0"
            )} />
            
            <span className={cn(
              "text-lg filter transition-all duration-300",
              code === currentLang ? "scale-110" : "group-hover:scale-110"
            )}>
              {flag}
            </span>
            
            <span className="flex-1">{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}