#!/usr/bin/env node

import fs from "fs";
import path from "path";
import readline from "readline";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 대화형 CLI를 통한 블로그 아티클 생성 스크립트
 * 사용자가 프론트메터 정보를 입력하면 완성된 아티클 폴더를 생성합니다.
 */

export class ArticleCreator {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    this.articlesDir = path.join(__dirname, "..", "src", "content", "articles");
  }

  async prompt(question) {
    return new Promise((resolve) => {
      this.rl.question(question, resolve);
    });
  }

  async promptMultiple(question, hint = "") {
    const hintText = hint ? `\n${hint}` : "";
    const answer = await this.prompt(`${question}${hintText}\n> `);
    return answer
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }

  getNextArticleNumber() {
    if (!fs.existsSync(this.articlesDir)) {
      return 1;
    }

    const existingArticles = fs.readdirSync(this.articlesDir);
    const numberedArticles = existingArticles
      .filter((dir) => /^\d/.test(dir))
      .map((dir) => {
        const match = dir.match(/^(\d+)/);
        return match ? parseInt(match[1]) : 0;
      })
      .filter((num) => !isNaN(num));

    return numberedArticles.length > 0 ? Math.max(...numberedArticles) + 1 : 1;
  }

  validateSlug(slug) {
    // 영문, 숫자, 하이픈만 허용
    if (!/^[a-z0-9-]+$/.test(slug)) {
      return false;
    }
    // 하이픈으로 시작하거나 끝나면 안됨
    if (slug.startsWith("-") || slug.endsWith("-")) {
      return false;
    }
    // 연속된 하이픈 금지
    if (slug.includes("--")) {
      return false;
    }
    return true;
  }

  formatDate(dateString) {
    if (!dateString.trim()) {
      return new Date().toISOString().split("T")[0];
    }

    // YYYY-MM-DD 형식 검증
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return dateString;
    }

    // YYYY.MM.DD 또는 YYYY/MM/DD 형식을 YYYY-MM-DD로 변환
    if (/^\d{4}[./]\d{1,2}[./]\d{1,2}$/.test(dateString)) {
      return dateString
        .replace(/[./]/g, "-")
        .split("-")
        .map((part, index) => (index > 0 ? part.padStart(2, "0") : part))
        .join("-");
    }

    console.log("⚠️  잘못된 날짜 형식입니다. 오늘 날짜를 사용합니다.");
    return new Date().toISOString().split("T")[0];
  }

  async collectArticleInfo() {
    console.log("📝 새로운 블로그 아티클을 생성합니다.\n");

    // 슬러그 입력
    let slug;
    while (true) {
      slug = await this.prompt(
        "아티클 슬러그를 입력하세요 (예: react-hooks, typescript-tips): ",
      );
      if (!slug.trim()) {
        console.log("❌ 슬러그는 필수입니다.");
        continue;
      }
      if (!this.validateSlug(slug)) {
        console.log(
          "❌ 슬러그는 영문 소문자, 숫자, 하이픈(-)만 사용 가능합니다.",
        );
        console.log("   예: react-hooks, typescript-tips, css-grid-guide");
        continue;
      }
      break;
    }

    // 제목 입력
    let title;
    while (true) {
      title = await this.prompt("아티클 제목을 입력하세요: ");
      if (!title.trim()) {
        console.log("❌ 제목은 필수입니다.");
        continue;
      }
      break;
    }

    // 설명 입력
    let description;
    while (true) {
      description = await this.prompt(
        "아티클 설명을 입력하세요 (한 줄 요약): ",
      );
      if (!description.trim()) {
        console.log("❌ 설명은 필수입니다.");
        continue;
      }
      break;
    }

    // 날짜 입력
    const dateInput = await this.prompt(
      "발행 날짜를 입력하세요 (YYYY-MM-DD, 비워두면 오늘): ",
    );
    const date = this.formatDate(dateInput);

    // 태그 입력
    const tags = await this.promptMultiple(
      "태그를 입력하세요 (쉼표로 구분)",
      "예: react, hooks, javascript",
    );

    // 초안 여부
    const draftInput = await this.prompt("초안으로 저장하시겠습니까? (y/N): ");
    const draft =
      draftInput.toLowerCase() === "y" || draftInput.toLowerCase() === "yes";

    return {
      slug,
      title,
      description,
      date,
      tags,
      draft,
    };
  }

  createArticleFiles(info) {
    const nextNumber = this.getNextArticleNumber();
    const paddedNumber = nextNumber.toString().padStart(3, "0");
    const articleSlug = `${paddedNumber}-${info.slug}`;

    const articleDir = path.join(this.articlesDir, articleSlug);
    const assetsDir = path.join(articleDir, "assets");

    // 디렉토리가 이미 존재하는지 확인
    if (fs.existsSync(articleDir)) {
      throw new Error(`❌ 아티클 디렉토리가 이미 존재합니다: ${articleSlug}`);
    }

    // 디렉토리 생성
    fs.mkdirSync(articleDir, { recursive: true });
    fs.mkdirSync(assetsDir, { recursive: true });

    // 태그 배열을 문자열로 변환
    const tagsString =
      info.tags.length > 0 ? `["${info.tags.join('", "')}"]` : "[]";

    // MDX 템플릿 생성
    const mdxContent = `---
title: "${info.title}"
description: "${info.description}"
date: "${info.date}"
tags: ${tagsString}
draft: ${info.draft}
---

# 제목
`;

    const indexPath = path.join(articleDir, "index.mdx");
    fs.writeFileSync(indexPath, mdxContent);

    return {
      articleSlug,
      articleDir,
      indexPath,
    };
  }

  async run() {
    try {
      const articleInfo = await this.collectArticleInfo();

      console.log("\n📋 입력된 정보:");
      console.log(`제목: ${articleInfo.title}`);
      console.log(`설명: ${articleInfo.description}`);
      console.log(`날짜: ${articleInfo.date}`);
      console.log(`태그: [${articleInfo.tags.join(", ")}]`);
      console.log(`초안: ${articleInfo.draft ? "예" : "아니오"}`);

      const confirm = await this.prompt(
        "\n✅ 위 정보로 아티클을 생성하시겠습니까? (Y/n): ",
      );

      if (confirm.toLowerCase() === "n" || confirm.toLowerCase() === "no") {
        console.log("❌ 아티클 생성이 취소되었습니다.");
        this.rl.close();
        return;
      }

      const result = this.createArticleFiles(articleInfo);

      console.log("\n🎉 아티클이 성공적으로 생성되었습니다!");
      console.log(`📁 디렉토리: ${result.articleSlug}`);
      console.log(`📄 파일: ${result.indexPath}`);
      console.log(`🖼️  이미지: ${path.join(result.articleDir, "assets")}`);
      console.log("\n다음 단계:");
      console.log("1. index.mdx 파일을 편집하여 글을 작성하세요");
      console.log("2. 필요한 이미지를 assets/ 폴더에 추가하세요");
      console.log("3. 완료되면 frontmatter에서 draft: false로 변경하세요");
    } catch (error) {
      console.error("❌ 오류:", error.message);
    } finally {
      this.rl.close();
    }
  }
}

// CLI 실행
const creator = new ArticleCreator();
creator.run();
