import { IScenario } from "@/lib/scenarios";

interface IScenarioHeaderProps {
  scenario: IScenario;
}

const BadgeMap: Record<IScenario["noSandbox"], string> = {
  works: "동작함",
  blocked: "차단됨",
  partial: "부분 동작",
};

export const ScenarioHeader = ({ scenario }: IScenarioHeaderProps) => {
  const surface = scenario.surface ?? "iframe";

  return (
    <>
      <h1>
        {scenario.title}
        <span className="embed-badge">EMBEDDED</span>
      </h1>
      <p className="summary">{scenario.summary}</p>

      {surface === "iframe" ? (
        <div className="card" data-only-standalone>
          <strong>sandbox 정책별 동작</strong>
          <table className="matrix">
            <thead>
              <tr>
                <th>정책</th>
                <th>예상 결과</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>sandbox 미부착</td>
                <td>
                  <span className={`badge ${scenario.noSandbox}`}>
                    {BadgeMap[scenario.noSandbox]}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <code>sandbox=&quot;allow-scripts&quot;</code>
                </td>
                <td>
                  <span className={`badge ${scenario.scriptsOnly}`}>
                    {BadgeMap[scenario.scriptsOnly]}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <code>sandbox=&quot;&quot;</code> (가장 엄격)
                </td>
                <td>
                  <span className={`badge ${scenario.fullSandbox}`}>
                    {BadgeMap[scenario.fullSandbox]}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          {scenario.sopBlocks && (
            <div className="callout">
              이 시나리오는 sandbox 와 별개로{" "}
              <strong>Same-Origin Policy 가 직접 차단</strong>합니다.
            </div>
          )}
        </div>
      ) : (
        <div className="card" data-only-standalone>
          <strong>
            {surface === "dom" ? "DOM sink 테스트" : "HTML payload 테스트"}
          </strong>
          <p style={{ color: "var(--text-dim)", margin: "6px 0 0" }}>
            이 시나리오는 iframe sandbox 가 아니라 사용자 입력이 HTML/DOM 으로
            렌더링되는 지점을 검증합니다.
          </p>
          {scenario.checks && (
            <ul style={{ marginBottom: 0 }}>
              {scenario.checks.map((check) => (
                <li key={check}>{check}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
};
