import type { Metadata } from "next";
import { createAppContext } from "@epictechllc/just-scout-components";
import LayoutWrapper from "./components/LayoutWrapper";
import Header from "./components/Header";
export const metadata: Metadata = {
  title: "Just Scout",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
