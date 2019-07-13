declare module 'react-element-to-jsx-string' {
  export interface JsxToStringOptions {
    filterProps: string[];
    showDefaultProps: boolean;
    showFunctions: boolean;
    tabStop: number;
    useBooleanShorthandSyntax: boolean;
    useFragmentShortSyntax: boolean;
    sortProps: boolean;

    maxInlineAttributesLineLength?: number;
    functionValue(): void;
    displayName?(element: React.Element<any>): string;
  }

  export default function reactElementToJSXString(
    element: ReactElement<any>,
    options: Partial<JsxToStringOptions>,
  ): string;
}

declare module '*.md';
declare module '*.svg';
