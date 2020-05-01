import React, { useRef } from "react";
import { Input, Button } from "antd";

const { Group } = Input;

export const EmailPrompt = ({ handleSubmit }) => {
  const inputRef = useRef(null);

  return (
    <Group compact style={{ display: "flex" }}>
      <Input
        type="text"
        size="large"
        width={{ width: "80%" }}
        ref={inputRef}
        placeholder="Enter Email."
      />
      <Button
        size="large"
        type="primary"
        style={{ width: "20%" }}
        onClick={() => handleSubmit(inputRef.current.state.value)}
      >
        Enter
      </Button>
    </Group>
  );
};
