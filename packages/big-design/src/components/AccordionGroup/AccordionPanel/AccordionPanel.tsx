import { Text } from '@bigcommerce/big-design';
import { ExpandLessIcon, ExpandMoreIcon } from '@bigcommerce/big-design-icons';
import React, { HTMLAttributes, memo } from 'react';

import { useUniqueId } from '../../../hooks';
import { BoxProps } from '../../Box/Box';
import { useAccordion } from '../hooks/useAccordion';

import { StyledAccordion, StyledAccordionButton, StyledBox, StyledGridItem } from './styled';

export interface AccordionPanelProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  header: string;
  isExpanded: boolean;
  onClick?: () => void;
  iconLeft?: React.ReactNode;
  defaultExpanded?: boolean;
}

export const AccordionPanel: React.FC<AccordionPanelProps & BoxProps> = memo(
  ({ children, header, iconLeft, defaultExpanded = false, ...props }) => {
    const { isExpanded, onClick } = useAccordion({ defaultExpanded });
    const accordionId = useUniqueId('accordion');
    const accordionItemId = useUniqueId('accordion-item');

    return (
      <StyledAccordion {...props} isExpanded={isExpanded}>
        <StyledAccordionButton
          aria-controls={accordionItemId}
          aria-expanded={isExpanded}
          id={accordionId}
          onClick={onClick}
          variant="subtle"
        >
          <StyledGridItem>
            {iconLeft}
            <Text as="span" marginLeft={iconLeft ? 'small' : 'none'}>
              {header}
            </Text>
          </StyledGridItem>
          <StyledGridItem>
            {isExpanded ? (
              <ExpandLessIcon color="secondary70" />
            ) : (
              <ExpandMoreIcon color="secondary70" />
            )}
          </StyledGridItem>
        </StyledAccordionButton>
        <StyledBox
          {...props}
          aria-labelledby={accordionId}
          display={isExpanded ? 'block' : 'none'}
          hidden={!isExpanded}
          iconLeft={iconLeft}
          id={accordionItemId}
          role="region"
        >
          {children}
        </StyledBox>
      </StyledAccordion>
    );
  },
);
