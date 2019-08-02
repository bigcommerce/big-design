import { PrismTheme } from 'prism-react-renderer';
import { default as lightTheme } from 'prism-react-renderer/themes/github';
import { default as darkTheme } from 'prism-react-renderer/themes/oceanicNext';
import React, { createContext, useState } from 'react';

interface Context {
  editorTheme: PrismTheme;
  toggleEditorTheme(): void;
}

export const CodeEditorThemeContext = createContext<Context>({
  editorTheme: darkTheme,
  // tslint:disable-next-line: no-empty
  toggleEditorTheme: () => {},
});

export const StoryWrapper: React.FC = props => {
  const [editorTheme, setEditorTheme] = useState(darkTheme);
  const toggleEditorTheme = () => setEditorTheme(editorTheme === darkTheme ? lightTheme : darkTheme);

  return (
    <CodeEditorThemeContext.Provider value={{ editorTheme, toggleEditorTheme }}>
      {props.children}
    </CodeEditorThemeContext.Provider>
  );
};
