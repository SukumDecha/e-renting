import ProtectedRoute from "@/features/auth/guards/ProtectedRoute";
import React, { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}
const DashboardLayout = ({ children }: IProps) => {
  return <ProtectedRoute>{children}</ProtectedRoute>;
};

export default DashboardLayout;
