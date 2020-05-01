import React from "react";
import { Layout, Icon, Typography } from "antd";

const { Text } = Typography;
const { Footer } = Layout;

export const FooterComponent = () => (
  <Footer
    style={{
      textAlign: "center",
    }}
  >
    <Text level={4} strong={true}>
      TaskAider
    </Text>{" "}
    ©2020 Made with{" "}
    <Icon
      type="heart"
      role="text"
      theme="filled"
      style={{ color: "hotpink", fontSize: "18px" }}
    />{" "}
    by kasmickleva
  </Footer>
);
