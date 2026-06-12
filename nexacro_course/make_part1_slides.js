const pptxgen = require("pptxgenjs");

const NAVY = "1E2761";
const ICE = "CADCFC";
const WHITE = "FFFFFF";
const DARKTXT = "1A1A2E";
const MUTED = "6B7280";
const ACCENT = "3D5AF1";
const CODE_BG = "16213E";
const LIGHT = "F0F4FB";

const KR = "Malgun Gothic";
const MONO = "Consolas";

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9"; // 10 x 5.625
pres.author = "Nexacro 강의";
pres.title = "넥사크로 1부 — 시작하기 (1~4차시)";

// ───────────────────────── helpers ─────────────────────────
function titleBar(slide, kicker, title) {
  slide.background = { color: WHITE };
  slide.addText(kicker, {
    x: 0.5, y: 0.28, w: 9, h: 0.3, margin: 0,
    fontFace: KR, fontSize: 12, bold: true, color: ACCENT, charSpacing: 2,
  });
  slide.addText(title, {
    x: 0.5, y: 0.55, w: 9, h: 0.62, margin: 0,
    fontFace: KR, fontSize: 27, bold: true, color: DARKTXT,
  });
}

function divider(num, title, items) {
  const slide = pres.addSlide();
  slide.background = { color: NAVY };
  slide.addText(num, {
    x: 0.55, y: 1.15, w: 3.4, h: 1.6, margin: 0,
    fontFace: KR, fontSize: 88, bold: true, color: ACCENT, align: "left",
  });
  slide.addText("차시", {
    x: 0.62, y: 2.72, w: 2, h: 0.4, margin: 0,
    fontFace: KR, fontSize: 16, color: ICE, charSpacing: 4,
  });
  slide.addText(title, {
    x: 3.6, y: 1.25, w: 6.0, h: 0.9, margin: 0,
    fontFace: KR, fontSize: 32, bold: true, color: WHITE, valign: "bottom",
  });
  slide.addText(
    items.map((t, i) => ({
      text: t,
      options: { bullet: { code: "2014" }, color: ICE, breakLine: i < items.length - 1 },
    })),
    { x: 3.65, y: 2.35, w: 5.8, h: 2.4, margin: 0, fontFace: KR, fontSize: 15, paraSpaceAfter: 10, valign: "top" }
  );
  return slide;
}

function codeBlock(slide, x, y, w, h, lines, fontSize = 11.5) {
  slide.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: CODE_BG } });
  slide.addText(
    lines.map((l, i) => ({
      text: l.t,
      options: { color: l.c || "D6E4FF", breakLine: i < lines.length - 1 },
    })),
    { x: x + 0.15, y, w: w - 0.3, h, fontFace: MONO, fontSize, valign: "middle", margin: 0 }
  );
}

function card(slide, x, y, w, h, head, body, headColor = NAVY) {
  slide.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: LIGHT } });
  slide.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.07, h, fill: { color: headColor } });
  slide.addText(head, {
    x: x + 0.2, y: y + 0.12, w: w - 0.35, h: 0.35, margin: 0,
    fontFace: KR, fontSize: 14, bold: true, color: DARKTXT,
  });
  slide.addText(body, {
    x: x + 0.2, y: y + 0.5, w: w - 0.35, h: h - 0.62, margin: 0,
    fontFace: KR, fontSize: 11.5, color: "374151", valign: "top",
  });
}

function flowBox(slide, x, y, w, h, text, opts = {}) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: opts.fill || NAVY },
    line: opts.line ? { color: opts.line, width: 1 } : { color: opts.fill || NAVY },
  });
  slide.addText(text, {
    x, y, w, h, margin: 0.04,
    fontFace: KR, fontSize: opts.fontSize || 12.5, bold: opts.bold !== false,
    color: opts.color || WHITE, align: "center", valign: "middle",
  });
}

function arrow(slide, x, y, w = 0.34) {
  slide.addText("→", {
    x, y: y - 0.1, w, h: 0.4, margin: 0,
    fontFace: KR, fontSize: 18, bold: true, color: MUTED, align: "center", valign: "middle",
  });
}

// ───────────────────────── 1. 표지 ─────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: NAVY };
  s.addText("NEXACRO PLATFORM 입문 과정", {
    x: 0.7, y: 1.15, w: 8.6, h: 0.4, margin: 0,
    fontFace: KR, fontSize: 15, bold: true, color: ACCENT, charSpacing: 3,
  });
  s.addText("1부 — 넥사크로 시작하기", {
    x: 0.7, y: 1.65, w: 8.6, h: 1.0, margin: 0,
    fontFace: KR, fontSize: 40, bold: true, color: WHITE,
  });
  s.addText("플랫폼 이해 · 개발 환경 구축 · 프로젝트 구조 · 스크립트 기초  (1~4차시)", {
    x: 0.7, y: 2.75, w: 8.6, h: 0.5, margin: 0,
    fontFace: KR, fontSize: 16, color: ICE,
  });
  s.addShape(pres.shapes.LINE, { x: 0.72, y: 3.55, w: 2.2, h: 0, line: { color: ACCENT, width: 3 } });
  s.addText("Nexacro N  ·  TOBESOFT", {
    x: 0.7, y: 4.65, w: 8.6, h: 0.35, margin: 0,
    fontFace: KR, fontSize: 12, color: "8FA8D9",
  });
}

// ───────────────────────── 2. 1부 로드맵 ─────────────────────────
{
  const s = pres.addSlide();
  titleBar(s, "PART 1 ROADMAP", "1부에서 배우는 것");
  const items = [
    ["1", "플랫폼 이해", "UI 플랫폼의 개념과 넥사크로의 위치, 아키텍처(웹/네이티브 런타임)를 이해합니다.", "이론"],
    ["2", "개발 환경 구축", "Nexacro Studio 설치, 화면 구성 파악, 첫 프로젝트 생성과 QuickView 실행.", "실습: Hello Nexacro"],
    ["3", "프로젝트 구조", "ADL → FrameSet → Form 구조, TypeDefinition · 환경변수 · 테마의 역할.", "실습: 메뉴+작업영역"],
    ["4", "스크립트 기초", "JavaScript 기반 스크립트, 이벤트 모델, 컴포넌트 접근과 스코프.", "실습: 입력값 검증"],
  ];
  const w = 2.1, gap = 0.2, y = 1.5, h = 3.3;
  items.forEach(([n, t, d, lab], i) => {
    const x = 0.5 + i * (w + gap);
    s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: LIGHT } });
    s.addShape(pres.shapes.OVAL, { x: x + 0.18, y: y + 0.2, w: 0.52, h: 0.52, fill: { color: NAVY } });
    s.addText(n, { x: x + 0.18, y: y + 0.2, w: 0.52, h: 0.52, margin: 0, fontFace: KR, fontSize: 20, bold: true, color: WHITE, align: "center", valign: "middle" });
    s.addText(t, { x: x + 0.18, y: y + 0.88, w: w - 0.36, h: 0.4, margin: 0, fontFace: KR, fontSize: 15, bold: true, color: DARKTXT });
    s.addText(d, { x: x + 0.18, y: y + 1.32, w: w - 0.36, h: 1.35, margin: 0, fontFace: KR, fontSize: 11, color: "374151", valign: "top" });
    s.addText(lab, { x: x + 0.18, y: y + h - 0.5, w: w - 0.36, h: 0.32, margin: 0, fontFace: KR, fontSize: 10.5, bold: true, color: ACCENT });
  });
  s.addText("목표: 1부가 끝나면 — 넥사크로 프로젝트를 만들고, 화면을 띄우고, 버튼 이벤트에 코드를 작성할 수 있다", {
    x: 0.5, y: 5.05, w: 9, h: 0.35, margin: 0, fontFace: KR, fontSize: 12, italic: true, color: MUTED,
  });
}

// ───────────────────────── 1차시 ─────────────────────────
divider("01", "넥사크로 플랫폼 이해", [
  "UI 플랫폼이란 무엇인가",
  "X-Internet → RIA → HTML5, 기술의 흐름",
  "Nexacro 17 vs Nexacro N, 그리고 OSMU",
  "아키텍처: 웹 런타임과 네이티브 런타임",
]);

// 4. UI 플랫폼이란
{
  const s = pres.addSlide();
  titleBar(s, "1차시 — 플랫폼 이해", "UI 플랫폼이란? 왜 넥사크로인가?");
  s.addText([
    { text: "UI 플랫폼 = 기업 업무시스템의 화면(UI)을 ", options: {} },
    { text: "표준화된 방식으로 빠르게", options: { bold: true, color: ACCENT } },
    { text: " 만들고 배포하는 개발 플랫폼", options: {} },
  ], { x: 0.5, y: 1.35, w: 9, h: 0.45, margin: 0, fontFace: KR, fontSize: 15, color: DARKTXT });

  s.addText([
    { text: "일반 웹 개발과 무엇이 다른가", options: { bold: true, fontSize: 14, color: DARKTXT, breakLine: true } },
    { text: "HTML/CSS/JS를 직접 다루는 대신, 완성된 컴포넌트(Grid, 입력폼 등)를 조립", options: { bullet: { code: "2022" }, breakLine: true } },
    { text: "수백 개 화면을 똑같은 패턴으로 찍어내야 하는 SI 환경에 최적화", options: { bullet: { code: "2022" }, breakLine: true } },
    { text: "데이터 처리(Dataset)와 서버 통신이 플랫폼에 내장", options: { bullet: { code: "2022" }, breakLine: true } },
    { text: "국내 공공·금융·대기업 업무시스템에서 표준처럼 사용", options: { bullet: { code: "2022" } } },
  ], { x: 0.5, y: 2.0, w: 5.1, h: 2.9, margin: 0, fontFace: KR, fontSize: 12.5, color: "374151", paraSpaceAfter: 8, valign: "top" });

  card(s, 5.9, 1.95, 3.6, 0.92, "높은 생산성", "검증된 컴포넌트 + 통합개발도구(Studio)로 화면 개발 속도 단축");
  card(s, 5.9, 3.07, 3.6, 0.92, "One Source Multi Use", "한 번 개발한 소스를 PC·모바일 등 다양한 환경에 배포");
  card(s, 5.9, 4.19, 3.6, 0.92, "기업 환경 특화", "대용량 Grid, 권한, 업데이트 관리 등 업무시스템 요구사항 내장");
}

// 5. 기술 흐름
{
  const s = pres.addSlide();
  titleBar(s, "1차시 — 플랫폼 이해", "기술의 흐름 — 넥사크로가 등장하기까지");
  const stages = [
    ["2000년대 초", "X-Internet", "마이플랫폼(MiPlatform)\n브라우저 한계를 전용 런타임으로 극복", LIGHT, DARKTXT],
    ["2000년대 후반", "RIA 시대", "XPLATFORM\nFlex·Silverlight와 경쟁하던 풍부한 UI", LIGHT, DARKTXT],
    ["2014~", "HTML5 전환", "넥사크로플랫폼 14/17\n플러그인 없이 브라우저 표준 기술로 실행", LIGHT, DARKTXT],
    ["현재", "Nexacro N", "Low-Code(블록 조합)와\n초연결 환경 지원으로 진화", NAVY, WHITE],
  ];
  const w = 2.1, gap = 0.2, y = 1.75, h = 2.5;
  stages.forEach(([era, name, desc, fill, txt], i) => {
    const x = 0.5 + i * (w + gap);
    s.addText(era, { x, y: y - 0.4, w, h: 0.3, margin: 0, fontFace: KR, fontSize: 11, bold: true, color: ACCENT, align: "center" });
    s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: fill } });
    s.addText(name, { x: x + 0.15, y: y + 0.18, w: w - 0.3, h: 0.42, margin: 0, fontFace: KR, fontSize: 16, bold: true, color: txt });
    s.addText(desc, { x: x + 0.15, y: y + 0.68, w: w - 0.3, h: h - 0.85, margin: 0, fontFace: KR, fontSize: 11, color: txt === WHITE ? ICE : "374151", valign: "top" });
    if (i < 3) arrow(s, x + w - 0.06, y + h / 2, 0.34);
  });
  s.addText("핵심: “설치형 전용 런타임”에서 “웹 표준(HTML5) 실행”으로 — 소스 자산은 유지하며 진화", {
    x: 0.5, y: 4.75, w: 9, h: 0.4, margin: 0, fontFace: KR, fontSize: 13, italic: true, color: MUTED, align: "center",
  });
}

// 6. Nexacro 17 vs N
{
  const s = pres.addSlide();
  titleBar(s, "1차시 — 플랫폼 이해", "Nexacro 17 vs Nexacro N");
  // 왼쪽 17
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.5, w: 4.4, h: 3.0, fill: { color: LIGHT } });
  s.addText("Nexacro 17", { x: 0.75, y: 1.68, w: 3.9, h: 0.45, margin: 0, fontFace: KR, fontSize: 18, bold: true, color: DARKTXT });
  s.addText([
    { text: "현장에서 가장 널리 쓰이는 버전", options: { bullet: { code: "2022" }, breakLine: true } },
    { text: "XFDL 폼 + JavaScript 스크립트 개발", options: { bullet: { code: "2022" }, breakLine: true } },
    { text: "유지보수 프로젝트에서 자주 만나게 됨", options: { bullet: { code: "2022" } } },
  ], { x: 0.75, y: 2.25, w: 3.95, h: 2.0, margin: 0, fontFace: KR, fontSize: 12, color: "374151", paraSpaceAfter: 8, valign: "top" });
  // 오른쪽 N
  s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 1.5, w: 4.4, h: 3.0, fill: { color: NAVY } });
  s.addText("Nexacro N  (최신)", { x: 5.35, y: 1.68, w: 3.9, h: 0.45, margin: 0, fontFace: KR, fontSize: 18, bold: true, color: WHITE });
  s.addText([
    { text: "Model · View · Controller 블록 조합의 Low-Code 개발 (QuickCode)", options: { bullet: { code: "2022" }, breakLine: true } },
    { text: "Module Developer로 커스텀 모듈 제작·배포", options: { bullet: { code: "2022" }, breakLine: true } },
    { text: "Nexacro 17과 높은 호환성 유지", options: { bullet: { code: "2022" } } },
  ], { x: 5.35, y: 2.25, w: 3.95, h: 2.0, margin: 0, fontFace: KR, fontSize: 12, color: ICE, paraSpaceAfter: 8, valign: "top" });

  s.addText([
    { text: "이 과정의 전략 — ", options: { bold: true, color: DARKTXT } },
    { text: "두 버전에 공통인 기본기(폼·Dataset·바인딩·통신)를 먼저 익힌다. Low-Code는 기본기 위에서만 힘을 발휘한다.", options: { color: "374151" } },
  ], { x: 0.5, y: 4.75, w: 9, h: 0.55, margin: 0, fontFace: KR, fontSize: 13 });
}

// 7. 아키텍처
{
  const s = pres.addSlide();
  titleBar(s, "1차시 — 플랫폼 이해", "아키텍처 — 소스가 실행되기까지");
  // 흐름: 소스 → Generate → 변환 결과 → 두 갈래 런타임
  flowBox(s, 0.5, 2.3, 1.9, 1.0, "소스 코드\n.xfdl  .xjs  .xadl", { fill: LIGHT, color: DARKTXT });
  arrow(s, 2.44, 2.8);
  flowBox(s, 2.82, 2.3, 1.7, 1.0, "Generate\n(Nexacro Studio)", { fill: ACCENT });
  arrow(s, 4.56, 2.8);
  flowBox(s, 4.94, 2.3, 1.9, 1.0, "JavaScript 변환\n+ index.html", { fill: LIGHT, color: DARKTXT });
  // 두 갈래
  flowBox(s, 7.45, 1.7, 2.05, 0.95, "웹 런타임\n브라우저에서 바로 실행\n(설치 불필요)", { fill: NAVY, fontSize: 11.5 });
  flowBox(s, 7.45, 2.95, 2.05, 0.95, "네이티브 런타임(NRE)\n전용 실행기 설치형\n(기존 X-Internet 방식)", { fill: NAVY, fontSize: 11.5 });
  s.addText("→", { x: 6.88, y: 1.95, w: 0.5, h: 0.4, margin: 0, fontFace: KR, fontSize: 18, bold: true, color: MUTED, align: "center" });
  s.addText("→", { x: 6.88, y: 3.2, w: 0.5, h: 0.4, margin: 0, fontFace: KR, fontSize: 18, bold: true, color: MUTED, align: "center" });

  s.addText([
    { text: "기억할 것  ", options: { bold: true, color: ACCENT } },
    { text: "① 우리가 짜는 소스는 XML(.xfdl)과 JavaScript  ② 실행 전 반드시 Generate(변환) 과정을 거친다  ③ 같은 소스가 웹/네이티브 어디서든 동작 (OSMU)", options: { color: "374151" } },
  ], { x: 0.5, y: 4.6, w: 9, h: 0.7, margin: 0, fontFace: KR, fontSize: 12.5 });
}

// ───────────────────────── 2차시 ─────────────────────────
divider("02", "개발 환경 구축", [
  "Nexacro Studio 설치와 라이선스",
  "Studio 화면 구성 한눈에 보기",
  "첫 프로젝트 생성",
  "실습 — Hello Nexacro (F6 QuickView)",
]);

// 9. 설치 단계
{
  const s = pres.addSlide();
  titleBar(s, "2차시 — 개발 환경 구축", "Nexacro Studio 설치");
  const steps = [
    ["STEP 1", "다운로드", "tobesoft.com/product\n→ 체험판 다운로드\n(회원가입 필요)"],
    ["STEP 2", "설치 실행", "설치 마법사 진행\n기본 경로 유지 권장"],
    ["STEP 3", "라이선스 등록", "발급받은 체험판 키 입력\n(교육용 라이선스는\n강사 안내에 따름)"],
    ["STEP 4", "실행 확인", "시작 페이지 확인\nHelp > Manual로\n공식 문서 접근 가능"],
  ];
  const w = 2.1, gap = 0.2, y = 1.6, h = 2.3;
  steps.forEach(([st, t, d], i) => {
    const x = 0.5 + i * (w + gap);
    s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: LIGHT } });
    s.addText(st, { x: x + 0.16, y: y + 0.14, w: w - 0.32, h: 0.3, margin: 0, fontFace: KR, fontSize: 11, bold: true, color: ACCENT, charSpacing: 1 });
    s.addText(t, { x: x + 0.16, y: y + 0.45, w: w - 0.32, h: 0.4, margin: 0, fontFace: KR, fontSize: 15.5, bold: true, color: DARKTXT });
    s.addText(d, { x: x + 0.16, y: y + 0.92, w: w - 0.32, h: h - 1.05, margin: 0, fontFace: KR, fontSize: 11, color: "374151", valign: "top" });
    if (i < 3) arrow(s, x + w - 0.05, y + h / 2, 0.31);
  });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.25, w: 9.0, h: 0.85, fill: { color: "FFF4E5" } });
  s.addText([
    { text: "체크  ", options: { bold: true, color: "B45309" } },
    { text: "Nexacro Studio는 Windows 전용 (Win10 이상, 메모리 8GB 권장) · 설치 후 [File > New > Project]가 열리면 성공 · 방화벽 환경에서는 라이선스 인증 포트 확인", options: { color: "78350F" } },
  ], { x: 0.7, y: 4.25, w: 8.6, h: 0.85, margin: 0, fontFace: KR, fontSize: 12, valign: "middle" });
}

// 10. Studio 화면 구성
{
  const s = pres.addSlide();
  titleBar(s, "2차시 — 개발 환경 구축", "Nexacro Studio 화면 구성");
  // IDE 미니어처 다이어그램
  const X = 0.5, Y = 1.55, W = 5.4, H = 3.5;
  s.addShape(pres.shapes.RECTANGLE, { x: X, y: Y, w: W, h: H, fill: { color: "E8EDF7" }, line: { color: NAVY, width: 1.5 } });
  // 메뉴/툴바
  s.addShape(pres.shapes.RECTANGLE, { x: X, y: Y, w: W, h: 0.35, fill: { color: NAVY } });
  s.addText("메뉴 · 툴바", { x: X, y: Y, w: W, h: 0.35, margin: 0, fontFace: KR, fontSize: 10, color: WHITE, align: "center", valign: "middle" });
  // 좌측 탐색기
  s.addShape(pres.shapes.RECTANGLE, { x: X + 0.12, y: Y + 0.47, w: 1.15, h: 2.9, fill: { color: WHITE }, line: { color: ACCENT, width: 1 } });
  s.addText("① 프로젝트\n탐색기", { x: X + 0.12, y: Y + 0.47, w: 1.15, h: 2.9, margin: 0, fontFace: KR, fontSize: 10.5, bold: true, color: DARKTXT, align: "center", valign: "middle" });
  // 중앙 디자인뷰
  s.addShape(pres.shapes.RECTANGLE, { x: X + 1.39, y: Y + 0.47, w: 2.6, h: 2.0, fill: { color: WHITE }, line: { color: ACCENT, width: 1 } });
  s.addText("② 디자인 / 소스 뷰\n(폼 편집 영역)", { x: X + 1.39, y: Y + 0.47, w: 2.6, h: 2.0, margin: 0, fontFace: KR, fontSize: 11, bold: true, color: DARKTXT, align: "center", valign: "middle" });
  // 하단 출력창
  s.addShape(pres.shapes.RECTANGLE, { x: X + 1.39, y: Y + 2.57, w: 2.6, h: 0.8, fill: { color: WHITE }, line: { color: ACCENT, width: 1 } });
  s.addText("④ 출력창 (Output)", { x: X + 1.39, y: Y + 2.57, w: 2.6, h: 0.8, margin: 0, fontFace: KR, fontSize: 10.5, bold: true, color: DARKTXT, align: "center", valign: "middle" });
  // 우측 속성창
  s.addShape(pres.shapes.RECTANGLE, { x: X + 4.11, y: Y + 0.47, w: 1.15, h: 2.9, fill: { color: WHITE }, line: { color: ACCENT, width: 1 } });
  s.addText("③ 속성창\n(Properties)", { x: X + 4.11, y: Y + 0.47, w: 1.15, h: 2.9, margin: 0, fontFace: KR, fontSize: 10.5, bold: true, color: DARKTXT, align: "center", valign: "middle" });

  // 우측 설명
  const desc = [
    ["① 프로젝트 탐색기", "폼·스크립트·이미지 등 프로젝트 자원 트리. 더블클릭으로 열기"],
    ["② 디자인/소스 뷰", "컴포넌트를 끌어다 놓는 캔버스. 탭으로 Design ↔ Source(XML) 전환"],
    ["③ 속성창", "선택한 컴포넌트의 속성·이벤트 목록. 이벤트 더블클릭 → 핸들러 자동 생성"],
    ["④ 출력창", "trace() 로그, 컴파일 오류 표시. 디버깅의 시작점"],
  ];
  let dy = 1.55;
  desc.forEach(([h, b]) => {
    s.addText(h, { x: 6.2, y: dy, w: 3.3, h: 0.3, margin: 0, fontFace: KR, fontSize: 13, bold: true, color: NAVY });
    s.addText(b, { x: 6.2, y: dy + 0.3, w: 3.3, h: 0.52, margin: 0, fontFace: KR, fontSize: 11, color: "374151", valign: "top" });
    dy += 0.9;
  });
}

// 11. 실습: Hello Nexacro
{
  const s = pres.addSlide();
  titleBar(s, "2차시 — 실습", "실습 ① Hello Nexacro");
  s.addText([
    { text: "1.  File > New > Project로 프로젝트 생성", options: { breakLine: true } },
    { text: "2.  Base 폴더에 새 Form 추가 (Hello.xfdl)", options: { breakLine: true } },
    { text: "3.  Button, Static을 캔버스에 배치", options: { breakLine: true } },
    { text: "4.  버튼 속성창 → onclick 더블클릭 → 핸들러 생성", options: { breakLine: true } },
    { text: "5.  코드 작성 후 F6 (QuickView) 실행", options: {} },
  ], { x: 0.5, y: 1.55, w: 4.3, h: 2.4, margin: 0, fontFace: KR, fontSize: 13, color: "374151", paraSpaceAfter: 10, valign: "top" });

  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.15, w: 4.3, h: 1.0, fill: { color: LIGHT } });
  s.addText([
    { text: "관찰 포인트  ", options: { bold: true, color: ACCENT } },
    { text: "Source 탭을 열어 방금 만든 화면이 XML로 어떻게 기록되는지 확인해 보세요. “디자인 = XML” 감각이 3차시의 기초가 됩니다.", options: { color: "374151" } },
  ], { x: 0.68, y: 4.15, w: 4.0, h: 1.0, margin: 0, fontFace: KR, fontSize: 11.5, valign: "middle" });

  codeBlock(s, 5.05, 1.55, 4.45, 3.6, [
    { t: "// Hello.xfdl — Script 영역", c: "7C8DB5" },
    { t: "this.btn_hello_onclick = function(obj, e)" },
    { t: "{" },
    { t: "    // 1) 알림창", c: "7C8DB5" },
    { t: "    alert(\"Hello Nexacro!\");" },
    { t: "" },
    { t: "    // 2) 다른 컴포넌트 속성 변경", c: "7C8DB5" },
    { t: "    this.sta_result.set_text(\"클릭됨!\");" },
    { t: "" },
    { t: "    // 3) 출력창 로그 — 디버깅 기본기", c: "7C8DB5" },
    { t: "    trace(\"버튼 클릭 이벤트 실행\");" },
    { t: "};" },
  ], 12);
}

// ───────────────────────── 3차시 ─────────────────────────
divider("03", "프로젝트 구조 이론", [
  "ADL → FrameSet → Form, 화면의 뼈대",
  "TypeDefinition · 환경변수 · 테마(XCSS)",
  "MainFrame / ChildFrame / WorkFrame",
  "실습 — 메뉴 + 작업영역 레이아웃",
]);

// 13. ADL 구조
{
  const s = pres.addSlide();
  titleBar(s, "3차시 — 프로젝트 구조", "화면의 뼈대 — ADL → FrameSet → Form");
  // 계층 다이어그램 (좌)
  flowBox(s, 0.5, 1.6, 4.5, 0.6, "Application (.xadl) — 앱 전체의 시작점", { fill: NAVY, fontSize: 12.5 });
  flowBox(s, 0.85, 2.35, 4.15, 0.6, "MainFrame — 최상위 창", { fill: ACCENT, fontSize: 12.5 });
  flowBox(s, 1.2, 3.1, 3.8, 0.6, "FrameSet — 화면 분할 (H/V/Tab)", { fill: "5B79F7", fontSize: 12.5 });
  flowBox(s, 1.55, 3.85, 3.45, 0.6, "Form (.xfdl) — 실제 업무 화면", { fill: LIGHT, color: DARKTXT, fontSize: 12.5 });
  s.addText("우리가 매일 작성하는 것은 Form(.xfdl) — 나머지 구조는 프로젝트 초기에 한 번 잡는다", {
    x: 0.5, y: 4.7, w: 4.7, h: 0.6, margin: 0, fontFace: KR, fontSize: 11.5, italic: true, color: MUTED, valign: "top",
  });

  // 우측: 3대 설정
  const items = [
    ["TypeDefinition", "사용할 컴포넌트 목록, 서비스 주소(prefixid), 경로 별칭(Base::, Lib::)을 정의하는 프로젝트 설계도"],
    ["환경변수 (Environment)", "전역 설정값. 앱 어디서든 참조 가능한 공통 상수"],
    ["테마 (XCSS)", "전체 화면의 디자인(색·폰트·간격)을 한 곳에서 관리 — 웹의 CSS와 같은 역할"],
  ];
  let y = 1.6;
  items.forEach(([h, b]) => {
    card(s, 5.55, y, 3.95, 1.07, h, b);
    y += 1.2;
  });
}

// 14. 실습: 프레임 레이아웃
{
  const s = pres.addSlide();
  titleBar(s, "3차시 — 실습", "실습 ② 메뉴 + 작업영역 레이아웃");
  // 미니 화면 구조
  const X = 0.5, Y = 1.6, W = 4.0, H = 2.6;
  s.addShape(pres.shapes.RECTANGLE, { x: X, y: Y, w: W, h: 0.5, fill: { color: NAVY } });
  s.addText("상단 타이틀  (left:0, right:0 → 가로 전체)", { x: X, y: Y, w: W, h: 0.5, margin: 0, fontFace: KR, fontSize: 10.5, color: WHITE, align: "center", valign: "middle" });
  s.addShape(pres.shapes.RECTANGLE, { x: X, y: Y + 0.5, w: 1.1, h: H - 0.5, fill: { color: "DCE6F5" } });
  s.addText("좌측 메뉴\nDiv\n(bottom:0)", { x: X, y: Y + 0.5, w: 1.1, h: H - 0.5, margin: 0, fontFace: KR, fontSize: 10, bold: true, color: DARKTXT, align: "center", valign: "middle" });
  s.addShape(pres.shapes.RECTANGLE, { x: X + 1.1, y: Y + 0.5, w: W - 1.1, h: H - 0.5, fill: { color: WHITE }, line: { color: ACCENT, width: 1 } });
  s.addText("작업영역 Div\n(right:0, bottom:0 → 나머지 전부)", { x: X + 1.1, y: Y + 0.5, w: W - 1.1, h: H - 0.5, margin: 0, fontFace: KR, fontSize: 10.5, color: DARKTXT, align: "center", valign: "middle" });

  s.addText([
    { text: "핵심 개념: anchor  ", options: { bold: true, fontSize: 13, color: DARKTXT, breakLine: true } },
    { text: "위치를 left/top만이 아니라 right/bottom으로도 고정 → 창 크기가 변해도 따라 늘어나는 레이아웃", options: { color: "374151" } },
  ], { x: 0.5, y: 4.45, w: 4.2, h: 0.85, margin: 0, fontFace: KR, fontSize: 11.5, valign: "top" });

  codeBlock(s, 4.85, 1.6, 4.65, 3.55, [
    { t: "<!-- 작업영역: 남은 공간 전부 차지 -->", c: "7C8DB5" },
    { t: "<Div id=\"div_work\" left=\"200\" top=\"50\"" },
    { t: "     right=\"0\" bottom=\"0\"/>" },
    { t: "" },
    { t: "// 메뉴 클릭 → 작업영역에 화면 로드", c: "7C8DB5" },
    { t: "this.div_menu_btn_onclick =" },
    { t: "  function(obj, e)" },
    { t: "{" },
    { t: "    // 화면 전환의 기본 원리", c: "7C8DB5" },
    { t: "    this.div_work.set_url(" },
    { t: "        \"Base::Hello.xfdl\");" },
    { t: "};" },
  ], 12);
}

// ───────────────────────── 4차시 ─────────────────────────
divider("04", "스크립트 기초", [
  "넥사크로 스크립트 = JavaScript",
  "이벤트 모델 — onclick, onload",
  "컴포넌트 접근과 스코프 (this, parent)",
  "실습 — 입력값 검증(Validation) 함수",
]);

// 16. 스크립트 = JS + 이벤트 모델
{
  const s = pres.addSlide();
  titleBar(s, "4차시 — 스크립트 기초", "넥사크로 스크립트 = JavaScript");
  s.addText([
    { text: "이미 아는 JavaScript가 그대로 통한다", options: { bold: true, fontSize: 14, color: DARKTXT, breakLine: true } },
    { text: "변수, 함수, if/for, 배열, 정규식, JSON — 전부 표준 JS 문법", options: { bullet: { code: "2022" }, breakLine: true } },
    { text: "다른 점은 단 하나: “무엇을 조작하는가” — DOM 대신 넥사크로 컴포넌트", options: { bullet: { code: "2022" }, breakLine: true } },
    { text: "코드는 항상 이벤트에서 시작된다 (클릭, 로드, 값 변경…)", options: { bullet: { code: "2022" } } },
  ], { x: 0.5, y: 1.5, w: 4.3, h: 2.0, margin: 0, fontFace: KR, fontSize: 12.5, color: "374151", paraSpaceAfter: 8, valign: "top" });

  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 3.7, w: 4.3, h: 1.45, fill: { color: LIGHT } });
  s.addText([
    { text: "꼭 외울 두 가지 이벤트", options: { bold: true, color: NAVY, breakLine: true } },
    { text: "onload — 폼이 열릴 때 1회. 초기화 코드의 자리", options: { bullet: { code: "2022" }, breakLine: true } },
    { text: "onclick — 사용자의 행동에 반응하는 자리", options: { bullet: { code: "2022" } } },
  ], { x: 0.68, y: 3.7, w: 4.0, h: 1.45, margin: 0, fontFace: KR, fontSize: 11.5, color: "374151", paraSpaceAfter: 6, valign: "middle" });

  codeBlock(s, 5.05, 1.5, 4.45, 3.65, [
    { t: "// 이벤트 핸들러의 표준 형태", c: "7C8DB5" },
    { t: "this.btn_save_onclick =" },
    { t: "  function(obj, e)" },
    { t: "{" },
    { t: "    // obj: 이벤트가 난 컴포넌트", c: "7C8DB5" },
    { t: "    // e  : 이벤트 정보 객체", c: "7C8DB5" },
    { t: "    trace(obj.id + \" 클릭\");" },
    { t: "};" },
    { t: "" },
    { t: "// 폼 초기화는 onload에서", c: "7C8DB5" },
    { t: "this.Form_onload = function(obj, e)" },
    { t: "{" },
    { t: "    this.edt_name.setFocus();" },
    { t: "};" },
  ], 12);
}

// 17. 접근과 스코프
{
  const s = pres.addSlide();
  titleBar(s, "4차시 — 스크립트 기초", "컴포넌트 접근과 스코프 — 가장 많이 틀리는 곳");
  codeBlock(s, 0.5, 1.5, 5.5, 2.5, [
    { t: "this.edt_name            // 폼 안의 컴포넌트 접근", c: undefined },
    { t: "this.edt_name.value      // 값 읽기", c: undefined },
    { t: "" },
    { t: "this.div_box.form.btn_ok // Div 안은 .form 거쳐서", c: undefined },
    { t: "this.parent              // 부모 (Div → Form)", c: undefined },
    { t: "" },
    { t: "// 실행 중 속성 변경: 반드시 set_xxx()", c: "7C8DB5" },
    { t: "this.sta_msg.set_text(\"저장 완료\");  // O", c: "9FE8B6" },
    { t: "this.sta_msg.text = \"저장 완료\";     // X 화면 갱신 안 됨", c: "F4A0A0" },
  ], 12);

  card(s, 6.2, 1.5, 3.3, 1.15, "왜 set_xxx()인가?", "setter가 값 변경 + 화면 다시 그리기를 함께 수행한다. 직접 대입하면 값만 바뀌고 화면은 그대로.");
  card(s, 6.2, 2.85, 3.3, 1.15, "스코프 감각", "폼 스크립트의 this = 그 폼 자신. Div 안 컴포넌트는 한 단계(.form)를 더 거친다.");

  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.3, w: 9.0, h: 0.85, fill: { color: "FFF4E5" } });
  s.addText([
    { text: "디버깅 습관  ", options: { bold: true, color: "B45309" } },
    { text: "“왜 화면이 안 바뀌지?”의 90%는 set_xxx() 누락. 의심되면 trace()로 값부터 찍어 출력창에서 확인하기.", options: { color: "78350F" } },
  ], { x: 0.7, y: 4.3, w: 8.6, h: 0.85, margin: 0, fontFace: KR, fontSize: 12.5, valign: "middle" });
}

// 18. 실습 + 정리
{
  const s = pres.addSlide();
  titleBar(s, "4차시 — 실습 / 1부 정리", "실습 ③ 입력값 검증 — 그리고 1부 정리");
  codeBlock(s, 0.5, 1.5, 5.3, 3.0, [
    { t: "// 검증 로직은 fn_ 함수로 분리 (실무 관례)", c: "7C8DB5" },
    { t: "this.btn_save_onclick = function(obj, e)" },
    { t: "{" },
    { t: "    if (!this.fn_validate()) return;" },
    { t: "    alert(\"저장!\");" },
    { t: "};" },
    { t: "" },
    { t: "this.fn_validate = function()" },
    { t: "{" },
    { t: "    if (this.edt_name.value == \"\") {" },
    { t: "        alert(\"이름을 입력하세요.\");" },
    { t: "        this.edt_name.setFocus();" },
    { t: "        return false;" },
    { t: "    }" },
    { t: "    return true;" },
    { t: "};" },
  ], 11);

  s.addText("1부에서 익힌 것", { x: 6.0, y: 1.5, w: 3.5, h: 0.35, margin: 0, fontFace: KR, fontSize: 15, bold: true, color: DARKTXT });
  s.addText([
    { text: "플랫폼 구조와 실행 원리 (Generate, OSMU)", options: { bullet: { code: "2713" }, breakLine: true } },
    { text: "Studio 설치와 첫 화면 실행 (F6)", options: { bullet: { code: "2713" }, breakLine: true } },
    { text: "ADL→FrameSet→Form, anchor 레이아웃", options: { bullet: { code: "2713" }, breakLine: true } },
    { text: "이벤트 핸들러와 set_xxx(), trace()", options: { bullet: { code: "2713" } } },
  ], { x: 6.0, y: 1.95, w: 3.5, h: 1.7, margin: 0, fontFace: KR, fontSize: 12, color: "374151", paraSpaceAfter: 8, valign: "top" });

  s.addShape(pres.shapes.RECTANGLE, { x: 6.0, y: 3.8, w: 3.5, h: 1.35, fill: { color: NAVY } });
  s.addText([
    { text: "다음 시간 (2부 · 5차시)", options: { bold: true, color: ICE, breakLine: true, fontSize: 12 } },
    { text: "기본 컴포넌트 I — 회원가입 폼 만들기\nEdit · MaskEdit · CheckBox · Radio", options: { color: WHITE, fontSize: 12.5 } },
  ], { x: 6.2, y: 3.8, w: 3.1, h: 1.35, margin: 0, fontFace: KR, valign: "middle" });
}

pres.writeFile({ fileName: "/Users/yeon97/PRJT/OCR_PIPLELINE/nexacro_course/넥사크로_1부_강의자료.pptx" })
  .then(() => console.log("done"));
