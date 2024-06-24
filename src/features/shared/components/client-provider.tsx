"use client";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import Layout, { Content } from "antd/es/layout/layout";
import { Suspense } from "react";
import { useSiderStore } from "@/features/shared/stores/SiderStore";
import { useShallow } from "zustand/react/shallow";
import Sidebar from "@/features/shared/components/sidebar";
import Loading from "@/features/shared/components/loading";
import NotificationHandler from "@/features/shared/components/notification";
import ECTFloatButton from "./float-button";

const queryClient = new QueryClient();

interface ClientProvidersProps {
  children: ReactNode;
}

const ClientProviders = ({ children }: ClientProvidersProps) => {
  const [collapsed] = useSiderStore(useShallow((state) => [state.collapsed]));

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <Layout hasSider>
          <Sidebar />

          <Suspense
            fallback={
              <>
                <Loading />
              </>
            }
          >
            <Content
              style={{
                padding: 24,
                marginLeft: !collapsed ? 220 : 100,
                overflow: "auto",
              }}
              className="container mx-auto"
            >
              {children}
            </Content>
            <ECTFloatButton />
            <NotificationHandler />
          </Suspense>
        </Layout>
      </SessionProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default ClientProviders;
