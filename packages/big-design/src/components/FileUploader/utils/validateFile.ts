import { ValidatorConfig } from '../FileUploader';

export const validateFileFormat = (file: File | DataTransferItem, fileFormats = '') => {
  const allowedFormats = fileFormats.split(',').map((format) => format.trim());
  const fileExtension = file.type.split('/').pop()?.toLowerCase() ?? '';

  return allowedFormats.some((format) => {
    if (format === '*' || format === '.*') {
      return true;
    } else if (format.startsWith('.')) {
      return format === `.${fileExtension}`;
    } else if (
      format.startsWith('audio/') ||
      format.startsWith('video/') ||
      format.startsWith('image/')
    ) {
      const mediaTypePrefix = format.split('/')[0];

      return file.type.startsWith(`${mediaTypePrefix}/`);
    }

    return true;
  });
};

export const validateFiles = (files: File[], validators: ValidatorConfig[]) =>
  files.flatMap((file, idx) =>
    validators
      .filter(({ validator }) => !validator(file))
      .map(({ message, type }) => ({ file, fileIdx: idx, message, type })),
  );
