import { createStore, combineReducers, applyMiddleware } from 'redux';
import * as reducers from './reducers';
import { createLogger } from 'redux-logger'

const reducer = combineReducers({ ...reducers });
const logger = createLogger()

// export default createStore(
//     reducer,
//     {},
//     applyMiddleware(logger)
//     );

export default function configureStore(initialState) {
    const store = createStore(
        reducer,
        initialState,
        applyMiddleware(logger)) 
    
    if (module.hot) {
        module.hot.accept('./reducers', () => {
        const nextRootReducer = require('./reducers')
        store.replaceReducer(nextRootReducer)
        })
    }
    
    return store
    }