import { House } from "../components/House/Model";
import { Char } from "../components/Characters/Model";
import { Params } from "../util/WebRequest";

export enum ActionType {
  RECEIVE_ENTITY = "RECEIVE_ENTITY",
  FETCH_DATA_PAGE = "FETCH_DATA_PAGE",
  RECEIVE_DATA_PAGE = "RECEIVE_DATA_PAGE"
}

export interface ReceiveEntityData {
  type: ActionType.RECEIVE_ENTITY;
  payload: {
    data: House | Char;
    segment: string
  };
}

export interface FetchDataPage {
  type: ActionType.FETCH_DATA_PAGE;
  payload: {
    segment: string;
    params: Params;
  };
}

export interface ReceiveDataPage {
  type: ActionType.RECEIVE_DATA_PAGE;
  payload: {
    data: Char[]
  };
}

export function receiveEntityData(data: House | Char, segment: string): ReceiveEntityData {
  return {
    type: ActionType.RECEIVE_ENTITY,
    payload: {
      data,
      segment
    }
  };
}

export function fetchDataPage(segment: string, params: Params): FetchDataPage {
  return {
    type: ActionType.FETCH_DATA_PAGE,
    payload: {
      segment,
      params
    }
  };
}

export function receiveDataPage(data: Char[]): ReceiveDataPage {
  return {
    type: ActionType.RECEIVE_DATA_PAGE,
    payload: {
      data
    }
  };
}

export function doReceiveEntityData(data: House | Char, segment: string) {
  return (dispatch: Function) => {
    dispatch(receiveEntityData(data, segment));
  };
}

export function doFetchDataPage(segment: string, params: Params) {
  return (dispatch: Function) => {
    dispatch(fetchDataPage(segment, params));    
  };
}

export function doReceiveDataPage(data: Char[]) {
  return (dispatch: Function) => {
    dispatch(receiveDataPage(data));    
  };
}


export type Action = ReceiveEntityData | FetchDataPage | ReceiveDataPage;
