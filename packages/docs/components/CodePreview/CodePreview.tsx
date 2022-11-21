import { transform } from '@babel/standalone';
import * as BigDesign from '@bigcommerce/big-design';
import * as BigDesignIcons from '@bigcommerce/big-design-icons';
import clipboardCopy from 'clipboard-copy';
import parser from 'prettier/parser-babel';
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

type CodePreviewChildren = React.ReactNode | (() => JSX.Element);

function getInitialCode(children: CodePreviewChildren, language: Language): string {
  if (typeof children !== 'string') {
    throw new Error('<CodePreview> children must be of type string');
  }

  if (language === 'tsx') {
    return children;
  }

  const transformResult = transform(children, {
    compact: false,
    retainLines: true,
    presets: [['typescript', { allExtensions: true, isTSX: true, jsxPragma: 'preserve' }]],
  });

  const code = transformResult.code ?? children;

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
    const transformResult = transform(input, {
      presets: [['typescript', { allExtensions: true, isTSX: true }], 'react'],
    });

    return transformResult.code ?? input;
  } catch (e) {
    return input;
  }
}

export interface CodePreviewProps {
  children?: CodePreviewChildren;
  scope?: { [key: string]: unknown };
}

export const CodePreview: React.FC<CodePreviewProps> = (props) => {
  const { children } = props;
  const { theme: editorTheme, language } = useContext(CodeEditorContext);

  const initialCode = getInitialCode(children, language);
  const [code, setCode] = useState(initialCode);
  const [scope, setScope] = useState({ ...defaultScope, ...props.scope });

  useEffect(() => {
    setScope({ ...defaultScope, ...props.scope });
  }, [props.scope, setScope]);

  useEffect(() => {
    setCode(getInitialCode(children, language));
  }, [children, language, setCode]);

  return (
    <BigDesign.Box border="box">
      <LiveProvider
        code={code}
        language={language}
        scope={scope}
        theme={{
          ...editorTheme,
          plain: {
            ...editorTheme.plain,
            // Adds back previous version stylings
            fontFamily: 'monospace',
            whiteSpace: 'pre-wrap',
          },
        }}
        transformCode={transformCode}
      >
        <BigDesign.Box backgroundColor="white" borderBottom="box" padding="medium">
          <LivePreview />
        </BigDesign.Box>
        <SnippetControls
          copyToClipboard={() => clipboardCopy(code)}
          resetCode={() => setCode(initialCode)}
        />
        <BigDesign.Box>
          <LiveEditor
            onChange={setCode}
            // Adds background and text color
            style={editorTheme.plain}
          />
        </BigDesign.Box>
        <StyledLiveError />
      </LiveProvider>
    </BigDesign.Box>
  );
};
