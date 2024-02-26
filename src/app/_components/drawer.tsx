import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/toggle";
import { ChevronUp } from "lucide-react";
import { Login } from "./login";
dayjs.extend(relativeTime);

export default async function BottomDrawer() {
  return (
    <div className="fixed bottom-4 right-4">
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline" className="h-full w-full">
            <ChevronUp />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader className="flex justify-center">
              <DrawerTitle>Settings</DrawerTitle>
            </DrawerHeader>
            <div className="flex items-center justify-center gap-4 p-4">
              <ModeToggle />
              <Login />
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <div className="flex justify-center">
                  <Button variant="outline" className="w-20">
                    Cancel
                  </Button>
                </div>
              </DrawerClose>
              <p className="text-xs text-secondary">Made by Peter Ehrich</p>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
