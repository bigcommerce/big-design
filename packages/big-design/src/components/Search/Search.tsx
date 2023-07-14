import { SearchIcon } from '@bigcommerce/big-design-icons';
import React, { FormEvent } from 'react';

import { Button } from '../Button';
import { Flex, FlexItem } from '../Flex';
import { Form } from '../Form';
import { Input } from '../Input';

import { SearchLocalization, SearchProps } from './types';

const defaultLocalization: SearchLocalization = {
  search: 'Search',
};

export const Search: React.FC<SearchProps> = ({
  localization = defaultLocalization,
  value,
  onChange,
  onSubmit,
  placeholder,
  'aria-label': ariaLabel,
  autoComplete = 'off',
  ...props
}) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (typeof onSubmit === 'function') {
      onSubmit(event);
    }
  };

  return (
    <Form fullWidth={true} onSubmit={handleSubmit}>
      <Flex alignItems="center" backgroundColor="white" flexDirection="row" paddingBottom="xxSmall">
        <FlexItem flexGrow={1} marginRight="small">
          <Input
            {...props}
            aria-label={ariaLabel ?? localization.search}
            autoComplete={autoComplete}
            iconLeft={<SearchIcon color="secondary50" />}
            onChange={onChange}
            placeholder={placeholder ?? localization.search}
            type="search"
            value={value}
          />
        </FlexItem>
        <Button mobileWidth="auto" type="submit" variant="secondary">
          {localization.search}
        </Button>
      </Flex>
    </Form>
  );
};
