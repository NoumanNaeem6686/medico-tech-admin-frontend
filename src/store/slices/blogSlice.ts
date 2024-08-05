import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const createBlog = createAsyncThunk(
  "Blog/createBlog",
  async (blog, thunkAPI) => {
    console.log(blog);
    try {
      const response = await axios.post(`${URL}/api/admin/create-blog`, blog);
      if (!response.data.success) {
        return thunkAPI.rejectWithValue(
          response.data.message || "Failed to create Blog",
        );
      }
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error during creating Blog",
      );
    }
  },
);

export const getAllBlogs = createAsyncThunk(
  "Blog/getAllblogs",
  async (blog, thunkAPI) => {
    try {
      const response = await axios.get(`${URL}/api/admin/all-blogs`);
      if (!response.data.success) {
        return thunkAPI.rejectWithValue(
          response.data.message || "Failed to getting all Blog",
        );
      }
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error during getting Blog",
      );
    }
  },
);

export const deleteBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async (blogId, thunkAPI) => {
    try {
      const response = await axios.delete(
        `${URL}/api/admin/delete-blog/${blogId}`,
      );
      return blogId;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const updateBlog = createAsyncThunk(
  "blogs/updateBlog",
  async (blog: any, thunkAPI) => {
    try {
      const response = await axios.put(
        `${URL}/api/admin/update-blog/${blog.id}`,
        blog,
      );
      if (!response.data.success) {
        return thunkAPI.rejectWithValue(
          response.data.message || "Failed to update Blog",
        );
      }
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error during updating Blog",
      );
    }
  },
);
export const getAllPsychics = createAsyncThunk(
  "Blog/getAllPsychics",
  async (blog, thunkAPI) => {
    try {
      const response = await axios.get(`${URL}/api/psyscics/getAllPsychics`);
      if (!response.data.success) {
        return thunkAPI.rejectWithValue(
          response.data.message || "Failed to getting all Blog",
        );
      }
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error during getting Blog",
      );
    }
  },
);

const initialState = {
  blogs: [], // Ensure initial state is an array
  psychics: null,
  error: null,
  loading: false,
  isError: false,
  isSuccess: false,
};

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    resetProductState: (state) => {
      state.loading = false;
      state.isError = false;
      state.isSuccess = false;
      state.error = null;
      state.blogs = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(createBlog.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.isSuccess = true;
        // @ts-ignore

        state.blogs.push(action.payload.newBlog);
      })
      .addCase(createBlog.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.isError = true;
        state.error = action.payload;
      })
      .addCase(getAllBlogs.pending, (state) => {
        state.loading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.blogs = Array.isArray(action.payload.data)
          ? action.payload.data
          : [];
      })
      .addCase(getAllBlogs.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.isError = true;
        state.error = action.payload;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter(
          (blog: any) => blog.id !== action.payload,
        );
      })
      .addCase(deleteBlog.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
      })
      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(updateBlog.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.isSuccess = true;
        const updatedBlogIndex = state.blogs.findIndex(
          (blog: any) => blog.id === action.payload.updatedBlog.id,
        );
        if (updatedBlogIndex !== -1) {
          // @ts-ignore

          state.blogs[updatedBlogIndex] = action.payload.updatedBlog;
        }
      })
      .addCase(updateBlog.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.isError = true;
        state.error = action.payload;
      });
    // .addCase(getAllPsychics.pending, (state) => {
    //   state.loading = true;
    //   state.isError = false;
    //   state.error = null;
    // })
    // .addCase(getAllPsychics.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.isSuccess = true;
    //   console.log("action.payload", action.payload);
    //   state.psychics = Array.isArray(action.payload.data)
    //     ? action.payload.data
    //     : [];
    // })
    // .addCase(getAllPsychics.rejected, (state, action) => {
    //   state.loading = false;
    //   state.isError = true;
    //   state.error = action.payload;
    // });
  },
});

export const { resetProductState } = blogSlice.actions;
export default blogSlice.reducer;
