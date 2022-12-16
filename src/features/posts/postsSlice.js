import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postsService from "./postsService";

const initialState = {
  posts: [],
  isLoading: false,
  post: {},
};

export const getAllPosts = createAsyncThunk("posts/getAllPosts", async () => {
  try {
    return await postsService.getAllPosts();
  } catch (error) {
    console.error(error);
  }
});

export const getPostById = createAsyncThunk(
  "posts/getPostById",
  async (_id) => {
    try {
      return await postsService.getPostById(_id);
    } catch (error) {
      console.error(error);
    }
  }
);

export const getPostByName = createAsyncThunk(
  "posts/getPostByName",
  async (postName) => {
    try {
      return await postsService.getPostByName(postName);
    } catch (error) {
      console.error(error);
    }
  }
);

export const deletePost = createAsyncThunk("posts/deletePost", async (_id) => {
  try {
    return await postsService.deletePost(_id);
  } catch (error) {
    console.error(error);
  }
});

export const deletePostAdmin = createAsyncThunk("posts/deletePostAdmin", async (_id) => {
  try {
    return await postsService.deletePostAdmin(_id);
  } catch (error) {
    console.error(error);
  }
});

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
    });

    builder.addCase(getAllPosts.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getPostById.fulfilled, (state, action) => {
      state.post = action.payload;
    });

    builder.addCase(getPostByName.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.posts = state.posts.filter(
        (post) => post._id !== action.payload.post._id
      );
    });
    builder.addCase(deletePostAdmin.fulfilled, (state, action) => {
      state.posts = state.posts.filter(
        (post) => post._id !== action.payload.post._id
      );
    });
  },
});

export const { reset } = postsSlice.actions;

export default postsSlice.reducer;
