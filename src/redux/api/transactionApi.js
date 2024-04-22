import { getUserAuthHeaderApi } from "../apiHelper";
import { baseApi } from "../axiosBaseQuery";

export const transactionApi = baseApi.enhanceEndpoints({}).injectEndpoints({
  endpoints(builder) {
    return {
      getTransactionById: builder.query({
        query: (uuid) => ({
          url: `/transaction-history/${uuid}`,
          method: "GET",
          headers: getUserAuthHeaderApi(),
        }),
      }),
      postTransaction: builder.mutation({
        query: ({ data }) => ({
          url: `/transaction-payment`,
          method: "POST",
          body: {
            transaction_id: data.transaction_id,
            payment_method_id: data.payment_method_id,
            amount: data.amount,
            status: data.status,
          },
        }),
      }),
    };
  },
});

export const { useGetTransactionByIdQuery, usePostTransactionMutation } = transactionApi;
