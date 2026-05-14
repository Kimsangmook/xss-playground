"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SCENARIOS, CATEGORY_LABEL, ALL_CATEGORIES } from "@/lib/scenarios";

const CATEGORIES = ALL_CATEGORIES;

export const Sidebar = () => {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <aside className="sidebar">
      <h1>iframe XSS Playground</h1>
      <p className="subtitle">복사해서 테스트하는 임베드 XSS 시나리오</p>

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
