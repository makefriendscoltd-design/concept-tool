import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "컨셉 제작기 | 팔리는 컨셉을 만드는 가장 빠른 방법",
  description:
    "5가지 컨셉 유형으로 당신의 제품에 날개를 달아줄 셀링 컨셉을 윤대표 AI가 만들어드립니다. 기능, 판매자, 고객 정체성, 상황, 비즈니스 모델 컨셉을 지금 바로 제작하세요.",
  keywords: ["컨셉", "마케팅", "셀링 컨셉", "브랜딩", "컨셉 제작기", "윤대표 AI 마케팅"],
  openGraph: {
    title: "컨셉 제작기 | 팔리는 컨셉을 만드는 가장 빠른 방법",
    description: "5가지 컨셉 유형으로 윤대표 AI가 맞춤 셀링 컨셉을 제작해드립니다.",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
