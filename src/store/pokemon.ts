import { Dispatch } from "react";
import req from "../utils/request";
import { ITypeRequest } from "../interface/pokemons";
import { ConfigServerType, ConfigEndpoint } from "../config";

export enum PokemonsActionTypes {
  FETCH_TYPES = "FETCH_TYPES",
  FETCH_TYPE_RESOLVE = "FETCH_TYPE_RESOLVE",
  FETCH_TYPE_REJECT = "FETCH_TYPE_REJECT"
}

interface TypeActions  {
  type: PokemonsActionTypes,
  payload?: string[]
}

type ActionTypes = TypeActions

export interface IPokemonsInitialState {
  isLoading: boolean;
  data: null | string[];
  error: null | object
}

const initialState = {
    isLoading: false,
    data: null,
    error: null,
};

const pokemon = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case PokemonsActionTypes.FETCH_TYPES:
      return {
        ...state,
          isLoading: true,
          data: null,
          error: null,
      };
    case PokemonsActionTypes.FETCH_TYPE_RESOLVE:
      return {
        ...state,
          isLoading: false,
          data: action.payload,
          error: null,
      };
    case PokemonsActionTypes.FETCH_TYPE_REJECT:
      return {
        ...state,
          isLoading: false,
          data: null,
          error: action.payload,
      };
    default:
      return state;
  }
};

export const getTypesAction = (query = {}) => async (dispatch: Dispatch<ActionTypes>) => {
  dispatch({ type: PokemonsActionTypes.FETCH_TYPES });
  try {
    const response = await req<ITypeRequest>(ConfigServerType.pokemons, ConfigEndpoint.getPokemons, query);
    console.log("###: res ", response);
    dispatch({ type: PokemonsActionTypes.FETCH_TYPE_RESOLVE, payload: response });
  } catch (error) {
    dispatch({ type: PokemonsActionTypes.FETCH_TYPE_REJECT, payload: error })
  }
  }

export default pokemon;
