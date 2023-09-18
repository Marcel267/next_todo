import React from "react";
import DeleteDialog from "@/components/delete-dialog";
import EditDialog from "@/components/edit-dialog";

type Props = {
  deletePost: (id: number) => void;
  todos: Post[] | null;
  getPosts: () => void;
};

export default function Posts({ todos, deletePost, getPosts }: Props) {
  const content = todos?.map((todo) => {
    return (
      <li
        key={todo.id}
        className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 w-full"
      >
        <div className="flex flex-col space-y-5">
          {/* <Checkbox /> */}
          <span>{todo.content}</span>
          <span className="flex gap-1">
            <EditDialog
              getPosts={getPosts}
              postId={todo.id}
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
