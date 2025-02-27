import React from 'react';

import { Code, NextLink, Prop, PropTable, PropTableWrapper } from '../components';

const fileUploaderProps: Prop[] = [
  {
    name: 'actions',
    types: (
      <>
        <NextLink
          href={{
            hash: 'file-uploader-file-actions-prop-table',
            query: { props: 'file-uploader-file-actions' },
          }}
        >
          FileAction
        </NextLink>
        []
      </>
    ),
    description: (
      <>
        Value for the <Code primary>FileUploader</Code>. Only accepts <Code>File[]</Code>.
      </>
    ),
  },
  {
    name: 'accept',
    types: 'string',
    description: (
      <>
        Takes as its value a comma-separated list of one or more file types or unique file type
        specifiers, such as <Code>video/*,image/*</Code>
      </>
    ),
  },
  {
    name: 'description',
    types: ['string', 'FormControlDescription'],
    description: (
      <>
        Adds a description to the <Code primary>FileUploader</Code>.'
      </>
    ),
  },
  {
    name: 'disabled',
    types: 'boolean',
    description: (
      <>
        Disables the <Code primary>FileUploader</Code>.
      </>
    ),
  },
  {
    name: 'dropzoneConfig',
    types: (
      <>
        <NextLink
          href={{
            hash: 'file-uploader-dropzone-config-prop-table',
            query: { props: 'file-uploader-dropzone-config' },
          }}
        >
          DropzoneConfig
        </NextLink>
        []
      </>
    ),
    description: <>Adds a label and a description to the drop-zone box.</>,
  },
  {
    name: 'error',
    types: ['string', 'string[]', 'FormControlError', 'FormControlError[]'],
    description: (
      <>
        Displays an error message for the field. Error message will be passed to the{' '}
        <Code>FormGroup</Code> for display purposes.
      </>
    ),
  },
  {
    name: 'files',
    types: 'File[]',
    required: true,
    description: (
      <>
        Value for the <Code primary>FileUploader</Code>. Only accepts <Code>File[]</Code>.
      </>
    ),
  },
  {
    name: 'previewHidden',
    types: 'boolean',
    description: (
      <>
        Value for the <Code primary>FileUploader</Code>. Only accepts <Code>File[]</Code>.
      </>
    ),
  },
  {
    name: 'label',
    types: ['string', 'FormControlLabel'],
    description: (
      <>
        Label element for <Code primary>FileUploader</Code>. Component will auto generate{' '}
        <Code>id</Code>'s for the accessibility API.
      </>
    ),
  },
  {
    name: 'labelId',
    types: 'string',
    description: (
      <>
        Adds an <Code>id</Code> to the generated label element.
      </>
    ),
  },
  {
    name: 'localization',
    types: '{ upload: string }',
    description: 'Overrides labels with localized text.',
  },
  {
    name: 'multiple',
    types: 'boolean',
    description: 'Allows to upload multiple files.',
  },
  {
    name: 'validators',
    types: (
      <>
        <NextLink
          href={{
            hash: 'file-uploader-validator-prop-table',
            query: { props: 'file-uploader-validator' },
          }}
        >
          ValidatorConfig
        </NextLink>
        []
      </>
    ),
    description: 'Allows to define custom validators for files.',
  },
  {
    name: 'onFilesChange',
    types: '(files: File[]): void',
    description: 'Function called to change files value. Receives new files from the component.',
    required: true,
  },
  {
    name: 'onFilesError',
    types: (
      <>
        (errors:{' '}
        <NextLink
          href={{
            hash: 'file-uploader-error-prop-table',
            query: { props: 'file-uploader-error' },
          }}
        >
          FileValidationError
        </NextLink>
        []): void;
      </>
    ),
    description: 'Function called when one of the validators fails. Receives an array of errors.',
  },
];

const fileUploaderValidatorProps: Prop[] = [
  {
    name: 'message',
    types: 'string',
    description: 'Error message passed to the error object when validator fails.',
  },
  {
    name: 'type',
    types: 'string',
    description: 'Type of validator, size, format, etc.',
    required: true,
  },
  {
    name: 'validator',
    types: '(file: File) => boolean;',
    description: 'Function that validates the file.',
    required: true,
  },
];

const fileActionsProps: Prop[] = [
  {
    name: 'actionType',
    types: ['normal', 'destructive'],
    defaultValue: 'normal',
    description: "Indicates whether your item's action is of normal or destructive nature.",
  },
  {
    name: 'content',
    types: 'string',
    required: true,
    description: (
      <>
        Sets the text content of the <Code>DropdownItem</Code>.
      </>
    ),
  },
  {
    name: 'description',
    types: 'string',
    description: (
      <>
        Sets the content description of the <Code>DropdownItem</Code>.
      </>
    ),
  },
  {
    name: 'disabled',
    types: 'boolean',
    description: 'Sets the item to disabled.',
  },
  {
    name: 'hash',
    types: 'string',
    description: 'Stored hash of the item.',
  },
  {
    name: 'icon',
    types: <NextLink href="/icons">Icon</NextLink>,
    description: (
      <>
        Pass in an <NextLink href="/icons">Icon</NextLink> component to display to the left of the
        text.
      </>
    ),
  },
  {
    name: 'onItemClick',
    types: '(name: File, idx: number) => void',
    required: true,
    description: 'Triggers when clicking on action item.',
  },
  {
    name: 'tooltip',
    types: 'string',
    description: <>Adds tooltip for disabled item.</>,
  },
  {
    name: 'type',
    types: "'text'",
    description: 'Type of the item.',
  },
];

const fileUploaderErrorProps: Prop[] = [
  {
    name: 'file',
    types: 'File',
    description: 'File that failed validation.',
  },
  {
    name: 'fileIdx',
    types: 'number',
    description: 'Index of the file that failed validation.',
  },
  {
    name: 'message',
    types: 'string',
    description: 'Message that is taken from the validator if it is defined there.',
  },
  {
    name: 'type',
    types: 'string',
    description: 'Type of the error, size, format, etc.',
  },
];

const dropzoneConfigProps: Prop[] = [
  {
    name: 'action',
    types: 'object',
    description: (
      <>
        Accepts an object with <NextLink href="/button">Button</NextLink> props and additional{' '}
        <Code>label</Code> prop and exclude <Code>variant</Code> prop.
      </>
    ),
  },
  {
    name: 'description',
    types: 'string',
    description: 'Short description for the dropzone.',
  },
  {
    name: 'emptyHeight',
    types: 'number',
    description: 'Set height for the dropzone when there are no files.',
  },
  {
    name: 'icon',
    types: 'React.ReactNode',
    description: 'Adds icon to the dropzone.',
  },
  {
    name: 'label',
    types: 'string',
    description: 'Adds a label to the field.',
  },
];

export const FileUploaderPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable
    nativeElement={['input', 'most']}
    propList={fileUploaderProps}
    title="FileUploader"
    {...props}
  />
);

export const FileUploaderValidatorPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={fileUploaderValidatorProps} title="ValidatorConfig" {...props} />
);

export const FileUploaderErrorPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={fileUploaderErrorProps} title="Error" {...props} />
);

export const FileUploaderFileActionPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={fileActionsProps} title="FileAction" {...props} />
);

export const FileUploaderFileDropzoneConfigPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={dropzoneConfigProps} title="DropzoneConfig" {...props} />
);
