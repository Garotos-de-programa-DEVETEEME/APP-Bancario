import { FilterType } from '@/src/@Types/Filter';
import { createContext, ReactNode, useContext, useState } from 'react';

// Define a interface para o contexto, especificando os tipos dos dados e funções disponíveis
interface FiltersContextType {
  filters: [FilterType[], FilterType[], FilterType[]]; // Lista de filtros selecionados [favoritos, valores, riscos]
  setFilters: (filters: [FilterType[], FilterType[], FilterType[]]) => void; // Função para atualizar os filtros
}

// Cria o contexto com valor inicial undefined
const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

// Provider que irá envolver os componentes que precisam acessar ou modificar os filtros
export function FiltersProvider({ children }: { children: ReactNode }) {
  // Estado interno que armazena os filtros
  const [filters, setFilters] = useState<
    [FilterType[], FilterType[], FilterType[]]
  >([[], [], []]);
  return (
    // Disponibiliza o estado e a função de atualização para os componentes filhos
    <FiltersContext.Provider value={{ filters, setFilters }}>
      {children}
    </FiltersContext.Provider>
  );
}

// Hook customizado para acessar o contexto de filtros de forma segura
export function useFilters() {
  const context = useContext(FiltersContext);
  // Garante que o hook só será usado dentro de um FiltersProvider
  if (!context)
    throw new Error('useFilters must be used within a FiltersProvider');
  return context;
}
