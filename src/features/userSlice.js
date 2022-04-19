import { createSlice } from '@reduxjs/toolkit'
import appApi from '../services/appApi'

export const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    addNotifications: (state, {payload}) => {
      if (state.newMessages[payload]) {
        state.newMessages[payload] = state.newMessages[payload] + 1
      } else {
        state.newMessages[payload] = 1;
    }
    },
    resetNotifications: (state, {payload}) => {
      delete state.newMessages[payload];
    },
  },

  extraReducers: (builder) => {
    //Guardar usuario luego de registrarse
    builder.addMatcher(appApi.endpoints.signupUser.matchFulfilled, (state, { payload }) => payload);
    // Guardar usuario luego de login
    builder.addMatcher(appApi.endpoints.login.matchFulfilled, (state, { payload }) => payload);
    // Destruir usuario luego del logout
    builder.addMatcher(appApi.endpoints.logoutUser.matchFulfilled, () => null);
  },
});

export const {addNotifications, resetNotifications} = userSlice.actions;

export default userSlice.reducer;