export type ScreenState =
  | { type: 'loading' }
  | { type: 'error'; message?: string }
  | { type: 'content' };