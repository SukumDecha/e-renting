import { useSession } from "next-auth/react";
import React from "react";

const RequestPage = () => {
  const { data: session, status } = useSession();
  const user = session?.user.id;
  return <div>Your request</div>;
};

export default RequestPage;
