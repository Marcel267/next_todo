import DeleteDialog from "@/components/delete-dialog";
import EditDialog from "@/components/edit-dialog";
import { Pencil, Trash2 } from "lucide-react";
import React from "react";

type Props = {
  // promise: Promise<Todo[]>;
  todos: Post[] | null;
};

export default async function Posts({ todos }: Props) {
  // const todos = await promise;

  const content = todos?.map((todo) => {
    return (
      <li
        key={todo.id}
        className="rounded-lg border bg-card text-card-foreground shadow-sm w-[450px] p-4"
      >
        <div className="flex flex-col space-y-5">
          {/* <Checkbox /> */}
          <span>{todo.content}</span>
          <span className="flex gap-1">
            <EditDialog />
            <DeleteDialog />
          </span>
        </div>
      </li>
    );
  });

  return content;
}
