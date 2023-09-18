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
  getPosts: () => void;
  postId: number;
  value: string;
};

export default function EditDialog({ getPosts, postId, value }: Props) {
  const [formData, setFormData] = useState({
    content: value,
  });
  const [isEditing, setIsEditing] = useState(false);

  function handleChangeEvent(event: ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function editPost(content: string, id: number) {
    try {
      const res = await fetch(`/api/editPost`, {
        method: "PUT",
        body: JSON.stringify({ content, id }),
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
              <div className="grid gap-2 mt-3">
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
                editPost(formData.content, postId);
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
