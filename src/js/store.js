import { createStore, combineReducers, applyMiddleware } from 'redux';
import * as reducers from './reducers';
import { createLogger } from 'redux-logger'

const reducer = combineReducers({ ...reducers });
const logger = createLogger()

export default createStore(
    reducer,
    {},
    applyMiddleware(logger)
    );