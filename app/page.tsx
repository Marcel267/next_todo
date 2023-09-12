"use client";

import { Navbar } from "@/components/navbar";
import { Checkbox } from "@/components/ui/checkbox";
import getTodos from "@/lib/getTodos";
import Todos from "./components/Todos";
import { Suspense, useEffect, useState } from "react";

export default function Home() {
  // const todosData: Promise<Todo[]> = getTodos();
  const [todos, setTodos] = useState<Todo[] | null>(null);

  useEffect(() => {
    // Fetch data from the API route
    fetch("/api/getTodos")
      .then((response) => response.json())
      .then((data) => {
        setTodos(data.data);
        // console.log(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <main className="container mx-auto">
        <ul className="flex flex-col space-y-5 justify-center mt-10">
          <Suspense fallback={<h2 className="text-2xl">Loading...</h2>}>
            {/* <Todos promise={todosData}></Todos> */}
            <Todos todos={todos}></Todos>
          </Suspense>
          {/* {todos?.data?.map((todo) => (
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-[450px] p-4">
              {todo.title}
            </div>
          ))} */}
        </ul>
      </main>
    </>
  );
}
