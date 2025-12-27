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
import { addNewItemSchema } from "@/lib/validations";
import * as z from "zod";

//STORES
import { useLocalState } from "@/lib/stores";
import { Field, FieldLabel, FieldError } from "../ui/field";
import { Id, Item } from "@/lib/types";
import { generateId } from "@/lib/utils";
import { useState } from "react";
import { AddSquareIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

//PROPS
interface Props {
  columnId: Id;
}

export default function AddItemDialog({ columnId }: Props) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof addNewItemSchema>>({
    resolver: zodResolver(addNewItemSchema),
    defaultValues: {
      content: "",
    },
  });

  const addNewItem = useLocalState((state) => state.AddNewItem);

  function onSubmit(data: z.infer<typeof addNewItemSchema>) {
    // Do something with the form values - data.
    const newItem: Item = {
      id: generateId(),
      columnId: columnId,
      content: data.content,
    };

    addNewItem(newItem);
    setOpen(false);
    form.reset();
  }

  const formId = `add-item-form-${columnId}`;

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) form.reset();
      }}
    >
      <form onSubmit={form.handleSubmit(onSubmit)} id={formId}>
        <DialogTrigger asChild>
          <Button size="icon-sm" variant="ghost">
            <HugeiconsIcon icon={AddSquareIcon} />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Name your column</DialogTitle>
            <DialogDescription>Ex. In progress</DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2">
            <div className="grid flex-1 gap-2">
              <Controller
                name="content"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="item-content">Content</FieldLabel>
                    <Input
                      {...field}
                      id="item-content"
                      aria-invalid={fieldState.invalid}
                      placeholder="Clean the house"
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
            <Button type="submit" form={formId}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
