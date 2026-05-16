/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // /embed/* 페이지는 사용자가 자기 서비스에 iframe 으로 붙여 넣어야 테스트가 가능하다.
  // frame-ancestors 를 열어 임베드 가능한 테스트 페이로드로 유지한다.
  //
  // 주의: CSP frame-ancestors 는 `*` 만으로는 sandbox iframe 의 null origin 을
  // 매칭하지 못해, 시뮬레이션 보드의 sandbox(srcDoc) 내부에서 /embed/ 페이지를
  // 임베드할 때 차단된다. `'self'` 추가 + X-Frame-Options 제거(Next 기본도 X-FO 안 붙음)로
  // sandbox 안에서도 same-origin 으로 보이는 embed 임베드를 허용한다.
  async headers() {
    return [
      {
        source: "/embed/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' *;",
          },
        ],
      },
    ];
  },
  // 기존 /[locale]/embed-helper 경로를 시뮬레이터 신규 경로로 영구 redirect.
  // 외부 백링크와 검색엔진 인덱스에 남아있는 옛 URL 의 SEO 자산을 보존한다.
  async redirects() {
    return [
      {
        source: "/:locale(ko|en|ja|zh)/embed-helper",
        destination: "/:locale/simulator",
        permanent: true,
      },
      {
        // locale prefix 없이 들어온 경우도 처리 (middleware 가 locale 붙이기 전에 가로채지지 않음)
        source: "/embed-helper",
        destination: "/simulator",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
