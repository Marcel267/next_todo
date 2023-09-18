import React from "react";
import DeleteDialog from "@/components/delete-dialog";
import EditDialog from "@/components/edit-dialog";
import { Checkbox } from "./ui/checkbox";

type Props = {
  deletePost: (id: number) => void;
  posts: Post[] | null;
  getPosts: () => void;
  editPost: (id: number, content: string, completed: boolean) => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
};

export default function Posts({
  posts,
  deletePost,
  getPosts,
  editPost,
  isEditing,
  setIsEditing,
}: Props) {
  async function toggleCompleted(
    id: number,
    content: string,
    completed: boolean,
  ) {
    try {
      const res = await fetch(`/api/editPost`, {
        method: "PUT",
        body: JSON.stringify({ id, content, completed: !completed }),
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

  const content = posts?.map((post) => {
    return (
      <li
        key={post.id}
        className="w-full rounded-lg border bg-card p-4 text-card-foreground shadow-sm"
      >
        <div className="flex flex-col space-y-5">
          <div className="relative flex">
            <Checkbox
              id={`${post.id}`}
              className="absolute top-1"
              onClick={() =>
                toggleCompleted(post.id, post.content, post.completed)
              }
              checked={post.completed}
            />
            <label
              htmlFor={`${post.id}`}
              className={`pl-7 ${
                post.completed ? "text-muted-foreground line-through" : ""
              }`}
            >
              {post.content}
            </label>
          </div>
          <span className="flex gap-1">
            <EditDialog
              editPost={editPost}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              post={post}
            />
            <DeleteDialog deletePost={deletePost} postId={post.id} />
          </span>
        </div>
      </li>
    );
  });

  return content;
}
