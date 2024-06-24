import { IconPencil } from "@tabler/icons-react";
import { Button } from "antd";
import Link from "next/link";

interface IProps {
  href?: string;
  onEdit?: () => void;
}
const EditButton = ({ href, onEdit }: IProps) => {
  if (!href) {
    return (
      <Button
        color="primary"
        shape="circle"
        icon={<IconPencil />}
        onClick={onEdit}
      />
    );
  }
  return (
    <Link href={href}>
      <Button color="primary" shape="circle" icon={<IconPencil />} />
    </Link>
  );
};

export default EditButton;
