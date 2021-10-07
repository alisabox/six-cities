export const AppRoute = {
  Root: '/',
  Login: '/login',
  Offer: '/offer/:id?',
  Favorite: '/favorite',
} as const;

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
