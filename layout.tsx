import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "语见 GEO｜Kimi 内容生产工作台",
  description: "面向 GEO 内容生产的知识库、风格模板与批量写作工作台。",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
