import axios from "axios";

const API_URL = "http://localhost:8080";

const getAllPosts = async () => {
  const res = await axios.get(API_URL + "/posts/getAllPosts");
  return res.data;
};

const getPostById = async (_id) => {
  const res = await axios.get(API_URL + "/posts/getPostById/" + _id);
  return res.data;
};

const getPostByName = async (postTitle) => {
  const res = await axios.get(API_URL + "/posts//getPostByName/" + postTitle);
  return res.data;
};

const deletePost = async (_id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.delete(API_URL + "/posts/deletePostById/" + _id, {
    headers: {
      authorization: user?.token,
    },
  });
  return res.data;
};

const deletePostAdmin = async (_id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.delete(API_URL + "/posts/deletePostAdmin/" + _id, {
    headers: {
      authorization: user?.token,
    },
  });
  return res.data;
};

const postsService = {
  getAllPosts,
  getPostById,
  getPostByName,
  deletePost,
  deletePostAdmin,
};

export default postsService;
