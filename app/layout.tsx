import type { Metadata } from "next";
import { Sidebar } from "./Sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "iframe XSS Playground",
  description:
    "DOMPurify sanitize 정책 검증용 iframe 공격 시나리오 모음. 본인 서비스 보안 PoC 목적으로만 사용.",
  robots: { index: false, follow: false },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <body>
        <div className="layout">
          <Sidebar />
          <main className="main">{children}</main>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
