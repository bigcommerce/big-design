import { FileUploader, Form, FormGroup, H1, Panel, Text } from '@bigcommerce/big-design';
import React, { useState } from 'react';

import { Code, CodePreview, ContentRoutingTabs, GuidelinesTable, List } from '../components';
import {
  FileUploaderErrorPropTable,
  FileUploaderFileActionPropTable,
  FileUploaderFileDropzoneConfigPropTable,
  FileUploaderPropTable,
  FileUploaderValidatorPropTable,
} from '../PropTables';

const FileUploaderPage = () => {
  return (
    <>
      <H1>FileUploader</H1>
      <Panel header="Overview" headerId="overview">
        <Text>
          <Code primary>FileUploader</Code> allows users to upload content of their own to the
          system. A file uploader is commonly found in forms, but can also live as a standalone
          element.
        </Text>
        <Text bold>When to use:</Text>
        <List>
          <List.Item>Uploading one or multiple documents or images.</List.Item>
          <List.Item>Drag and drop one or multiple documents or images.</List.Item>
        </List>
      </Panel>

      <Panel header="Implementation" headerId="implementation">
        <CodePreview>
          {/* jsx-to-string:start */}
          {function Example() {
            const [files, setFiles] = useState<File[]>([]);

            const validateFileSize = (file: File) => {
              const MB = 1024 * 1024;

              return file.size <= MB;
            };

            return (
              <Form>
                <FormGroup>
                  <FileUploader
                    dropzoneConfig={{
                      label: 'Drag and drop image here',
                      action: {
                        label: 'Upload by URL',
                        onClick: () => null,
                      },
                    }}
                    files={files}
                    label="Upload files"
                    multiple
                    onFilesChange={setFiles}
                    required
                    validators={[
                      {
                        validator: validateFileSize,
                        type: 'file-size',
                      },
                    ]}
                  />
                </FormGroup>
              </Form>
            );
          }}
          {/* jsx-to-string:end */}
        </CodePreview>
      </Panel>

      <Panel header="Props" headerId="props">
        <ContentRoutingTabs
          id="props"
          routes={[
            {
              id: 'file-uploader',
              title: 'FileUploader',
              render: () => <FileUploaderPropTable id="file-uploader-prop-table" />,
            },
            {
              id: 'file-uploader-validator',
              title: 'Validator',
              render: () => (
                <FileUploaderValidatorPropTable id="file-uploader-validator-prop-table" />
              ),
            },
            {
              id: 'file-uploader-error',
              title: 'Error',
              render: () => <FileUploaderErrorPropTable id="file-uploader-error-prop-table" />,
            },
            {
              id: 'file-uploader-file-actions',
              title: 'FileAction',
              render: () => (
                <FileUploaderFileActionPropTable id="file-uploader-file-actions-prop-table" />
              ),
            },
            {
              id: 'file-uploader-dropzone-config',
              title: 'DropzoneConfig',
              render: () => (
                <FileUploaderFileDropzoneConfigPropTable id="file-uploader-dropzone-config-prop-table" />
              ),
            },
          ]}
        />
      </Panel>

      <Panel header="Do's and Don'ts" headerId="guidelines">
        <GuidelinesTable
          discouraged={[]}
          recommended={['Specify allowed file types and maximum size.']}
        />
      </Panel>
    </>
  );
};

export default FileUploaderPage;
