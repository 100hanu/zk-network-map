# ZK Prover 네트워크 생태계 맵

블록체인 파트너십 시각화 웹 플랫폼으로, Succinct ZK Prover 네트워크 생태계를 직관적으로 탐색할 수 있는 인터랙티브 웹사이트입니다.

## 기술 스택

- React.js + TypeScript 프론트엔드
- Express.js 백엔드
- PostgreSQL + Drizzle ORM
- 반응형 UI와 애니메이션
- 3D 파티클 시스템
- 다국어 지원 (한국어/영어)

## Vercel 배포 가이드

이 프로젝트를 Vercel에 배포하려면 다음 환경 변수를 설정해야 합니다:

- `DATABASE_URL`: PostgreSQL 데이터베이스 연결 문자열 (Neon, Supabase 등)
- `NODE_ENV`: `production`으로 설정

### 데이터베이스 설정

1. 배포 후 첫 시작 시, 다음 명령어로 스키마를 데이터베이스에 적용합니다:
   ```bash
   npm run db:push
   ```

2. 초기 데이터를 데이터베이스에 삽입하려면:
   ```bash
   npm run db:seed
   ```

## 개발 환경 설정

1. 저장소 클론:
   ```bash
   git clone <repository_url>
   cd zk-prover-ecosystem-map
   ```

2. 종속성 설치:
   ```bash
   npm install
   ```

3. 환경 변수 설정:
   `.env` 파일을 만들고 데이터베이스 연결 정보를 설정합니다.
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/zk_prover_db
   ```

4. 개발 서버 실행:
   ```bash
   npm run dev
   ```

## 주요 기능

- 3D 애니메이션 파티클 배경
- 인터랙티브 프로젝트 생태계 맵
- 프로젝트 상세 정보 뷰
- 다국어 지원 (한국어/영어)
- 기술 스택 정보 페이지

## 문의

- 문의 및 기여: [linktr.ee/KSW_CRYPTO](https://linktr.ee/KSW_CRYPTO)