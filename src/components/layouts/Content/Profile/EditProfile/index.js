import React from "react";
import { Form, Input, Icon, Select, Button } from "antd";

const { TextArea } = Input;
const { Option } = Select;

const inlineStyles = {
  formItems: {
    display: 'inline-grid',
    gridTemplateColumns: 'auto auto',
    gridColumnGap: 60,
    width: '100%',
  },
  formItem: {
    margin: 5,
    padding: 0,
  },
};

export const EditProfile = (props) => {
  const {
    handleSubmit, socials = {},
    form, gender, language='english',
    bio='', nationality=''
  } = props;
  const { getFieldDecorator } = form;
  return (
    <Form
      onSubmit={handleSubmit}
    >

      <Form.Item
        name="bio"
        label="Bio"
        style={inlineStyles.formItem}
      >
        {getFieldDecorator('bio',{
          initialValue: bio,
        })(
          <TextArea rows={4} placeholder="Write up a little description about yourself.">
            <Icon type="user" />
          </TextArea>
        )}
      </Form.Item>

      <div style={inlineStyles.formItems}>
        <Form.Item
          name="language"
          label="Language"
          style={inlineStyles.formItem}
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
          name="gender"
          label="Gender"
          style={inlineStyles.formItem}
        >
          {getFieldDecorator('gender', {
            initialValue: gender,
          })(
            <Select
              placeholder="Select a gender"
            >
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="no_option">Prefer not to specify</Option>
              <Option value="other">others</Option>
            </Select>
          )}
        </Form.Item>
      </div>

      <Form.Item
        name="nationality"
        label="Nationality"
        style={inlineStyles.formItem}
      >
        {getFieldDecorator('nationality', {
          initialValue: nationality,
        })(
          <Input
            type="text"
            prefix={<Icon type="flag" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Enter your nationality"
          />,
        )}
      </Form.Item>

      <Form.Item
        name="facebook"
        label="Facebook"
        style={inlineStyles.formItem}
      >
        {getFieldDecorator('facebook', {
          initialValue: socials.facebook,
        })(
          <Input
            type="text"
            prefix={<Icon type="facebook" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="eg,. https://facebook.com/@username"
          />,
        )}
      </Form.Item>

      <Form.Item
        name="twitter"
        label="Twitter"
        style={inlineStyles.formItem}
      >
        {getFieldDecorator('twitter', {
          initialValue: socials.twitter,
        })(
          <Input
            type="text"
            prefix={<Icon type="twitter" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="eg,. https://twitter.com/@username"
          />,
        )}
      </Form.Item>

      <Form.Item
        name="github"
        label="Github"
        style={inlineStyles.formItem}
      >
        {getFieldDecorator('github', {
          initialValue: socials.github,
        })(
          <Input
            type="text"
            prefix={<Icon type="github" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="eg,. https://github.com/@username"
          />,
        )}
      </Form.Item>

      <Form.Item
        wrapperCol={ { offset: 20 } }
        style={{ margin: '20px 7px 20px 0' }}
      >
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form.Item>

    </Form>
  );
};
