import { render } from '@testing-library/react';
import React from 'react';
import 'jest-styled-components';

import { Caption, StatelessTable, TBody, TD, TFoot, TH, THead, TR } from './StatelessTable';

describe('StatelessTable', () => {
  test('renders a basic table', () => {
    const { container } = render(
      <StatelessTable>
        <THead>
          <TR>
            <TH>Header 1</TH>
            <TH>Header 2</TH>
          </TR>
        </THead>
        <TBody>
          <TR>
            <TD>Cell 1</TD>
            <TD>Cell 2</TD>
          </TR>
        </TBody>
      </StatelessTable>,
    );

    const table = container.querySelector('table');

    expect(table).toBeInTheDocument();
  });

  test('renders with caption', () => {
    const { getByText } = render(
      <StatelessTable>
        <Caption>Test Caption</Caption>
        <THead>
          <TR>
            <TH>Header</TH>
          </TR>
        </THead>
        <TBody>
          <TR>
            <TD>Cell</TD>
          </TR>
        </TBody>
      </StatelessTable>,
    );

    expect(getByText('Test Caption')).toBeInTheDocument();
  });

  test('renders table head correctly', () => {
    const { container } = render(
      <StatelessTable>
        <THead>
          <TR>
            <TH>Header 1</TH>
            <TH>Header 2</TH>
          </TR>
        </THead>
      </StatelessTable>,
    );

    const thead = container.querySelector('thead');

    expect(thead).toBeInTheDocument();

    const headers = container.querySelectorAll('th');

    expect(headers).toHaveLength(2);
    expect(headers[0]).toHaveTextContent('Header 1');
    expect(headers[1]).toHaveTextContent('Header 2');
  });

  test('renders table body correctly', () => {
    const { container } = render(
      <StatelessTable>
        <TBody>
          <TR>
            <TD>Cell 1</TD>
            <TD>Cell 2</TD>
          </TR>
          <TR>
            <TD>Cell 3</TD>
            <TD>Cell 4</TD>
          </TR>
        </TBody>
      </StatelessTable>,
    );

    const tbody = container.querySelector('tbody');

    expect(tbody).toBeInTheDocument();

    const rows = container.querySelectorAll('tbody tr');

    expect(rows).toHaveLength(2);

    const cells = container.querySelectorAll('tbody td');

    expect(cells).toHaveLength(4);
  });

  test('renders table foot correctly', () => {
    const { container } = render(
      <StatelessTable>
        <TFoot>
          <TR>
            <TD>Footer 1</TD>
            <TD>Footer 2</TD>
          </TR>
        </TFoot>
      </StatelessTable>,
    );

    const tfoot = container.querySelector('tfoot');

    expect(tfoot).toBeInTheDocument();
  });

  test('renders row with status', () => {
    const { container } = render(
      <StatelessTable>
        <TBody>
          <TR status="success">
            <TD>Success row</TD>
          </TR>
          <TR status="danger">
            <TD>Danger row</TD>
          </TR>
          <TR status="warning">
            <TD>Warning row</TD>
          </TR>
          <TR status="info">
            <TD>Info row</TD>
          </TR>
        </TBody>
      </StatelessTable>,
    );

    const rows = container.querySelectorAll('tbody tr');

    expect(rows).toHaveLength(4);
  });

  test('renders checkbox cell', () => {
    const { container } = render(
      <StatelessTable>
        <TBody>
          <TR>
            <TD isCheckbox>
              <input type="checkbox" />
            </TD>
            <TD>Regular cell</TD>
          </TR>
        </TBody>
      </StatelessTable>,
    );

    const checkbox = container.querySelector('input[type="checkbox"]');

    expect(checkbox).toBeInTheDocument();
  });

  test('renders action cell', () => {
    const { getByText } = render(
      <StatelessTable>
        <TBody>
          <TR>
            <TD>Regular cell</TD>
            <TD isAction>
              <button>Action</button>
            </TD>
          </TR>
        </TBody>
      </StatelessTable>,
    );

    expect(getByText('Action')).toBeInTheDocument();
  });

  test('renders mobile header in data cell', () => {
    const { container } = render(
      <StatelessTable>
        <TBody>
          <TR>
            <TD mobileHeader="Mobile Header">Cell content</TD>
          </TR>
        </TBody>
      </StatelessTable>,
    );

    const mobileHeader = container.querySelector('[aria-hidden="true"]');

    expect(mobileHeader).toBeInTheDocument();
    expect(mobileHeader).toHaveTextContent('Mobile Header');
  });

  test('does not render mobile header when not provided', () => {
    const { container } = render(
      <StatelessTable>
        <TBody>
          <TR>
            <TD>Cell content</TD>
          </TR>
        </TBody>
      </StatelessTable>,
    );

    const mobileHeader = container.querySelector('[aria-hidden="true"]');

    expect(mobileHeader).not.toBeInTheDocument();
  });

  test('renders complete table structure', () => {
    const { container, getByText } = render(
      <StatelessTable>
        <Caption>Complete Table</Caption>
        <THead>
          <TR>
            <TH>Name</TH>
            <TH>Stock</TH>
            <TH>Actions</TH>
          </TR>
        </THead>
        <TBody>
          <TR>
            <TD mobileHeader="Name">Product A</TD>
            <TD mobileHeader="Stock">10</TD>
            <TD isAction>
              <button>Edit</button>
            </TD>
          </TR>
          <TR status="warning">
            <TD mobileHeader="Name">Product B</TD>
            <TD mobileHeader="Stock">0</TD>
            <TD isAction>
              <button>Edit</button>
            </TD>
          </TR>
        </TBody>
        <TFoot>
          <TR>
            <TD>Total</TD>
            <TD>10</TD>
            <TD />
          </TR>
        </TFoot>
      </StatelessTable>,
    );

    // Check table structure
    expect(container.querySelector('table')).toBeInTheDocument();
    expect(getByText('Complete Table')).toBeInTheDocument();
    expect(container.querySelector('thead')).toBeInTheDocument();
    expect(container.querySelector('tbody')).toBeInTheDocument();
    expect(container.querySelector('tfoot')).toBeInTheDocument();

    // Check content
    expect(getByText('Product A')).toBeInTheDocument();
    expect(getByText('Product B')).toBeInTheDocument();
    expect(getByText('Total')).toBeInTheDocument();

    // Check mobile headers
    const mobileHeaders = container.querySelectorAll('[aria-hidden="true"]');

    expect(mobileHeaders).toHaveLength(4); // 2 rows × 2 cells with mobile headers
  });

  test('passes additional props to TH component', () => {
    const { container } = render(
      <StatelessTable>
        <THead>
          <TR>
            <TH className="custom-class" data-testid="custom-header">
              Header
            </TH>
          </TR>
        </THead>
      </StatelessTable>,
    );

    const header = container.querySelector('[data-testid="custom-header"]');

    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('custom-class');
  });

  test('passes additional props to TD component', () => {
    const { container } = render(
      <StatelessTable>
        <TBody>
          <TR>
            <TD className="custom-class" data-testid="custom-cell">
              Cell
            </TD>
          </TR>
        </TBody>
      </StatelessTable>,
    );

    const cell = container.querySelector('[data-testid="custom-cell"]');

    expect(cell).toBeInTheDocument();
    expect(cell).toHaveClass('custom-class');
  });
});
