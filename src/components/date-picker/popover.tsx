"use client";

import { useEffect, useState } from "react";

import { generateDateString } from "@/components/date-picker/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { TimePicker } from "@/components/time-picker";
import { Calendar } from "@/components/ui/calendar";

import {
  DrawerDescription,
  DrawerContent,
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle,
  Drawer,
} from "@/components/ui/drawer";

import {
  PopoverContent,
  PopoverTrigger,
  Popover,
} from "@/components/ui/popover";

interface DateTimePickerPopoverProps {
  children: React.ReactNode;
  dateTime: Date | undefined;
  onOpen: (value?: boolean) => void;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  setDateTime: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

export function DateTimePickerPopover({
  onOpen,
  children,
  dateTime,
  setDateTime,
  setInputValue,
}: DateTimePickerPopoverProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const isDesktop = useMediaQuery("(min-width: 640px)");

  useEffect(() => {
    if (dateTime) {
      setInputValue(generateDateString(dateTime));
    }
  }, [dateTime, setInputValue]);

  if (!isDesktop) {
    return (
      <Drawer
        open={isDrawerOpen}
        onOpenChange={(value) => {
          onOpen(value);
          setIsDrawerOpen(value);
        }}
        shouldScaleBackground
      >
        <DrawerTrigger asChild>{children}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="sr-only text-left">
            <DrawerTitle>Date Time Picker</DrawerTitle>
            <DrawerDescription>Select date and time</DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col py-5">
            <Calendar
              mode="single"
              selected={dateTime}
              onSelect={setDateTime}
              initialFocus
              className="self-center"
            />
            <div className="border-t border-border p-3">
              <TimePicker date={dateTime} setDate={setDateTime} />
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Popover
      open={isPopoverOpen}
      onOpenChange={(value) => {
        onOpen(value);
        setIsPopoverOpen(value);
      }}
    >
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent align="center" side="right" className="w-auto p-0">
        <Calendar
          mode="single"
          selected={dateTime}
          onSelect={setDateTime}
          initialFocus
        />
        <div className="border-t border-border p-3">
          <TimePicker date={dateTime} setDate={setDateTime} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
