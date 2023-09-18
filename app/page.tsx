"use client";

import { Suspense, useEffect, useState } from "react";
import Posts from "@/components/posts";
import AddDialog from "@/components/add-dialog";

export default function Home() {
  const [posts, setPosts] = useState<Post[] | null>(null);

  async function getPosts() {
    fetch("/api/getPosts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.posts);
        // console.log(data.posts);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  useEffect(() => {
    getPosts();
    // addPost("Fresh bleib, text schreiben");
  }, []);

  async function deletePost(id: number) {
    try {
      const res = await fetch(`/api/deletePost/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        getPosts();
        // console.log("DELETED!!!!!!!!!!");
      } else {
        console.error("Failed to delete:", res.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function addPost(content: string) {
    try {
      const res = await fetch(`/api/addPost`, {
        method: "POST",
        body: JSON.stringify({ content })
      });

      if (res.ok) {
        getPosts();
      } else {
        console.error("Failed to add:", res.status);
      }
      console.log(content);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <>
      <section className="flex flex-col items-center mt-10 mb-5">
        <ul className="w-[450px] space-y-5">
          <AddDialog addPost={addPost} />
          <Suspense fallback={<h2 className="text-2xl">Loading...</h2>}>
            <Posts todos={posts} deletePost={deletePost}></Posts>
          </Suspense>
        </ul>
      </section>
    </>
  );
}
