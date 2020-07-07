import React from "react";
import { motion } from "framer-motion";
import { Redirect, Link } from "react-router-dom";
import { Form, Icon, Input, Button, Checkbox, Divider } from "antd";

import styles from "../style.module.less";
import { UseModal } from "../../../hooks/UseModal";
import { SEOHeader } from "../../Reuseables/Header";
import { CustomAlert } from "../../Reuseables/Alerts";
import { EmailPromptWrapper } from "../passwordReset/wrapper";

export const LoginComponent = (props) => {
  const {
    handleReset,
    form: { getFieldDecorator },
    updateState,
    form_: { isLogin },
    switchForm,
    isEmpty,
    handleSubmit,
    loginUser,
    loginWithCred,
    state: {
      alert: { type, message, description, isVisible },
    },
  } = props;

  if (!isEmpty) {
    return <Redirect to={{ pathname: "/dashboard" }} />;
  }

  const title = isLogin ? "Log in" : "Sign up";

  const [ModalH, { toggleVisibleState }] = UseModal({
    title: (
      <h3 style={{ margin: 0 }}>
        <strong>
          Please enter your registered email address to reset your password.
        </strong>
      </h3>
    ),
    width: 400,
    closable: false,
    centered: true,
    footer: null,
  });

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={styles["Login_section"]}
    >
      <SEOHeader
        pageTitle="Login"
        pageDesc="Taskaider Login page"
        currentURL="/login"
      />
      <div className={styles["Container"]}>
        <div style={{ position: "relative" }}>
          {isVisible && (
            <CustomAlert
              type={type}
              message={message}
              description={description}
              afterClose={() => updateState({ isVisible: false })}
              showIcon={true}
            />
          )}
        </div>
        <div className={styles["Logo_container"]}>
          <Icon type="code" className={styles["Logo"]} />
          <h2 className={styles["Logo_name"]}>TASKAIDER</h2>
        </div>
        <h1 className={styles["Login_header"]}>{title}</h1>
        <section className={styles["Login_container"]}>
          <div className={styles["Login_cred"]}>
            <Form onSubmit={handleSubmit(title)} className="login-form">
              {!isLogin && (
                <Form.Item>
                  {getFieldDecorator("name", {
                    rules: [
                      {
                        required: true,
                        message: "Your name must be more than 3 character!",
                      },
                    ],
                  })(
                    <Input
                      type="text"
                      prefix={
                        <Icon
                          type="user"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder="Name"
                      minLength={3}
                    />
                  )}
                </Form.Item>
              )}
              <Form.Item>
                {getFieldDecorator("email", {
                  rules: [
                    { required: true, message: "Please input your email!" },
                  ],
                })(
                  <Input
                    type="email"
                    prefix={
                      <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Email"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("password", {
                  rules: [
                    { required: true, message: "Please input your Password!" },
                  ],
                })(
                  <Input.Password
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="Password"
                    minLength={6}
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("remember", {
                  valuePropName: "checked",
                  initialValue: true,
                })(<Checkbox>Remember me</Checkbox>)}
                <Link
                  className="login-form-forgot"
                  to="#"
                  onClick={() => toggleVisibleState(true)}
                >
                  Forgot password
                </Link>
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  onClick={loginWithCred}
                >
                  {title}
                </Button>
                Or{" "}
                <Link
                  to={""}
                  className="login-form-forgot"
                  onClick={switchForm}
                >
                  {!isLogin ? "Log in " : "Sign up "}
                </Link>
                now
              </Form.Item>
            </Form>
          </div>

          <Divider type="vertical" style={{ height: 250, margin: "0 30px" }} />

          <div className={styles["Login_socials"]}>
            <Button size="large" block onClick={() => loginUser("google")}>
              Login with Google
              <Icon type="google" style={{ fontSize: 20, color: "#db3236" }} />
            </Button>

            <Button size="large" block onClick={() => loginUser("twitter")}>
              Login with Twitter
              <Icon type="twitter" style={{ fontSize: 20, color: "#00acee" }} />
            </Button>

            <Button size="large" block onClick={() => loginUser("facebook")}>
              Login with Facebook
              <Icon
                type="facebook"
                style={{ fontSize: 20, color: "#3b5998" }}
              />
            </Button>

            <Button size="large" block onClick={() => loginUser("github")}>
              Login with Github
              <Icon type="github" style={{ fontSize: 20, color: "black" }} />
            </Button>
          </div>
        </section>
      </div>
      <ModalH>
        <EmailPromptWrapper handleSubmit={handleReset} toggleModal={toggleVisibleState} />
      </ModalH>
    </motion.section>
  );
};
