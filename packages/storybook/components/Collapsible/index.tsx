import { ChevronRight, ExpandMore, Text } from '@bigcommerce/big-design';
import React, { useState } from 'react';

import { StyledFlex } from './styled';

interface CollapsibleProps {
  title: string;
}

export const Collapsible: React.FC<CollapsibleProps> = ({ children, title }) => {
  const [isCollapsed, setCollapsed] = useState(true);
  const toggleIsCollapsed = () => setCollapsed(!isCollapsed);

  return (
    <>
      <StyledFlex alignItems="center" onClick={toggleIsCollapsed}>
        {isCollapsed ? <ChevronRight title="Expand" /> : <ExpandMore title="Collapse" />}
        <Text>{title}</Text>
      </StyledFlex>

      {!isCollapsed && children}
    </>
  );
};
