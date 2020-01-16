import { useUID } from 'react-uid';

export function useUniqueId(prefix: string) {
  const uid = useUID();

  return `bd-${prefix}-${uid}`;
}
