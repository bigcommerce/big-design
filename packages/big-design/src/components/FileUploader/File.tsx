import { DeleteIcon, DraftIcon, MoreHorizIcon } from '@bigcommerce/big-design-icons';
import React, { ComponentPropsWithoutRef, useMemo } from 'react';

import { Button } from '../Button';
import { Dropdown } from '../Dropdown';
import { DropdownItem } from '../Dropdown/types';

import { StyledFile, StyledImage, StyledText } from './styled';

interface Props extends ComponentPropsWithoutRef<'div'> {
  actions?: DropdownItem[];
  isValid: boolean;
  name: string;
  idx: number;
  onRemove(name: string): void;
  previewSrc: string | null;
}

export const File = ({ actions, name, idx, isValid, previewSrc, onRemove, ...props }: Props) => {
  const renderedFilePreview = useMemo(() => {
    if (previewSrc) {
      return <StyledImage alt="preview" src={previewSrc} />;
    }

    return (
      <DraftIcon
        aria-hidden={false}
        aria-label="file icon"
        color="secondary50"
        role="img"
        size={40}
      />
    );
  }, [previewSrc]);

  const renderedActions = useMemo(() => {
    if (!actions) {
      return (
        <Button
          aria-label={`remove ${name}`}
          iconOnly={<DeleteIcon />}
          onClick={() => onRemove(name)}
          type="button"
          variant="utility"
        />
      );
    }

    return (
      <Dropdown
        items={actions}
        placement="bottom-end"
        toggle={<Button iconOnly={<MoreHorizIcon />} type="button" variant="utility" />}
      />
    );
  }, [actions, name, onRemove]);

  return (
    <StyledFile
      {...props}
      alignItems="center"
      isValid={isValid}
      justifyContent="space-between"
      paddingHorizontal="small"
    >
      {renderedFilePreview}
      <StyledText marginBottom="none" marginLeft="xSmall" marginRight="auto">
        {name}
      </StyledText>
      {renderedActions}
    </StyledFile>
  );
};
