// src/features/landing/components/BranchesGrid.tsx
import BranchCard from "./BranchCard";

interface Branch {
  image: string;
  title: string;
  address: string;
  email: string;
  phone: string;
}

interface BranchesGridProps {
  branches: Branch[];
  lang?: string;
}

const BranchesGrid = ({ branches, lang = "es" }: BranchesGridProps) => {
  const isSpanish = lang === "es";

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800">
          {isSpanish ? "Nuestras Sucursales" : "Our Branches"}
        </h3>
        <p className="text-gray-500 mt-2">
          {isSpanish 
            ? "Encuentra la sucursal más cercana a ti" 
            : "Find the branch closest to you"}
        </p>
      </div>

      {/* Grid responsivo: 1 en móvil, 2 en tablet, 3 en desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {branches.map((branch, idx) => (
          <BranchCard 
            key={idx}
            branch={branch}
            index={idx}
            lang={lang}
          />
        ))}
      </div>
    </div>
  );
};

export default BranchesGrid;