import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import userEpic from './modules/user/actions';
import messageEpic from './modules/messages/actions';
import documentsEpic from './modules/documents/actions';
import queuesEpic from './modules/queues/actions';
import userReducer from './modules/user/reducer';
import queuesReducer from './modules/queues/reducer';
import routeReducer from './modules/route/reducer';

const reducers = {
  user: userReducer,
  route: routeReducer,
  queues: queuesReducer,
};
const epics = combineEpics(
  userEpic,
  queuesEpic,
  documentsEpic,
  messageEpic,
);

const epicMiddleware = createEpicMiddleware();

const store = createStore(
  combineReducers(reducers),
  applyMiddleware(epicMiddleware),
);

epicMiddleware.run(epics);

export default store;
