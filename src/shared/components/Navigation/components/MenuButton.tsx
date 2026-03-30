// src/shared/components/Navigation/components/MenuButton.tsx
interface MenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
  isScrolled?: boolean;
  className?: string;
}

export const MenuButton = ({ 
  isOpen, 
  onClick, 
  isScrolled = false,
  className = ""
}: MenuButtonProps) => {
  return (
    <button 
      onClick={onClick}
      className={`
        xl:hidden relative z-50 w-10 h-10 flex items-center justify-center 
        focus:outline-none focus:ring-2 focus:ring-secondary/50 rounded-lg
        transition-colors duration-300
        ${className}
      `}
      aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
      aria-expanded={isOpen}
    >
      <div className={`
        w-6 h-5 relative flex flex-col justify-between transition-colors
        ${isOpen ? "text-gray-800" : isScrolled ? "text-gray-800" : "text-white"}
      `}>
        <span className={`
          h-0.5 w-full bg-current transform transition-all duration-300 origin-left
          ${isOpen ? "rotate-45 translate-x-0.5" : ""}
        `} />
        <span className={`
          h-0.5 w-full bg-current transition-all duration-300
          ${isOpen ? "opacity-0" : ""}
        `} />
        <span className={`
          h-0.5 w-full bg-current transform transition-all duration-300 origin-left
          ${isOpen ? "-rotate-45 translate-x-0.5" : ""}
        `} />
      </div>
    </button>
  );
};