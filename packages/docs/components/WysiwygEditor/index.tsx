import dynamic from 'next/dynamic';

export const WysiwygEditor = dynamic(
  () => import('./WysiwygEditor').then((mod) => mod.WysiwygEditor),
  { ssr: false },
);
