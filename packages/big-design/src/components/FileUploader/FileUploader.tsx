import { ExpandLessIcon, ExpandMoreIcon } from '@bigcommerce/big-design-icons';
import React, {
  cloneElement,
  ComponentPropsWithoutRef,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';

import { warning } from '../../utils';
import { DropdownItem } from '../Dropdown';
import { FormControlDescription, FormControlLabel } from '../Form';
import { useInputErrors } from '../Form/useInputErrors';
import { InlineMessage } from '../InlineMessage';

import { defaultLocalization } from './constants';
import { File } from './File';
import { StyledDropZoneWrapper, StyledFileUploaderWrapper, StyledList } from './styled';
import { Action, Localization, ValidatorConfig } from './types';
import { getImagesPreview, validateFiles } from './utils';

export interface FileAction extends Omit<DropdownItem, 'onItemClick'> {
  onItemClick: (name: File, idx: number) => void;
}

interface DropzoneConfig {
  action?: Action;
  description?: string;
  emptyHeight?: number;
  icon?: React.ReactNode;
  label?: string;
}

interface FileValidationError {
  file: File;
  fileIdx: number;
  message?: string;
  type: string | string[];
}

interface Props {
  actions?: FileAction[];
  description?: React.ReactNode;
  dropzoneConfig?: DropzoneConfig;
  error?: string | string[];
  files: File[];
  label?: React.ReactNode;
  labelId?: string;
  localization?: Localization;
  previewHidden?: boolean;
  validators?: ValidatorConfig[];
  onFilesChange(files: File[]): void;
  onFilesError?(errors: FileValidationError[]): void;
}

export type FileUploaderProps = Props & ComponentPropsWithoutRef<'input'>;

export const FileUploader: React.FC<FileUploaderProps> = ({
  accept,
  actions,
  description,
  disabled,
  dropzoneConfig = {},
  error,
  files,
  label,
  labelId,
  localization = defaultLocalization,
  multiple,
  previewHidden = false,
  validators = [],
  onFilesChange,
  onFilesError,
  ...props
}) => {
  const [imagePreview, setImagePreview] = useState<Record<string, string | null>>({});
  const [isAllErrorsVisible, setIsAllErrorsVisible] = useState(false);
  const prevErrors = useRef<FileValidationError[]>([]);

  const uniqueInputId = useId();
  const id = props.id ?? uniqueInputId;

  const validationErrors = useMemo(() => {
    const flatFilesErrors = validateFiles(files, validators);

    return flatFilesErrors.reduce<FileValidationError[]>(
      (acc, { file, fileIdx, message, type }) => {
        const existingError = acc.find((error) => error.fileIdx === fileIdx);

        if (!existingError) {
          return [
            ...acc,
            {
              file,
              fileIdx,
              message,
              type,
            },
          ];
        }

        existingError.type = Array.isArray(existingError.type)
          ? [...existingError.type, type]
          : [existingError.type, type];
        existingError.message = existingError.message
          ? `${existingError.message}, ${message}`
          : message;

        return acc;
      },
      [],
    );
  }, [files, validators]);

  useInputErrors(id, multiple ? undefined : error);

  useEffect(() => {
    getImagesPreview(files).then((previews) => {
      setImagePreview(previews);
    });
  }, [files]);

  useEffect(() => {
    if (
      onFilesError &&
      (validationErrors.length > 0 ||
        (prevErrors.current.length > 0 && validationErrors.length === 0))
    ) {
      onFilesError(validationErrors);
      prevErrors.current = validationErrors;
    }
  }, [onFilesError, validationErrors]);

  const handleFilesChange = useCallback(
    (newFiles: FileList | null) => {
      const filesList: File[] = Array.from(newFiles || []);

      if (!multiple) {
        onFilesChange([filesList[0]]);

        return;
      }

      onFilesChange([...files, ...filesList]);
    },
    [files, multiple, onFilesChange],
  );

  const handleFileRemove = useCallback(
    (removedName: string, removedIdx: number) => {
      const filteredFiles = files.filter(
        ({ name }, idx) => !(removedName === name && removedIdx === idx),
      );

      onFilesChange(filteredFiles);
    },
    [files, onFilesChange],
  );

  const renderedLabel = useMemo(() => {
    if (!label) {
      return null;
    }

    if (typeof label === 'string') {
      return (
        <FormControlLabel htmlFor={id} renderRequired={props.required}>
          {label}
        </FormControlLabel>
      );
    }

    if (
      isValidElement<ComponentPropsWithoutRef<'label'>>(label) &&
      label.type === FormControlLabel
    ) {
      return cloneElement(label, {
        id: labelId,
        htmlFor: id,
      });
    }

    warning('label must be either a string or a FormControlLabel component.');
  }, [id, label, labelId, props.required]);

  const renderedDescription = useMemo(() => {
    if (!description) {
      return null;
    }

    if (typeof description === 'string') {
      return <FormControlDescription>{description}</FormControlDescription>;
    }

    if (isValidElement(description) && description.type === FormControlDescription) {
      return description;
    }

    warning('description must be either a string or a FormControlDescription component.');
  }, [description]);

  const handleToggleErrors = useCallback((event: React.MouseEvent) => {
    event.preventDefault();

    setIsAllErrorsVisible((prev) => !prev);
  }, []);

  const renderedErrors = useMemo(() => {
    if (!multiple || !error || error.length === 0) {
      return null;
    }

    const isErrorsArray = Array.isArray(error);

    const messages = isErrorsArray ? error.map((text) => ({ text })) : [{ text: error }];
    const firstMessages = messages.slice(0, 10);
    const restMessages = messages.slice(10);

    return (
      <InlineMessage
        actions={
          restMessages.length > 0
            ? [
                {
                  iconRight: isAllErrorsVisible ? <ExpandLessIcon /> : <ExpandMoreIcon />,
                  text: isAllErrorsVisible ? localization.showLess : localization.showMore,
                  variant: 'subtle',
                  onClick: handleToggleErrors,
                },
              ]
            : undefined
        }
        header={localization.canNotUploadTheseFiles}
        marginVertical="large"
        messages={[...firstMessages, ...(isAllErrorsVisible ? restMessages : [])]}
        type="error"
      />
    );
  }, [
    error,
    handleToggleErrors,
    isAllErrorsVisible,
    localization.canNotUploadTheseFiles,
    localization.showLess,
    localization.showMore,
    multiple,
  ]);

  const getActions = useCallback(
    (file: File, idx: number) =>
      actions?.map(({ onItemClick, ...action }) => ({
        ...action,
        onItemClick: () => onItemClick(file, idx),
      })),
    [actions],
  );

  const renderedFiles = useMemo(() => {
    if (previewHidden) {
      return null;
    }

    if (!multiple && files.length > 0) {
      const file = files[0];
      const isFileInvalid = validationErrors.some(({ fileIdx }) => fileIdx === 0);
      const imageSrc = imagePreview[0];

      return (
        <File
          actions={getActions(files[0], 0)}
          idx={0}
          isValid={!isFileInvalid}
          name={file.name}
          onRemove={(name) => handleFileRemove(name, 0)}
          previewSrc={imageSrc}
        />
      );
    }

    const filesList = files.map((file, idx) => {
      const isFileInvalid = validationErrors.some(({ fileIdx }) => fileIdx === idx);
      const imageSrc = imagePreview[idx];

      return (
        <li key={idx}>
          <File
            actions={getActions(file, idx)}
            idx={idx}
            isValid={!isFileInvalid}
            name={file.name}
            onRemove={(name) => handleFileRemove(name, idx)}
            previewSrc={imageSrc}
          />
        </li>
      );
    });

    return <StyledList>{filesList}</StyledList>;
  }, [
    previewHidden,
    multiple,
    files,
    validationErrors,
    imagePreview,
    getActions,
    handleFileRemove,
  ]);

  const renderedDropzone = useMemo(() => {
    if (!multiple && files.length > 0) {
      return null;
    }

    const minBlockHeight = 180;
    const viewType =
      !files.length && (dropzoneConfig.emptyHeight ?? 0) >= minBlockHeight ? 'block' : 'row';

    return (
      <StyledDropZoneWrapper
        accept={accept}
        action={dropzoneConfig.action}
        description={dropzoneConfig.description}
        disabled={disabled}
        emptyHeight={files.length ? undefined : dropzoneConfig.emptyHeight}
        icon={dropzoneConfig.icon}
        id={id}
        label={dropzoneConfig.label}
        localization={localization}
        multiple={multiple}
        onFilesChange={handleFilesChange}
        viewType={viewType}
      />
    );
  }, [
    accept,
    dropzoneConfig.action,
    disabled,
    dropzoneConfig.description,
    dropzoneConfig.emptyHeight,
    dropzoneConfig.icon,
    dropzoneConfig.label,
    files.length,
    handleFilesChange,
    id,
    localization,
    multiple,
  ]);

  return (
    <div>
      {renderedLabel}
      {renderedDescription}
      <StyledFileUploaderWrapper>
        {renderedFiles}
        {renderedDropzone}
      </StyledFileUploaderWrapper>
      {renderedErrors}
    </div>
  );
};
