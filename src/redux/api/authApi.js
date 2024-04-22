import { baseApi } from "../axiosBaseQuery";

export const authApi = baseApi.enhanceEndpoints({}).injectEndpoints({
  endpoints(builder) {
    return {
      signin: builder.mutation({
        query: ({ data }) => ({
          url: `/signin`,
          method: "POST",
          body: {
            email: data.email,
            password: data.password,
          },
        }),
      }),
      signup: builder.mutation({
        query: ({ data }) => ({
          url: `/signup`,
          method: "POST",
          body: {
            name: data.name,
            email: data.email,
            password: data.password,
          },
        }),
      }),
    };
  },
});

export const { useSigninMutation, useSignupMutation } = authApi;
