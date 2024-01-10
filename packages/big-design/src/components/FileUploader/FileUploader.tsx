import React, {
  cloneElement,
  isValidElement,
  LabelHTMLAttributes,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useState,
} from 'react';

import { warning } from '../../utils';
import { FormControlDescription, FormControlLabel } from '../Form';
import { useInputErrors } from '../Form/useInputErrors';

import { DropZone, DropZoneLocalization } from './DropZone';
import { File } from './File';
import { StyledFileUploaderWrapper, StyledList } from './styled';
import { getImagesPreview, validateFiles } from './utils';

export interface FileUploaderLocalization extends DropZoneLocalization {
  optional: string;
}

interface DropzoneConfig {
  label?: string;
  description?: string;
}

export interface FileValidationError {
  file: File;
  fileIdx: number;
  message?: string;
  type: string;
}

export interface ValidatorConfig {
  message?: string;
  type: string;
  validator: (file: File) => boolean;
}

export const defaultLocalization: FileUploaderLocalization = {
  optional: 'optional',
  upload: 'Upload',
};

interface Props {
  description?: React.ReactNode;
  dropzoneConfig?: DropzoneConfig;
  error?: React.ReactNode | React.ReactNode[];
  files: File[];
  previewHidden?: boolean;
  label?: React.ReactNode;
  labelId?: string;
  localization?: FileUploaderLocalization;
  validators?: ValidatorConfig[];
  onFilesChange(files: File[]): void;
  onFilesError?(errors: FileValidationError[]): void;
}

export type FileUploaderProps = Props & React.InputHTMLAttributes<HTMLInputElement>;

export const FileUploader: React.FC<FileUploaderProps> = ({
  accept,
  description,
  disabled,
  dropzoneConfig = {},
  error,
  files,
  previewHidden = false,
  label,
  labelId,
  localization = defaultLocalization,
  multiple,
  validators = [],
  onFilesChange,
  onFilesError,
  ...props
}) => {
  const [imagePreview, setImagePreview] = useState<Record<string, string | null>>({});

  const uniqueInputId = useId();
  const id = props.id ?? uniqueInputId;

  useInputErrors(id, error);

  const validationErrors = useMemo(() => validateFiles(files, validators), [files, validators]);

  useEffect(() => {
    getImagesPreview(files).then((previews) => {
      setImagePreview(previews);
    });
  }, [files]);

  useEffect(() => {
    if (onFilesError && validationErrors.length > 0) {
      onFilesError(validationErrors);
    }
  }, [files, onFilesError, validationErrors, validators]);

  const handleFilesChange = useCallback(
    (newFiles: FileList | null) => {
      const filesList: File[] = Array.from(newFiles || []);

      if (!multiple) {
        return onFilesChange([filesList[0]]);
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
        <FormControlLabel htmlFor={id} localization={localization} renderOptional={!props.required}>
          {label}
        </FormControlLabel>
      );
    }

    if (
      isValidElement<LabelHTMLAttributes<HTMLLabelElement>>(label) &&
      label.type === FormControlLabel
    ) {
      return cloneElement(label, {
        id: labelId,
        htmlFor: id,
      });
    }

    warning('label must be either a string or a FormControlLabel component.');
  }, [id, label, labelId, localization, props.required]);

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
            isValid={!isFileInvalid}
            name={file.name}
            onRemove={(name) => handleFileRemove(name, idx)}
            previewSrc={imageSrc}
          />
        </li>
      );
    });

    return <StyledList>{filesList}</StyledList>;
  }, [files, handleFileRemove, imagePreview, previewHidden, multiple, validationErrors]);

  const renderedDropzone = useMemo(
    () =>
      multiple || !files.length ? (
        <DropZone
          accept={accept}
          description={dropzoneConfig.description}
          disabled={disabled}
          id={id}
          label={dropzoneConfig.label}
          localization={localization}
          multiple={multiple}
          onFilesChange={handleFilesChange}
        />
      ) : null,
    [
      accept,
      disabled,
      dropzoneConfig.description,
      dropzoneConfig.label,
      files.length,
      handleFilesChange,
      id,
      localization,
      multiple,
    ],
  );

  return (
    <div>
      {renderedLabel}
      {renderedDescription}
      <StyledFileUploaderWrapper>
        {renderedFiles}
        {renderedDropzone}
      </StyledFileUploaderWrapper>
    </div>
  );
};
