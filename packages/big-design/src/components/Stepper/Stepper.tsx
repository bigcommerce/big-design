import React, { HTMLAttributes, memo } from 'react';

import { Flex } from '../Flex';

import { Step } from './Step';

export interface StepperProps extends HTMLAttributes<HTMLDivElement> {
  steps: string[];
  currentStep: number;
}

export const Stepper: React.FC<StepperProps> = memo(
  ({ className, style, steps, currentStep = 0, ...props }) =>
    steps.length ? (
      <Flex
        {...props}
        aria-valuemax={steps.length}
        aria-valuemin={0}
        aria-valuenow={currentStep + 1}
        aria-valuetext={`Step ${currentStep + 1}: ${steps[currentStep]}`}
        flexDirection="row"
        flexWrap="nowrap"
        marginBottom="xLarge"
        role="progressbar"
      >
        {steps.map((text, index) => (
          <Step
            index={index}
            key={index}
            selectedIndex={currentStep}
            stepperLength={steps.length}
            text={text}
          />
        ))}
      </Flex>
    ) : null,
);

Stepper.displayName = 'Stepper';
