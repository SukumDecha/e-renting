"use client";

import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import {
  IconHistory,
  IconLogout,
  IconPencil,
  IconWashTemperature6,
} from "@tabler/icons-react";
import { useShallow } from "zustand/react/shallow";
import { useSiderStore } from "../stores/SiderStore";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useUiStore } from "../stores/UiStore";
import UserProfile from "@/features/users/components/UserProfile";
import ProtectedResource from "@/features/auth/guards/ProtectedResource";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "divider" | "item" | "submenu" | "group"
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
};

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

  const dashBoardItems: MenuItem[] = [
    getItem(
      <Link href="/dashboard/products">List all products</Link>,
      "/dashboard/products",
      <IconWashTemperature6 />
    ),
    getItem(
      <Link href="/dashboard/loans">List all loans</Link>,
      "/dashboard/loans",
      <IconHistory />
    ),
  ];

  const actionItems: MenuItem[] = [
    getItem(
      <Link href="/products">View all items</Link>,
      "/products",
      <IconWashTemperature6 />
    ),
    getItem(
      <Link href="/request/history">View your loan history</Link>,
      "/request/history",
      <IconHistory />
    ),
    getItem(
      <Link href="/request/new-request">Create new a loan</Link>,
      "/request/new-request",
      <IconPencil />
    ),
  ];

  const authItems: MenuItem[] = [
    getItem(
      <button onClick={handleLogout}>Logout</button>,
      "/products",
      <IconLogout />
    ),
  ];

  const paragraphStyle: any = {
    fontSize: collapsed ? 12 : 16,
    textAlign: collapsed ? "center" : "start",
    fontWeight: 300,
  };
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={200}
      collapsedWidth={80}
      className="sidebar"
      theme="dark"
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 1,
      }}
    >
      <Link href="/" className="-logo">
        <Image src="/assets/logo.jpeg" width={50} height={50} alt="logo" />
        {!collapsed && <h1>ECT Renting</h1>}
      </Link>

      <UserProfile collapsed={collapsed} />

      <br />

      <ProtectedResource roles={["ADMIN"]}>
        <p style={paragraphStyle}>Dashboard</p>
        <Menu
          theme="dark"
          defaultSelectedKeys={[pathname]}
          selectedKeys={[pathname]}
          mode="inline"
          items={dashBoardItems}
        />
      </ProtectedResource>

      <p style={paragraphStyle}>Actions</p>
      <Menu
        theme="dark"
        defaultSelectedKeys={[pathname]}
        selectedKeys={[pathname]}
        mode="inline"
        items={actionItems}
      />

      {status === "authenticated" && (
        <div className="-auth">
          <Menu
            theme="dark"
            defaultSelectedKeys={[pathname]}
            selectedKeys={[pathname]}
            mode="inline"
            items={authItems}
          />
        </div>
      )}
    </Sider>
  );
};

export default Sidebar;
