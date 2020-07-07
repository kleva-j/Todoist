import React, { memo } from "react";
import { motion } from "framer-motion";
import { Form, Input, Icon, Button, DatePicker, Mentions, Row, Col, Spin } from "antd";

import styles from "./style.module.less";

const { TextArea } = Input;
const { RangePicker } = DatePicker;
const { Option } = Mentions;

export const ProjectModal = memo((props) => {
  const {
    form: { getFieldDecorator },
    handleSubmit, state: { loading },
  } = props;
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={styles["CreateProject_modal"]}
    >
      <Spin tip="Creating Project" spinning={loading} delay={2}>
        <Form onSubmit={handleSubmit} className={styles["Form"]}>
          <Form.Item
            name="title"
            label="Title"
            colon={false}
            className={styles["FormItem"]}
            style={{ margin: 0 }}
          >
            {getFieldDecorator("title", {
              rules: [
                { required: true, message: "Please input title of project!" },
              ],
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
              rules: [
                {
                  required: true,
                  message: "Please input description of project!",
                },
              ],
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

          <Row>
            <Col span={10}>
              <Form.Item
                name="timespan"
                label="Timeline of project"
                className={styles["FormItem"]}
                style={{ margin: 0 }}
              >
                {getFieldDecorator("timespan", {
                  rules: [
                    {
                      required: true,
                      message: "Please set timeline of your project.",
                    },
                  ],
                })(<RangePicker />)}
              </Form.Item>
            </Col>

            <Col span={12} offset={2}>
              <Form.Item
                name="contributors"
                label="Add Contributors"
                className={styles["FormItem"]}
                style={{ margin: 0 }}
              >
                {getFieldDecorator('contributors')(
                  <Mentions
                    rows="1"
                    placeholder="input @ to mention people"
                    placement="top"
                  >
                    <Option value="afc163">afc163</Option>
                    <Option value="zombieJ">zombieJ</Option>
                    <Option value="yesmeck">yesmeck</Option>
                  </Mentions>
                )}
              </Form.Item>
            </Col>
          </Row>

          {/* <Form.Item
            name="tags"
            label="Tags"
            className={styles["FormItem"]}
          >
            <Input
              type="text"
              ref={inputRef}
              onPressEnter={handleTagEnter(inputRef, tagListRef)}
              placeholder="input # to mention tag"
            />
            {tagListRef.current.map(({ tag, color }, i) => (
              <Tag
                closable
                key={i}
                color={color}
                onClose={handleRemoveTag(tag)}
              >
                {tag}
              </Tag>
            ))}
          </Form.Item> */}
          <Form.Item wrapperCol={{ offset: 21 }} style={{ margin: '10px 0 0 0' }}>
            <Button type="primary" htmlType="submit">
              CREATE
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </motion.section>
  );
});
