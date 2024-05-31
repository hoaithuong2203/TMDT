// rootReducer.js

import { configureStore } from '@reduxjs/toolkit';
import registrationReducer from './redux/registrationSlice';
import tokenReducer from './redux/tokenSlice';

const rootReducer = configureStore({
  reducer: {
    registration: registrationReducer,
    token: tokenReducer,

    // Thêm các slice khác nếu cần
  },
});

export default rootReducer;
