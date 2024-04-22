import { getUserAuthHeaderApi } from "../apiHelper";
import { baseApi } from "../axiosBaseQuery";

export const reportApi = baseApi.enhanceEndpoints({}).injectEndpoints({
  endpoints(builder) {
    return {
      getReports: builder.query({
        query: () => ({
          url: `/report`,
          method: "GET",
          headers: getUserAuthHeaderApi(),
        }),
      }),
      postReports: builder.mutation({
        query: ({ data }) => ({
          url: `/report`,
          method: "POST",
          body: {
            email: data.email,
            subject: data.subject,
            location: data.location,
            user_id: data.user_id,
          },
        }),
      }),
    };
  },
});

export const { useGetReportsQuery, usePostReportsMutation } = reportApi;
