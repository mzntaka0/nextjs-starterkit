import React, {createContext, useReducer} from "react";
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import combinedReducers from './reducers'
import {Document} from '../entities/Document'

type State = {
  documents: Document[],
  error: any | null
}


const initialState: State = {
  documents: [],
  error: null
};

const store = createStore(combinedReducers)

const Store = ({children}) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}

//export const Context = createContext(initialState);
export default Store;
