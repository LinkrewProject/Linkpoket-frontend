# Linkrew

## 링크

- **배포 URL**: https://linkrew.com/
- **Organization**: https://github.com/LinkrewProject

**소개**

- Linkrew는 흩어진 링크를 폴더별로 정리하고, 팀원들과 공유할 수 있는 웹 서비스입니다.

**주요 기능과 목적**

- 흩어진 링크를 폴더별로 정리하고 체계적으로 관리할 수 있습니다.
- 개인 페이지와 공유 페이지를 통해 팀원들과 링크를 공유하고 협업할 수 있습니다.
- 북마크 기능으로 중요한 링크를 빠르게 접근할 수 있습니다.
- 실시간 알림을 통해 페이지 공유 요청 및 변경사항을 즉시 확인할 수 있습니다.

## 기술 스택

- React 19
- TypeScript
- Vite
- TailwindCSS
- Zustand (전역 상태 관리)
- TanStack Query (서버 상태 관리)
- Axios (HTTP 클라이언트)

## 주요 구현 사항

**[성능 최적화]**

- React lazy/Suspense를 활용한 코드 분할 (초기 번들 21.5% 감소)
- TanStack Query 캐싱 전략으로 API 요청 65% 감소
- SSE 기반 실시간 알림으로 폴링 대비 API 요청 99% 감소

**[상태 관리]**

- Zustand로 8개 도메인별 전역 상태 관리
- Redux 대비 70% 적은 코드량, 번들 크기 91% 감소

**[인증 및 보안]**

- 구글 OAuth 2.0 소셜 로그인
- JWT 기반 인증 (AccessToken + RefreshToken)
- HttpOnly Cookie와 LocalStorage 하이브리드 보안 전략

**[사용자 경험]**

- Drag & Drop으로 폴더/링크 순서 변경
- Optimistic UI로 빠른 응답성 제공
- Skeleton UI로 자연스러운 로딩 경험
