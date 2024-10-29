import { theme } from '@bigcommerce/big-design-theme';
import { waitFor } from '@testing-library/dom';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React from 'react';

import { warning } from '../../utils';
import { FormControlLabel, FormGroup } from '../Form';

import { defaultLocalization } from './constants';
import { DropZone } from './DropZone';
import { File as FileComponent } from './File';
import { FileUploader } from './FileUploader';
import { Action, ValidatorConfig } from './types';

import 'jest-styled-components';

const createMockFile = (sizeInBytes: number, fileName: string, type: string) => {
  const buffer = new ArrayBuffer(sizeInBytes);

  const dataView = new DataView(buffer);

  const blob = new Blob([dataView], { type });

  return new File([blob], fileName, { type });
};

describe('FileUploader', () => {
  it('renders FileUploader', async () => {
    render(<FileUploader files={[]} label="Upload your images" onFilesChange={jest.fn()} />);

    await waitFor(() => expect(screen.getByRole('button', { name: /dropzone/i })).toBeVisible());
  });

  it('renders with label', async () => {
    render(<FileUploader files={[]} label="Upload your images" onFilesChange={jest.fn()} />);

    await waitFor(() => expect(screen.getByText(/upload your images/i)).toBeVisible());
  });

  it('renders with custom label', async () => {
    render(
      <FileUploader
        files={[]}
        label={<FormControlLabel>Upload your images</FormControlLabel>}
        onFilesChange={jest.fn()}
      />,
    );

    await waitFor(() => expect(screen.queryByText(/upload your images/i)).toBeVisible());
  });

  test('does not accept invalid label', async () => {
    const testId = 'test';
    const label = <div data-testid={testId}>Label</div>;

    const { queryByTestId } = render(
      <FileUploader files={[]} label={label} onFilesChange={jest.fn()} />,
    );

    await waitFor(() => expect(warning).toHaveBeenCalledTimes(1));

    expect(queryByTestId(testId)).not.toBeInTheDocument();
  });

  it('renders with description', async () => {
    const testId = 'test';
    const description = <div data-testid={testId}>Description</div>;

    const { queryByTestId } = render(
      <FileUploader
        description={description}
        files={[]}
        label="Upload your images"
        onFilesChange={jest.fn()}
      />,
    );

    await waitFor(() => expect(warning).toHaveBeenCalledTimes(1));

    expect(queryByTestId(testId)).not.toBeInTheDocument();
  });

  it('renders with custom description', async () => {
    render(
      <FileUploader
        description="File types: JPG, GIF, PNG. Recommended size: 250x100px."
        files={[]}
        label="Upload your images"
        onFilesChange={jest.fn()}
      />,
    );

    await waitFor(() =>
      expect(
        screen.getByText(/file types: jpg, gif, png. recommended size: 250x100px./i),
      ).toBeVisible(),
    );
  });

  it('renders with dropZoneLabel', async () => {
    render(
      <FileUploader
        dropzoneConfig={{
          label: 'Drag and drop images here',
        }}
        files={[]}
        label="Upload your images"
        onFilesChange={jest.fn()}
      />,
    );

    await waitFor(() => expect(screen.getByText(/drag and drop images here/i)).toBeVisible());
  });

  it('renders with dropZoneDescription', async () => {
    render(
      <FileUploader
        dropzoneConfig={{
          description: 'Use Hsd asd',
        }}
        files={[]}
        label="Upload your images"
        onFilesChange={jest.fn()}
      />,
    );

    await waitFor(() => expect(screen.getByText(/use hsd asd/i)).toBeVisible());
  });

  it('renders DropZone with multiple mode', async () => {
    const files = [
      createMockFile(1, 'file1', 'image/png'),
      createMockFile(1, 'file2', 'image/png'),
    ];

    render(
      <FileUploader files={files} label="Upload your images" multiple onFilesChange={jest.fn()} />,
    );

    await waitFor(() => expect(screen.getByRole('button', { name: /dropzone/i })).toBeVisible());
  });

  it('should not render DropZone when single mode', async () => {
    const files = [createMockFile(1, 'file1', 'image/png')];

    render(<FileUploader files={files} label="Upload your images" onFilesChange={jest.fn()} />);

    await waitFor(() => expect(screen.queryByRole('button', { name: /dropzone/i })).toBeNull());
  });

  it('renders with files list', async () => {
    const files = [
      createMockFile(1, 'file1', 'image/png'),
      createMockFile(1, 'file2', 'image/png'),
    ];

    render(
      <FileUploader files={files} label="Upload your images" multiple onFilesChange={jest.fn()} />,
    );

    await waitFor(() => expect(screen.getByRole('list')).toBeVisible());

    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('renders only single file, without DropZone', async () => {
    const files = [createMockFile(1, 'file1', 'image/png')];

    render(<FileUploader files={files} label="Upload your images" onFilesChange={jest.fn()} />);

    await waitFor(() => expect(screen.queryByRole('list')).toBeNull());

    expect(screen.getByText(/file1/i)).toBeVisible();
    expect(screen.queryByRole('button', { name: /dropzone/i })).toBeNull();
  });

  it('renders only DropZone without preview', () => {
    const files = [createMockFile(1, 'file1', 'image/png')];

    render(
      <FileUploader
        files={files}
        label="Upload your images"
        multiple
        onFilesChange={jest.fn()}
        previewHidden
      />,
    );

    expect(screen.getByRole('button', { name: /upload/i })).toBeVisible();
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('uploads files', async () => {
    const files = [createMockFile(1, 'file1', 'image/png')];
    const onFilesChange = jest.fn();

    render(
      <FileUploader files={[]} label="Upload your images" multiple onFilesChange={onFilesChange} />,
    );

    const input = screen.getByLabelText('file upload');

    await userEvent.upload(input, files);

    expect(onFilesChange).toHaveBeenCalledWith(files);
  });

  it('uploads single files', async () => {
    const files = [
      createMockFile(1, 'file1', 'image/png'),
      createMockFile(1, 'file2', 'image/png'),
    ];
    const onFilesChange = jest.fn();

    render(<FileUploader files={[]} label="Upload your images" onFilesChange={onFilesChange} />);

    const input = screen.getByLabelText('file upload');

    await userEvent.upload(input, files);

    expect(onFilesChange).toHaveBeenCalledWith([files[0]]);
  });

  it('removes file', async () => {
    const files = [
      createMockFile(1, 'file1', 'image/png'),
      createMockFile(1, 'file2', 'image/png'),
    ];
    const onFilesChange = jest.fn();

    render(
      <FileUploader
        files={files}
        label="Upload your images"
        multiple
        onFilesChange={onFilesChange}
      />,
    );

    await userEvent.click(screen.getByRole('button', { name: /remove file1/i }));

    expect(onFilesChange).toHaveBeenCalledWith([files[1]]);
  });

  it('validates files', () => {
    const files = [
      createMockFile(1, 'file1', 'image/png'),
      createMockFile(1, 'file2', 'image/png'),
      createMockFile(1, 'file11', 'image/png'),
      createMockFile(1, 'file22', 'image/png'),
    ];
    const validators: ValidatorConfig[] = [
      {
        type: 'name_limit',
        validator: (file) => file.name.length <= 5,
      },
    ];
    const onFilesChange = jest.fn();

    render(
      <FileUploader
        files={files}
        label="Upload your images"
        multiple
        onFilesChange={onFilesChange}
        validators={validators}
      />,
    );

    expect(screen.getByText('file1').parentElement).toHaveStyle(
      `border-color: ${theme.colors.secondary30}`,
    );
    expect(screen.getByText('file2').parentElement).toHaveStyle(
      `border-color: ${theme.colors.secondary30}`,
    );
    expect(screen.getByText('file11').parentElement).toHaveStyle(
      `border-color: ${theme.colors.danger40}`,
    );
    expect(screen.getByText('file22').parentElement).toHaveStyle(
      `border-color: ${theme.colors.danger40}`,
    );
  });

  it('triggers onFilesError', () => {
    const files = [
      createMockFile(1, 'file1', 'image/png'),
      createMockFile(1, 'file2', 'image/png'),
      createMockFile(2000, 'file11', 'image/png'),
      createMockFile(1, 'file22', 'image/png'),
    ];
    const validators: ValidatorConfig[] = [
      {
        type: 'name_limit',
        validator: (file) => file.name.length <= 5,
        message: 'File name is too long',
      },
      {
        type: 'size_limit',
        validator: (file) => file.size < 1000,
        message: 'File size is too big',
      },
    ];
    const onFilesChange = jest.fn();
    const onFilesError = jest.fn();

    render(
      <FileUploader
        files={files}
        label="Upload your images"
        multiple
        onFilesChange={onFilesChange}
        onFilesError={onFilesError}
        validators={validators}
      />,
    );

    expect(onFilesError).toHaveBeenCalledWith([
      {
        file: files[2],
        fileIdx: 2,
        message: 'File name is too long, File size is too big',
        type: ['name_limit', 'size_limit'],
      },
      {
        file: files[3],
        fileIdx: 3,
        message: 'File name is too long',
        type: 'name_limit',
      },
    ]);
  });

  it('renders with single error', async () => {
    jest.spyOn(console, 'error').mockImplementation();

    render(
      <FormGroup>
        <FileUploader
          error="File name is too long"
          files={[]}
          label="Upload your images"
          onFilesChange={jest.fn()}
        />
      </FormGroup>,
    );

    expect(screen.getByText('File name is too long')).toBeVisible();
  });

  it('renders with multiple errors', async () => {
    const errors = Array.from({ length: 15 }, () => 'File name is too long');

    jest.spyOn(console, 'error').mockImplementation();

    render(
      <FileUploader
        error={errors}
        files={[]}
        label="Upload your images"
        multiple
        onFilesChange={jest.fn()}
      />,
    );

    expect(screen.getByRole('alert')).toBeVisible();

    expect(screen.getAllByText('File name is too long')).toHaveLength(10);

    await userEvent.click(screen.getByRole('button', { name: /show more/i }));

    expect(screen.getAllByText('File name is too long')).toHaveLength(15);
  });

  it('renders additional action', async () => {
    const mockOnClick = jest.fn();

    render(
      <FileUploader
        dropzoneConfig={{
          action: {
            label: 'Upload by URL',
            onClick: mockOnClick,
          },
        }}
        files={[]}
        label="Upload your images"
        multiple
        onFilesChange={jest.fn()}
      />,
    );

    await userEvent.click(screen.getByRole('button', { name: /upload by url/i }));

    expect(mockOnClick).toHaveBeenCalled();
  });

  it('does not forward styles', () => {
    jest.spyOn(console, 'error').mockImplementation();

    render(
      <FileUploader
        dropzoneConfig={{
          action: {
            label: 'Upload by URL',
            onClick: jest.fn(),
            style: { backgroundColor: 'red' },
          },
        }}
        files={[]}
        label="Upload your images"
        multiple
        onFilesChange={jest.fn()}
      />,
    );

    expect(screen.getByRole('button', { name: /upload by url/i })).not.toHaveStyle(
      'background: red',
    );
  });

  it('does not forward variant', async () => {
    jest.spyOn(console, 'error').mockImplementation();

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const action = {
      label: 'Upload by URL',
      variant: 'primary',
      onClick: jest.fn(),
    } as Action;

    render(
      <FileUploader
        dropzoneConfig={{
          action,
        }}
        files={[]}
        label="Upload your images"
        multiple
        onFilesChange={jest.fn()}
      />,
    );

    expect(screen.getByRole('button', { name: /upload by url/i })).not.toHaveStyle(
      'background-color: rgb(60, 100, 244)',
    );
    expect(screen.getByRole('button', { name: /upload by url/i })).toHaveStyle(
      'background-color: transparent',
    );
  });
});

describe('File component', () => {
  it('renders image preview', () => {
    render(
      <FileComponent idx={0} isValid name="File name" onRemove={jest.fn()} previewSrc="img/src" />,
    );

    expect(screen.getByRole('img')).toBeVisible();
  });

  it('renders draft icon', () => {
    render(
      <FileComponent idx={0} isValid name="File name" onRemove={jest.fn()} previewSrc={null} />,
    );

    expect(screen.getByRole('img')).toBeVisible();
  });

  it('renders file name', () => {
    render(
      <FileComponent idx={0} isValid name="File name" onRemove={jest.fn()} previewSrc={null} />,
    );

    expect(screen.getByText('File name')).toBeVisible();
  });

  it('removes file', async () => {
    const onRemoveMock = jest.fn();

    render(
      <FileComponent idx={0} isValid name="File name" onRemove={onRemoveMock} previewSrc={null} />,
    );

    await userEvent.click(screen.getByRole('button', { name: /remove file name/i }));

    expect(onRemoveMock).toHaveBeenCalledWith('File name');
  });

  it('renders with invalid state', () => {
    const { container } = render(
      <FileComponent
        idx={0}
        isValid={false}
        name="File name"
        onRemove={jest.fn()}
        previewSrc={null}
      />,
    );

    expect(container.firstChild).toHaveStyle(`border-color: ${theme.colors.danger40}`);
  });
});

describe('DropZone', () => {
  it('renders dropzone', () => {
    render(
      <DropZone
        description="File types: JPG, GIF, PNG. Recommended size: 250x100px."
        label="Upload your images"
        localization={defaultLocalization}
        onFilesChange={jest.fn()}
      />,
    );

    expect(screen.getByRole('button', { name: /dropzone/i })).toBeVisible();
  });

  it('renders label', () => {
    render(
      <DropZone
        description="File types: JPG, GIF, PNG. Recommended size: 250x100px."
        label="Upload your images"
        localization={defaultLocalization}
        onFilesChange={jest.fn()}
      />,
    );

    expect(screen.getByText(/upload your images/i)).toBeVisible();
  });

  it('renders description', () => {
    render(
      <DropZone
        description="File types: JPG, GIF, PNG. Recommended size: 250x100px."
        label="Upload your images"
        localization={defaultLocalization}
        onFilesChange={jest.fn()}
      />,
    );

    expect(
      screen.getByText(/file types: jpg, gif, png. recommended size: 250x100px./i),
    ).toBeVisible();
  });

  it('uploads files', async () => {
    const file = createMockFile(1, 'file1', 'image/png');
    const onFilesChangeMock = jest.fn();

    render(
      <DropZone
        description="File types: JPG, GIF, PNG. Recommended size: 250x100px."
        label="Upload your images"
        localization={defaultLocalization}
        onFilesChange={onFilesChangeMock}
      />,
    );

    const input = screen.getByLabelText('file upload');

    await userEvent.upload(input, file);

    expect(onFilesChangeMock).toHaveBeenCalled();
  });

  it('renders localized button', () => {
    render(
      <DropZone
        description="File types: JPG, GIF, PNG. Recommended size: 250x100px."
        label="Upload your images"
        localization={{ ...defaultLocalization, upload: 'some button text' }}
        onFilesChange={jest.fn()}
      />,
    );

    expect(screen.getByRole('button', { name: /some button text/i })).toBeVisible();
  });
});
