import {
  DraftIcon,
  FileDownloadIcon,
  RemoveCircleOutlineIcon,
} from '@bigcommerce/big-design-icons';
import React, {
  ChangeEvent,
  ComponentPropsWithoutRef,
  DragEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Box } from '../Box';
import { Flex } from '../Flex';
import { Small, Text } from '../Typography';

import { ButtonStyled, DropzoneStyled } from './styled';
import { Localization } from './types';
import { validateFileFormat } from './utils';

export interface Props extends ComponentPropsWithoutRef<'input'> {
  description?: string;
  viewType?: 'row' | 'block';
  icon?: React.ReactNode;
  label?: string;
  localization: Localization;
  onFilesChange(files: FileList | null): void;
}

export const DropZone = ({
  accept,
  description,
  disabled,
  icon = <DraftIcon />,
  id,
  label,
  localization,
  multiple,
  viewType = 'row',
  onFilesChange,
  ...props
}: Props) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isFilesValid, setIsFilesValid] = useState(true);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const isRowView = viewType === 'row';

  const handleDragEnter = useCallback(
    /* istanbul ignore next */
    (event: DragEvent<HTMLDivElement>) => {
      if (disabled) {
        return;
      }

      const transferItems: DataTransferItem[] = Array.from(event.dataTransfer.items || []);
      const isAllValid = transferItems.every((file) => validateFileFormat(file, accept));

      setIsFilesValid(isAllValid);
      setIsDragOver(true);
    },
    [accept, disabled],
  );

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onFilesChange(event.target.files);

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    [onFilesChange],
  );

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  /* istanbul ignore next */
  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    if (disabled) {
      return;
    }

    event.preventDefault();

    const isLeavingForAnotherElement = !(
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      (event.relatedTarget && event.currentTarget.contains(event.relatedTarget as Node))
    );

    if (isLeavingForAnotherElement) {
      setIsDragOver(false);
    }
  };

  const handleDrop = useCallback(
    /* istanbul ignore next */
    (event: DragEvent<HTMLDivElement>) => {
      if (disabled) {
        return;
      }

      event.preventDefault();

      onFilesChange(event.dataTransfer.files);
      setIsDragOver(false);
    },
    [disabled, onFilesChange],
  );

  const renderDropzoneIcon = useMemo(() => {
    const icon = isFilesValid ? <FileDownloadIcon /> : <RemoveCircleOutlineIcon />;

    return (
      <Box as="span" marginHorizontal="auto">
        {icon}
      </Box>
    );
  }, [isFilesValid]);

  const renderedLabel = useMemo(() => {
    if (!label) {
      return null;
    }

    return (
      <Text color="secondary60" marginBottom="none" marginLeft="xSmall">
        {label}
      </Text>
    );
  }, [label]);

  const renderedDescription = useMemo(() => {
    if (!description) {
      return null;
    }

    return (
      <Small color="secondary50" marginBottom="none" marginLeft="xSmall">
        {description}
      </Small>
    );
  }, [description]);

  /* istanbul ignore next */
  return (
    <DropzoneStyled
      {...props}
      alignItems="center"
      aria-label="dropzone"
      disabled={disabled}
      flexDirection={isRowView ? 'row' : 'column'}
      isDragOver={isDragOver}
      isValid={isFilesValid}
      justifyContent={isRowView ? 'space-between' : 'center'}
      onClick={handleUploadClick}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={(event) => event.preventDefault()}
      onDrop={handleDrop}
      paddingHorizontal="small"
      role="button"
    >
      <input
        accept={accept}
        aria-disabled={disabled}
        aria-label="file upload"
        disabled={disabled}
        id={id}
        multiple={multiple}
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
        type="file"
      />
      {isDragOver ? (
        renderDropzoneIcon
      ) : (
        <>
          <Flex alignItems="center" flexDirection={isRowView ? 'row' : 'column'}>
            {icon}
            <Flex alignItems={isRowView ? 'flex-start' : 'center'} flexDirection="column">
              {renderedLabel}
              {renderedDescription}
            </Flex>
          </Flex>
          <ButtonStyled
            color="secondary"
            disabled={disabled}
            marginTop={isRowView ? 'none' : 'medium'}
            onClick={(e) => e.preventDefault()}
            variant="subtle"
          >
            {localization.upload}
          </ButtonStyled>
        </>
      )}
    </DropzoneStyled>
  );
};
