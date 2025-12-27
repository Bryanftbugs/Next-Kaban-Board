import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Item as ItemType } from "@/lib/types";

interface ItemViewProps {
  item_details: ItemType;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ItemView({
  item_details,
  open,
  onOpenChange,
}: ItemViewProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{item_details?.content}</SheetTitle>
          <SheetDescription>View and edit item details here.</SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="item-content">Content</Label>
            <Input id="item-content" defaultValue="test" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="item-id">Item ID</Label>
            <Input id="item-id" defaultValue="testing" disabled />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
