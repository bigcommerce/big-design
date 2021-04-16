import { SearchIcon } from '@bigcommerce/big-design-icons';
import React, { FormEvent } from 'react';

import { Button } from '../../Button';
import { Form } from '../../Form';
import { Input } from '../../Input';
import { TableSearch } from '../types';

import { StyledFlex, StyledInput } from './styled';

export const Search: React.FC<TableSearch> = ({ value, onSearchChange, onSearchSubmit }) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    onSearchSubmit?.(event);
  };

  return (
    <Form onSubmit={handleSubmit} fullWidth={true}>
      <StyledFlex alignItems="center" flexDirection="row" justifyContent="stretch">
        <StyledInput>
          <Input
            placeholder="Search"
            type="text"
            value={value}
            onChange={onSearchChange}
            iconLeft={<SearchIcon color="secondary" />}
          />
        </StyledInput>
        <Button variant="secondary" type="submit">
          Search
        </Button>
      </StyledFlex>
    </Form>
  );
};
