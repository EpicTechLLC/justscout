import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./components/Providers";
import Header from "./components/Header";
import { Card, Container } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Just Scout",
  description: "A simple way to share scouting information for FRC Teams",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          <Container sx={{ mt: 4 }}>{children}</Container>
        </Providers>
      </body>
    </html>
  );
}
