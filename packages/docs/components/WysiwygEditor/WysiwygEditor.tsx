import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import React, { useCallback, useMemo, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';

import {
  StyledWysiwygEditorContainer,
  StyledWysiwygFooter,
  StyledWysiwygLabel,
  StyledWysiwygWrapper,
} from './styled';

interface WysiwygEditorProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
}

const createEditorState = (html: string): EditorState => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const contentBlock = htmlToDraft(html || '');

  if (contentBlock) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);

    return EditorState.createWithContent(contentState);
  }

  return EditorState.createEmpty();
};

const getWordCount = (editorState: EditorState): number => {
  const text = editorState.getCurrentContent().getPlainText('');

  if (!text.trim()) {
    return 0;
  }

  return text.trim().split(/\s+/).length;
};

export const WysiwygEditor: React.FC<WysiwygEditorProps> = ({ label, value, onChange }) => {
  const [editorState, setEditorState] = useState(() => createEditorState(value));

  const handleChange = useCallback(
    (state: EditorState) => {
      setEditorState(state);

      const html = draftToHtml(convertToRaw(state.getCurrentContent()));

      onChange(html);
    },
    [onChange],
  );

  const wordCount = useMemo(() => getWordCount(editorState), [editorState]);

  return (
    <StyledWysiwygWrapper>
      {label !== undefined ? <StyledWysiwygLabel>{label}</StyledWysiwygLabel> : null}
      <StyledWysiwygEditorContainer>
        <Editor
          editorState={editorState}
          onEditorStateChange={handleChange}
          toolbar={{
            options: [
              'history',
              'blockType',
              'fontFamily',
              'fontSize',
              'inline',
              'colorPicker',
              'list',
              'textAlign',
              'link',
              'image',
            ],
            inline: {
              options: ['bold', 'italic', 'underline', 'strikethrough'],
            },
          }}
        />
        <StyledWysiwygFooter>{wordCount} words</StyledWysiwygFooter>
      </StyledWysiwygEditorContainer>
    </StyledWysiwygWrapper>
  );
};
