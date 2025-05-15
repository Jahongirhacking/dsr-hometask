import { baseApi } from "../api";
import { ITodo } from "./type";

export const todoApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTodos: build.query<ITodo[], void>({
      query: () => "/todos",
      providesTags: ["Todos"],
    }),

    createTodo: build.mutation<ITodo, Omit<ITodo, "id" | "createdBy">>({
      query: (body) => ({
        url: "/todos",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Todos"],
    }),

    getTodoItem: build.query<ITodo, Pick<ITodo, "id">>({
      query: ({ id }) => `/todos/${id}`,
      providesTags: ["TodoItem"],
    }),

    editTodoItem: build.mutation<void, Omit<ITodo, "createdBy">>({
      query: ({ id, ...body }) => ({
        url: `/todos/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["TodoItem", "Todos"],
    }),

    deleteTodoItem: build.mutation<void, Pick<ITodo, "id">>({
      query: ({ id }) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TodoItem", "Todos"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useCreateTodoMutation,
  useGetTodoItemQuery,
  useEditTodoItemMutation,
  useDeleteTodoItemMutation,
} = todoApi;
