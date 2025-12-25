//REUSABLE POPUP COMPONENT
import React from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";

//PROPS
interface Props {
  button_label: string;
  popup_title: string;
  popup_description?: string;
  children: React.ReactNode;
}

export default function PopupButton({
  button_label,
  popup_title,
  popup_description,
  children,
}: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg">{button_label}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{popup_title}</DialogTitle>
          <DialogDescription>{popup_description}</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
