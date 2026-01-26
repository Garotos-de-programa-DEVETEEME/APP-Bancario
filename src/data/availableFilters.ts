import { FilterType } from '@/src/@Types/Filter';
import { riskTheme } from '@/src/themes/risk';

export const VALUE_FILTERS: FilterType[] = [
  {
    id: 1,
    value: '500',
    text: 'R$0 - R$500',
    selected: false,
  },
  {
    id: 2,
    value: '1000',
    text: 'R$500 - R$1000',
    selected: false,
  },
  {
    id: 3,
    value: '1001',
    text: '+ R$1000',
    selected: false,
  },
];

export const RISK_FILTERS: FilterType[] = [
  {
    id: 4,
    value: 'muito baixo',
    text: 'Muito Baixo',
    color: riskTheme.veryLow,
    selected: false,
  },
  {
    id: 5,
    value: 'baixo',
    text: 'Baixo',
    color: riskTheme.low,
    selected: false,
  },
  {
    id: 6,
    value: 'medio',
    text: 'Médio',
    color: riskTheme.medium,
    selected: false,
  },
  {
    id: 7,
    value: 'alto',
    text: 'Alto',
    color: riskTheme.high,
    selected: false,
  },
];

export const FAVORITE_FILTER: FilterType = {
  id: 8,
  value: 'favoritos',
  text: 'Favoritos',
  selected: false,
  color: '#F2C94C',
};

export const ALL_FILTERS: FilterType[] = [
  ...VALUE_FILTERS,
  ...RISK_FILTERS,
  FAVORITE_FILTER,
];
