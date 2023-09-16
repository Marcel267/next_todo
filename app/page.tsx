"use client";

import { Suspense, useEffect, useState } from "react";
import Posts from "@/components/posts";

export default function Home() {
  const [posts, setPosts] = useState<Post[] | null>(null);

  async function getPosts() {
    fetch("/api/getPosts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.posts);
        console.log(data.posts);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  useEffect(() => {
    getPosts();
  }, []);

  async function deletePost(id: number) {
    try {
      const res = await fetch(`/api/deletePost/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        getPosts();
        console.log("DELETED!!!!!!!!!!");
      } else {
        console.error("Failed to delete:", res.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <>
      <main className="container mx-auto">
        <ul className="flex flex-col space-y-5 items-center mt-10">
          <Suspense fallback={<h2 className="text-2xl">Loading...</h2>}>
            <Posts todos={posts} deletePost={deletePost}></Posts>
          </Suspense>
        </ul>
      </main>
    </>
  );
}
