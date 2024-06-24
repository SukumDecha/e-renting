import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/styles/tailwinds/globals.css";
import "@/styles/scss/components/index.scss";
import { ConfigProvider } from "antd";
import theme from "@/styles/theme";
import ClientProviders from "@/features/shared/components/client-provider";
import ECTFloatButton from "@/features/shared/components/float-button";

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
              Layout: {
                bodyBg:
                  "linear-gradient(180deg, rgba(145,207,255,1) 0%, rgba(231,232,209,1) 80%, rgba(255,255,255,1) 100%)",
              },
            },
          }}
        >
          <ClientProviders>
            {children}
            <ECTFloatButton />
          </ClientProviders>
        </ConfigProvider>
      </body>
    </html>
  );
}
