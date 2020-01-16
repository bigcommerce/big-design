export const isClient = typeof window === 'object';
export const isProduction = process.env.NODE_ENV === 'production';
