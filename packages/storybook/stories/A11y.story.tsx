import { withA11y } from '@storybook/addon-a11y';
import { addDecorator } from '@storybook/react';

// TODO: This should be in `.storybook/config.tsx`, however, there
// is a bug in storybook https://github.com/storybooks/storybook/issues/6185
// move it to config.tsx when the bug gets fixed
addDecorator(withA11y);
