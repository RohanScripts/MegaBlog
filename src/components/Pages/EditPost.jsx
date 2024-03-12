import React from "react";
import Container from "../Container";
import PostForm from "../PostForm";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import service from "../../appwrite/Config";

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams;
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post}></PostForm>
      </Container>
    </div>
  ) : null;
}

export default EditPost;
