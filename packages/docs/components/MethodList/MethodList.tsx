import { H3, Text } from '@bigcommerce/big-design';
import React from 'react';

import { Code } from '../Code';
import { CodeSnippet } from '../CodeSnippet';
import { List } from '../List';
import { MethodBadge } from '../MethodBadge';

interface Parmeter {
  param: string;
  description: React.ReactNode;
  required?: boolean;
}

export interface MethodListProps {
  name: string;
  intro: string;
  usage: string;
  parameterList: Parmeter[];
  returnDescription: React.ReactNode;
}

export const MethodList: React.FC<MethodListProps> = ({
  name,
  intro,
  usage,
  parameterList,
  returnDescription,
}) => {
  return (
    <>
      <H3>
        <Code primary>{name}</Code>
      </H3>

      <Text>{intro}</Text>

      <CodeSnippet language="javascript" showControls={false}>
        {usage}
      </CodeSnippet>

      {parameterList && parameterList.length > 0 && (
        <>
          <MethodBadge label="Parameters" />

          <List style={{ listStyleType: 'none' }}>
            {parameterList.map(({ param, description, required }, index) => (
              <List.Item key={index}>
                <Text>
                  <Code>{param}</Code>
                  {!required && (
                    <Text as="span" bold>
                      (optional)
                    </Text>
                  )}
                  : {description}
                </Text>
              </List.Item>
            ))}
          </List>
        </>
      )}

      <MethodBadge label="Return Value" marginBottom="medium" />

      <Text>{returnDescription}</Text>
    </>
  );
};
