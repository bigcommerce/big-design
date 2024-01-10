import { getImagesPreview, loadImagePreview } from './loadImagePreview';
import { validateFileFormat, validateFiles } from './validateFile';

const createMockFile = (sizeInBytes: number, fileName: string, type: string) => {
  const buffer = new ArrayBuffer(sizeInBytes);

  const dataView = new DataView(buffer);

  const blob = new Blob([dataView], { type });

  return new File([blob], fileName, { type });
};

describe('FileUploader utils', () => {
  describe('loadImagePreview', () => {
    it('returns null for non-image files', async () => {
      const file = createMockFile(1024, 'test.txt', 'text/plain');

      await expect(loadImagePreview(file)).resolves.toBeNull();
    });

    it('returns a base64 string for image files', async () => {
      const file = createMockFile(1024, 'test.png', 'image/png');

      await expect(loadImagePreview(file)).resolves.toMatch(/^data:image\/png;base64,/);
    });
  });

  describe('getImagesPreview', () => {
    it('returns an object with the images preview', async () => {
      const file = createMockFile(1024, 'test.png', 'image/png');

      await expect(getImagesPreview([file])).resolves.toEqual({ 0: expect.any(String) });
    });

    it('returns an empty object if there are no files', async () => {
      await expect(getImagesPreview([])).resolves.toEqual({});
    });
  });

  describe('validateFileFormat', () => {
    it('returns true if file format is allowed', () => {
      const file = createMockFile(1024, 'test.png', 'image/png');

      expect(validateFileFormat(file, '*')).toBe(true);
      expect(validateFileFormat(file, '.*')).toBe(true);
      expect(validateFileFormat(file, 'image/*')).toBe(true);
      expect(validateFileFormat(file, '.jpeg, .png')).toBe(true);
    });

    it('returns false if file format is not allowed', () => {
      const file = createMockFile(1024, 'test.png', 'image/png');

      expect(validateFileFormat(file, 'audio/*')).toBe(false);
      expect(validateFileFormat(file, '.pdf')).toBe(false);
    });

    it('returns false if the format is not valid', () => {
      const file = createMockFile(1024, 'test.png', 'image/png');

      expect(validateFileFormat(file, 'image')).toBe(true);
      expect(validateFileFormat(file, 'asd')).toBe(true);
    });
  });

  describe('validateFiles', () => {
    it('returns an array of errors', () => {
      const file = createMockFile(1024, 'test.png', 'image/png');

      const validators = [
        {
          validator: () => false,
          message: 'error',
          type: 'error',
        },
      ];

      expect(validateFiles([file], validators)).toEqual([
        {
          file,
          fileIdx: 0,
          message: 'error',
          type: 'error',
        },
      ]);
    });

    it('returns an empty array if there are no errors', () => {
      const file = createMockFile(1024, 'test.png', 'image/png');

      const validators = [
        {
          validator: () => true,
          message: 'error',
          type: 'error',
        },
      ];

      expect(validateFiles([file], validators)).toEqual([]);
    });
  });
});
