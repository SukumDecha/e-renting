import { IconPencil } from "@tabler/icons-react";
import { Button } from "antd";
import Link from "next/link";

interface IProps {
  href?: string;
  handleEdit?: () => void;
}
const EditButton = ({ href, handleEdit }: IProps) => {
  if (!href) {
    return (
      <Button
        color="primary"
        shape="circle"
        icon={<IconPencil />}
        onClick={handleEdit}
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
