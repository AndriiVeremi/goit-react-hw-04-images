import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { ReactComponent as Search } from '../../icons/search.svg';
import { Header, Form, Button, Span, Input } from './SearchBar.styled';

function SearchBar({ onSubmit }) {
  const [value, setValue] = useState('');

  const handelSearch = event => {
    setValue(event.currentTarget.value.toLowerCase());
  };

  const handelSubmit = event => {
    event.preventDefault();
    if (value.trim() === '') {
      return toast.error('Nothing was entered');
    }
    onSubmit(value);
    setValue('');
  };

  return (
    <Header>
      <Form onSubmit={handelSubmit}>
        <Button type="submit">
          <Search />
          <Span>Search</Span>
        </Button>

        <Input
          type="text"
          name="value"
          value={value}
          onChange={handelSearch}
          placeholder="Search images and photos"
        />
      </Form>
    </Header>
  );
}

export default SearchBar;

SearchBar.propType = {
  onSubmit: PropTypes.func.isRequired,
};
