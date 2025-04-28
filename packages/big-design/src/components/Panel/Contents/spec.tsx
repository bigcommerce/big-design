import { theme } from '@bigcommerce/big-design-theme';
import { render } from '@testing-library/react';
import React from 'react';

import { PanelContents } from './Contents';

describe('PanelContents', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <PanelContents>
        <div>Test Content</div>
      </PanelContents>,
    );

    expect(getByText('Test Content')).toBeInTheDocument();
  });

  it('applies default props to StyledPanelContentsWrapper', () => {
    const { container } = render(<PanelContents />);
    const wrapper = container.firstChild;

    expect(wrapper).toHaveStyle('height: auto');
  });

  it('applies the `padded` prop correctly', () => {
    const { container } = render(<PanelContents padded={false} />);
    const wrapper = container.firstChild;

    expect(wrapper).toHaveStyle(`margin-inline: -${theme.spacing.medium}`);
  });

  it('applies the `height` prop correctly', () => {
    const { container } = render(<PanelContents height="200px">Test string</PanelContents>);
    const wrapper = container.firstChild;

    expect(wrapper).toHaveStyle('height: 200px');
  });

  it('applies the `scrollable` prop correctly', () => {
    const { container } = render(<PanelContents scrollable>Test string</PanelContents>);
    const wrapper = container.firstChild;

    expect(wrapper).toHaveStyle('overflow: auto');
  });

  it('renders StyledPanelContents with correct props', () => {
    const { getByText } = render(<PanelContents scrollable>Test string</PanelContents>);
    const contents = getByText('Test string');

    expect(contents).toBeInTheDocument();
    expect(contents).toMatchSnapshot();
  });
});
