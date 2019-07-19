import { ChevronRight, ExpandMore, Text } from '@bigcommerce/big-design';
import React, { useState } from 'react';

import { StyledFlex } from './styled';

interface CollapsibleProps {
  title: string;
}

export const Collapsible: React.FC<CollapsibleProps> = ({ children, title }) => {
  const [isCollapsed, setCollapsed] = useState(true);

  function handleOnClick() {
    setCollapsed(!isCollapsed);
  }

  return (
    <>
      <StyledFlex alignItems="center" onClick={handleOnClick}>
        {isCollapsed ? <ChevronRight /> : <ExpandMore />}
        <Text>{title}</Text>
      </StyledFlex>

      {!isCollapsed && children}
    </>
  );
};
