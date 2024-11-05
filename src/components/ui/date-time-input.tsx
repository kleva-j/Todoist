"use client";

import { Calendar, CalendarProps } from "@/components/ui/calendar";
import { cn, formatDateTime, parseDateTime } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar as CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  PopoverContent,
  PopoverTrigger,
  Popover,
} from "@/components/ui/popover";

/* -------------------------------------------------------------------------- */
/*                               Inspired By:                                 */
/*                               @steventey                                   */
/* ------------------https://dub.co/blog/smart-datetime-picker--------------- */
/* -------------------------------------------------------------------------- */

const inputBase =
  "bg-transparent focus:outline-none focus:ring-0 focus-within:outline-none focus-within:ring-0 sm:text-sm disabled:cursor-not-allowed disabled:opacity-50";

// @source: https://www.perplexity.ai/search/in-javascript-how-RfI7fMtITxKr5c.V9Lv5KA#1
// use this pattern to validate the transformed date string for the natural language input
export const naturalInputValidationPattern =
  "^[A-Z][a-z]{2}sd{1,2},sd{4},sd{1,2}:d{2}s[AP]M$";

const DEFAULT_SIZE = 96;

interface SmartDatetimeInputProps {
  value?: Date;
  onValueChange: (date: Date) => void;
}

interface SmartDatetimeInputContextProps extends SmartDatetimeInputProps {
  Time: string;
  onTimeChange: (time: string) => void;
}

const SmartDatetimeInputContext =
  createContext<SmartDatetimeInputContextProps | null>(null);

const useSmartDateInput = () => {
  const context = useContext(SmartDatetimeInputContext);
  if (!context) {
    throw new Error(
      "useSmartDateInput must be used within SmartDateInputProvider"
    );
  }
  return context;
};

export const SmartDatetimeInput = forwardRef<
  HTMLInputElement,
  Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "ref" | "value" | "defaultValue" | "onBlur"
  > &
    SmartDatetimeInputProps
>(({ className, value, onValueChange, placeholder, disabled }, ref) => {
  // ? refactor to be only used with controlled input
  /*  const [dateTime, setDateTime] = React.useState<Date | undefined>(
    value ?? undefined
  ); */

  const [Time, setTime] = useState<string>("");

  const onTimeChange = useCallback((time: string) => {
    setTime(time);
  }, []);

  return (
    <SmartDatetimeInputContext.Provider
      value={{ value, onValueChange, Time, onTimeChange }}
    >
      <div className="flex items-center justify-center">
        <div
          className={cn(
            "flex gap-1 w-full p-1 items-center justify-between rounded-md border transition-all",
            "focus-within:outline-0 focus:outline-0 focus:ring-0",
            "placeholder:text-muted-foreground focus-visible:outline-0 ",
            className
          )}
        >
          <DateTimeLocalInput />
          <NaturalLanguageInput
            placeholder={placeholder}
            disabled={disabled}
            ref={ref}
          />
        </div>
      </div>
    </SmartDatetimeInputContext.Provider>
  );
});

SmartDatetimeInput.displayName = "DatetimeInput";

// Make it a standalone component

const TimePicker = () => {
  const { value, onValueChange, Time, onTimeChange } = useSmartDateInput();
  const [activeIndex, setActiveIndex] = useState(-1);
  const timestamp = 15;

  const formateSelectedTime = useCallback(
    (time: string, hour: number, partStamp: number) => {
      onTimeChange(time);

      const newVal = parseDateTime(value ?? new Date());

      if (!newVal) return;

      newVal.setHours(
        hour,
        partStamp === 0 ? parseInt("00") : timestamp * partStamp
      );

      // ? refactor needed check if we want to use the new date

      onValueChange(newVal);
    },
    [value]
  );

  const handleKeydown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!document) return;

      const moveNext = () => {
        const nextIndex =
          activeIndex + 1 > DEFAULT_SIZE - 1 ? 0 : activeIndex + 1;

        const currentElm = document.getElementById(`time-${nextIndex}`);

        currentElm?.focus();

        setActiveIndex(nextIndex);
      };

      const movePrev = () => {
        const prevIndex =
          activeIndex - 1 < 0 ? DEFAULT_SIZE - 1 : activeIndex - 1;

        const currentElm = document.getElementById(`time-${prevIndex}`);

        currentElm?.focus();

        setActiveIndex(prevIndex);
      };

      const setElement = () => {
        const currentElm = document.getElementById(`time-${activeIndex}`);

        if (!currentElm) return;

        currentElm.focus();

        const timeValue = currentElm.textContent ?? "";

        // this should work now haha that hour is what does the trick

        const PM_AM = timeValue.split(" ")[1];
        const PM_AM_hour = parseInt(
          timeValue.split(" ")?.[0]?.split(":")?.[0] ?? "0"
        );
        const hour =
          PM_AM === "AM"
            ? PM_AM_hour === 12
              ? 0
              : PM_AM_hour
            : PM_AM_hour === 12
              ? 12
              : PM_AM_hour + 12;

        const part = Math.floor(
          parseInt(timeValue.split(" ")[0]?.split(":")?.[1] ?? "0") / 15
        );

        formateSelectedTime(timeValue, hour, part);
      };

      const reset = () => {
        const currentElm = document.getElementById(`time-${activeIndex}`);
        currentElm?.blur();
        setActiveIndex(-1);
      };

      switch (e.key) {
        case "ArrowUp":
          movePrev();
          break;

        case "ArrowDown":
          moveNext();
          break;

        case "Escape":
          reset();
          break;

        case "Enter":
          setElement();
          break;
      }
    },
    [activeIndex, formateSelectedTime]
  );

  const handleClick = useCallback(
    (hour: number, part: number, PM_AM: string, currentIndex: number) => {
      formateSelectedTime(
        `${hour}:${part === 0 ? "00" : timestamp * part} ${PM_AM}`,
        hour,
        part
      );
      setActiveIndex(currentIndex);
    },
    [formateSelectedTime]
  );

  const currentTime = useMemo(() => {
    const timeVal = Time?.split(" ")[0] ?? "0:0";
    return {
      hours: parseInt(timeVal.split(":")[0] ?? "0"),
      minutes: parseInt(timeVal.split(":")[1] ?? "0"),
    };
  }, [Time]);

  useEffect(() => {
    const getCurrentElementTime = () => {
      const timeVal = Time?.split(" ")[0] ?? "0:0";
      const hours = parseInt(timeVal.split(":")[0] ?? "0");
      const minutes = parseInt(timeVal.split(":")[1] ?? "0");
      const PM_AM = Time?.split(" ")[1] ?? "AM";

      const formatIndex =
        PM_AM === "AM" ? hours : hours === 12 ? hours : hours + 12;
      const formattedHours = formatIndex;

      console.log(formatIndex);

      for (let j = 0; j <= 3; j++) {
        const diff = Math.abs(j * timestamp - minutes);
        const selected =
          PM_AM === (formattedHours >= 12 ? "PM" : "AM") &&
          (minutes <= 53 ? diff < Math.ceil(timestamp / 2) : diff < timestamp);

        if (selected) {
          const trueIndex =
            activeIndex === -1 ? formattedHours * 4 + j : activeIndex;

          setActiveIndex(trueIndex);

          const currentElm = document.getElementById(`time-${trueIndex}`);
          currentElm?.scrollIntoView({
            block: "center",
            behavior: "smooth",
          });
        }
      }
    };

    getCurrentElementTime();
  }, [Time, activeIndex]);

  const height = useMemo(() => {
    if (!document) return;
    const calendarElm = document.getElementById("calendar");
    if (!calendarElm) return;
    return calendarElm.style.height;
  }, []);

  return (
    <div className="space-y-2 pr-3 py-3 relative ">
      <h3 className="text-sm font-medium ">Time</h3>
      <ScrollArea
        onKeyDown={handleKeydown}
        className="h-[90%] w-full focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-0 py-0.5"
        style={{
          height,
        }}
      >
        <ul
          className={cn(
            "flex items-center flex-col gap-1 h-full max-h-56 w-28 px-1 py-0.5"
          )}
        >
          {Array.from({ length: 24 }).map((_, i) => {
            const PM_AM = i >= 12 ? "PM" : "AM";
            const formatIndex = i > 12 ? i % 12 : i === 0 || i === 12 ? 12 : i;
            return Array.from({ length: 4 }).map((_, part) => {
              const diff = Math.abs(part * timestamp - currentTime.minutes);

              const trueIndex = i * 4 + part;

              // ? refactor : add the select of the default time on the current device (H:MM)
              const isSelected =
                (currentTime.hours === i ||
                  currentTime.hours === formatIndex) &&
                PM_AM === PM_AM &&
                (currentTime.minutes <= 53
                  ? diff < Math.ceil(timestamp / 2)
                  : diff < timestamp);

              const isSuggested = !value && isSelected;

              const currentValue = `${formatIndex}:${
                part === 0 ? "00" : timestamp * part
              } ${PM_AM}`;

              return (
                <li
                  tabIndex={isSelected ? 0 : -1}
                  id={`time-${trueIndex}`}
                  key={`time-${trueIndex}`}
                  aria-label="currentTime"
                  className={cn(
                    buttonVariants({
                      variant: isSuggested
                        ? "secondary"
                        : isSelected
                          ? "default"
                          : "outline",
                    }),
                    "h-8 px-3 w-full text-sm focus-visible:outline-0 outline-0 focus-visible:border-0 cursor-default ring-0"
                  )}
                  onClick={() => handleClick(i, part, PM_AM, trueIndex)}
                  onFocus={() => isSuggested && setActiveIndex(trueIndex)}
                >
                  {currentValue}
                </li>
              );
            });
          })}
        </ul>
      </ScrollArea>
    </div>
  );
};

const NaturalLanguageInput = forwardRef<
  HTMLInputElement,
  {
    placeholder?: string;
    disabled?: boolean;
  }
>(({ placeholder, ...props }, ref) => {
  const { value, onValueChange, Time, onTimeChange } = useSmartDateInput();

  const _placeholder = placeholder ?? 'e.g. "tomorrow at 5pm" or "in 2 hours"';

  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    const hour = new Date().getHours();
    const timeVal = `${
      hour >= 12 ? hour % 12 : hour
    }:${new Date().getMinutes()} ${hour >= 12 ? "PM" : "AM"}`;
    setInputValue(value ? formatDateTime(value) : "");
    onTimeChange(value ? Time : timeVal);
  }, [value, Time]);

  const handleParse = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // parse the date string when the input field loses focus
      const parsedDateTime = parseDateTime(e.currentTarget.value);
      if (parsedDateTime) {
        const PM_AM = parsedDateTime.getHours() >= 12 ? "PM" : "AM";
        //fix the time format for this value

        const PM_AM_hour = parsedDateTime.getHours();

        const hour =
          PM_AM_hour > 12
            ? PM_AM_hour % 12
            : PM_AM_hour === 0 || PM_AM_hour === 12
              ? 12
              : PM_AM_hour;

        onValueChange(parsedDateTime);
        setInputValue(formatDateTime(parsedDateTime));
        onTimeChange(`${hour}:${parsedDateTime.getMinutes()} ${PM_AM}`);
      }
    },
    [value]
  );

  const handleKeydown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case "Enter":
          const parsedDateTime = parseDateTime(e.currentTarget.value);
          if (parsedDateTime) {
            const PM_AM = parsedDateTime.getHours() >= 12 ? "PM" : "AM";
            //fix the time format for this value

            const PM_AM_hour = parsedDateTime.getHours();

            const hour =
              PM_AM_hour > 12
                ? PM_AM_hour % 12
                : PM_AM_hour === 0 || PM_AM_hour === 12
                  ? 12
                  : PM_AM_hour;

            onValueChange(parsedDateTime);
            setInputValue(formatDateTime(parsedDateTime));
            onTimeChange(`${hour}:${parsedDateTime.getMinutes()} ${PM_AM}`);
          }
          break;
      }
    },
    [value]
  );

  return (
    <Input
      ref={ref}
      type="text"
      placeholder={_placeholder}
      value={inputValue}
      onChange={(e) => setInputValue(e.currentTarget.value)}
      onKeyDown={handleKeydown}
      onBlur={handleParse}
      className={cn("px-2 mr-0.5 flex-1 border-none h-8 rounded", inputBase)}
      {...props}
    />
  );
});

NaturalLanguageInput.displayName = "NaturalLanguageInput";

type DateTimeLocalInputProps = {} & CalendarProps;

const DateTimeLocalInput = ({
  className,
  ...props
}: DateTimeLocalInputProps) => {
  const { value, onValueChange, Time } = useSmartDateInput();

  const formateSelectedDate = useCallback(
    (
      date: Date | undefined,
      selectedDate: Date
      // m: ActiveModifiers,
      // e: React.MouseEvent
    ) => {
      const parsedDateTime = parseDateTime(selectedDate);

      if (parsedDateTime) {
        parsedDateTime.setHours(
          parseInt(Time?.split(":")[0] ?? "0"),
          parseInt(Time?.split(":")[1] ?? "0")
        );
        onValueChange(parsedDateTime);
      }
    },
    [value, Time]
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          size={"icon"}
          className={cn(
            "size-9 flex items-center justify-center font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="size-4" />
          <span className="sr-only">calender</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" sideOffset={8}>
        <div className="flex gap-1">
          <Calendar
            {...props}
            id={"calendar"}
            className={cn("peer flex justify-end", inputBase, className)}
            mode="single"
            selected={value}
            onSelect={formateSelectedDate}
            initialFocus
          />
          <TimePicker />
        </div>
      </PopoverContent>
    </Popover>
  );
};

DateTimeLocalInput.displayName = "DateTimeLocalInput";
