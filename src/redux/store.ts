import {configureStore} from '@reduxjs/toolkit';
import homeReducer from './features/home/reducer';
import profileReducer from './features/profile/reducer';
import authReducer from './features/auth/reducer';

export const store = configureStore({
  reducer: {
    home: homeReducer,
    auth: authReducer,
    profile: profileReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
