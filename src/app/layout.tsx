import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/styles/tailwinds/globals.css";
import "@/styles/scss/components/index.scss";
import { ConfigProvider } from "antd";
import { Header, Content } from "antd/es/layout/layout";
import Navbar from "@/features/components/shared/navbar";
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
            components: {
              Layout: {
                // #80e8c5
                // #91f0ff

                headerBg: "rgba(59, 130, 246, 1)",
              },
              Button: {
                defaultBg: "rgba(59, 130, 246, 1)",
                colorPrimary: "#91f0ff",
                algorithm: true, // Enable algorithm
              },
              Input: {
                colorPrimary: "#eb2f96",
                algorithm: true, // Enable algorithm
              },
            },
          }}
        >
          <Header>
            <Navbar />
          </Header>
          <Content className="container mx-auto">{children}</Content>
        </ConfigProvider>
      </body>
    </html>
  );
}
