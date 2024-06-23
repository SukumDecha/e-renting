"use client";
import Image from "next/image";
import React from "react";
import { IconSpeakerphone } from "@tabler/icons-react";
import ECTButton from "../button";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useUiStore } from "../../stores/UiStore";
const HeroBanner = () => {
  const { status } = useSession();
  const openNotification = useUiStore((state) => state.openNotification);

  const handleLogout = () => {
    signOut({
      redirect: false,
    });

    openNotification({
      type: "success",
      message: "Logout Successfully",
      description: "You're logged out",
    });
  };

  const renderButton = () => {
    if (status === "unauthenticated") {
      return (
        <ECTButton className="login" href="login">
          เข้าสู่ระบบ
        </ECTButton>
      );
    }

    return (
      <ECTButton color="danger" onClick={handleLogout}>
        ออกจากระบบ
      </ECTButton>
    );
  };
  return (
    <div className="-hero">
      <div className="banner">
        <Image
          src="/assets/banner.jpeg"
          alt="banner"
          width={600}
          height={300}
          objectFit="cover"
        />
      </div>
      <div className="card">
        <div className="header">
          <div className="icon">
            <IconSpeakerphone />
          </div>
          <p className="alert">ระบบยืมอุปกรณ์</p>
        </div>
        <p>คุณสามารถยืมอุปกรณ์ต่างๆภายในคณะ ECT ได้ที่นี่เลย</p>
        <div className="actions">
          {renderButton()}
          <ECTButton className="renting mt-2" color="secondary" href="/renting">
            ยืมอุปกรณ์
          </ECTButton>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
