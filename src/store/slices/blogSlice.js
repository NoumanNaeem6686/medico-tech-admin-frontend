import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const createBlog = createAsyncThunk(
  "Blog/createBlog",
  async (blog, thunkAPI) => {
    try {
      const response = await axios.post(`${URL}/api/admin/create-blog`, blog);
      if (!response.data.success) {
        return thunkAPI.rejectWithValue(
          response.data.message || "Failed to create Blog",
        );
      }
      return response.data;
    } catch (error) {
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
    } catch (error) {
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
      const response = await axios.delete(`${URL}/api/admin/delete-blog/${blogId}`);
      return blogId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updateBlog = createAsyncThunk(
  "blogs/updateBlog",
  async (blog, thunkAPI) => {
    try {
      const response = await axios.put(`${URL}/api/admin/update-blog/${blog.id}`, blog);
      if (!response.data.success) {
        return thunkAPI.rejectWithValue(
          response.data.message || "Failed to update Blog"
        );
      }
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error during updating Blog"
      );
    }
  }
);

const initialState = {
  blogs: null,
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
      state.blogs = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.blogs = action.payload.newBlog;
      })
      .addCase(createBlog.rejected, (state, action) => {
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
        state.blogs = action.payload.data;
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.error = action.payload;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        const updatedBlogIndex = state.blogs.findIndex(blog => blog.id === action.payload.id);
        if (updatedBlogIndex !== -1) {
          state.blogs[updatedBlogIndex] = action.payload;
        }
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

export const { resetProductState } = blogSlice.actions;
export default blogSlice.reducer;
