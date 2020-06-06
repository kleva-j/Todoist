import React from "react";
import { Form, Input, Icon, Button } from "antd";

import styles from "./style.module.less";

const { TextArea } = Input;

export const ProjectModal = (props) => {
  const {
    form: { getFieldDecorator },
    handleSubmit,
  } = props;
  return (
    <section className={styles["CreateProject_modal"]}>
      <Form onSubmit={handleSubmit} className={styles["Form"]}>
        <Form.Item
          name="title"
          label="Title"
          colon={false}
          className={styles["FormItem"]}
          style={{ margin: 0 }}
        >
          {getFieldDecorator("title", {
            rules: [{ required: true, message: "Please input title of project!" }],
          })(
            <Input
              type="text"
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Enter Title"
            />
          )}
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          colon={false}
          className={styles["FormItem"]}
          style={{ margin: 0 }}
        >
          {getFieldDecorator("description", {
            rules: [{ required: true, message: "Please input description of project!" }],
          })(
            <Input
              type="text"
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Enter Description"
            />
          )}
        </Form.Item>

        <Form.Item
          name="content"
          label="Content"
          className={styles["FormItem"]}
          style={{ margin: 0 }}
        >
          {getFieldDecorator("content")(
            <TextArea
              rows={4}
              placeholder="Write up a little content about the project."
            >
              <Icon type="project" />
            </TextArea>
          )}
        </Form.Item>

        <Form.Item
          wrapperCol={{ offset: 21 }}
          style={{ margin: "25px -8px 0 0" }}
        >
          <Button type="primary" htmlType="submit">
            CREATE
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
};
