// src/shared/components/Navigation/Navbar.tsx
import { useEffect, useState, useMemo, useCallback } from "react";
import { LanguageSwitcher } from "@/shared/ui/LanguageSwitcher/LanguageSwitcher";
import { useTranslation } from "@/i18n";
import { images } from "@/mediaRoutes";

export default function Navbar() {
  const { t } = useTranslation('navbar');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("#home");

  // Items del menú con traducciones en tiempo real
  const NAV_ITEMS = useMemo(() => [
    { href: "#home", label: t('home') },
    { href: "#about-us", label: t('about_us') },
    { href: "#stores", label: t('stores') },
    { href: "#premium-select", label: t('premium_select') },
    { href: "#products", label: t('products') },
    { href: "#home-service", label: t('home_service') },
    { href: "#follow-us", label: t('follow_us') },
  ], [t]);

  // Scroll spy y fondo
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const scrollPosition = window.scrollY + 120;
      const currentSection = [...NAV_ITEMS].reverse().find((item) => {
        const el = document.querySelector(item.href) as HTMLElement;
        return el && scrollPosition >= el.offsetTop;
      });
      if (currentSection) setActiveItem(currentSection.href);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [NAV_ITEMS]);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    setActiveItem(href);

    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
      window.history.pushState({}, "", href);
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-20 transition-all duration-500 ease-in-out ${
        isScrolled 
          ? "bg-white/90 backdrop-blur-xl shadow-lg border-b border-white/20 py-2" 
          : "bg-secondary py-4"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <Logo isScrolled={isScrolled} mobileOpen={mobileOpen} onClick={(e: any) => handleNavClick(e, "#home")} />

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <NavLink 
                key={item.href} 
                item={item} 
                active={activeItem === item.href} 
                isScrolled={isScrolled} 
                onClick={handleNavClick} 
              />
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden xl:flex items-center gap-2 lg:gap-3">
            <BranchSelector isScrolled={isScrolled} label={t('branches')} />
            <div className={`transition-opacity duration-300 ${isScrolled ? "opacity-100" : "opacity-90"}`}>
              <LanguageSwitcher />
            </div>
          </div>

          {/* Mobile Toggle */}
          <button 
            onClick={() => setMobileOpen(!mobileOpen)}
            className="xl:hidden relative z-50 w-10 h-10 flex items-center justify-center focus:outline-none"
          >
            <MenuIcon isOpen={mobileOpen} isScrolled={isScrolled} />
          </button>
        </div>
      </nav>

      <MobileMenu 
        isOpen={mobileOpen} 
        items={NAV_ITEMS} 
        activeItem={activeItem} 
        onClose={() => setMobileOpen(false)} 
        onItemClick={handleNavClick}
        branchLabel={t('branches')}
      />
    </>
  );
}

// Subcomponentes (sin cambios, solo se adapta el uso de branchLabel)
const Logo = ({ isScrolled, mobileOpen, onClick }: any) => (
  <a href="#home" onClick={onClick} className="relative z-50 group flex-shrink-0">
    <img
      src={images.mfLogo}
      alt="MyFriend"
      className={`transition-all duration-700 ease-out transform group-hover:scale-105 ${
        isScrolled ? "w-20 sm:w-24 xl:w-24" : "w-24 sm:w-28 xl:w-32"
      } ${mobileOpen ? "opacity-0 xl:opacity-100" : "opacity-100"}`}
    />
  </a>
);

const NavLink = ({ item, active, isScrolled, onClick }: any) => (
  <a
    href={item.href}
    onClick={(e) => onClick(e, item.href)}
    className={`px-4 py-2 text-sm font-medium rounded-full relative transition-all duration-300 group overflow-hidden ${
      isScrolled ? "text-gray-700 hover:text-secondary" : "text-white/90 hover:text-white"
    }`}
  >
    <span className={`absolute inset-0 rounded-full transition-transform duration-300 scale-0 group-hover:scale-100 -z-10 ${
      isScrolled ? "bg-secondary/5" : "bg-white/10"
    }`} />
    {active && (
      <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full ${
        isScrolled ? "bg-secondary" : "bg-white"
      }`} />
    )}
    <span className="relative z-10">{item.label}</span>
  </a>
);

const BranchSelector = ({ isScrolled, label }: any) => (
  <div className="relative group">
    <select
      defaultValue=""
      className={`appearance-none rounded-full px-4 py-2 pr-9 text-sm cursor-pointer transition-all border outline-none ${
        isScrolled 
          ? "bg-gray-50 border-gray-200 text-gray-700 hover:border-secondary" 
          : "bg-white/10 border-white/20 text-white hover:bg-white/20"
      }`}
    >
      <option value="" disabled className="text-gray-800">{label ?? "Sucursales"}</option>
      <option value="royal" className="text-gray-800">Royal Hideway</option>
    </select>
    <div className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${
      isScrolled ? "text-gray-500" : "text-white/70"
    }`}>
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
);

const MenuIcon = ({ isOpen, isScrolled }: any) => (
  <div className={`w-6 h-5 relative flex flex-col justify-between transition-colors ${
    isOpen ? "text-gray-800" : isScrolled ? "text-gray-800" : "text-white"
  }`}>
    <span className={`h-0.5 w-full bg-current transform transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
    <span className={`h-0.5 w-full bg-current transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
    <span className={`h-0.5 w-full bg-current transform transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
  </div>
);

const MobileMenu = ({ isOpen, items, activeItem, onClose, onItemClick, branchLabel }: any) => (
  <div className={`fixed inset-0 z-40 xl:hidden transition-all duration-500 ${isOpen ? "visible" : "invisible"}`}>
    <div 
      className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-0"}`} 
      onClick={onClose} 
    />
    <div className={`absolute top-0 right-0 w-full max-w-sm h-full bg-white shadow-2xl transition-transform duration-500 ease-out flex flex-col ${
      isOpen ? "translate-x-0" : "translate-x-full"
    }`}>
      <div className="p-6 flex justify-between items-center border-b">
        <img src={images.mfLogo} alt="Logo" className="w-24 sm:w-28" />
        <button onClick={onClose} className="p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-1">
        {items.map((item: any, idx: number) => (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => onItemClick(e, item.href)}
            style={{ transitionDelay: `${idx * 50}ms` }}
            className={`py-3 px-6 rounded-2xl text-sm sm:text-sm font-medium transition-all duration-300 flex justify-between items-center ${
              activeItem === item.href 
                ? "bg-secondary text-white shadow-md" 
                : "text-gray-700 hover:bg-gray-50"
            } ${isOpen ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}
          >
            {item.label}
            {activeItem === item.href && <span className="w-2 h-2 bg-white rounded-full" />}
          </a>
        ))}
      </div>

      <div className="p-5 sm:p-6 bg-gray-50 border-t border-gray-100 space-y-4">
        <div className="relative">
          <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm sm:text-sm appearance-none outline-none focus:ring-2 focus:ring-secondary/20">
            <option value="" disabled selected>{branchLabel ?? "Sucursales"}</option>
            <option value="royal">Royal Hideway</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M19 9l-7 7-7-7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
          <LanguageSwitcher />
      </div>
    </div>
  </div>
);