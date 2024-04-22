import { getUserAuthHeaderApi } from "../apiHelper";
import { baseApi } from "../axiosBaseQuery";

export const itemApi = baseApi.enhanceEndpoints({ addTagTypes: ["itemTag"] }).injectEndpoints({
  endpoints(builder) {
    return {
      getItem: builder.query({
        query: () => ({
          url: `/items`,
          method: "GET",
          headers: getUserAuthHeaderApi(),
        }),
        providesTags: ["itemTag"],
      }),
      getAllItem: builder.query({
        query: () => ({
          url: `/items`,
          method: "GET",
          headers: getUserAuthHeaderApi(),
      }),
      providesTags: ["itemTag"],
    }),
      postItem: builder.mutation({
        query: ({ data }) => ({
          url: `/items`,
          method: "POST",
          body: {
            name: data.name,
            points: data.points,
            total: data.total,
          },
        }),
        invalidatesTags: ["itemTag"],
      }),
      putItem: builder.mutation({
        query: ({ itemId, data }) => ({
          url: `/items/${itemId}`,
          method: "PUT",
          body: data,
          headers: getUserAuthHeaderApi(),
        }),
        invalidatesTags: ["itemTag"],
      }),
      inputPoints: builder.mutation({
        query: ({ itemId, name, points, total }) => ({
          url: `/items/${itemId}`,
          method: "PUT",
          body: {
            name,
            points:parseInt(points),
            total:parseInt(total),
          }
        }),
        invalidatesTags: ["itemTag"],
      }),
      inputQuantity: builder.mutation({
        query: ({ itemId, name, points, total }) => ({
          url: `/items/${itemId}`,
          method: "PUT",
          body: {
            name,
            points:parseInt(points),
            total:parseInt(total),
          }
        }),
        invalidatesTags: ["itemTag"],
      }),
    };
  },
});

export const { useGetItemQuery, useGetAllItemQuery,usePostItemMutation, usePutItemMutation, useInputPointsMutation, useInputQuantityMutation } = itemApi;
