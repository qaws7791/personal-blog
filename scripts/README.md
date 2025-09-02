# 블로그 자동화 스크립트

블로그 글 작성을 위한 다양한 자동화 스크립트들입니다.

## 메인 스크립트

### create-article.js - 대화형 아티클 생성 ⭐️

**가장 추천하는 방법**: 대화형 CLI를 통해 프론트메터 정보를 입력받아 완성된 아티클 폴더를 생성합니다.

```bash
node scripts/create-article.js
```

**대화형 입력 항목:**

- 아티클 슬러그 (예: `react-hooks`)
- 제목 (예: `"React Hooks 완벽 가이드"`)
- 설명 (한 줄 요약)
- 발행 날짜 (YYYY-MM-DD, 기본값: 오늘)
- 태그 (쉼표로 구분)
- 초안 여부 (y/N)

**생성되는 것들:**

- 자동 번호가 매겨진 아티클 디렉토리 (예: `023-react-hooks/`)
- 완성된 프론트메터가 포함된 `index.mdx` 파일
- `assets/` 폴더 (이미지용)

## 추가 스크립트

### 1. new-article.js - 간단한 글 생성

명령행 인수로 간단하게 새 글을 생성합니다.

```bash
# 사용법
node scripts/new-article.js <article-slug> [title]

# 예시
node scripts/new-article.js react-hooks "React Hooks 완벽 가이드"
