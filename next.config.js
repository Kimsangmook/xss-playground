/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 일부러 X-Frame-Options 와 CSP frame-ancestors 를 풀어둔다.
  // 이 사이트의 페이지들이 알렌 같은 부모 페이지에서 iframe 으로 임베드 되어야 PoC 가 의미가 있기 때문.
  async headers() {
    return [
      {
        source: "/scenarios/:path*",
        headers: [
          { key: "X-Frame-Options", value: "ALLOWALL" },
          { key: "Content-Security-Policy", value: "frame-ancestors *;" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
