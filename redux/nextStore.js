import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { createStore ,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';


const bindMiddlware = (middlware)=>{

    if(process.env.NODE_ENV !== 'production'){

        const { composeWithDevTools } = require('redux-devtools-extension');

        return composeWithDevTools(applyMiddleware(...middlware));
    }

    return applyMiddleware(...middlware);
}

const reducer = (state, action)=>{
    if(action.type === HYDRATE){
        const nextState = {
            ...state,
            ...action.payload
        }

        return nextState;
    }else{
        return reducers(state, action)
    }
}

const initStore = ()=>{

    return createStore(reducer, bindMiddlware([thunk]));
}

export const wrapper = createWrapper(initStore);