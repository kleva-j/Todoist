import React, { useState } from 'react';
import { DatePicker } from 'antd';

export const CustomDatePicker =  () => {
  const [state, setState] = useState({
    startValue: null,
    endValue: null,
    endOpen: false
  });

  const disabledStartDate = startValue => {
    const { endValue } = state;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  const disabledEndDate = endValue => {
    const { startValue } = state;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  const onChange = (field, value) => setState({ ...state, [field]: value });

  const onStartChange = value => onChange('startValue', value);

  const onEndChange = value => onChange('endValue', value);

  const handleStartOpenChange = open => {
    if (!open) setState({ ...state, endOpen: true });
  };

  const handleEndOpenChange = open => setState({ ...state, endOpen: open });

  const { startValue, endValue, endOpen } = state;

  return (
    <span>
      <DatePicker
        disabledDate={disabledStartDate}
        format="YYYY-MM-DD"
        value={startValue}
        placeholder="Start"
        onChange={onStartChange}
        onOpenChange={handleStartOpenChange}
        style={{ marginLeft: 10, marginRight: 10 }}
      />
      <DatePicker
        disabledDate={disabledEndDate}
        format="YYYY-MM-DD"
        value={endValue}
        placeholder="End"
        onChange={onEndChange}
        open={endOpen}
        onOpenChange={handleEndOpenChange}
      />
    </span>
  );
};
