"use client";

import { Suspense, useEffect, useState } from "react";
import Posts from "@/components/posts";
import AddDialog from "@/components/add-dialog";

export default function Home() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [isEditing, setIsEditing] = useState(false);

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

  async function editPost(post: Post) {
    const { id, content, completed } = post;
    try {
      const res = await fetch(`/api/editPost`, {
        method: "PUT",
        body: JSON.stringify({ id, content, completed }),
      });

      if (res.ok) {
        getPosts();
        setIsEditing(false);
      } else {
        console.error("Failed to add:", res.status);
      }
      console.log(res);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <>
      <section className="mb-5 mt-10 flex flex-col items-center">
        <ul className="w-[450px] space-y-5">
          <AddDialog getPosts={getPosts} />
          <Suspense fallback={<h2 className="text-2xl">Loading...</h2>}>
            <Posts
              todos={posts}
              deletePost={deletePost}
              getPosts={getPosts}
              editPost={editPost}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
          </Suspense>
        </ul>
      </section>
    </>
  );
}
