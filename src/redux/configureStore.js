import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import userEpic from './modules/user/actions';
import userReducer from './modules/user/reducer';

const reducers = { user: userReducer };
const epics = combineEpics(userEpic);

const epicMiddleware = createEpicMiddleware();

const composeEnhancers = composeWithDevTools({ realtime: true });

const store = createStore(
  combineReducers(reducers),
  composeEnhancers(applyMiddleware(epicMiddleware)),
);

epicMiddleware.run(epics);

export default store;
