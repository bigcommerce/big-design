import { CheckIcon } from '@bigcommerce/big-design-icons';
import React from 'react';

import { DropdownItem } from '../Dropdown';

interface Pill {
  title: string;
  onClick: () => void;
  isActive: boolean;
}

export const toDropdownItem = ({ title, onClick, isActive }: Pill): DropdownItem => ({
  content: title,
  onItemClick: onClick,
  hash: title.toLowerCase(),
  icon: isActive ? <CheckIcon /> : undefined,
});
