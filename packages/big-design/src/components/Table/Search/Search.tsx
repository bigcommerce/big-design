import { SearchIcon } from '@bigcommerce/big-design-icons';
import React, { FormEvent } from 'react';

import { Button } from '../../Button';
import { Flex, FlexItem } from '../../Flex';
import { Form } from '../../Form';
import { Input } from '../../Input';
import { TableSearch } from '../types';

export const Search: React.FC<TableSearch> = ({ value, onChange, onSubmit }) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (typeof onSubmit === 'function') {
      onSubmit(event);
    }
  };

  return (
    <Form onSubmit={handleSubmit} fullWidth={true}>
      <Flex alignItems="center" backgroundColor="white" flexDirection="row" paddingBottom="xxSmall">
        <FlexItem flexGrow={1} marginRight="small">
          <Input
            placeholder="Search"
            type="search"
            value={value}
            onChange={onChange}
            iconLeft={<SearchIcon color="secondary50" />}
          />
        </FlexItem>
        <Button mobileWidth="auto" type="submit" variant="secondary">
          Search
        </Button>
      </Flex>
    </Form>
  );
};
