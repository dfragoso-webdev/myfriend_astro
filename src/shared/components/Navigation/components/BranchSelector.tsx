// src/shared/components/Navigation/components/BranchSelector.tsx
import { useState, useRef, useEffect } from "react";

interface BranchSelectorProps {
  variant?: "desktop" | "mobile";
  isScrolled?: boolean;
  label?: string;
  onChange?: (value: string) => void;
  lang?: string;
}

const branches = [
  {
    value: "royal",
    label: "Royal Hideaway",
    /*
      href: ruta a la que navega al seleccionar esta sucursal.
      Undefined = comportamiento anterior (solo llama onChange).
      Con href definido, navega directamente usando window.location.
    */
    href: "/rhid",
  },
];

export const BranchSelector = ({
  variant = "desktop",
  isScrolled = false,
  label = "Sucursales",
  onChange,
  lang,
}: BranchSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const handleSelect = (value: string, href?: string) => {
    setSelected(value);
    onChange?.(value);
    setOpen(false);

    if (href) {
      /*
        Navegación a la feature de sucursal.
        Usamos window.location.href en lugar de un <a> para mantener
        la misma API de selección (onChange, setSelected) antes de navegar.
        Si en el futuro usas un router como React Router o Astro View Transitions,
        reemplaza esto con el navigate() correspondiente.
      */
      window.location.href = lang ? `/${lang}${href}` : href;
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const baseStyles =
    variant === "mobile"
      ? "w-full rounded-xl px-4 py-3"
      : "rounded-full px-4 py-2";

  const triggerStyles = `
    ${baseStyles}
    flex items-center justify-between gap-3
    text-sm transition-all cursor-pointer border
    ${
      isScrolled
        ? "bg-white border-gray-200 text-gray-700 hover:border-secondary shadow-sm"
        : "bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-md"
    }
  `;

  return (
    <div ref={ref} className={`relative ${variant === "mobile" ? "w-full" : ""}`}>
      {/* Trigger */}
      <div className={triggerStyles} onClick={() => setOpen(!open)}>
        <span className={selected ? "" : "opacity-70"}>
          {selected
            ? branches.find((b) => b.value === selected)?.label
            : label}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Dropdown */}
      {open && (
        <div
          className="
            absolute z-50 mt-2 w-full
            rounded-xl border border-gray-200
            bg-white shadow-xl overflow-hidden
            animate-in fade-in zoom-in-95
          "
        >
          {branches.map((branch) => {
            const isActive = selected === branch.value;
            return (
              <div
                key={branch.value}
                onClick={() => handleSelect(branch.value, branch.href)}
                className={`
                  px-4 py-3 text-sm cursor-pointer transition-colors
                  flex items-center justify-between
                  ${
                    isActive
                      ? "bg-secondary/10 text-secondary font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }
                `}
              >
                <span>{branch.label}</span>
                {/* Flecha indicando que navega a otra página */}
                <svg
                  className="w-3.5 h-3.5 opacity-40"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};