import { notification } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost, reset } from "../../features/posts/postsSlice";

const AddPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isSuccess, message, isError } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess) {
      notification.success({
        message: "Post added",
        description: "Successfully posted",
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
    if (isError) {
      notification.error({ message: "Error", description: message });
    }
    dispatch(reset());
    // eslint-disable-next-line
  }, [isSuccess, isError, message]);

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (e.target.imagePost.files[0])
      formData.set("image", e.target.imagePost.files[0]);
    formData.set("title", e.target.title.value);
    formData.set("body", e.target.body.value);

    dispatch(createPost(formData));
  };

  return (
    <>
      <h1>AddPost</h1>

      <div>
        <form onSubmit={onSubmit}>
          <br />
          <br />

          <input type="file" name="imagePost" placeholder="image" />

          <br />
          <br />

          <input type="text" name="title" placeholder="Title" />

          <br />
          <br />

          <input type="text" name="body" placeholder="Write something" />

          <br />
          <br />

          <button type="submit">Publish</button>
        </form>
      </div>
    </>
  );
};

export default AddPost;
