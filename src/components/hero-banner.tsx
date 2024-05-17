import { Button } from "antd";
import Image from "next/image";
import React from "react";
import { IconSpeakerphone } from "@tabler/icons-react";
import Link from "next/link";
import ECTButton from "./shared/button";

const HeroBanner = () => {
  return (
    <div className="hero">
      <div className="-banner">
        <Image
          src="/assets/banner.jpeg"
          alt="banner"
          width={600}
          height={300}
          objectFit="cover"
        />
      </div>
      <div className="-card">
        <div className="header">
          <div className="icon">
            <IconSpeakerphone />
          </div>
          <p className="alert">ระบบยืมอุปกรณ์</p>
        </div>
        <p>คุณสามารถยืมอุปกรณ์ต่างๆภายในคณะ ECT ได้ที่นี่เลย</p>
        <div className="actions">
          <Link className="sign-in" href={"/sign-in"}>
            <ECTButton>เข้าสู่ระบบ</ECTButton>
          </Link>
          <Link className="renting" href={"/renting"}>
            <ECTButton primary={false}>ยืมอุปกรณ์</ECTButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
