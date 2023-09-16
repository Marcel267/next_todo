import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "@/components/ui/textarea";

export default function EditDialog() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="h-8" variant="outline">
          {/* <Pencil className="mr-2 h-4 w-4" /> */}
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit post</DialogTitle>
          <DialogDescription>
            <div className="grid gap-2 mt-3">
              <Label htmlFor="content">Content</Label>
              <Textarea />
            </div>
            <Button className="mt-3">Save</Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
