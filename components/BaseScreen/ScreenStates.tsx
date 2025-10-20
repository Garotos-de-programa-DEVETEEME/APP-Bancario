import { ScreenState } from '@/@Types/ScreenState';
export const ScreenStates = {
  loading: (): ScreenState => ({ type: 'loading' }),
  error: (message?: string): ScreenState => ({ type: 'error', message }),
  content: (): ScreenState => ({ type: 'content' }),
};