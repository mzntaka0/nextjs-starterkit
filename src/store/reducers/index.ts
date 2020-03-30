import {combineReducers} from 'redux'

import {Document} from '../../entities/Document'

//const combineReducers = (...reducers: Function[]) =>
//  (state: any = initialState, action: any): any => {
//    for(let i=0; i < reducers.length; i++) {
//      state = reducers[i](state, action)
//		}
//    return state;
//}

type State = {
  documents: Document[],
  error: any | null
}

export const documentReducer = (state: State={documents: [], error: null}, action: any): State => {
  switch (action.type) {
    case 'SET_DOCUMENTS':
      return {
      ...state,
      documents: action.payload
    }
    case 'ADD_DOCUMENT':
      return {
      ...state,
      documents: state.documents.concat(action.payload)
    }
    case 'REMOVE_DOCUMENT':
      return {
      ...state,
      documents: state.documents.filter(document => document.key !== action.payload)
    }
    case 'SET_ERROR':
      return {
      ...state,
      error: action.payload
    }
    default:
      return state
  }
}


const combinedReducers = combineReducers(
  {documentReducer}
)


export default combinedReducers
