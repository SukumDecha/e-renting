import { IconPencil } from "@tabler/icons-react";
import { Button } from "antd";
import Link from "next/link";

interface IProps {
  href: string;
}
const EditButton = ({ href }: IProps) => {
  return (
    <Link href={href}>
      <Button color="primary" shape="circle" icon={<IconPencil />} />
    </Link>
  );
};

export default EditButton;
