import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { FormControlLabel } from '../Form';

import { Toggle } from './Toggle';

describe('Toggle', () => {
  it('renders three toggle buttons', () => {
    render(
      <Toggle
        items={[
          {
            value: '1',
            label: '1',
          },
          {
            value: '2',
            label: '2',
          },
          {
            value: '3',
            label: '3',
          },
        ]}
        onChange={() => null}
        value="1"
      />,
    );

    expect(screen.getAllByRole('switch')).toHaveLength(3);
  });

  it('renders label', () => {
    render(
      <Toggle
        id="toggle-test"
        items={[
          {
            value: '1',
            label: '1',
          },
          {
            value: '2',
            label: '2',
          },
          {
            value: '3',
            label: '3',
          },
        ]}
        label="Toggle test label"
        labelId="test-id"
        onChange={() => null}
        value="1"
      />,
    );

    expect(screen.getByRole('group', { name: /toggle test label/i })).toBeInTheDocument();
  });

  it('renders custom label', () => {
    render(
      <Toggle
        items={[
          {
            value: '1',
            label: '1',
          },
          {
            value: '2',
            label: '2',
          },
          {
            value: '3',
            label: '3',
          },
        ]}
        label={<FormControlLabel>Custom label</FormControlLabel>}
        labelId="test-id"
        onChange={() => null}
        value="1"
      />,
    );

    expect(screen.getByRole('group', { name: /custom label/i })).toBeInTheDocument();
  });

  it('disables all tabs', () => {
    render(
      <Toggle
        disabled={true}
        items={[
          {
            value: '1',
            label: '1',
          },
          {
            value: '2',
            label: '2',
          },
          {
            value: '3',
            label: '3',
          },
        ]}
        onChange={() => null}
        value="1"
      />,
    );

    const tabs = screen.getAllByRole('switch');

    expect(tabs[0]).toBeDisabled();
    expect(tabs[1]).toBeDisabled();
    expect(tabs[2]).toBeDisabled();
  });

  it('triggers onTabClick', () => {
    const onTabClickMock = jest.fn();

    render(
      <Toggle
        items={[
          {
            value: '1',
            label: '1',
          },
          {
            value: '2',
            label: '2',
          },
          {
            value: '3',
            label: '3',
          },
        ]}
        onChange={onTabClickMock}
        value="1"
      />,
    );

    const tabs = screen.getAllByRole('switch');

    if (tabs[1] && tabs[2]) {
      fireEvent.click(tabs[1]);
      fireEvent.click(tabs[2]);
    }

    expect(onTabClickMock).toHaveBeenCalledTimes(2);
  });
});
