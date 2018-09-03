import React from 'react'
import styled from 'styled-components'

const Search = ({ onChange, filterChange }) => (
  <div>
    <SearchBox
      type="text"
      onChange={onChange}
      placeholder="Enter Pokemon name"
    />
    <select name="region" onChange={filterChange}>
      <option value="all">all</option>
      <option value="generation-i">Gen 1</option>
      <option value="generation-ii">Gen 2</option>
      <option value="generation-iii">Gen 3</option>
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
