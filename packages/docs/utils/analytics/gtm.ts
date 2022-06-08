export interface EventOptions {
  action: string;
  category?: string;
  label?: string;
}

export const isProd = process.env.NODE_ENV === 'production';
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export const pageView = (url: string) => {
  if (typeof window.gtag === 'function' && GTM_ID) {
    window.gtag('config', GTM_ID, {
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
