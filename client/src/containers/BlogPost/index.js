import axios from "axios";
import React, { useEffect, useState } from "react";

const BlogPost = ({
  match: {
    params: { postPath },
  },
}) => {
  const [post, setPost] = useState({
    title: "",
    description: "",
    authorId: "",
    content: "",
    createdAt: "",
    updatedAt: "",
  });

  useEffect(() => {
    axios
      .get(`/post/${postPath.split("-").pop()}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.log(err));
  }, [postPath]);

  return (
    <main style={{ margin: "50px 15%" }}>
      <h1 style={{ fontSize: "3em", textAlign: "center" }}>{post.title}</h1>
      <p style={{ fontSize: "1em", color: "gray", fontStyle: "italic" }}>
        {post.description}
      </p>
      <p style={{ color: "#b1b1b1", fontSize: "0.8rem" }}>
        Author: <span>{post.authorId.fullname}</span> | Created on:{" "}
        <span>{post.createdAt.substring(0, 10)}</span> | Updated on:{" "}
        <span>{post.updatedAt.substring(0, 10)}</span>
      </p>
      <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
    </main>
  );
};

export default BlogPost;
