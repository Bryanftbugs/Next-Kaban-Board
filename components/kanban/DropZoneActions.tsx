import {
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTrigger,
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

// FORM VALIDATIONS
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addNewColumnSchema } from "@/lib/validations";
import * as z from "zod";

//STORES
import { useLocalState } from "@/lib/stores";
import { Field, FieldLabel, FieldError } from "../ui/field";
import { Column, Id } from "@/lib/types";
import { generateId } from "@/lib/utils";
import { useState } from "react";

//PROPS
interface Props {
  boardId: Id;
}

export default function DropZoneActions({ boardId }: Props) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof addNewColumnSchema>>({
    resolver: zodResolver(addNewColumnSchema),
    defaultValues: {
      label: "",
    },
  });

  const addNewColumn = useLocalState((state) => state.AddNewColumn);

  function onSubmit(data: z.infer<typeof addNewColumnSchema>) {
    // Do something with the form values - data.
    const newColumn: Column = {
      id: generateId(),
      boardId: boardId,
      label: data.label,
    };

    addNewColumn(newColumn);
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) form.reset();
      }}
    >
      <form onSubmit={form.handleSubmit(onSubmit)} id="add-column-form">
        <DialogTrigger asChild>
          <Button size="lg">Add new Column</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Name your column</DialogTitle>
            <DialogDescription>Ex. In progress</DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2">
            <div className="grid flex-1 gap-2">
              <Controller
                name="label"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="column-label">Column name</FieldLabel>
                    <Input
                      {...field}
                      id="column-label"
                      aria-invalid={fieldState.invalid}
                      placeholder="In progress"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" form="add-column-form">
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
