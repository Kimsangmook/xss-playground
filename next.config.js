/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // /embed/* 페이지는 사용자가 자기 서비스에 iframe 으로 붙여 넣어야 테스트가 가능하다.
  // frame-ancestors 를 열어 임베드 가능한 테스트 페이로드로 유지한다.
  async headers() {
    return [
      {
        source: "/embed/:path*",
        headers: [
          { key: "Content-Security-Policy", value: "frame-ancestors *;" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
