import {
  AssignmentIcon,
  Box,
  Button,
  CheckIcon,
  Flex,
  InvertColorsIcon,
  RestoreIcon,
  Small,
} from '@bigcommerce/big-design';
import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import React, { useContext, useState } from 'react';

import { CodeEditorThemeContext } from '../StoryWrapper/StoryWrapper';

import { StyledFlex } from './styled';

interface SnippetControls {
  helperText?: string;
  copyToClipboard(): void;
  resetCode?(): void;
}

const { colors } = defaultTheme;

function getCopyToClipboardIcon(isCopying: boolean) {
  return isCopying ? (
    <Box paddingHorizontal="xxSmall">
      <CheckIcon title="Copying" color={colors.success} size="small" />
    </Box>
  ) : (
    <AssignmentIcon title="Copy" color={colors.secondary60} />
  );
}

function onCopy(setIsCopying: (copying: boolean) => void, copyToClipboard: () => void) {
  setIsCopying(true);
  copyToClipboard();

  setTimeout(() => {
    setIsCopying(false);
  }, 1000);
}

export const SnippetControls: React.FC<SnippetControls> = props => {
  const { copyToClipboard, helperText, resetCode } = props;
  const [isCopying, setIsCopying] = useState(false);
  const { toggleEditorTheme } = useContext(CodeEditorThemeContext);

  return (
    <StyledFlex
      borderBottom="box"
      backgroundColor="secondary20"
      justifyContent="flex-end"
      alignItems="center"
      style={{ zIndex: 999 }}
    >
      <Flex.Item grow={1}>
        <Small marginHorizontal="small">{helperText}</Small>
      </Flex.Item>
      <Flex.Item borderLeft="box">
        <Button
          iconOnly={getCopyToClipboardIcon(isCopying)}
          variant="subtle"
          onClick={() => onCopy(setIsCopying, copyToClipboard)}
          disabled={isCopying}
        />
      </Flex.Item>
      {resetCode && (
        <Flex.Item borderLeft="box">
          <Button
            iconOnly={<RestoreIcon title="Reset" color={colors.secondary60} />}
            variant="subtle"
            onClick={resetCode}
          />
        </Flex.Item>
      )}
      <Flex.Item borderLeft="box">
        <Button
          iconOnly={<InvertColorsIcon title="Toggle Theme" color={colors.secondary60} />}
          variant="subtle"
          onClick={toggleEditorTheme}
        />
      </Flex.Item>
    </StyledFlex>
  );
};

SnippetControls.defaultProps = {
  helperText: 'Edit the code below to see your changes live!',
};
