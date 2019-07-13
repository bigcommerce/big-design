import { Box, GlobalStyle } from '@bigcommerce/big-design';
import React, { createContext, useState } from 'react';

interface Props {
  storyFn(): React.ReactNode;
}

interface Context {
  darkEditorTheme: boolean;
  toggleCodeEditorTheme(): void;
}

export const CodeEditorThemeContext = createContext<Context>({
  darkEditorTheme: true,
  // tslint:disable-next-line: no-empty
  toggleCodeEditorTheme: () => {},
});

export const StoryWrapper: React.FC<Props> = props => {
  const [darkEditorTheme, setDarkEditorTheme] = useState(true);
  const toggleCodeEditorTheme = () => setDarkEditorTheme(!darkEditorTheme);

  return (
    <CodeEditorThemeContext.Provider value={{ darkEditorTheme, toggleCodeEditorTheme }}>
      <>
        <GlobalStyle />
        <Box margin="xxLarge">{props.storyFn()}</Box>
      </>
    </CodeEditorThemeContext.Provider>
  );
};
