import { DropdownIcon, LoadingIcon, PlusIcon } from '@bigcommerce/big-design';
import { storiesOf } from '@storybook/react';
import React from 'react';

storiesOf('Icons', module).add('Overview', () => (
  <div>
    <p>Icons, pass a title prop for accessibility</p>

    <table>
      <tbody>
        <tr>
          <td>
            <DropdownIcon />
          </td>
          <td>Dropdown</td>
        </tr>
        <tr>
          <td>
            <LoadingIcon />
          </td>
          <td>Loading</td>
        </tr>
        <tr>
          <td>
            <PlusIcon />
          </td>
          <td>Plus</td>
        </tr>
      </tbody>
    </table>
  </div>
));
