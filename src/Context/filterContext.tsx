import { createContext, useContext, useState, ReactNode } from "react";
import { FilterType } from "@/src/@Types/Filter";

interface FiltersContextType {
    filters: FilterType[];
    setFilters: (filters: FilterType[]) => void;
}

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export function FiltersProvider({ children }: { children: ReactNode }) {
    const [filters, setFilters] = useState<FilterType[]>([]);
    return (
        <FiltersContext.Provider value={{ filters, setFilters }}>
            {children}
        </FiltersContext.Provider>
    );
}

export function useFilters() {
    const context = useContext(FiltersContext);
    if (!context) throw new Error("useFilters must be used within a FiltersProvider");
    return context;
}