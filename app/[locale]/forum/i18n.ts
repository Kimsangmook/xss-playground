import type { Locale } from "@/i18n/types";

export interface IForumI18n {
  title: string;
  summary: string;
  actions: {
    newDiscussion: string;
    joinDiscussion: string;
    bestPractices: string;
    openIssues: string;
  };
  howTitle: string;
  how: string[];
  discussionsTitle: string;
  issues: {
    loading: string;
    error: string;
    empty: string;
    /**
     * 댓글 수 라벨 패턴. {count} 자리에 숫자가 치환된다.
     * App Router 의 Server → Client 경계는 함수를 직렬화하지 못하므로
     * 객체 + 템플릿 문자열로 단/복수만 분기한다.
     */
    comments: { one: string; other: string };
  };
  guidelinesTitle: string;
  guidelines: string[];
}

export const I18N: Record<Locale, IForumI18n> = {
  ko: {
    title: "XSS 방어 포럼",
    summary:
      "별도 DB와 에디터를 만들기 전까지 GitHub Issues 를 포럼처럼 사용합니다. XSS 대응 경험, sanitizer 정책, iframe embed allowlist, 실제 서비스의 best practice 를 함께 정리하는 공간입니다.",
    actions: {
      newDiscussion: "새 토론 열기",
      joinDiscussion: "토론 참여하기",
      bestPractices: "Best practice 보기",
      openIssues: "열린 이슈 보기",
    },
    howTitle: "운영 방식",
    how: [
      "GitHub Issue 하나를 포럼 글 하나처럼 사용합니다.",
      "재현 가능한 payload, 렌더링 위치, 기대한 방어 정책, 실제 브라우저 결과를 함께 적습니다.",
      "논의가 정리되면 best-practice 라벨을 붙이고 학습 노트 또는 새 시나리오로 옮깁니다.",
    ],
    discussionsTitle: "열린 토론",
    issues: {
      loading: "GitHub 에서 토론 목록을 불러오는 중...",
      error: "토론 목록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
      empty: "아직 열린 토론이 없습니다. 가장 먼저 새 토론을 시작해보세요.",
      comments: { one: "댓글 {count}개", other: "댓글 {count}개" },
    },
    guidelinesTitle: "좋은 토론 글의 기준",
    guidelines: [
      "권한 있는 서비스나 로컬 재현 환경 기준으로만 작성합니다.",
      "실제 토큰, 쿠키, 개인정보, 내부 URL 은 제거하고 구조만 공유합니다.",
      "공격 성공 여부보다 어떤 방어 정책이 통과/실패했는지를 중심으로 적습니다.",
      "해결책이 정리되면 테스트 가능한 payload 또는 시나리오로 환원합니다.",
    ],
  },
  en: {
    title: "XSS Defense Forum",
    summary:
      "Until this project has its own database and editor, GitHub Issues acts as the forum for XSS defense stories, sanitizer policies, iframe embed allowlists, and product best practices.",
    actions: {
      newDiscussion: "Start discussion",
      joinDiscussion: "Join discussion",
      bestPractices: "View best practices",
      openIssues: "Open issues",
    },
    howTitle: "How It Works",
    how: [
      "One GitHub Issue works like one forum post.",
      "Include reproducible payloads, render surfaces, expected policy, and actual browser behavior.",
      "When a thread converges, label it best-practice and turn it into a learning note or scenario.",
    ],
    discussionsTitle: "Open Discussions",
    issues: {
      loading: "Loading discussions from GitHub...",
      error: "Failed to load discussions. Please try again later.",
      empty: "No open discussions yet. Be the first to start one.",
      comments: { one: "1 comment", other: "{count} comments" },
    },
    guidelinesTitle: "Good Discussion Standards",
    guidelines: [
      "Write only about services you own, maintain, or are authorized to test.",
      "Remove real tokens, cookies, personal data, and internal URLs before sharing.",
      "Focus on which defense policies passed or failed, not only on whether the attack worked.",
      "Turn resolved discussions into testable payloads or scenarios.",
    ],
  },
  ja: {
    title: "XSS 防御フォーラム",
    summary:
      "独自 DB/editor を作るまで、GitHub Issues をフォーラムとして使い、XSS 防御経験、sanitizer policy、iframe allowlist、best practice を議論します。",
    actions: {
      newDiscussion: "新しい議論",
      joinDiscussion: "議論に参加",
      bestPractices: "Best practice",
      openIssues: "Open issues",
    },
    howTitle: "運用方法",
    how: [
      "GitHub Issue 1つを forum post 1つとして使います。",
      "payload、render surface、期待 policy、実際の browser 結果を書きます。",
      "整理された thread は best-practice label を付け、学習ノートや scenario に移します。",
    ],
    discussionsTitle: "Open Discussions",
    issues: {
      loading: "GitHub から議論を読み込み中...",
      error: "議論の読み込みに失敗しました。後ほど再度お試しください。",
      empty:
        "まだ open discussion はありません。最初の議論を始めてみてください。",
      comments: { one: "コメント {count}件", other: "コメント {count}件" },
    },
    guidelinesTitle: "投稿ルール",
    guidelines: [
      "自分が権限を持つ service / local 再現環境のみ扱います。",
      "token、cookie、個人情報、内部 URL は削除します。",
      "攻撃可否だけでなく、どの防御 policy が通過/失敗したかを書きます。",
      "結論は testable payload や scenario に戻します。",
    ],
  },
  zh: {
    title: "XSS 防护论坛",
    summary:
      "在项目拥有自己的数据库和编辑器之前，使用 GitHub Issues 作为论坛，讨论 XSS 防护经验、sanitizer 策略、iframe allowlist 与 best practice。",
    actions: {
      newDiscussion: "发起讨论",
      joinDiscussion: "参与讨论",
      bestPractices: "查看 best practice",
      openIssues: "开放 issues",
    },
    howTitle: "运作方式",
    how: [
      "一个 GitHub Issue 对应一个论坛帖子。",
      "写清可复现 payload、渲染 surface、期望策略和真实浏览器结果。",
      "讨论收敛后添加 best-practice 标签，并转成学习笔记或新场景。",
    ],
    discussionsTitle: "开放讨论",
    issues: {
      loading: "正在从 GitHub 加载讨论...",
      error: "加载讨论失败，请稍后重试。",
      empty: "暂无开放讨论。来发起第一个吧。",
      comments: { one: "{count} 条评论", other: "{count} 条评论" },
    },
    guidelinesTitle: "讨论规范",
    guidelines: [
      "仅讨论你拥有或被授权测试的服务。",
      "分享前移除真实 token、cookie、个人信息和内部 URL。",
      "重点记录哪些防护策略通过或失败，而不仅是攻击是否成功。",
      "将已解决讨论转化为可测试 payload 或场景。",
    ],
  },
};
