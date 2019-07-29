import { storiesOf } from '@storybook/react';
import React from 'react';

import { CheckboxStory } from './Checkbox';
import { FormStory } from './Form';
import { InputStory } from './Input';
import { RadioStory } from './Radio';
import { SelectStory } from './Select';
import { TextareaStory } from './Textarea';

storiesOf('Forms', module)
  .add('Overview', () => <FormStory />)
  .add('Checkbox', () => <CheckboxStory />)
  .add('Input', () => <InputStory />)
  .add('Radio', () => <RadioStory />)
  .add('Select', () => <SelectStory />)
  .add('Textarea', () => <TextareaStory />);
