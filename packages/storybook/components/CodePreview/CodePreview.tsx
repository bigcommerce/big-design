import * as BigDesign from '@bigcommerce/big-design';
import { defaultTheme, Box } from '@bigcommerce/big-design';
import clipboardCopy from 'clipboard-copy';
import { default as lightTheme } from 'prism-react-renderer/themes/github';
import { default as darkTheme } from 'prism-react-renderer/themes/oceanicNext';
import React, { useContext, useState } from 'react';
import reactElementToJSXString, { JsxToStringOptions } from 'react-element-to-jsx-string';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import styled from 'styled-components';

import { CodeEditorThemeContext } from '../StoryWrapper/StoryWrapper';

import { PreviewControls } from './PreviewControls';

const { colors } = defaultTheme;

const StyledLiveError = styled(LiveError)`
  background-color: ${colors.secondary70};
  color: ${colors.danger};
  font-size: ${defaultTheme.typography.fontSize.small};
  padding: ${defaultTheme.spacing.small};
`;

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

function getTheme(darkEditorTheme: boolean) {
  return darkEditorTheme ? darkTheme : lightTheme;
}

export const CodePreview: React.FC<{ options?: Partial<JsxToStringOptions> }> = props => {
  const initialCode = getInitialCode(props.children, props.options);
  const [code, setCode] = useState(initialCode);
  const { darkEditorTheme, toggleCodeEditorTheme } = useContext(CodeEditorThemeContext);

  return (
    <>
      <LiveProvider code={code} scope={BigDesign} theme={getTheme(darkEditorTheme)}>
        <Box padding="medium" backgroundColor="white" border="box" borderBottom="none">
          <LivePreview />
        </Box>
        <PreviewControls
          copyToClipboard={() => clipboardCopy(code)}
          resetCode={() => setCode(initialCode)}
          toggleTheme={toggleCodeEditorTheme}
        />
        <Box border="box" borderTop="none">
          <LiveEditor onChange={setCode} />
        </Box>
        <StyledLiveError />
      </LiveProvider>
    </>
  );
};
