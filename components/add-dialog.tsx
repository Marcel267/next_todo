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
};

export default function AddDialog({ getPosts }: Props) {
  const [formData, setFormData] = useState({
    content: "",
  });
  const [isAdding, setIsAdding] = useState(false);

  function handleChangeEvent(event: ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function addPost(content: string) {
    try {
      const res = await fetch(`/api/addPost`, {
        method: "POST",
        body: JSON.stringify({ content }),
      });

      if (res.ok) {
        getPosts();
        setIsAdding(false);
      } else {
        console.error("Failed to add:", res.status);
      }
      console.log(res);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger className="w-full">
        {isAdding ? (
          <Button disabled className="w-full">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button className="w-full">Add post</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add post</DialogTitle>
          <DialogDescription>
            <div className="mt-3 grid gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                onChange={handleChangeEvent}
                // placeholder="Cool content..."
                value={formData.content}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose
            onClick={() => {
              addPost(formData.content);
              setIsAdding(true);
              setFormData({ content: "" });
            }}
          >
            Save
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    // Option with alertDialog instead of manually-fixed-dialog
    // <AlertDialog>
    //   <AlertDialogTrigger className="w-full">
    //     <Button className="w-full">
    //       <Plus className="mr-2 h-4 w-4" />
    //       Add post
    //     </Button>
    //     {/* {isAdding ? (
    //       <Button disabled className="w-full">
    //         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
    //         Please wait
    //       </Button>
    //     ) : (
    //       <Button className="w-full">
    //         <Plus className="mr-2 h-4 w-4" />
    //         Add post
    //       </Button>
    //     )} */}
    //   </AlertDialogTrigger>
    //   <AlertDialogContent>
    //     <AlertDialogHeader>
    //       <AlertDialogTitle>Add post</AlertDialogTitle>
    //       <AlertDialogDescription>
    //         <div className="grid gap-2 mt-3">
    //           <Label htmlFor="content">Content</Label>
    //           <Textarea
    //             id="content"
    //             name="content"
    //             onChange={handleChangeEvent}
    //             placeholder="Cool content..."
    //             value={formData.content}
    //           />
    //         </div>
    //       </AlertDialogDescription>
    //     </AlertDialogHeader>
    //     <AlertDialogFooter>
    //       <AlertDialogCancel>Cancel</AlertDialogCancel>
    //       <AlertDialogAction
    //         onClick={() => {
    //           addPost(formData.content);
    //           setIsAdding(true);
    //           setFormData({ content: "" });
    //         }}
    //       >
    //         Save
    //       </AlertDialogAction>
    //     </AlertDialogFooter>
    //   </AlertDialogContent>
    // </AlertDialog>
  );
}
