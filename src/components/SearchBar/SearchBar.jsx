import React, { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { ReactComponent as Search } from '../../icons/search.svg';
import { Header, Form, Button, Span, Input } from './SearchBar.styled';

class SearchBar extends Component {
  state = {
    value: '',
  };

  handelSearch = event => {
    this.setState({ value: event.currentTarget.value.toLowerCase() });
  };

  handelSubmit = event => {
    event.preventDefault();
    if (this.state.value.trim() === '') {
      return toast.error('Nothing was entered');
    }
    this.props.onSubmit(this.state.value);
    this.resetForm();
  };

  resetForm = () => {
    this.setState({
      value: '',
    });
  };

  render() {
    return (
      <Header>
        <Form onSubmit={this.handelSubmit}>
          <Button type="submit">
            <Search />
            <Span>Search</Span>
          </Button>

          <Input
            type="text"
            name="value"
            value={this.state.value}
            onChange={this.handelSearch}
            placeholder="Search images and photos"
          />
        </Form>
      </Header>
    );
  }
}

export default SearchBar;

SearchBar.propType = {
  onSubmit: PropTypes.func.isRequired,
};
