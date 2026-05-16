"use client";

import dynamic from "next/dynamic";
import { html } from "@codemirror/lang-html";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { EditorView } from "@codemirror/view";
import type { Extension } from "@codemirror/state";
import type { CSSProperties } from "react";

/**
 * CodeMirror 6 의 react 바인딩은 내부적으로 ResizeObserver / DOM 측정에 의존하므로
 * Next.js SSR 단계에서 그대로 import 하면 hydration mismatch 가 난다.
 * dynamic import + ssr:false 로 client 에서만 마운트시킨다.
 */
const ReactCodeMirror = dynamic(() => import("@uiw/react-codemirror"), {
  ssr: false,
  loading: () => <div className="sim-code-editor-loading">…</div>,
});

export type CodeEditorLanguage = "html" | "javascript";

interface ICodeEditorProps {
  value: string;
  language: CodeEditorLanguage;
  onChange?: (next: string) => void;
  readOnly?: boolean;
  /**
   * 라인 wrap 켜기. payload/HTML 출력처럼 가로로 긴 라인이 자주 나오는 영역에 쓴다.
   */
  wrap?: boolean;
  /** 최소 높이를 강제. flex 컨테이너 안에서 자랄 때 0이 되지 않게. */
  minHeight?: string;
  /** 외곽 wrapper 에 적용할 inline style. flex 안에서 채우기 등에 사용. */
  style?: CSSProperties;
  className?: string;
  ariaLabel?: string;
}

const languageExtensions: Record<CodeEditorLanguage, () => Extension> = {
  html: () => html({ matchClosingTags: false, autoCloseTags: false }),
  javascript: () => javascript({ jsx: false, typescript: false }),
};

export const CodeEditor = ({
  value,
  language,
  onChange,
  readOnly = false,
  wrap = true,
  minHeight = "0",
  style,
  className,
  ariaLabel,
}: ICodeEditorProps) => {
  const extensions: Extension[] = [languageExtensions[language]()];
  if (wrap) extensions.push(EditorView.lineWrapping);

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flex: "1 1 auto",
        minHeight: 0,
        minWidth: 0,
        ...style,
      }}
    >
      <ReactCodeMirror
        value={value}
        height="100%"
        width="100%"
        minHeight={minHeight}
        theme={oneDark}
        readOnly={readOnly}
        editable={!readOnly}
        extensions={extensions}
        basicSetup={{
          lineNumbers: true,
          foldGutter: false,
          highlightActiveLine: !readOnly,
          highlightActiveLineGutter: !readOnly,
          autocompletion: false,
          searchKeymap: false,
        }}
        onChange={onChange}
        aria-label={ariaLabel}
        // react-codemirror 가 만드는 wrapper div(.cm-theme) 자체를 flex 컨테이너
        // 로 만들어, 부모 윈도우가 리사이즈될 때 .cm-editor 도 같이 늘어/줄어든다.
        style={{
          flex: "1 1 auto",
          minHeight: 0,
          minWidth: 0,
          display: "flex",
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};
