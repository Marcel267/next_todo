"use client";

import { Checkbox } from "@/components/ui/checkbox";
import getTodos from "@/lib/getTodos";
import { Suspense, useEffect, useState } from "react";
import Posts from "./components/Posts";

export default function Home() {
  // const todosData: Promise<Todo[]> = getTodos();
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    // Fetch data from the API route
    fetch("/api/getTodos")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.posts);
        console.log(data.posts);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <main className="container mx-auto">
        <ul className="flex flex-col space-y-5 justify-center mt-10">
          <Suspense fallback={<h2 className="text-2xl">Loading...</h2>}>
            <Posts todos={posts}></Posts>
          </Suspense>
        </ul>
      </main>
    </>
  );
}
