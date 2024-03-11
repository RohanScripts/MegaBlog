import React, { useEffect, useState } from "react";
import service from "./../../appwrite/Config";
import Container from "../Container";
import PostCard from "../PostCard";

function AllPostsPage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {}, []);
  service.getAllPosts([]).then((posts) => {
    if (posts) {
      setPosts(posts.documents);
    }
  });

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((eachPost) => (
            <div className="p-2 w-1/4" key={eachPost.$id}>
              <PostCard post={eachPost}></PostCard>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPostsPage;
