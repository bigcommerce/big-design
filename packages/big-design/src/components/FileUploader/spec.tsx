import { theme } from '@bigcommerce/big-design-theme';
import { waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { render, screen } from '@test/utils';

import { warning } from '../../utils';
import { FormControlLabel } from '../Form';

import { DropZone } from './DropZone';
import { File as FileComponent } from './File';
import { FileUploader } from './FileUploader';

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
});

describe('File component', () => {
  it('renders image preview', () => {
    render(<FileComponent isValid name="File name" onRemove={jest.fn()} previewSrc="img/src" />);

    expect(screen.getByRole('img')).toBeVisible();
  });

  it('renders draft icon', () => {
    render(<FileComponent isValid name="File name" onRemove={jest.fn()} previewSrc={null} />);

    expect(screen.getByRole('img')).toBeVisible();
  });

  it('renders file name', () => {
    render(<FileComponent isValid name="File name" onRemove={jest.fn()} previewSrc={null} />);

    expect(screen.getByText('File name')).toBeVisible();
  });

  it('removes file', async () => {
    const onRemoveMock = jest.fn();

    render(<FileComponent isValid name="File name" onRemove={onRemoveMock} previewSrc={null} />);

    await userEvent.click(screen.getByRole('button', { name: /remove file name/i }));

    expect(onRemoveMock).toHaveBeenCalledWith('File name');
  });

  it('renders with invalid state', () => {
    const { container } = render(
      <FileComponent isValid={false} name="File name" onRemove={jest.fn()} previewSrc={null} />,
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
        localization={{ upload: 'some button text' }}
        onFilesChange={jest.fn()}
      />,
    );

    expect(screen.getByRole('button', { name: /some button text/i })).toBeVisible();
  });
});
