"use client";

//COMPONENTS
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Add01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import {
  InputGroup,
  InputGroupTextarea,
  InputGroupAddon,
  InputGroupText,
} from "../ui/input-group";
import { toast } from "sonner";

// FORM VALIDATIONS
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addNewBoardSchema } from "@/lib/validations";
import * as z from "zod";

//STATES & STORE
import { useState } from "react";
import { useLocalState } from "@/lib/stores";
import { Board } from "@/lib/types";

//FUNCTIONS
import { generateId } from "@/lib/utils";

export default function AddBoardDialog() {
  const addNewBoard = useLocalState((state) => state.AddNewBoard);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof addNewBoardSchema>>({
    resolver: zodResolver(addNewBoardSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  function onSubmit(data: z.infer<typeof addNewBoardSchema>) {
    // Do something with the form values - data.
    const newBoard: Board = {
      id: generateId(),
      label: data.name,
      description: data.description,
      total_columns: 0,
    };

    try {
      addNewBoard(newBoard);
      toast.success(`${newBoard.label} was added!`);
    } catch (err) {
      toast.error(`An error occured. ${err}`);
    } finally {
      setOpen(false);
      form.reset();
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) form.reset();
      }}
    >
      <form onSubmit={form.handleSubmit(onSubmit)} id="add-board-form">
        <DialogTrigger asChild>
          <Button size="icon" variant="secondaryIconOnly">
            <HugeiconsIcon icon={Add01Icon} />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Board</DialogTitle>
            <DialogDescription>
              Create a new board to start tracking your progess. Hit save once
              done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="board-name">Board name</FieldLabel>
                  <Input
                    {...field}
                    id="board-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="ex. Job application tracker"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="board-desc">Description</FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="board-desc"
                      placeholder="Add your board description here."
                      rows={6}
                      className="min-h-14 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value.length}/30 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" form="add-board-form">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
