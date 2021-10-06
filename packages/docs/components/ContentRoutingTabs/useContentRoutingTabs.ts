import { useRouter } from 'next/router';

import { Route } from './types';

export const useContentRoutingTabs = (routes: Route[], id: string) => {
  const { query, push } = useRouter();
  const pills = routes.map(({ render, ...pill }) => pill);
  const queryValue = query[id];
  const activePill = queryValue && !Array.isArray(queryValue) ? queryValue : routes[0].id;
  const activeContent = routes.find((content) => content.id === activePill);

  const handlePillClick = (pillId: string) => {
    push({ query: { ...query, [id]: pillId } }, undefined, { scroll: false, shallow: true });
  };

  return {
    activeContent,
    activePills: activePill ? [activePill] : [],
    pills,
    handlePillClick,
  };
};
