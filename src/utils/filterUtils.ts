import { FilterType } from '@/src/@Types/Filter';
import { ALL_FILTERS } from '@/src/data/availableFilters';

/**
 * Converte uma string de filtros (ex: "500,muito baixo") em uma lista de objetos FilterType.
 * Apenas os filtros encontrados na lista de filtros disponíveis serão retornados.
 * Os filtros retornados terão a propriedade 'selected' definida como true, se desejado.
 *
 * @param filterString String contendo valores de filtros separados por vírgula.
 * @returns Lista de FilterType correspondente aos valores encontrados.
 */
export function filtersStringToList(filterString: string): FilterType[] {
  if (!filterString) {
    return [];
  }

  const keys = filterString.split(',').map((k) => k.trim());

  const foundFilters = ALL_FILTERS.filter((filter) =>
    keys.includes(filter.value),
  ).map((filter) => ({
    ...filter,
    selected: true,
  }));

  return foundFilters;
}
