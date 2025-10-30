import { theme } from '@bigcommerce/big-design-theme';
import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React from 'react';

import { warning } from '../../utils';
import { FormControlLabel, FormGroup } from '../Form';

import { defaultLocalization } from './constants';
import { DropZone } from './DropZone';
import { File as FileComponent } from './File';
import { FileAction, FileUploader } from './FileUploader';
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
    // Smoke test - just checking component renders without crashing
    render(<FileUploader files={[]} label="Upload your images" onFilesChange={jest.fn()} />);

    await waitFor(() => {
      expect(screen.getByText('Upload your images')).toBeInTheDocument();
    });
  });

  it('renders with label', async () => {
    render(<FileUploader files={[]} label="Upload your images" onFilesChange={jest.fn()} />);

    expect(await screen.findByText('Upload your images')).toBeInTheDocument();
  });

  it('renders with custom label', async () => {
    render(
      <FileUploader
        files={[]}
        label={<FormControlLabel>Upload your images</FormControlLabel>}
        onFilesChange={jest.fn()}
      />,
    );

    expect(await screen.findByText('Upload your images')).toBeInTheDocument();
  });

  test('does not accept invalid label', async () => {
    const testId = 'test';
    const label = <div data-testid={testId}>Label</div>;

    // Smoke test - invalid labels should not render
    render(<FileUploader files={[]} label={label} onFilesChange={jest.fn()} />);

    await waitFor(() => {
      expect(screen.queryByTestId(testId)).not.toBeInTheDocument();
    });
  });

  it('renders with description', async () => {
    const testId = 'test';
    const description = <div data-testid={testId}>Description</div>;

    // Smoke test - invalid descriptions should not render
    render(
      <FileUploader
        description={description}
        files={[]}
        label="Upload your images"
        onFilesChange={jest.fn()}
      />,
    );

    await waitFor(() => {
      expect(screen.queryByTestId(testId)).not.toBeInTheDocument();
    });
  });

  it('renders with custom description', async () => {
    // Smoke test - renders with custom description
    render(
      <FileUploader
        description="File types: JPG, GIF, PNG. Recommended size: 250x100px."
        files={[]}
        label="Upload your images"
        onFilesChange={jest.fn()}
      />,
    );

    await waitFor(() => {
      expect(
        screen.getByText(/file types: jpg, gif, png. recommended size: 250x100px./i),
      ).toBeInTheDocument();
    });
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

    expect(await screen.findByText(/drag and drop images here/i)).toBeInTheDocument();
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

    expect(await screen.findByText(/use hsd asd/i)).toBeInTheDocument();
  });

  it('renders DropZone with multiple mode', async () => {
    const files = [
      createMockFile(1, 'file1', 'image/png'),
      createMockFile(1, 'file2', 'image/png'),
    ];

    render(
      <FileUploader files={files} label="Upload your images" multiple onFilesChange={jest.fn()} />,
    );

    expect(screen.getByRole('button', { name: /upload/i })).toBeInTheDocument();
  });

  it('should not render DropZone when single mode', async () => {
    const files = [createMockFile(1, 'file1', 'image/png')];

    render(<FileUploader files={files} label="Upload your images" onFilesChange={jest.fn()} />);

    expect(screen.queryByRole('button', { name: /dropzone/i })).not.toBeInTheDocument();
  });

  it('renders with files list', async () => {
    const files = [
      createMockFile(1, 'file1', 'image/png'),
      createMockFile(1, 'file2', 'image/png'),
    ];

    render(
      <FileUploader files={files} label="Upload your images" multiple onFilesChange={jest.fn()} />,
    );

    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('renders only single file, without DropZone', async () => {
    const files = [createMockFile(1, 'file1', 'image/png')];

    render(<FileUploader files={files} label="Upload your images" onFilesChange={jest.fn()} />);

    expect(screen.getByText(/file1/i)).toBeVisible();
    expect(screen.queryByRole('button', { name: /dropzone/i })).not.toBeInTheDocument();
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
      'background-color: rgba(0, 0, 0, 0)',
    );
  });

  it('renders without label when label is not provided', async () => {
    // Smoke test - renders without label
    const { container } = render(<FileUploader files={[]} onFilesChange={jest.fn()} />);

    await waitFor(() => {
      const label = container.querySelector('label');

      expect(label).not.toBeInTheDocument();
    });
  });

  it('renders with valid FormControlDescription component', async () => {
    const { FormControlDescription } = await import('../Form');

    // Smoke test - valid FormControlDescription component renders
    render(
      <FileUploader
        description={<FormControlDescription>Custom description</FormControlDescription>}
        files={[]}
        label="Upload your images"
        onFilesChange={jest.fn()}
      />,
    );

    await waitFor(() => {
      expect(screen.getByText('Custom description')).toBeInTheDocument();
    });
  });

  it('calls action onItemClick with file and index', async () => {
    const mockOnItemClick = jest.fn();
    const file = createMockFile(1000, 'test.jpg', 'image/jpeg');
    const actions: FileAction[] = [
      {
        content: 'Custom action',
        onItemClick: mockOnItemClick,
      },
    ];

    render(
      <FileUploader
        actions={actions}
        files={[file]}
        label="Upload your images"
        onFilesChange={jest.fn()}
      />,
    );

    // Find the dropdown toggle button (MoreHoriz icon) and click it to open the dropdown
    const dropdownButtons = screen.getAllByRole('button', { name: '' });
    const dropdownToggle = dropdownButtons.find((button) =>
      button.querySelector('[aria-hidden="true"]'),
    );

    await userEvent.click(dropdownToggle);

    // Find and click the action item in the dropdown
    const actionItem = await screen.findByText('Custom action');

    await userEvent.click(actionItem);

    expect(mockOnItemClick).toHaveBeenCalledWith(file, 0);
  });

  it('handles multiple validation errors on the same file', async () => {
    const onFilesError = jest.fn();
    const validators: ValidatorConfig[] = [
      {
        type: 'name_limit',
        validator: (file: File) => file.name.length <= 5,
        message: 'File name is too long',
      },
      {
        type: 'size_limit',
        validator: (file: File) => file.size <= 500,
        message: 'File size is too big',
      },
    ];

    const file = createMockFile(1000, 'verylongfilename.jpg', 'image/jpeg');

    render(
      <FileUploader
        files={[file]}
        label="Upload your images"
        multiple
        onFilesChange={jest.fn()}
        onFilesError={onFilesError}
        validators={validators}
      />,
    );

    expect(onFilesError).toHaveBeenCalledWith([
      {
        file,
        fileIdx: 0,
        message: 'File name is too long, File size is too big',
        type: ['name_limit', 'size_limit'],
      },
    ]);
  });

  it('removes file in single mode', async () => {
    const onFilesChange = jest.fn();
    const file = createMockFile(1000, 'test.jpg', 'image/jpeg');

    render(
      <FileUploader files={[file]} label="Upload your images" onFilesChange={onFilesChange} />,
    );

    const removeButton = await screen.findByRole('button', { name: /remove test.jpg/i });

    await userEvent.click(removeButton);

    expect(onFilesChange).toHaveBeenCalledWith([]);
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
