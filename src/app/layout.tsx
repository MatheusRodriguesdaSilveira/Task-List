import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Task List App",
  description:
    "Um app para te ajudar a gerenciar suas tarefas diarias. Criado por Matheus Rodrigues",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="./public/favicon.ico" type="image/x-icon" />
      </Head>
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
