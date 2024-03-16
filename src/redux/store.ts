import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/reducers';

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
