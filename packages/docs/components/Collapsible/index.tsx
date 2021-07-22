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

  const handleKeyPressed = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      toggleIsCollapsed();
    }
  };

  return (
    <>
      <StyledFlex
        marginBottom="xSmall"
        alignItems="center"
        onClick={toggleIsCollapsed}
        onKeyPress={handleKeyPressed}
        tabIndex={0}
      >
        {isCollapsed ? <ChevronRightIcon title="Expand" /> : <ExpandMoreIcon title="Collapse" />}
        <Text>{title}</Text>
      </StyledFlex>

      {!isCollapsed && children}
    </>
  );
};
