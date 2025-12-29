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
import { ItemColorSelection } from "./ItemColorSelection";

//TYPES
import { Color } from "@/lib/types";

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
import { AddSquareIcon, IdeaIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

//PROPS
interface Props {
  column_id: Id;
  column_label: string;
}

export default function AddItemDialog({ column_id, column_label }: Props) {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState<Color>("pink");

  const form = useForm<z.infer<typeof addNewItemSchema>>({
    resolver: zodResolver(addNewItemSchema),
    defaultValues: {
      content: "",
      tag: "",
    },
  });

  const addNewItem = useLocalState((state) => state.AddNewItem);

  function onSubmit(data: z.infer<typeof addNewItemSchema>) {
    // Do something with the form values - data.
    const newItem: Item = {
      id: generateId(),
      columnId: column_id,
      content: data.content,
      tag: data.tag,
      tagColor: color,
    };

    addNewItem(newItem);
    setOpen(false);
    form.reset();
  }

  const formId = `add-item-form-${column_id}`;

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
            <DialogTitle>{`Add item to ${column_label}`}</DialogTitle>
            <DialogDescription>
              You can use the tag to search for an item easily.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2">
            <div className="grid flex-1 gap-2">
              <Controller
                name="tag"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="item-tag">Item Tag</FieldLabel>
                    <div className="flex items-center justify-between gap-2">
                      <Input
                        {...field}
                        id="item-tag"
                        aria-invalid={fieldState.invalid}
                        placeholder="Urgent"
                        autoComplete="off"
                      />
                      <ItemColorSelection
                        color={color}
                        setColor={(newColor) => setColor(newColor as Color)}
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
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
