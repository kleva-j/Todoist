import React from 'react';
import { Form, Input, Icon, Divider, Select, Button, Upload } from 'antd'
import styles from './style.module.less';
import { useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';

const { TextArea } = Input;
const { Option } = Select;

export const Profile = (props) => {
  const {
    handleSubmit, form: { getFieldDecorator },
    handleFileChange, handleBeforeUpload, state
  } = props;
  const {
    user: { name, email, bio="", gender, language="English", pic }
  } = useContext(UserContext);
  return (
    <section className={styles["Profile_container"]}>
      <h2>Public Profile</h2>
      <Divider style={{ margin: 0 }} />

      <article className={styles["Profile_article"]}>
        <Form
          onSubmit={handleSubmit}
          className={styles["Form"]}>

          <Form.Item
            name="name"
            label="Name"
            colon={false}
            className={styles["FormItem"]}
          >
            {getFieldDecorator('name', {
              rules: [{ message: 'Please input your Name!' }],
              initialValue: name,
            })(
              <Input
                type="text"
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Enter Name"
              />,
            )}
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            colon={false}
            className={styles["FormItem"]}
          >
            {getFieldDecorator('email', {
              initialValue: email,
            })(
              <Input
                type="text"
                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                readOnly
              />,
            )}
          </Form.Item>

          <Form.Item
            name="bio"
            label="Bio"
            className={styles["FormItem"]}
          >
            {getFieldDecorator('bio',{
              initialValue: bio,
            })(
              <TextArea
                rows={4}
                placeholder="Write up a little description about yourself."
              >
                <Icon type="user" />
              </TextArea>
            )}
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            className={styles["FormItem"]}
          >
            {getFieldDecorator('gender', {
              initialValue: gender,
            })(
              <Select
                placeholder="Select a gender"
              >
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="no_option" selected>Prefer not to specify</Option>
                <Option value="other">others</Option>
              </Select>
            )}
          </Form.Item>

          <Form.Item
            name="language"
            label="Language"
            className={styles["FormItem"]}
          >
            {getFieldDecorator('language', {
              initialValue: language,
            })(
              <Select
                placeholder="Select a language"
              >
                <Option value="english">English</Option>
                <Option value="french">French</Option>
                <Option value="german">German</Option>
                <Option value="spanish">Spanish</Option>
                <Option value="italian">Italian</Option>
                <Option value="other">others</Option>
              </Select>
            )}
          </Form.Item>

          <Form.Item
            wrapperCol={ { offset: 18 } }
            style={{ margin: '25px -5px 15px 0' }}
          >
            <Button type="primary" htmlType="submit">
              Update Profile
            </Button>
          </Form.Item>

        </Form>

        <aside className={styles["Aside"]}>
          <Upload
            name="avatar"
            listType="picture-card"
            className={styles["Upload"]}
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={handleBeforeUpload}
            onChange={handleFileChange} 
          >
            <img src={state.imageUrl || pic } alt="avatar" className={styles["ProfileAvatar"]} />
          </Upload>
        </aside>

      </article>

    </section>
  );
};
