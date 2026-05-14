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
  return (
    <>
      <h1>{scenario.title}</h1>
      <p className="summary">{scenario.summary}</p>

      <div className="card">
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
    </>
  );
};
