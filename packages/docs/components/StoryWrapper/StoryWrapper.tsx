import { PrismTheme, themes } from 'prism-react-renderer';
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
  theme: themes.oceanicNext,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setLanguage: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleTheme: () => {},
});

export const StoryWrapper: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [editorTheme, setEditorTheme] = useState(themes.oceanicNext);
  const [language, setLanguage] = useState<Language>('tsx');
  const toggleEditorTheme = () =>
    setEditorTheme(editorTheme === themes.oceanicNext ? themes.github : themes.oceanicNext);

  return (
    <CodeEditorContext.Provider
      value={{ theme: editorTheme, toggleTheme: toggleEditorTheme, language, setLanguage }}
    >
      {children}
    </CodeEditorContext.Provider>
  );
};
