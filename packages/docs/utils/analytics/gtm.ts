/* eslint-disable @typescript-eslint/naming-convention */
const GTM_CONFIG = {
  ID: process.env.GTM_ID || '',
  AUTH: process.env.GTM_AUTH || '',
  PREVIEW: process.env.GTM_PREVIEW || '',
  COOKIES_WIN: process.env.GTM_COOKIES_WIN || '',
};

export interface EventOptions {
  action: string;
  category?: string;
  label?: string;
}

export const GTM_ID = GTM_CONFIG.ID;

export const GTM_URL = [
  `https://www.googletagmanager.com/gtm.js?id=${GTM_CONFIG.ID}`,
  GTM_CONFIG.AUTH && `gtm_auth=${GTM_CONFIG.AUTH}`,
  GTM_CONFIG.PREVIEW && `gtm_preview=${GTM_CONFIG.PREVIEW}`,
  GTM_CONFIG.COOKIES_WIN && `gtm_cookies_win=${GTM_CONFIG.COOKIES_WIN}`,
]
  .filter(Boolean)
  .join('&');

export const pageView = (url: string) => {
  if (typeof window.gtag === 'function') {
    window.gtag('config', GTM_CONFIG.ID, {
      page_path: url,
    });
  }
};

export const event = ({ action, category, label }: EventOptions) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
    });
  }
};
