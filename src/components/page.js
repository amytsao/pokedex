import React, { Component } from 'react'
import styled from 'styled-components'
import Pokemon from './pokemon'
import Search from './search'

class Page extends Component {
  state = {
    searchText: ''
  }

  componentDidMount() {
    this.props.getPokemons()
  }

  handleSearch(event) {
    this.props.filterPokemons(event.currentTarget.value)
    this.setState({
      searchText: event.currentTarget.value
    })
  }

  handleSelect(event) {
    this.props.getPokemons(event.currentTarget.value, this.state.searchText)
  }

  render() {
    let { displayedPokemons, isFetched, error } = this.props
    console.log(displayedPokemons)

    let pokemons = displayedPokemons.map(pokemon => {
      return (
        <li className="pokemons__item" key={pokemon.id}>
          <Pokemon pokemon={pokemon} />
        </li>
      )
    })

    return (
      <Container className="page">
        {error && <div className="page__error">{error}</div>}
        <div className="page__search">
          <Search
            onChange={this.handleSearch.bind(this)}
            filterChange={this.handleSelect.bind(this)}
          />
        </div>
        {isFetched ? (
          <p>Loading...</p>
        ) : (
          <ul className="pokemons">{pokemons}</ul>
        )}
      </Container>
    )
  }
}

//TODO: figure out why background isn't showing
const Container = styled.div`
  background: #cccccc url('../images/bkg.png') repeat fixed center;
  margin: 0 auto;
  max-width: 800px;
  padding: 10px;
`

export default Page
