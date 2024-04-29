import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import { reducer as get} from './get';
import { reducer as authUser} from './auth';
import { reducer as exerciseVideos} from './exerciseVideos';
import { reducer as exerciseProgram} from './exerciseProgram';
import { reducer as payment} from './payment';
import { reducer as challenges} from './challenges';
import { reducer as dashboard} from './dashboard';
import { reducer as update} from './update';
import { reducer as nutrition} from './nutrition';



const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: hardSet
};

const reducers = combineReducers({
  authUser,
  exerciseVideos,
  exerciseProgram,
  payment,
  challenges,
  dashboard,
  get,
  update,
  nutrition
});

const persistedReducer = persistReducer(persistConfig, reducers)

export default persistedReducer;