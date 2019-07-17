import * as BigDesign from '@bigcommerce/big-design';
import clipboardCopy from 'clipboard-copy';
import React, { useContext, useState } from 'react';
import reactElementToJSXString, { JsxToStringOptions } from 'react-element-to-jsx-string';
import { LiveEditor, LivePreview, LiveProvider } from 'react-live';

import { SnippetControls } from '../SnippetControls';
import { CodeEditorThemeContext } from '../StoryWrapper/StoryWrapper';

import { StyledLiveError } from './styled';

function getInitialCode(children: React.ReactNode, options: Partial<JsxToStringOptions> = {}): string {
  return typeof children === 'string'
    ? children
    : reactElementToJSXString(children, {
        maxInlineAttributesLineLength: 100,
        showDefaultProps: false,
        showFunctions: false,
        sortProps: true,
        tabStop: 2,
        ...options,
      });
}

export const CodePreview: React.FC<{ options?: Partial<JsxToStringOptions> }> = props => {
  const initialCode = getInitialCode(props.children, props.options);
  const [code, setCode] = useState(initialCode);
  const { editorTheme } = useContext(CodeEditorThemeContext);

  return (
    <>
      <LiveProvider code={code} scope={BigDesign} theme={editorTheme}>
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
