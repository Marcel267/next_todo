import React, { ChangeEvent, ReactHTMLElement, useState } from "react";
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
import { Plus } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

type Props = {
  addPost: (content: string) => void;
};

export default function AddDialog({ addPost }: Props) {
  const [formData, setFormData] = useState({
    content: "",
  });
  const [isAdding, setIsAdding] = useState(false);

  function handleChangeEvent(event: ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <Button className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Add post
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add post</DialogTitle>
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
    // Option mit alertDialog anstatt selbst-gefixtem-dialog
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
