import React from 'react';
import { IoMdSearch } from 'react-icons/io'
import { SearchBarStyles } from '../styles/layout';

export const SearchBar = () => {
  return (
    <SearchBarStyles>
      <div className="search__container">
        <input type="search" className="search" placeholder="Search" />
        <label>
          <IoMdSearch title="search" data-red="true" />
        </label>
      </div>
    </SearchBarStyles>
  );
};
