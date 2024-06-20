"use client";

import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import {
  IconHistory,
  IconLockAccess,
  IconPencil,
  IconTools,
  IconUserCheck,
} from "@tabler/icons-react";
import { useShallow } from "zustand/react/shallow";
import { useSiderStore } from "../stores/SiderStore";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useUiStore } from "../stores/UiStore";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem => ({
  key,
  icon,
  children,
  label,
});

const Sidebar = () => {
  const pathname = usePathname();
  const { status } = useSession();
  const [collapsed, setCollapsed] = useSiderStore(
    useShallow((state) => [state.collapsed, state.setCollapsed])
  );

  const openNotification = useUiStore((state) => state.openNotification);

  const handleLogout = async () => {
    await signOut({
      redirect: false,
    });

    openNotification({
      type: "success",
      message: "Logout Successfully",
      description: "You're logged out",
    });
  };

  const unAuthorizedItems: MenuItem[] = [
    getItem(
      <Link href="/products">View all items</Link>,
      "/products",
      <IconTools />
    ),
    getItem(<Link href="/login">Login</Link>, "/login", <IconLockAccess />),
    getItem(
      <Link href="/sign-up">Sign-up</Link>,
      "/sign-up",
      <IconUserCheck />
    ),
  ];

  const authorizedItems: MenuItem[] = [
    getItem(
      <Link href="/products">View all items</Link>,
      "/products",
      <IconTools />
    ),
    getItem(
      <Link href="/request/history">View loan history</Link>,
      "/request/history",
      <IconHistory />
    ),
    getItem(
      <Link href="/request/new-request">Create new a loan</Link>,
      "/request/new-request",
      <IconPencil />
    ),
    getItem(
      <button onClick={handleLogout}>Logout</button>,
      "/logout",
      <IconUserCheck />
    ),
  ];

  const menuItems =
    status === "loading"
      ? []
      : status === "unauthenticated"
      ? unAuthorizedItems
      : authorizedItems;

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={200}
      collapsedWidth={80}
      className="sidebar"
    >
      <Link href="/" className="-logo">
        <Image src="/assets/logo.jpeg" width={50} height={50} alt="logo" />
        {!collapsed && <h1>ECT Renting</h1>}
      </Link>
      <Menu
        theme="dark"
        defaultSelectedKeys={[pathname]}
        selectedKeys={[pathname]}
        mode="inline"
        items={menuItems}
      />
    </Sider>
  );
};

export default Sidebar;
