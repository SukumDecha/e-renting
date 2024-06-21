"use client";
import React from "react";
import { IconLock, IconMail, IconUserBolt } from "@tabler/icons-react";

import { Checkbox, Form, Grid, Input, theme, Typography } from "antd";
import ECTButton from "@/features/shared/components/button";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;

interface IProps {
  kind: "login" | "signup";
  onSubmit: (values: any) => void;
}

const AuthForm = ({ kind, onSubmit }: IProps) => {
  const { token } = useToken();
  const screens = useBreakpoint();

  const title = kind === "login" ? "Login" : "Sign up";

  const styles: any = {
    container: {
      margin: "0 auto",
      padding: screens.md
        ? `${token.paddingXL}px`
        : `${token.sizeXXL}px ${token.padding}px`,
      width: "380px",
    },
    footer: {
      marginTop: token.marginLG,
      textAlign: "center",
      width: "100%",
    },
    forgotPassword: {
      float: "right",
    },
    header: {
      marginBottom: token.marginXL,
    },
    section: {
      alignItems: "center",
      backgroundColor: token.colorBgContainer,
      display: "flex",
      height: screens.sm ? "100vh" : "auto",
      padding: screens.md ? `${token.sizeXXL}px 0px` : "0px",
    },
    text: {
      color: token.colorTextSecondary,
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
      textAlign: "center",
    },
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <Title style={styles.title}>{title}</Title>
          <Text style={styles.text}>
            Welcome back to renting web-app. {title} to start using our service.
          </Text>
        </div>
        <Form
          name={kind}
          initialValues={{
            remember: true,
          }}
          onFinish={onSubmit}
          layout="vertical"
          requiredMark="optional"
        >
          {kind === "signup" && (
            <Form.Item
              name="name"
              rules={[
                {
                  type: "string",
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input prefix={<IconUserBolt />} placeholder="Username" />
            </Form.Item>
          )}
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input prefix={<IconMail />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
              {
                min: 8,
                message: "Your password must be atleast 8 character long",
              },
            ]}
          >
            <Input.Password
              prefix={<IconLock />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a style={styles.forgotPassword} href="">
              Forgot password?
            </a>
          </Form.Item>
          <Form.Item style={{ marginBottom: "0px" }}>
            <ECTButton color="primary" htmlType="submit">
              {title}
            </ECTButton>
            {kind === "login" && (
              <div style={styles.footer}>
                <Text style={styles.text}>Don&apos;t have an account?</Text>{" "}
                <Link href="">Sign up now</Link>
              </div>
            )}
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default AuthForm;
