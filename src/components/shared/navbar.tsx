import {
  IconBrandInstagram,
  IconBrandFacebook,
  IconBrandChrome,
} from "@tabler/icons-react";
import { Divider } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const icons = [
  {
    key: "instragram",
    element: <IconBrandInstagram />,
  },
  {
    key: "facebook",
    element: <IconBrandFacebook />,
  },
  {
    key: "website",
    element: <IconBrandChrome />,
  },
];

const siteMap = [
  {
    label: "ยืมของ",
    href: "renting",
  },
  {
    label: "คืนของ",
    href: "return",
  },
];
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="-logo">
        <div className="-img">
          <Image src="/assets/logo.jpeg" width={50} height={50} alt="logo" />
        </div>
        <h4>ECT Renting</h4>
      </div>

      <Divider
        type="vertical"
        style={{ height: "40px", backgroundColor: "#82aac2", margin: "0 1rem" }}
      />

      <div className="-sitemap">
        {siteMap.map((item, idx) => {
          return (
            <Link href={item.href} key={idx}>
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="-contact">
        {icons.map((item) => {
          return (
            <div className="icon" key={item.key}>
              {item.element}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
