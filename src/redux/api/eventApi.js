import { getUserAuthHeaderApi } from "../apiHelper";
import { baseApi } from "../axiosBaseQuery";

export const eventsApi = baseApi.enhanceEndpoints({}).injectEndpoints({
  endpoints(builder) {
    return {
      getEvents: builder.query({
        query: () => ({
          url: `/events`,
          method: "GET",
          headers: getUserAuthHeaderApi(),
        }),
      }),
      postEvents: builder.mutation({
        query: (data) => ({
          url: `/events`,
          method: "POST",
          body: {
            title: data.title,
            description: data.description,
            path_image: data.path_image,
            user_id: data.user_id,
          },
        }),
      }),
    };
  },
});

export const { useGetEventsQuery, usePostEventsMutation } = eventsApi;
