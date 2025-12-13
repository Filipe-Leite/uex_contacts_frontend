import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import { sessionAuthSliceReducer } from '../features/session/sessionSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { navigationSliceSliceReducer } from '../features/session/navigationSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['sessionNavigation']
};

const rootReducer = combineReducers({
  session: sessionAuthSliceReducer,
  sessionNavigation: navigationSliceSliceReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;