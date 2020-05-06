import React, { useEffect } from 'react';
import { Form, Input, Icon, Button, Divider, Tag, Upload } from 'antd';
import { useSelector } from 'react-redux';
import { getUser, getProfile } from '../../../../selectors/user';
import styles from './style.module.less';
import { EditWrapper } from './EditProfile/wrapper';

export const Profile = (props) => {
  const {
    form: { getFieldDecorator },
    handleSubmit, handleFileChange,
    handleBeforeUpload, state, setState,
  } = props;
  const profile = useSelector(getProfile);
  const userData = useSelector(getUser);
  
  let firstname, lastname;

  if (userData.providerData[0]['providerId'] === "google.com") {
    const fullname = userData.displayName.split(' ');
    firstname = fullname[0];
    lastname = fullname[1];
  } else {
    firstname = profile.firstname;
    lastname = profile.lastname;
  }
  const date = new Date(+userData.createdAt);
  const createdAtDate = date.toUTCString();
  const localDateString = date.toLocaleDateString();
  const lastLogin = new Date(+userData.lastLoginAt).toUTCString();
  
  useEffect(() => {
    setState({ ...state, imageUrl: userData.photoURL })
  }, [userData.photoURL])

  return (
    <section className={styles["Profile_container"]}>
      <section className={styles["Profile_display"]}>

        <article className={styles["Left_article"]}>

          <div className={styles["Socials"]}>

            <Upload
              name="avatar"
              listType="picture-card"
              className={styles["upload"]}
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={handleBeforeUpload}
              onChange={handleFileChange} 
            >
              <img src={state.imageUrl || userData.photoURL} alt="avatar" className={styles["profileAvatar"]} />
            </Upload>

            <h2><b>{firstname} {lastname}</b></h2>
            <span>
              {userData.email}
              <Divider type="vertical" style={{ margin: '0 10px' }} />
              {
                userData.emailVerified ?
                (<Tag color="cyan">Verified</Tag>) :
                (<Tag color="red">Not Verified</Tag>)
              }
            </span>
            <p>Member since {localDateString}</p>
            <span>
              <Icon type="facebook" style={{ fontSize: 25, color: '#3b5998', margin: '0 10px', cursor: 'pointer' }} />
              <Icon type="twitter" style={{ fontSize: 25, color: '#00acee', margin: '0 10px', cursor: 'pointer' }} />
              <Icon type="github" style={{ fontSize: 25, color: '#000', margin: '0 10px', cursor: 'pointer' }} />
            </span>
          </div>

        </article>

        <Divider type="vertical" style={{ height: 670, margin: '25px 0' }} />

        <article className={styles["Middle_article"]}>

          <Form
            onSubmit={handleSubmit}
          >
            <div className={styles["FormItem-container"]}>
              <Form.Item
                name="firstname"
                label="Firstname"
                className={styles["FormItem"]}
              >
                {getFieldDecorator('firstname', {
                  rules: [{ required: true, message: 'Please input your Firstname!' }],
                  initialValue: firstname,
                })(
                  <Input
                    type="text"
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Enter firstname"
                  />,
                )}
              </Form.Item>
              <Form.Item
                name="lastname"
                label="Lastname"
                className={styles["FormItem"]}
              >
                {getFieldDecorator('lastname', {
                  rules: [{ required: true, message: 'Please input your Lastname!' }],
                  initialValue: lastname,
                })(
                  <Input
                    type="text"
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Enter lastname"
                  />,
                )}
              </Form.Item>
            </div>

            <Form.Item
              name="email"
              label="Email"
              className={styles["FormItem"]}
            >
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please input your email!' }],
                initialValue: userData.email,
              })(
                <Input
                  type="email"
                  prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  readOnly
                />
              )}
            </Form.Item>

            <Form.Item
              name="password1"
              label="Current password"
              className={styles["FormItem"]}
            >
              {getFieldDecorator('password1', {
                rules: [{ required: true, message: 'Please input your password!' }],
                initialValue: '************'
              })(
                <Input
                  type="password"
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  readOnly
                />,
              )}
            </Form.Item>

            <Form.Item
              name="password2"
              label="New password"
              className={styles["FormItem"]}
            >
              {getFieldDecorator('password2', {
                rules: [{ required: true, message: 'Please input your password!' }],
                initialValue: ''
              })(
                <Input
                  type="password"
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Enter new password"
                />,
              )}
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone Number"
              className={styles["FormItem"]}
            >
              {getFieldDecorator('phone', {
                rules: [{ required: false, message: 'Please input your phone number!' }],
                initialValue: userData.phoneNumber
              })(
                <Input
                  type="text"
                  prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="eg +2349046167325"
                />,
              )}
            </Form.Item>

            <Form.Item
              wrapperCol={ { offset: 17 } }
              style={{ margin: '15px -3px 15px 0' }}
            >
              <Button type="primary" htmlType="submit">
                Update Profile
              </Button>
            </Form.Item>
          </Form>
                
        </article>

        <Divider type="vertical" style={{ height: 670, margin: '25px 0' }} />

        <article className={styles["Right_article"]}>
          <h3>Additional information</h3>
          <Divider style={{ margin: 0 }}/>
          
          <EditWrapper
            gender={profile.gender}
            language={profile.language}
            bio={profile.bio}
            nationality={profile.nationality}
          />

        </article>

      </section>
    </section>
  );
};
