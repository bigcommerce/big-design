import React from 'react';

import { PropTable } from '../components';

export const PaginationPropTable: React.FC = () => {
  return (
    <PropTable>
      <PropTable.Prop name="itemsPerPage" types="number" defaults="" required>
        Indicates how many items are displayed per page
      </PropTable.Prop>
      <PropTable.Prop name="currentPage" types="number" defaults="" required>
        Indicates the page currently/initially displayed
      </PropTable.Prop>
      <PropTable.Prop name="totalItems" types="number" defaults="" required>
        Indicates how many items in total will be displayed
      </PropTable.Prop>
      <PropTable.Prop name="itemsPerPageOptions" types="number[]" defaults="" required>
        Indicates options for per-page ranges
      </PropTable.Prop>
      <PropTable.Prop name="onPageChange" types="(page: number) => void" required>
        Function that will be called when a navigation arrow is clicked
      </PropTable.Prop>
      <PropTable.Prop name="onRangeChange" types="(range: number) => void" required>
        Function that will be called when a new per-page range is selected
      </PropTable.Prop>
    </PropTable>
  );
};
