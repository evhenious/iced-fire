import { Char } from "../components/Characters/Model";
import { House } from "../components/House/Model";
import { Action, ActionType, ReceiveEntityData, ReceiveDataPage } from "./Actions";

export interface State {
  characters: Char[];
  houses: House[];
  pages: string[];
  init: boolean;
}

export const initialState: State = {
  characters: [],
  houses: [],
  pages: [],
  init: false
};

export function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case ActionType.RECEIVE_ENTITY:
      return receiveEntity(state, action);

    case ActionType.FETCH_DATA_PAGE:
      return startFetch(state);

    case ActionType.RECEIVE_DATA_PAGE:
      return receivedChars(state, action);

    default:
      return state;
  }
}

function receiveEntity(state: State, action: ReceiveEntityData) {
  const { data, segment } = action.payload;
  const newData = (state as any)[segment].concat(data);

  return {
    ...state,
    [action.payload.segment]: newData
  };
}

function startFetch(state: State) {
  return {
    ...state,
    init: true
  };
}

function receivedChars(state: State, action: ReceiveDataPage) {
  const { data } = action.payload;

  const newUrls = data.map(char => char.url);
  const pages = state.pages.concat(newUrls);

  const filteredData = data.filter(char => {
    return state.characters.findIndex(ch => ch.url === char.url) === -1;
  });

  const characters = state.characters.concat(filteredData);

  return {
    ...state,
    characters,
    pages,
    init: false
  };
}
