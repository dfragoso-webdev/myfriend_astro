// src/shared/components/Navigation/components/NavLinks.tsx
import { useMemo } from "react";

interface NavLinksProps {
  items: Array<{ href: string; label: string }>;
  activeItem: string;
  isScrolled: boolean;
  onItemClick: (href: string) => void;
  orientation?: 'horizontal' | 'vertical';
  isMobile?: boolean;
}

export const NavLinks = ({ 
  items, 
  activeItem, 
  isScrolled, 
  onItemClick, 
  orientation = 'horizontal',
  isMobile = false 
}: NavLinksProps) => {
  const containerClass = orientation === 'horizontal' 
    ? "flex items-center gap-1" 
    : "flex flex-col gap-1";

  return (
    <div className={containerClass}>
      {items.map((item) => (
        <NavLink
          key={item.href}
          item={item}
          active={activeItem === item.href}
          isScrolled={isScrolled}
          onClick={onItemClick}
          orientation={orientation}
          isMobile={isMobile}
        />
      ))}
    </div>
  );
};

const NavLink = ({ item, active, isScrolled, onClick, orientation, isMobile }: any) => {
  const getTextColor = () => {
    if (orientation === 'vertical') {
      return 'text-gray-800 hover:text-secondary';
    }
    
    if (isScrolled) {
      return 'text-gray-800 hover:text-secondary';
    }
    
    return 'text-white/90 hover:text-white';
  };

  const mobileTextColor = isMobile && orientation === 'vertical' && !active 
    ? 'text-gray-500' 
    : '';

  return (
    <a
      href={item.href}
      onClick={(e) => {
        e.preventDefault();
        onClick(item.href);
      }}
      className={`
        relative transition-all duration-300 group overflow-hidden
        ${orientation === 'horizontal' 
          ? 'px-4 py-2 text-sm font-medium rounded-full' 
          : 'py-3 px-6 rounded-2xl text-sm sm:text-base font-medium flex justify-between items-center'
        }
        ${getTextColor()}
        ${mobileTextColor}
        ${active && orientation === 'vertical' ? "bg-secondary text-white shadow-md" : ""}
        ${active && orientation === 'vertical' ? "hover:bg-secondary/90" : "hover:bg-gray-50/80"}
      `}
    >
      <span className={`absolute inset-0 rounded-full transition-transform duration-300 scale-0 group-hover:scale-100 -z-10 ${
        isScrolled ? "bg-secondary/5" : "bg-white/10"
      }`} />
      {active && orientation === 'horizontal' && (
        <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full ${
          isScrolled ? "bg-secondary" : "bg-white"
        }`} />
      )}
      <span className="relative z-10">{item.label}</span>
      {active && orientation === 'vertical' && <span className="w-2 h-2 bg-white rounded-full" />}
    </a>
  );
};