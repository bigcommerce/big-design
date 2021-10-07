import { Box, PillTabs } from '@bigcommerce/big-design';
import React from 'react';

import { ContentRoutingTabsProps } from './types';
import { useContentRoutingTabs } from './useContentRoutingTabs';

const RawContentRoutingTabs: React.FC<ContentRoutingTabsProps> = ({ routes, id }) => {
  const { activeContent, activePills, pills, handlePillClick } = useContentRoutingTabs(routes, id);

  return (
    <>
      <PillTabs activePills={activePills} items={pills} onPillClick={handlePillClick} />
      <Box marginTop="xSmall">{activeContent?.render()}</Box>
    </>
  );
};

export const ContentRoutingTabs: React.FC<ContentRoutingTabsProps> = (props) => {
  if (props.routes.length === 0) {
    return null;
  }

  return <RawContentRoutingTabs {...props} />;
};
