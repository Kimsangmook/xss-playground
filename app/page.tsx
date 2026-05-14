import Link from "next/link";
import { SCENARIOS, CATEGORY_LABEL, IScenario } from "@/lib/scenarios";

const CATEGORIES: IScenario["category"][] = [
  "navigation",
  "communication",
  "phishing",
  "annoyance",
  "probe",
];

const HomePage = () => {
  return (
    <>
      <h1>iframe XSS Playground</h1>
      <p className="summary">
        DOMPurify sanitize 정책이 iframe 을 어디까지 허용하는지 검증하기 위한
        PoC 모음. 모든 페이지는 부모 사이트에서{" "}
        <code>&lt;iframe src=...&gt;</code> 로 임베드된 상황을 가정합니다.
      </p>

      <div className="callout danger">
        <strong>주의.</strong> 본인이 권한을 가진 서비스(예: 알렌 dev/staging)
        에 대해서만 임베드해서 테스트하세요. 타인의 서비스에 시도하면 부정접근
        에 해당할 수 있습니다.
      </div>

      <h2>시작하기</h2>
      <ol>
        <li>
          좌측에서 검증할 공격 시나리오 페이지를 선택합니다.
        </li>
        <li>
          페이지 상단에 나오는{" "}
          <code>&lt;iframe src=&quot;https://...&quot;&gt;&lt;/iframe&gt;</code>{" "}
          스니펫을 복사합니다.
        </li>
        <li>
          타깃 서비스(알렌 마이노트 에디터 등)에 그 스니펫을 붙여 넣고 저장,
          렌더링된 페이지에서 실제 동작을 확인합니다.
        </li>
        <li>
          <Link href="/embed-helper">부모 페이지 임베드 헬퍼</Link> 에서 sandbox
          정책을 바꿔가며 같은 시나리오의 차이를 비교할 수 있습니다.
        </li>
      </ol>

      <h2>시나리오 목록</h2>
      {CATEGORIES.map((cat) => {
        const items = SCENARIOS.filter((s) => s.category === cat);
        if (items.length === 0) return null;
        return (
          <div key={cat}>
            <h3 style={{ margin: "18px 0 8px", fontSize: 14 }}>
              {CATEGORY_LABEL[cat]}
            </h3>
            {items.map((s) => (
              <div key={s.slug} className="card">
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                  <div>
                    <Link href={`/scenarios/${s.slug}`}>
                      <strong>{s.title}</strong>
                    </Link>
                    <p style={{ margin: "6px 0 0", color: "var(--text-dim)" }}>
                      {s.summary}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </>
  );
};

export default HomePage;
