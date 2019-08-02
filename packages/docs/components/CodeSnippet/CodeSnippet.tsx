import { Box } from '@bigcommerce/big-design';
import clipboardCopy from 'clipboard-copy';
import React, { useContext } from 'react';
import { Editor } from 'react-live';

import { SnippetControls } from '../SnippetControls';
import { CodeEditorThemeContext } from '../StoryWrapper/StoryWrapper';

interface EditorProps {
  language?: string;
}

function formatCode(code: string) {
  const lines = code.split('\n');

  // Remove first line if empty (multiline)
  if (lines[0].trim() === '') {
    lines.splice(0, 1);
  }

  // Remove last line if empty (multiline)
  if (lines[lines.length - 1].trim() === '') {
    lines.pop();
  }

  // Number of whitespaces to remove from each line
  const padding = lines[0].search(/\S|$/);

  return lines.map(line => line.substr(padding)).join('\n');
}

function getCode(children: React.ReactNode) {
  if (typeof children !== 'string') {
    throw new Error('<CodeSnippet> children must be of type string');
  }

  return formatCode(children);
}

export const CodeSnippet: React.FC<EditorProps> = props => {
  const { children, language } = props;
  const { editorTheme } = useContext(CodeEditorThemeContext);
  const code = getCode(children);

  return (
    <Box border="box" marginBottom="xxLarge">
      <SnippetControls copyToClipboard={() => clipboardCopy(code)} helperText="Code example" />

      {/* react-live Editor types are wrong, PR submitted */}
      {/* 
  // @ts-ignore */}
      <Editor code={code} theme={editorTheme} language={language} disabled />
    </Box>
  );
};

CodeSnippet.defaultProps = {
  language: 'jsx',
};
