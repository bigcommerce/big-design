import {
  defaultTheme,
  AssignmentIcon,
  Box,
  Button,
  CheckIcon,
  Flex,
  InvertColorsIcon,
  RestoreIcon,
  Small,
} from '@bigcommerce/big-design';
import React, { useState } from 'react';
import styled from 'styled-components';

interface PreviewControlsProps {
  copyToClipboard(): void;
  resetCode(): void;
  toggleTheme(): void;
}

const StyledFlex = styled(Flex)`
  flex-direction: row;
`;

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

function onCopy(setIsCopying: any, copyToClipboard: any) {
  setIsCopying(true);
  copyToClipboard();

  setTimeout(() => {
    setIsCopying(false);
  }, 1000);
}

export const PreviewControls: React.FC<PreviewControlsProps> = props => {
  const { copyToClipboard, resetCode, toggleTheme } = props;
  const [isCopying, setIsCopying] = useState(false);

  return (
    <StyledFlex border="box" backgroundColor="secondary20" justifyContent="flex-end" alignItems="center">
      <Flex.Item grow={1}>
        <Small marginHorizontal="small">Play with the code!</Small>
      </Flex.Item>
      <Flex.Item borderLeft="box">
        <Button
          iconOnly={getCopyToClipboardIcon(isCopying)}
          variant="subtle"
          onClick={() => onCopy(setIsCopying, copyToClipboard)}
          disabled={isCopying}
        />
      </Flex.Item>
      <Flex.Item borderLeft="box">
        <Button
          iconOnly={<RestoreIcon title="Reset" color={colors.secondary60} />}
          variant="subtle"
          onClick={resetCode}
        />
      </Flex.Item>
      <Flex.Item borderLeft="box">
        <Button
          iconOnly={<InvertColorsIcon title="Toggle Theme" color={colors.secondary60} />}
          variant="subtle"
          onClick={toggleTheme}
        />
      </Flex.Item>
    </StyledFlex>
  );
};
