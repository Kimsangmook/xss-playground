"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SCENARIOS, CATEGORY_LABEL, IScenario } from "@/lib/scenarios";

const CATEGORIES: IScenario["category"][] = [
  "navigation",
  "communication",
  "phishing",
  "annoyance",
  "probe",
];

export const Sidebar = () => {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <aside className="sidebar">
      <h1>iframe XSS Playground</h1>
      <p className="subtitle">알렌 sanitize PoC 용 임베드 시나리오 모음</p>

      <Link href="/" className={isActive("/") ? "active" : ""}>
        홈
      </Link>
      <Link
        href="/embed-helper"
        className={isActive("/embed-helper") ? "active" : ""}
      >
        부모 페이지 임베드 헬퍼
      </Link>

      {CATEGORIES.map((cat) => {
        const items = SCENARIOS.filter((s) => s.category === cat);
        if (items.length === 0) return null;
        return (
          <div key={cat}>
            <div className="group-label">{CATEGORY_LABEL[cat]}</div>
            {items.map((s) => {
              const href = `/scenarios/${s.slug}`;
              return (
                <Link
                  key={s.slug}
                  href={href}
                  className={isActive(href) ? "active" : ""}
                >
                  {s.title}
                </Link>
              );
            })}
          </div>
        );
      })}
    </aside>
  );
};
