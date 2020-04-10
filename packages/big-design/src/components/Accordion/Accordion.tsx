import { ExpandLessIcon, ExpandMoreIcon } from '@bigcommerce/big-design-icons';
import React, { useState } from 'react';

import { Flex } from '../Flex';

import { StyledTitle } from './styled';

export interface AccordionProps {
  title: string;
  onToggle?(): void;
}

export const Accordion: React.FC<AccordionProps> = ({ children, title, onToggle }) => {
  const [isOpened, setIsOpened] = useState(false);

  const toggleAccordion = () => setIsOpened(!isOpened);

  const handleTitleClick = () => {
    toggleAccordion();
    if (onToggle) {
      onToggle();
    }
  };

  return (
    <>
      <StyledTitle onClick={handleTitleClick}>
        {title}
        {isOpened ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </StyledTitle>
      <Flex display={isOpened ? 'flex' : 'none'} flexWrap="wrap">
        {children}
      </Flex>
    </>
  );
};

Accordion.displayName = 'Accordion';
