import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/styles/tailwinds/globals.css";
import "@/styles/scss/components/index.scss";
import { ConfigProvider, Layout } from "antd";
import theme from "@/styles/theme";
import ClientProviders from "@/features/shared/components/client-provider";
import Sidebar from "@/features/shared/components/sidebar";
import { Content } from "antd/es/layout/layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ECT Renting Webapp",
  description: "Borrow items in ECT major here!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <ConfigProvider
          theme={{
            hashed: false,
            components: {
              Input: {
                colorPrimary: theme.color.primary,
              },
            },
          }}
        >
          <ClientProviders>
            <Layout>
              <Sidebar />

              <Content className="container mx-auto relative p-4 ">
                {children}
              </Content>
            </Layout>
          </ClientProviders>
        </ConfigProvider>
      </body>
    </html>
  );
}
