import { transform } from '@babel/standalone';
import * as BigDesign from '@bigcommerce/big-design';
import * as BigDesignIcons from '@bigcommerce/big-design-icons';
import clipboardCopy from 'clipboard-copy';
// eslint-disable-next-line import/default
import parser from 'prettier/parser-babylon';
import { format } from 'prettier/standalone';
import React, { useContext, useEffect, useState } from 'react';
import { LiveEditor, LivePreview, LiveProvider } from 'react-live';
import styled from 'styled-components';

import { SnippetControls } from '../SnippetControls';
import { CodeEditorContext, Language } from '../StoryWrapper/StoryWrapper';

import { StyledLiveError } from './styled';

const defaultScope = {
  ...BigDesign,
  ...BigDesignIcons,
  React,
  useEffect,
  useState,
  styled,
};

function getInitialCode(children: React.ReactNode, language: Language): string {
  if (typeof children !== 'string') {
    throw new Error('<CodePreview> children must be of type string');
  }

  if (language === 'tsx') {
    return children;
  }

  const code = transform(children, {
    compact: false,
    retainLines: true,
    presets: [['typescript', { allExtensions: true, isTSX: true, jsxPragma: 'preserve' }]],
  }).code;

  return format(code, {
    parser: 'babel',
    plugins: [parser],
    printWidth: 100,
    singleQuote: true,
    trailingComma: 'all',
  });
}

function transformCode(input: string): string {
  try {
    return transform(input, {
      presets: [['typescript', { allExtensions: true, isTSX: true }], 'react'],
    }).code;
  } catch (e) {
    return input;
  }
}

export interface CodePreviewProps {
  scope?: { [key: string]: unknown };
}

export const CodePreview: React.FC<CodePreviewProps> = (props) => {
  const { children } = props;
  const { theme: editorTheme, language } = useContext(CodeEditorContext);

  const initialCode = getInitialCode(children, language);
  const [code, setCode] = useState(initialCode);
  const scope = { ...defaultScope, ...props.scope };

  useEffect(() => {
    setCode(getInitialCode(children, language));
  }, [children, language, setCode]);

  return (
    <BigDesign.Box border="box" marginBottom="xxLarge">
      <LiveProvider code={code} scope={scope} theme={editorTheme} language={language} transformCode={transformCode}>
        <BigDesign.Box padding="medium" backgroundColor="white" borderBottom="box">
          <LivePreview />
        </BigDesign.Box>
        <SnippetControls copyToClipboard={() => clipboardCopy(code)} resetCode={() => setCode(initialCode)} />
        <LiveEditor onChange={setCode} />
        <StyledLiveError />
      </LiveProvider>
    </BigDesign.Box>
  );
};

CodePreview.defaultProps = {
  scope: defaultScope,
};
