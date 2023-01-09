import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./UpdatePost.scss";
import { getPostById, updatePostById } from "../../features/posts/postsSlice";

const UpdateUser = () => {
  const { _id } = useParams();
  const { post } = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialState = {
    title: post.title,
    body: post.body,
  };

  const [formData, setFormData] = useState(initialState);
  const { title, body } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    const editedData = new FormData();
    editedData.set("title", e.target.title.value);
    editedData.set("body", e.target.body.value);
    const myObj = { ...formData, _id };
    dispatch(updatePostById(myObj));
    navigate("/post/" + _id);
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    dispatch(getPostById(_id));
    // setFormData(post);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="updatePost">
      <form className="updateUser-form" onSubmit={onSubmit}>
        <input
          type="text"
          name="title"
          value={title}
          placeholder="Title"
          onChange={onChange}
        />

        <textarea name="body" value={body} onChange={onChange} rows="20" cols="26">
        Write something...
        </textarea>

        <Button
          type="primary"
          block
          htmlType="submit"
          className="updatePost-form-button"
        >
          Update
        </Button>
      </form>
    </div>
  );
};

export default UpdateUser;
