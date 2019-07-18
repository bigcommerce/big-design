import * as BigDesign from '@bigcommerce/big-design';
import clipboardCopy from 'clipboard-copy';
import { Language } from 'prism-react-renderer';
import React, { useContext, useState } from 'react';
import { LiveEditor, LivePreview, LiveProvider } from 'react-live';

import { SnippetControls } from '../SnippetControls';
import { CodeEditorThemeContext } from '../StoryWrapper/StoryWrapper';

import { StyledLiveError } from './styled';

const defaultScope = {
  ...BigDesign,
  React,
};

function getInitialCode(children: React.ReactNode): string {
  if (typeof children !== 'string') {
    throw new Error('<CodePreview> children must be of type string');
  }

  return children;
}

export interface CodePreviewProps {
  scope?: { [key: string]: any };
  language?: Language;
}

export const CodePreview: React.FC<CodePreviewProps> = props => {
  const { children, language, scope } = props;
  const initialCode = getInitialCode(children);
  const [code, setCode] = useState(initialCode);
  const { editorTheme } = useContext(CodeEditorThemeContext);

  return (
    <>
      <LiveProvider code={code} scope={scope} theme={editorTheme} language={language}>
        <BigDesign.Box padding="medium" backgroundColor="white" border="box" borderBottom="none">
          <LivePreview />
        </BigDesign.Box>
        <SnippetControls copyToClipboard={() => clipboardCopy(code)} resetCode={() => setCode(initialCode)} />
        <BigDesign.Box border="box" borderTop="none">
          <LiveEditor onChange={setCode} />
        </BigDesign.Box>
        <StyledLiveError />
      </LiveProvider>
    </>
  );
};

CodePreview.defaultProps = {
  language: 'jsx',
  scope: defaultScope,
};
