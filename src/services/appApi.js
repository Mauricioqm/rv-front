import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//Definir servicios para la URL
const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3300/api/'
  }),

  endpoints: (builder) => ({
    //Registro de usuarios
    signupUser: builder.mutation({
      query: (user) => ({
        url: "/register",
        method: "POST",
        body: user,
      }),
    }),

    // Login de usuario
    login: builder.mutation({
      query: (user) => ({
        url: "/login",
        method: "POST",
        body: user,
      }),
    }),

    // Logout
    logoutUser: builder.mutation({
      
      query: (payload) => ({
        url: '/logout',
        method: "DELETE",
        body: payload,
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupUserMutation, useLogoutUserMutation } = appApi;

export default appApi;