import React from 'react'
import styled from 'styled-components'

const Search = ({ onChange, filterChange }) => (
  <div>
    <SearchBox
      type="text"
      onChange={onChange}
      placeholder="Enter Pokemon name"
    />
    <select name="generation" onChange={filterChange}>
      <option value="">all</option>
      <option value="1">Gen 1</option>
      <option value="2">Gen 2</option>
      <option value="3">Gen 3</option>
      <option value="4">Gen 4</option>
      <option value="5">Gen 5</option>
      <option value="6">Gen 6</option>
    </select>
  </div>
)

const SearchBox = styled.input`
  border: 3px solid #000;
  box-shadow: none;
  color: #000;
  font-size: 14px;
  margin: 0 10px 15px;
  max-width: 350px;
  padding: 10px;
  width: 100%;
`

export default Search
