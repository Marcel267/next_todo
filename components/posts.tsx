import React from "react";
import DeleteDialog from "@/components/delete-dialog";
import EditDialog from "@/components/edit-dialog";
import { Checkbox } from "./ui/checkbox";

type Props = {
  deletePost: (id: number) => void;
  todos: Post[] | null;
  getPosts: () => void;
  editPost: (post: Post) => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
};

export default function Posts({
  todos,
  deletePost,
  getPosts,
  editPost,
  isEditing,
  setIsEditing,
}: Props) {
  async function toggleCompleted(completed: boolean, id: number) {
    try {
      const res = await fetch(`/api/toggleCompleted/${completed}`, {
        method: "PUT",
        body: JSON.stringify({ completed, id }),
      });

      if (res.ok) {
        getPosts();
      } else {
        console.error("Failed to toggle completed:", res.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const content = todos?.map((todo) => {
    return (
      <li
        key={todo.id}
        className="w-full rounded-lg border bg-card p-4 text-card-foreground shadow-sm"
      >
        <div className="flex flex-col space-y-5">
          <div className="relative flex">
            <Checkbox
              id={`${todo.id}`}
              className="absolute top-1"
              onClick={() => toggleCompleted(todo.completed, todo.id)}
            />
            <label
              htmlFor={`${todo.id}`}
              className={`pl-7 ${
                todo.completed ? "text-muted-foreground line-through" : ""
              }`}
            >
              {todo.content}
            </label>
          </div>
          <span className="flex gap-1">
            <EditDialog
              editPost={editPost}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              postId={todo.id}
              completed={todo.completed}
              value={todo.content}
            />
            <DeleteDialog deletePost={deletePost} postId={todo.id} />
          </span>
        </div>
      </li>
    );
  });

  return content;
}
