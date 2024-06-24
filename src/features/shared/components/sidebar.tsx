"use client";

import { Avatar, Layout, Menu } from "antd";
import {
  IconHistory,
  IconLogout,
  IconPencil,
  IconShoppingBag,
  IconWashTemperature6,
} from "@tabler/icons-react";
import { useShallow } from "zustand/react/shallow";
import { useSiderStore } from "../stores/SiderStore";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useUiStore } from "../stores/UiStore";
import Link from "next/link";
import UserProfile from "@/features/users/components/user-profile";
import ProtectedResource from "@/features/auth/guards/protected-resource";

const { Sider } = Layout;

const Sidebar = () => {
  const pathname = usePathname();
  const { status } = useSession();
  const [collapsed, setCollapsed] = useSiderStore(
    useShallow((state) => [state.collapsed, state.setCollapsed])
  );
  const openNotification = useUiStore((state) => state.openNotification);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    openNotification({
      type: "success",
      message: "Logout Successfully",
      description: "You're logged out",
    });
  };

  const menuItems = [
    {
      label: <Link href="/dashboard/products">List all products</Link>,
      key: "/dashboard/products",
      icon: <IconWashTemperature6 />,
      roles: ["ADMIN"],
    },
    {
      label: <Link href="/dashboard/requests">List all requests</Link>,
      key: "/dashboard/requests",
      icon: <IconHistory />,
      roles: ["ADMIN"],
    },
    {
      label: <Link href="/products">View all items</Link>,
      key: "/products",
      icon: <IconWashTemperature6 />,
    },
    {
      label: <Link href="/requests">View your loan history</Link>,
      key: "/requests",
      icon: <IconHistory />,
    },
    {
      label: <Link href="/carts">View your carts</Link>,
      key: "/carts",
      icon: <IconShoppingBag />,
    },
    {
      label: <button onClick={handleLogout}>Logout</button>,
      key: "/logout",
      icon: <IconLogout />,
      authRequired: true,
    },
  ];

  const paragraphStyle: any = {
    fontSize: collapsed ? 12 : 16,
    textAlign: collapsed ? "center" : "start",
    fontWeight: 300,
  };

  const avatarSize = collapsed ? 40 : 64;

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      width={200}
      collapsedWidth={80}
      className="sidebar"
      theme="dark"
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        padding: 8,
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 1,
      }}
    >
      <Link href="/" className="-logo">
        <Avatar size={avatarSize} src="/assets/logo.jpeg" />
        {!collapsed && <h1>ECT Renting</h1>}
      </Link>

      <UserProfile collapsed={collapsed} />

      <br />

      <ProtectedResource roles={["ADMIN"]}>
        <p style={paragraphStyle}>Dashboard</p>
        <Menu
          theme="dark"
          selectedKeys={[pathname]}
          mode="inline"
          items={menuItems.filter((item) => item.roles?.includes("ADMIN"))}
        />
      </ProtectedResource>

      <p style={paragraphStyle}>Actions</p>
      <Menu
        theme="dark"
        selectedKeys={[pathname]}
        mode="inline"
        items={menuItems.filter((item) => !item.roles && !item.authRequired)}
      />

      {status === "authenticated" && (
        <div className="-auth">
          <Menu
            theme="dark"
            selectedKeys={[pathname]}
            mode="inline"
            items={menuItems.filter((item) => item.authRequired)}
          />
        </div>
      )}
    </Sider>
  );
};

export default Sidebar;
