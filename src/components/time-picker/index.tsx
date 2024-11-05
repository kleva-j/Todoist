// This file uses code from the time-picker component by OpenStatus
// Copyright (c) 2024 OpenStatus
// Licensed under the MIT License
// Source: https://github.com/openstatusHQ/time-picker

"use client";

import type { Period } from "@/components/time-picker/utils";

import { TimePeriodSelect } from "@/components/time-picker/period-select";
import { TimePickerInput } from "@/components/time-picker/input";
import { useEffect, useState, useRef } from "react";
import { Label } from "@/components/ui/label";

interface TimePickerDemoProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

function calcCurrentPeriod(date: Date | undefined) {
  if (!date) return "AM";
  return new Date(date).getHours() >= 12 ? "PM" : "AM";
}

export function TimePicker({ date, setDate }: TimePickerDemoProps) {
  const currentPeriod = calcCurrentPeriod(date);
  const [period, setPeriod] = useState<Period>(currentPeriod);

  const periodRef = useRef<HTMLButtonElement>(null);
  const minuteRef = useRef<HTMLInputElement>(null);
  const hourRef = useRef<HTMLInputElement>(null);

  // Update period when date is changed
  useEffect(() => {
    if (date) {
      setPeriod(calcCurrentPeriod(date));
    }
  }, [date]);

  return (
    <div className="flex justify-center gap-2">
      <div className="grid gap-1 text-center">
        <Label htmlFor="hours" className="text-xs">
          Hours
        </Label>
        <TimePickerInput
          id="hours"
          picker="12hours"
          period={period}
          date={date}
          setDate={setDate}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
        />
      </div>
      <div className="grid gap-1 text-center">
        <Label htmlFor="minutes" className="text-xs">
          Minutes
        </Label>
        <TimePickerInput
          picker="minutes"
          id="minutes"
          date={date}
          setDate={setDate}
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
          onRightFocus={() => periodRef.current?.focus()}
        />
      </div>
      <div className="grid gap-1 text-center">
        <Label htmlFor="period" className="text-xs">
          Period
        </Label>
        <TimePeriodSelect
          period={period}
          setPeriod={setPeriod}
          date={date}
          setDate={setDate}
          ref={periodRef}
          onLeftFocus={() => minuteRef.current?.focus()}
        />
      </div>
    </div>
  );
}
