import {configureStore} from '@reduxjs/toolkit';
import homeReducer from './features/home/reducer';
import profileReducer from './features/profile/reducer';
import authReducer from './features/auth/reducer';
import submissionsReducer from './features/submissions/reducer';
import overtimesReducer from './features/overtimes/reducer';
import attendancesReducer from './features/attendances/reducer';
import announcementReducer from './features/announcement/reducer';
import shiftReducer from './features/shift/reducer';
import projectReducer from './features/project/reducer';
import bookingReducer from './features/booking/reducer';
import generateReducer from './features/generate/reducer';
import blockReducer from './features/block/reducer';
import phaseReducer from './features/phase/reducer';

export const store = configureStore({
  reducer: {
    home: homeReducer,
    auth: authReducer,
    profile: profileReducer,
    submissions: submissionsReducer,
    overtimes: overtimesReducer,
    attendances: attendancesReducer,
    announcement: announcementReducer,
    shift: shiftReducer,
    project: projectReducer,
    booking: bookingReducer,
    generate: generateReducer,
    block: blockReducer,
    phase: phaseReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
