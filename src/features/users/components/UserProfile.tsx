import ECTButton from "@/features/shared/components/button";
import Loading from "@/features/shared/components/loading";
import { getImagePath } from "@/features/shared/helpers/upload";
import { useUiStore } from "@/features/shared/stores/UiStore";
import { IconUserCode } from "@tabler/icons-react";
import { Avatar } from "antd";
import { signOut, useSession } from "next-auth/react";
import React from "react";

interface IProps {
  collapsed: boolean;
}

const UserProfile = ({ collapsed }: IProps) => {
  const openNotification = useUiStore((state) => state.openNotification);
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <Loading />;
  }

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

  if (status === "unauthenticated" || !session)
    return (
      <div className="user-profile">
        <Avatar
          size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
          icon={<IconUserCode />}
        />
        {!collapsed && (
          <>
            <div className="-title">
              <h2>Guest User</h2>
            </div>
            <div className="-button">
              <ECTButton color="primary" href="/sign-up">
                Register
              </ECTButton>
              <ECTButton color="secondary" href="/login">
                Login
              </ECTButton>
            </div>
          </>
        )}
      </div>
    );

  const size = collapsed
    ? { xs: 40, md: 40, lg: 48, xl: 48 }
    : { xs: 40, md: 64, lg: 64, xl: 80 };

  return (
    <div className="user-profile">
      <Avatar
        size={size}
        icon={<IconUserCode />}
        src={"/assets/default-avatar.png" || getImagePath(session.user.image!)}
      />
      {!collapsed && (
        <>
          <div className="-title">
            <h2>{session.user.name}</h2>
            <h1>{session.user.email}</h1>
          </div>
          <ECTButton color="danger" onClick={handleLogout}>
            Logout
          </ECTButton>
        </>
      )}
    </div>
  );
};

export default UserProfile;
