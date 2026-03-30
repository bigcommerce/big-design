import styled from 'styled-components';

export const StyledWysiwygWrapper = styled.div`
  margin: 0 ${({ theme }) => theme.spacing.xLargeN};
`;

export const StyledWysiwygLabel = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  margin-bottom: ${({ theme }) => theme.spacing.small};
  padding: 0 ${({ theme }) => theme.spacing.xLarge};
`;

export const StyledWysiwygEditorContainer = styled.div`
  border-top: ${({ theme }) => theme.helpers.remCalc(1)} solid ${({ theme }) => theme.colors.secondary30};
  border-bottom: ${({ theme }) => theme.helpers.remCalc(1)} solid ${({ theme }) => theme.colors.secondary30};
  .rdw-editor-toolbar {
    border: none;
    border-bottom: ${({ theme }) => theme.helpers.remCalc(1)} solid ${({ theme }) => theme.colors.secondary30};
    border-radius: 0;
    margin-bottom: 0;
    padding: ${({ theme }) => theme.spacing.xSmall} ${({ theme }) => theme.spacing.small};
  }

  .rdw-colorpicker-modal {
    right: 0;
    left: auto;
  }

  .rdw-editor-main {
    min-height: ${({ theme }) => theme.helpers.remCalc(300)};
    padding: 0 ${({ theme }) => theme.spacing.medium};
    font-size: ${({ theme }) => theme.typography.fontSize.small};
  }
`;

export const StyledWysiwygFooter = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary10};
  border-top: ${({ theme }) => theme.helpers.remCalc(1)} solid ${({ theme }) => theme.colors.secondary30};
  color: ${({ theme }) => theme.colors.secondary60};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  padding: ${({ theme }) => theme.spacing.xxSmall} ${({ theme }) => theme.spacing.medium};
`;
