import { IconPencil } from "@tabler/icons-react";
import { Button } from "antd";
import Link from "next/link";

interface IProps {
  href: string;
}
const EditButton = ({ href }: IProps) => {
  return (
    <Link href={href}>
      <Button type="primary" shape="circle" icon={<IconPencil />} />
    </Link>
  );
};

export default EditButton;
