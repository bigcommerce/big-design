// Addons panel order is dictated by require order

/* tslint:disable:no-var-requires */

if (process.env.NODE_ENV !== 'production') {
  require('@storybook/addon-a11y/register');
  require('@storybook/addon-actions/register');
}

require('@storybook/addon-knobs/register');
require('@storybook/addon-backgrounds/register');
require('@storybook/addon-viewport/register');
