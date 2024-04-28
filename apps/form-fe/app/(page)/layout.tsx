import './globals.css';
import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";

import { ThemeProvider } from "@repo/ui/lib";

const noto_kr = Noto_Sans_KR({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "form",
  description: "폼 과제",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="ko" >
      <body className={noto_kr.className}>
        {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange> */}
        {children}
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
