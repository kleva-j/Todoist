import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox, Divider } from 'antd';

import styles from './style.module.less';
import { Toastr, FirebaseApp } from '../../services';
import { connect } from 'react-redux';

const LoginComponent = (props) => {

  const { history, isEmpty, form } = props;

  const { validateFields, getFieldDecorator  } = form;

  if (!isEmpty) {
    return <Redirect to={{ pathname: '/projects' }} />
  };

  const loginUser = FirebaseApp.loginUser(
    _ =>  history.push('/projects'),
    ({ message }) => Toastr.error(message, 'Login Error')
  );

  const handleSubmit = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  return (
    <div className={styles['login_container']}>
      <div className={styles['login_cred']}>
        <Form onSubmit={handleSubmit} className="login-form">
        <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                type="text"
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email!' }],
            })(
              <Input
                type="email"
                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Email"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>Remember me</Checkbox>)}
            <Link className="login-form-forgot" to="">
              Forgot password
            </Link>
            <Button type="primary" block htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>

      <Divider type="vertical" style={{ height: 250, margin: '0 25px' }} />

      <div className={styles['login_socials']}>
        <Button size='large' block onClick={() => loginUser('google')}>
          Login with Google
          <Icon type="google" style={{ fontSize: 20, color: '#db3236' }} />
        </Button>

        <Button size='large' block onClick={() => loginUser('twitter')}>
          Login with Twitter
          <Icon type="twitter" style={{ fontSize: 20, color: '#00acee' }} />
        </Button>
          
        <Button size='large' block onClick={() => loginUser('facebook')}>
          Login with Facebook
          <Icon type="facebook" style={{ fontSize: 20, color: '#3b5998' }} />
        </Button>

        <Button size='large' block onClick={() => loginUser('github')}>
          Login with Github
          <Icon type="github" style={{ fontSize: 20, color: 'black' }} />  
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ firebase: { auth: { isEmpty }}}) => ({ isEmpty });

const LoginFormWrapper = connect(mapStateToProps)(LoginComponent);

export const Login = Form.create({ name: 'login_form' })(LoginFormWrapper);