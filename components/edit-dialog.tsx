import React, { ChangeEvent, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

type Props = {
  editPost: (post: Post) => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  postId: number;
  completed: boolean;
  value: string;
};

export default function EditDialog({
  postId,
  completed,
  value,
  editPost,
  isEditing,
  setIsEditing,
}: Props) {
  const [formData, setFormData] = useState({
    content: value,
  });

  function handleChangeEvent(event: ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  return (
    <>
      <Dialog>
        <DialogTrigger>
          {isEditing ? (
            <Button disabled className="h-8" variant="outline">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button className="h-8" variant="outline">
              Edit
            </Button>
          )}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit post</DialogTitle>
            <DialogDescription>
              <div className="mt-3 grid gap-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  name="content"
                  onChange={handleChangeEvent}
                  placeholder="Cool content..."
                  value={formData.content}
                />
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose
              onClick={() => {
                editPost({
                  content: formData.content,
                  id: postId,
                  completed: completed,
                });
                setIsEditing(true);
                setFormData({ content: "" });
              }}
            >
              Save
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
