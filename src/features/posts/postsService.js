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

const postsService = {
  getAllPosts,
  getPostById,
  getPostByName,
};

export default postsService;