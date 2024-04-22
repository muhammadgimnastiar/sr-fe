import { getUserAuthHeaderApi } from "../apiHelper";
import { baseApi } from "../axiosBaseQuery";

export const blogsApi = baseApi.enhanceEndpoints({}).injectEndpoints({
    endpoints(builder) {
        return {
            getBlogs: builder.query({
                query: () => ({
                    url: `/blogs`,
                    method: "GET",
                    headers: getUserAuthHeaderApi(),
                }),
            }),
            postBlogs: builder.mutation({
                query: (data) => ({
                    url: `/blogs`,
                    method: "POST",
                    body: {
                        title: data.title,
                        description: data.description,
                        path_image: data.path_image,
                        user_id: data.user_id,
                    },
                }),
            }),
            deleteBlogs: builder.mutation({
                query: (id) => ({
                    url: `/blogs/${id}`,
                    method: "DELETE",
                    headers: getUserAuthHeaderApi(),
                })
            })
        };
    },
});

export const { useGetBlogsQuery, usePostBlogsMutation, useDeleteBlogsMutation } = blogsApi;
