import { useMemo } from 'react'
import thunk from "redux-thunk";
import { applyMiddleware, compose, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from "./redux/reducers";

const initialState = {};

const middleware = [thunk];
let store;

function initStore(preloadedState = initialState) {
    return createStore(
      rootReducer,
      preloadedState,
      compose(applyMiddleware(...middleware), composeWithDevTools)
    )
  }
  
  export const initializeStore = (preloadedState) => {
    let _store = store ?? initStore(preloadedState)
  
    // After navigating to a page with an initial Redux state, merge that state
    // with the current state in the store, and create a new store
    if (preloadedState && store) {
      _store = initStore({
        ...store.getState(),
        ...preloadedState,
      })
      // Reset the current store
      store = undefined
    }
  
    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') return _store
    // Create the store once in the client
    if (!store) store = _store
  
    return _store
  }
  
  export function useStore(initialState) {
    const store = useMemo(() => initializeStore(initialState), [initialState])
    return store
  }

  export const reduxStore = initStore;
