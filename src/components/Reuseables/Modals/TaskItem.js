import React from "react";
import { Icon, Input, Button, Avatar } from "antd";
import { AlignLeftOutlined } from "@ant-design/icons";
import styles from "./style.module.less";

const { TextArea } = Input;

export const TaskModal = () => {};

export const TaskItemModal = ({ photoURL, taskItemProps: { title } }) => {
  return (
    <section className={styles["CreateTask-modal"]}>
      <div className={styles["Top-row"]}>
        <p>{title}</p>
      </div>

      <article className={styles["Bottom-row"]}>
        <aside className={styles["Left-column"]}>

          <div className={styles["First_row"]}>
            <AlignLeftOutlined style={{ fontSize: 19, marginRight: 10 }} />
            <div>
              <h4><b>Description</b></h4>
              <TextArea rows={3} />
            </div>
          </div>

          <div className={styles["Second_row"]}>
            <Icon type="bars" style={{ fontSize: 20, marginRight: 10 }} />
            <h4><b>Activity</b></h4>
          </div>

          <div className={styles["Third_row"]}>
            <Avatar icon="user" src={photoURL} style={{ marginRight: 10 }} />
            <Input type="text" placeholder="Write a comment." />
          </div>

        </aside>

        <article className={styles["Right-column"]}>
          <aside>
            <b>ADD TO CARD</b>
            <Button block style={{ textAlign: 'start' }}>
              <Icon type="user"/>
              {" "}
              <b>Members</b>
            </Button>
            <Button block style={{ textAlign: 'start' }}>
              <Icon type="tags-o"/>
              {" "}
              <b>Labels</b>
            </Button>
            <Button block style={{ textAlign: 'start' }}>
              <Icon type="paper-clip"/>
              {" "}
              <b>Attachment</b>
            </Button>
          </aside>

          <aside>
            <b>ACTIONS</b>
            <Button block style={{ textAlign: 'start' }}>
              <Icon type="copy" />
              {" "}
              <b>Copy</b>
            </Button>
            <Button block style={{ textAlign: 'start' }}>
              <Icon type="delete" />
              {" "}
              <b>Delete</b>
            </Button>
            <Button block style={{ textAlign: 'start' }}>
              <Icon type="share-alt" />
              {" "}
              <b>Share</b>
            </Button>
          </aside>
        </article>
      </article>
    </section>
  );
};
