import { Button, FlexItem, Small } from '@bigcommerce/big-design';
import {
  AssignmentIcon,
  CheckIcon,
  InvertColorsIcon,
  RestoreIcon,
} from '@bigcommerce/big-design-icons';
import React, { useContext, useState } from 'react';

import { JavascriptIcon } from '../Icons/JavascriptIcon';
import { TypescriptIcon } from '../Icons/TypescriptIcon';
import { CodeEditorContext } from '../StoryWrapper/StoryWrapper';

import { StyledFlex } from './styled';

interface SnippetControls {
  readonly helperText?: string;
  copyToClipboard(): void;
  resetCode?(): void;
}

function getCopyToClipboardIcon(isCopying: boolean) {
  return isCopying ? (
    <CheckIcon color="success" title="Copying" />
  ) : (
    <AssignmentIcon color="secondary60" title="Copy" />
  );
}

function onCopy(setIsCopying: (copying: boolean) => void, copyToClipboard: () => void) {
  setIsCopying(true);
  copyToClipboard();

  setTimeout(() => {
    setIsCopying(false);
  }, 1000);
}

export const SnippetControls: React.FC<SnippetControls> = (props) => {
  const { copyToClipboard, helperText, resetCode } = props;
  const [isCopying, setIsCopying] = useState(false);
  const { toggleTheme: toggleEditorTheme, setLanguage } = useContext(CodeEditorContext);

  return (
    <StyledFlex
      alignItems="center"
      backgroundColor="secondary20"
      borderBottom="box"
      justifyContent="flex-end"
      style={{ zIndex: 999 }}
    >
      <FlexItem flexGrow={1}>
        <Small marginHorizontal="small">{helperText}</Small>
      </FlexItem>

      <FlexItem borderLeft="box">
        <Button iconOnly={<TypescriptIcon />} onClick={() => setLanguage('tsx')} variant="subtle" />
      </FlexItem>

      <FlexItem borderLeft="box">
        <Button iconOnly={<JavascriptIcon />} onClick={() => setLanguage('jsx')} variant="subtle" />
      </FlexItem>

      <FlexItem borderLeft="box">
        <Button
          disabled={isCopying}
          iconOnly={getCopyToClipboardIcon(isCopying)}
          onClick={() => onCopy(setIsCopying, copyToClipboard)}
          variant="subtle"
        />
      </FlexItem>
      {resetCode && (
        <FlexItem borderLeft="box">
          <Button
            iconOnly={<RestoreIcon color="secondary60" title="Reset" />}
            onClick={resetCode}
            variant="subtle"
          />
        </FlexItem>
      )}
      <FlexItem borderLeft="box">
        <Button
          iconOnly={<InvertColorsIcon color="secondary60" title="Toggle Theme" />}
          onClick={toggleEditorTheme}
          variant="subtle"
        />
      </FlexItem>
    </StyledFlex>
  );
};

SnippetControls.defaultProps = {
  helperText: 'Edit the code below to see your changes live!',
};
