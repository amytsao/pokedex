import {
  GET_POKEMONS_REQUEST,
  GET_POKEMONS_SUCCESS,
  GET_POKEMONS_FAIL,
  SET_POKEMONS,
  FILTER_POKEMONS
} from '../constants/page'

function setPokemons(data) {
  const pokemons = data.results.map(pokemon => {
    const { url } = pokemon
    pokemon.id = url.substring(34, url.length - 1)

    return pokemon
  })

  return {
    type: SET_POKEMONS,
    payload: pokemons
  }
}

function setPokemonByFilter(data) {
  const pokemons = data.pokemon_species.map(pokemon => {
    const { url } = pokemon
    pokemon.id = url.substring(42, url.length - 1)

    return pokemon
  })

  pokemons.sort(function(a, b) {
    return a.id - b.id
  })
  return {
    type: SET_POKEMONS,
    payload: pokemons
  }
}
export function getPokemons(generation, searchText) {
  return dispatch => {
    dispatch({
      type: GET_POKEMONS_REQUEST
    })

    // let = changing variable
    // const = static variable
    let url
    if (generation) {
      url = 'https://pokeapi.co/api/v2/generation/' + generation
    } else {
      url = 'https://pokeapi.co/api/v2/pokemon/?limit=784'
    }

    return fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json()
        }

        throw new Error(`${response.status}: ${response.statusText}`)
      })
      .then(data => {
        dispatch({
          type: GET_POKEMONS_SUCCESS
        })
        if (generation) {
          dispatch(setPokemonByFilter(data))
          dispatch(filterPokemons(searchText))
        } else {
          dispatch(setPokemons(data))
          dispatch(filterPokemons())
        }
      })
      .catch(error => {
        dispatch({
          type: GET_POKEMONS_FAIL,
          payload: error.message
        })
      })
  }
}

export function filterPokemons(searchString = '') {
  return (dispatch, getState) => {
    const displayedPokemons = getState().page.pokemons.filter(pokemon =>
      pokemon.name.includes(searchString.toLowerCase())
    )

    dispatch({
      type: FILTER_POKEMONS,
      payload: displayedPokemons
    })
  }
}
