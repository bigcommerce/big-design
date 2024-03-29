import { DeleteIcon, DraftIcon } from '@bigcommerce/big-design-icons';
import React, { ComponentPropsWithoutRef, useMemo } from 'react';

import { Button } from '../Button';

import { FileStyled, ImageStyled, TextEllipsed } from './styled';

interface Props extends ComponentPropsWithoutRef<'div'> {
  name: string;
  isValid: boolean;
  previewSrc: string | null;
  onRemove(name: string): void;
}

export const File = ({ name, isValid, previewSrc, onRemove, ...props }: Props) => {
  const renderedFilePreview = useMemo(() => {
    if (previewSrc) {
      return <ImageStyled alt="preview" src={previewSrc} />;
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

  return (
    <FileStyled
      {...props}
      alignItems="center"
      isValid={isValid}
      justifyContent="space-between"
      paddingHorizontal="small"
    >
      {renderedFilePreview}
      <TextEllipsed marginBottom="none" marginLeft="xSmall" marginRight="auto">
        {name}
      </TextEllipsed>
      <Button
        aria-label={`remove ${name}`}
        iconOnly={<DeleteIcon />}
        onClick={() => onRemove(name)}
        type="button"
        variant="utility"
      />
    </FileStyled>
  );
};
