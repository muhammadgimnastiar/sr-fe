import { getUserAuthHeaderApi } from "../apiHelper";
import { baseApi } from "../axiosBaseQuery";

export const userApi = baseApi.enhanceEndpoints({ addTagTypes: ["userTag"] }).injectEndpoints({
  endpoints(builder) {
    return {
      getUser: builder.query({
        query: () => ({
          url: `/user`,
          method: "GET",
          headers: getUserAuthHeaderApi(),
        }),
        providesTags: ["userTag"],
      }),
      getAllUsers: builder.query({
        query: () => ({
          url: `/users`,
          method: "GET",
          headers: getUserAuthHeaderApi(),
        }),
        providesTags: ["userTag"],
      }),
      changeRoleUser: builder.mutation({
        query: ({ uuid, role }) => ({
          url: `/user/change-role`,
          method: "POST",
          body: {
            uuid,
            newRole: role,
          },
        }),
        invalidatesTags: ["userTag"],
      }),
      inputPoints: builder.mutation({
        query: ({ uuid, points }) => ({
          url: `/user/points`,
          method: "POST",
          body: {
            uuid,
            points,
          },
        }),
        invalidatesTags: ["userTag"],
      }),
    };
  },
});

export const { useGetUserQuery, useGetAllUsersQuery, useChangeRoleUserMutation, useInputPointsMutation } = userApi;
