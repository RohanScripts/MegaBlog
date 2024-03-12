import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import service from "../../appwrite/Config";
import Container from "../Container";
import PostCard from "../PostCard";

function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    service.getAllPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-green-500">
                Login to read Posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((eachPost) => (
            <div key={eachPost.$id} className="p-2 w-1/4">
              <PostCard {...eachPost}></PostCard>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default HomePage;
