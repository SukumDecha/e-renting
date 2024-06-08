import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/styles/tailwinds/globals.css";
import "@/styles/scss/components/index.scss";
import { ConfigProvider } from "antd";
import { Header, Content } from "antd/es/layout/layout";
import theme from "@/styles/theme";
import Navbar from "@/features/shared/components/shared/navbar";

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
              Layout: {
                headerBg: theme.background.primary,
              },
              Button: {
                defaultBg: theme.color.primary,
                colorPrimary: theme.color.hover,
                algorithm: true, // Enable algorithm
              },
              Input: {
                colorPrimary: theme.color.primary,
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
