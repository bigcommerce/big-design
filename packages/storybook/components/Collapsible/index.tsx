import { Text } from '@bigcommerce/big-design';
import { ChevronRightIcon, ExpandMoreIcon } from '@bigcommerce/big-design-icons';
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
      <StyledFlex marginBottom="xLarge" alignItems="center" onClick={toggleIsCollapsed}>
        {isCollapsed ? <ChevronRightIcon title="Expand" /> : <ExpandMoreIcon title="Collapse" />}
        <Text>{title}</Text>
      </StyledFlex>

      {!isCollapsed && children}
    </>
  );
};
