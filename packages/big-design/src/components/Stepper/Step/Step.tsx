import { CheckIcon } from '@bigcommerce/big-design-icons';
import React, { memo } from 'react';

import { StyledDash, StyledLight, StyledSrOnlyText, StyledStep, StyledText } from './styled';

interface StepProps {
  index: number;
  selectedIndex: number;
  stepperLength: number;
  text: string;
}

export const Step: React.FC<StepProps> = memo(({ index, selectedIndex, stepperLength, text }) => {
  const isComplete = selectedIndex > index;
  const isSelected = selectedIndex === index;
  const isActive = isSelected || isComplete;

  return (
    <StyledStep
      display={{ mobile: isSelected ? 'grid' : 'none', tablet: 'grid' }}
      marginBottom="xLarge"
      marginRight={{ tablet: 'xSmall' }}
    >
      <StyledLight
        alignItems="center"
        backgroundColor={isActive ? 'primary' : 'secondary50'}
        flexDirection="row"
        justifyContent="center"
        paddingHorizontal={{ mobile: 'xSmall', tablet: 'none' }}
        paddingVertical={{ mobile: 'xxSmall', tablet: 'none' }}
      >
        {isComplete ? (
          <CheckIcon color="white" size="large" />
        ) : (
          // span is needed to preserve white space inside a flex container
          <span>
            <StyledSrOnlyText>Step</StyledSrOnlyText>
            {` ${index + 1} `}
            <StyledSrOnlyText>of {stepperLength}</StyledSrOnlyText>
          </span>
        )}
      </StyledLight>
      <StyledDash
        backgroundColor={isComplete ? 'primary' : 'secondary30'}
        display={{ mobile: 'none', tablet: index === stepperLength - 1 ? 'none' : 'block' }}
      />
      <StyledText color={isActive ? 'secondary70' : 'secondary50'}>{text}</StyledText>
    </StyledStep>
  );
});

Step.displayName = 'Step';
