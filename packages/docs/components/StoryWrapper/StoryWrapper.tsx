import { PrismTheme } from 'prism-react-renderer';
import { default as lightTheme } from 'prism-react-renderer/themes/github';
import { default as darkTheme } from 'prism-react-renderer/themes/oceanicNext';
import React, { createContext, useState } from 'react';

export type Language = 'jsx' | 'tsx';

interface Context {
  theme: PrismTheme;
  language: Language;
  setLanguage(language: Language): void;
  toggleTheme(): void;
}

export const CodeEditorContext = createContext<Context>({
  language: 'tsx',
  theme: darkTheme,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setLanguage: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleTheme: () => {},
});

export const StoryWrapper: React.FC = (props) => {
  const [editorTheme, setEditorTheme] = useState(darkTheme);
  const [language, setLanguage] = useState<Language>('tsx');
  const toggleEditorTheme = () => setEditorTheme(editorTheme === darkTheme ? lightTheme : darkTheme);

  return (
    <CodeEditorContext.Provider value={{ theme: editorTheme, toggleTheme: toggleEditorTheme, language, setLanguage }}>
      {props.children}
    </CodeEditorContext.Provider>
  );
};
