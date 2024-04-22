import { getUserAuthHeaderApi } from "../apiHelper";
import { baseApi } from "../axiosBaseQuery";

export const paymentApi = baseApi.enhanceEndpoints({}).injectEndpoints({
  endpoints(builder) {
    return {
      getPaymentById: builder.query({
        query: (uuid) => ({
          url: `/payment-history/${uuid}`,
          method: "GET",
          headers: getUserAuthHeaderApi(),
        }),
      }),
      postPaymentById: builder.mutation({
        query: ({ data }) => ({
          url: `/payment-method`,
          method: "POST",
          body: {
            user_id: data.user_id,
            method_type: data.method_type,
            card_number: data.card_number,
            expiration_date: data.expiration_date,
            cvv: data.cvv,
          },
        }),
      }),
    };
  },
});

export const { useGetPaymentByIdQuery, usePostPaymentByIdMutation } = paymentApi;
