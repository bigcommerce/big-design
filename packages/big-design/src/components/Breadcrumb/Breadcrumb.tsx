import { ChevronRightIcon } from '@bigcommerce/big-design-icons';
import React, { Children, forwardRef, HTMLAttributes, isValidElement, memo, Ref } from 'react';

import { MarginProps } from '../../mixins';
import { Flex, FlexItem } from '../Flex';

import { BreadcrumbItem } from './Item';
import { StyledBreadcrumb } from './styled';

export interface BreadcrumbProps extends HTMLAttributes<HTMLDivElement>, MarginProps {
  children?: React.ReactNode;
  forwardSlash?: boolean;
  iconBefore?: React.ReactNode;
}

interface PrivateProps {
  forwardedRef: Ref<HTMLAnchorElement>;
  isForwardSlash?: boolean;
  isIconBefore?: boolean;
}

const StyleableBreadcrumb: React.FC<BreadcrumbProps & PrivateProps> = memo((props) => (
  <StyledBreadcrumb {...props} />
));

const IconBefore = (icon: React.ReactNode) => (
  <FlexItem alignSelf="center">
    <span>{icon}</span>
  </FlexItem>
);
const ForwardSlash = () => <FlexItem>/</FlexItem>;
const ChevronRight = () => (
  <FlexItem>
    <ChevronRightIcon size="large" />
  </FlexItem>
);

export const Breadcrumb = forwardRef<HTMLAnchorElement, BreadcrumbProps>(
  ({ children, forwardSlash, iconBefore, ...props }, ref) => {
    const isForwardSlash = forwardSlash;
    const isIconBefore = Boolean(iconBefore);
    const childCount = Children.toArray(children).length;

    return (
      <StyleableBreadcrumb
        {...props}
        forwardedRef={ref}
        isForwardSlash={isForwardSlash}
        isIconBefore={isIconBefore}
      >
        <Flex alignItems="center" flexGap=".5rem">
          {isIconBefore && IconBefore(iconBefore)}
          {Children.map(children, (child, index) => {
            const isLast = index === childCount - 1;

            if (isValidElement(child) && child.type === BreadcrumbItem) {
              return (
                <>
                  <FlexItem>{child}</FlexItem>
                  {!isLast && (isForwardSlash ? <ForwardSlash /> : <ChevronRight />)}
                </>
              );
            }

            throw new Error(`Breadcrumb children should be of type \`BreadcrumbItem\`.`);
          })}
        </Flex>
      </StyleableBreadcrumb>
    );
  },
);

Breadcrumb.displayName = 'Breadcrumb';
