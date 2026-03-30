// src/features/branches/BranchContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import storeDetails from '@/data/storeDetails.json';

export type BranchId = 'cancun' | 'playa';

export interface Branch {
  id: BranchId;
  title: string;
  titleEn: string;
  slug: string;
  stores: Store[];
}

export interface Store {
  image: string;
  title: string;
  address: string;
  email: string;
  phone: string;
  slug?: string; // Para identificar la sucursal específica dentro de la ciudad
}

interface BranchContextType {
  currentBranch: Branch | null;
  currentStore: Store | null;
  setCurrentBranch: (branch: Branch) => void;
  setCurrentStore: (store: Store) => void;
  branches: Branch[];
    isLoading: boolean; // Añadir loading state

}

const BranchContext = createContext<BranchContextType | undefined>(undefined);

export const BranchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentBranch, setCurrentBranch] = useState<Branch | null>(null);
  const [currentStore, setCurrentStore] = useState<Store | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Añadir loading state

  // Datos de las sucursales (ciudades)
  const branches: Branch[] = [
    {
      id: 'cancun',
      title: 'CANCÚN',
      titleEn: 'CANCUN',
      slug: 'cancun',
      stores: storeDetails.cancun.images.map(store => ({
        ...store,
        slug: store.title.toLowerCase().replace(/\s+/g, '-')
      }))
    },
    {
      id: 'playa',
      title: 'PLAYA DEL CARMEN',
      titleEn: 'PLAYA DEL CARMEN',
      slug: 'playa',
      stores: storeDetails.playa.images.map(store => ({
        ...store,
        slug: store.title.toLowerCase().replace(/\s+/g, '-')
      }))
    }
  ];

  
// src/features/branches/BranchContext.tsx
// En el useEffect, agrega logs:

useEffect(() => {
  setIsLoading(true);
  const path = window.location.pathname;
  const segments = path.split('/').filter(Boolean);
  
  console.log('BranchContext - path:', path);
  console.log('BranchContext - segments:', segments);
  
  if (segments.length >= 2) {
    const branchSlug = segments[1];
    console.log('BranchContext - branchSlug:', branchSlug);
    const foundBranch = branches.find(b => b.slug === branchSlug);
    console.log('BranchContext - foundBranch:', foundBranch);
    
    if (foundBranch) {
      setCurrentBranch(foundBranch);
      
      if (segments.length >= 3) {
        const storeSlug = segments[2];
        console.log('BranchContext - storeSlug:', storeSlug);
        const foundStore = foundBranch.stores.find(s => s.slug === storeSlug);
        console.log('BranchContext - foundStore:', foundStore);
        if (foundStore) {
          setCurrentStore(foundStore);
        }
      }
    } else {
      console.log('BranchContext - Branch no encontrado, usando default');
      setCurrentBranch(branches[0]);
    }
  } else {
    console.log('BranchContext - No hay branch en URL, usando default');
    setCurrentBranch(branches[0]);
  }
  
  setIsLoading(false);
}, []);
    return (
        <BranchContext.Provider value={{ 
        currentBranch, 
        currentStore, 
        isLoading,
      setCurrentBranch, 
      setCurrentStore, 
      branches 
    }}>
      {children}
    </BranchContext.Provider>
  );
};

export const useBranch = () => {
  const context = useContext(BranchContext);
  if (!context) {
    throw new Error('useBranch must be used within BranchProvider');
  }
  return context;
};