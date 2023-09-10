import { Navbar } from "@/components/navbar";
import { Checkbox } from "@/components/ui/checkbox";
import getTodos from "@/lib/getTodos";
import Todos from "./components/Todos";
import { Suspense } from "react";

export default async function Home() {
  const todosData: Promise<Todo[]> = getTodos();

  return (
    <>
      <Navbar />
      <main className="container mx-auto">
        <ul className="flex flex-col space-y-5 justify-center mt-10">
          <Suspense fallback={<h2 className="text-2xl">Loading...</h2>}>
            <Todos promise={todosData}></Todos>
          </Suspense>
        </ul>
      </main>
    </>
  );
}
