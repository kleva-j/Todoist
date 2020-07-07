import React from "react";
import { Input, Button, Icon, Form } from "antd";

const { Group } = Input;

export const EmailPrompt = (props) => {
  const {
    handleFormSubmit,
    form: { getFieldDecorator },
  } = props;
  return (
    <Form onSubmit={handleFormSubmit}>
      <Group compact style={{ display: "flex" }}>
        <Form.Item style={{ margin: 0, width: "80%" }}>
          {getFieldDecorator("email", {
            rules: [
              {
                required: true,
                message: "Please enter your email!",
              },
            ],
          })(
            <Input
              type="email"
              size="large"
              prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Enter Email"
              allowClear
            />
          )}
        </Form.Item>
        <Button
          size="large"
          type="primary"
          style={{ width: "20%" }}
          htmlType="submit"
        >
          Enter
        </Button>
      </Group>
    </Form>
  );
};
