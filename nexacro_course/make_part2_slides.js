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
pres.title = "넥사크로 2부 — 기본 기능 (5~9차시)";

// ───────────────────────── helpers (1부와 동일) ─────────────────────────
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

function tipBar(slide, label, text, y = 4.3, h = 0.85) {
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 9.0, h, fill: { color: "FFF4E5" } });
  slide.addText([
    { text: label + "  ", options: { bold: true, color: "B45309" } },
    { text, options: { color: "78350F" } },
  ], { x: 0.7, y, w: 8.6, h, margin: 0, fontFace: KR, fontSize: 12, valign: "middle" });
}

// ───────────────────────── 1. 표지 ─────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: NAVY };
  s.addText("NEXACRO PLATFORM 입문 과정", {
    x: 0.7, y: 1.15, w: 8.6, h: 0.4, margin: 0,
    fontFace: KR, fontSize: 15, bold: true, color: ACCENT, charSpacing: 3,
  });
  s.addText("2부 — 컴포넌트와 데이터", {
    x: 0.7, y: 1.65, w: 8.6, h: 1.0, margin: 0,
    fontFace: KR, fontSize: 40, bold: true, color: WHITE,
  });
  s.addText("기본 컴포넌트 · Dataset · 데이터 바인딩 · Grid  (5~9차시)", {
    x: 0.7, y: 2.75, w: 8.6, h: 0.5, margin: 0,
    fontFace: KR, fontSize: 16, color: ICE,
  });
  s.addShape(pres.shapes.LINE, { x: 0.72, y: 3.55, w: 2.2, h: 0, line: { color: ACCENT, width: 3 } });
  s.addText("Nexacro N  ·  TOBESOFT", {
    x: 0.7, y: 4.65, w: 8.6, h: 0.35, margin: 0,
    fontFace: KR, fontSize: 12, color: "8FA8D9",
  });
}

// ───────────────────────── 2. 2부 로드맵 ─────────────────────────
{
  const s = pres.addSlide();
  titleBar(s, "PART 2 ROADMAP", "2부에서 배우는 것");
  const items = [
    ["5", "기본 컴포넌트 I", "Edit · MaskEdit · TextArea · CheckBox · Radio", "실습: 회원가입 폼"],
    ["6", "컴포넌트 II", "Combo · Calendar · Tab · Div와 레이아웃", "실습: 검색바"],
    ["7", "Dataset ★", "넥사크로 데이터 처리의 중심. 2부의 분수령", "실습: 데이터 조작"],
    ["8", "바인딩과 Grid", "Dataset과 화면을 자동으로 연결하는 방법", "실습: 목록+상세"],
    ["9", "Grid 심화", "셀 편집 · 정렬 · 합계 · 변경 행 추적(rowtype)", "실습: 편집 Grid"],
  ];
  const w = 1.7, gap = 0.125, y = 1.5, h = 3.3;
  items.forEach(([n, t, d, lab], i) => {
    const x = 0.5 + i * (w + gap);
    const hot = n === "7";
    s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: hot ? NAVY : LIGHT } });
    s.addShape(pres.shapes.OVAL, { x: x + 0.15, y: y + 0.18, w: 0.5, h: 0.5, fill: { color: hot ? ACCENT : NAVY } });
    s.addText(n, { x: x + 0.15, y: y + 0.18, w: 0.5, h: 0.5, margin: 0, fontFace: KR, fontSize: 19, bold: true, color: WHITE, align: "center", valign: "middle" });
    s.addText(t, { x: x + 0.15, y: y + 0.82, w: w - 0.3, h: 0.62, margin: 0, fontFace: KR, fontSize: 13.5, bold: true, color: hot ? WHITE : DARKTXT, valign: "top" });
    s.addText(d, { x: x + 0.15, y: y + 1.5, w: w - 0.3, h: 1.2, margin: 0, fontFace: KR, fontSize: 10.5, color: hot ? ICE : "374151", valign: "top" });
    s.addText(lab, { x: x + 0.15, y: y + h - 0.48, w: w - 0.3, h: 0.32, margin: 0, fontFace: KR, fontSize: 10, bold: true, color: hot ? "9FB6F9" : ACCENT });
  });
  s.addText("목표: 2부가 끝나면 — 데이터를 Dataset에 담고, Grid와 입력폼으로 보여주고 편집하는 화면을 만들 수 있다", {
    x: 0.5, y: 5.05, w: 9, h: 0.35, margin: 0, fontFace: KR, fontSize: 12, italic: true, color: MUTED,
  });
}

// ───────────────────────── 5차시 ─────────────────────────
divider("05", "기본 컴포넌트 I", [
  "컴포넌트의 3요소 — 속성 · 메소드 · 이벤트",
  "입력 컴포넌트: Edit, MaskEdit, TextArea",
  "선택 컴포넌트: CheckBox, Radio",
  "실습 — 회원가입 입력 폼",
]);

// 4. 컴포넌트 3요소
{
  const s = pres.addSlide();
  titleBar(s, "5차시 — 기본 컴포넌트 I", "모든 컴포넌트는 3요소로 다룬다");
  const tri = [
    ["속성 (Property)", "컴포넌트의 상태와 모양", "value, text, visible, enable…\n디자인 시점: 속성창에서 설정\n실행 시점: set_xxx()로 변경"],
    ["메소드 (Method)", "컴포넌트에 시키는 동작", "setFocus(), showEditor()…\n“하라”고 명령하는 함수"],
    ["이벤트 (Event)", "사용자·시스템의 신호", "onclick, onchanged, onload…\n“일어났다”에 반응하는 자리"],
  ];
  const w = 2.9, gap = 0.15, y = 1.55, h = 2.1;
  tri.forEach(([t, sub, d], i) => {
    const x = 0.5 + i * (w + gap);
    s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: LIGHT } });
    s.addShape(pres.shapes.RECTANGLE, { x, y, w, h: 0.07, fill: { color: ACCENT } });
    s.addText(t, { x: x + 0.18, y: y + 0.18, w: w - 0.36, h: 0.36, margin: 0, fontFace: KR, fontSize: 15, bold: true, color: DARKTXT });
    s.addText(sub, { x: x + 0.18, y: y + 0.55, w: w - 0.36, h: 0.3, margin: 0, fontFace: KR, fontSize: 11.5, bold: true, color: ACCENT });
    s.addText(d, { x: x + 0.18, y: y + 0.92, w: w - 0.36, h: h - 1.05, margin: 0, fontFace: KR, fontSize: 11, color: "374151", valign: "top" });
  });
  s.addText([
    { text: "읽는 법: ", options: { bold: true, color: DARKTXT } },
    { text: "“Edit의 value 속성을 읽고(this.edt.value), set_value()로 바꾸고, onchanged 이벤트에 반응한다” — 어떤 컴포넌트를 만나도 이 세 가지부터 찾으면 된다. 매뉴얼(docs.tobesoft.com)도 이 구조로 정리되어 있다.", options: { color: "374151" } },
  ], { x: 0.5, y: 3.95, w: 9, h: 0.8, margin: 0, fontFace: KR, fontSize: 12.5, valign: "top" });
  tipBar(s, "관례", "컴포넌트 id는 종류 접두어로 — edt_(Edit), btn_(Button), sta_(Static), chk_, rdo_, cbo_, grd_, ds_ … 코드만 봐도 무엇인지 알 수 있다.", 4.75, 0.6);
}

// 5. 컴포넌트 카탈로그
{
  const s = pres.addSlide();
  titleBar(s, "5차시 — 기본 컴포넌트 I", "입력·선택 컴포넌트 한눈에 보기");
  const rows = [
    ["컴포넌트", "용도", "핵심 속성", "값을 읽으면"],
    ["Edit", "한 줄 텍스트 입력", "maxlength, password, inputtype", "문자열  (edt.value)"],
    ["MaskEdit", "형식 있는 입력 (전화번호 등)", "type, mask=\"###-####-####\"", "마스크 제외한 순수 값"],
    ["TextArea", "여러 줄 입력 (자기소개 등)", "maxlength, scrollbars", "줄바꿈 포함 문자열"],
    ["CheckBox", "예/아니오 단일 선택", "text, value", "true / false"],
    ["Radio", "여러 항목 중 하나", "innerdataset, codecolumn, datacolumn", "선택 항목의 코드값"],
    ["Static / Button", "라벨 표시 / 동작 실행", "text, onclick", "—"],
  ];
  const colW = [1.7, 2.6, 2.9, 1.8];
  s.addTable(rows.map((r, ri) => r.map((c, ci) => ({
    text: c,
    options: {
      fontFace: ci === 2 && ri > 0 ? MONO : KR,
      fontSize: ri === 0 ? 12 : 11,
      bold: ri === 0,
      color: ri === 0 ? WHITE : "374151",
      fill: { color: ri === 0 ? NAVY : ri % 2 ? "F7F9FE" : WHITE },
      align: "left", valign: "middle",
    },
  }))), {
    x: 0.5, y: 1.5, w: 9.0, colW, rowH: 0.42,
    border: { pt: 0.75, color: "D9E2F1" },
  });
  s.addText([
    { text: "Radio의 innerdataset에 주목 — ", options: { bold: true, color: ACCENT } },
    { text: "선택 항목을 코드(M/F)와 표시문구(남성/여성)로 분리해 정의한다. 7차시 Dataset 개념의 첫 등장이다.", options: { color: "374151" } },
  ], { x: 0.5, y: 4.85, w: 9, h: 0.5, margin: 0, fontFace: KR, fontSize: 12.5, valign: "top" });
}

// 6. 실습 회원가입
{
  const s = pres.addSlide();
  titleBar(s, "5차시 — 실습", "실습 ① 회원가입 입력 폼");
  s.addText([
    { text: "만들 화면", options: { bold: true, fontSize: 14, color: DARKTXT, breakLine: true } },
    { text: "아이디(Edit) · 비밀번호(password) · 휴대전화(MaskEdit)", options: { bullet: { code: "2022" }, breakLine: true } },
    { text: "성별(Radio + innerdataset) · 자기소개(TextArea)", options: { bullet: { code: "2022" }, breakLine: true } },
    { text: "약관 동의(CheckBox) — 미동의 시 가입 차단", options: { bullet: { code: "2022" }, breakLine: true } },
    { text: "[가입하기] 검증 후 입력값 요약 / [초기화] set_value()", options: { bullet: { code: "2022" } } },
  ], { x: 0.5, y: 1.5, w: 4.3, h: 2.3, margin: 0, fontFace: KR, fontSize: 12.5, color: "374151", paraSpaceAfter: 8, valign: "top" });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.0, w: 4.3, h: 1.15, fill: { color: LIGHT } });
  s.addText([
    { text: "예제 파일  ", options: { bold: true, color: ACCENT } },
    { text: "examples/lesson05_comp1/SignUp.xfdl\n초기화 버튼에서 모든 컴포넌트의 set_value() 사용법을 확인하세요.", options: { color: "374151" } },
  ], { x: 0.68, y: 4.0, w: 4.0, h: 1.15, margin: 0, fontFace: KR, fontSize: 11.5, valign: "middle" });

  codeBlock(s, 5.05, 1.5, 4.45, 3.65, [
    { t: "// CheckBox 값은 true/false", c: "7C8DB5" },
    { t: "if (this.chk_agree.value != true) {" },
    { t: "    alert(\"동의가 필요합니다.\");" },
    { t: "    return;" },
    { t: "}" },
    { t: "" },
    { t: "// Radio: 선택된 '코드값'이 온다", c: "7C8DB5" },
    { t: "this.rdo_gender.value   // \"M\" 또는 \"F\"" },
    { t: "" },
    { t: "// MaskEdit: 순수 값만 저장된다", c: "7C8DB5" },
    { t: "this.msk_tel.value      // 01012345678" },
    { t: "" },
    { t: "// 초기화는 반드시 set_value()", c: "7C8DB5" },
    { t: "this.edt_id.set_value(\"\");" },
  ], 11.5);
}

// ───────────────────────── 6차시 ─────────────────────────
divider("06", "기본 컴포넌트 II · 레이아웃", [
  "Combo와 innerdataset — 코드성 데이터의 기본 패턴",
  "Calendar — 표시 형식과 값(yyyyMMdd)은 별개",
  "Tab · Div — 화면을 묶고 나누기",
  "실습 — 검색 조건 영역(검색바) 만들기",
]);

// 8. Combo / Calendar
{
  const s = pres.addSlide();
  titleBar(s, "6차시 — 컴포넌트 II", "Combo와 Calendar — 실무 화면의 단골손님");
  // 좌: Combo
  s.addText("Combo — 코드와 명칭의 분리", { x: 0.5, y: 1.45, w: 4.4, h: 0.35, margin: 0, fontFace: KR, fontSize: 15, bold: true, color: DARKTXT });
  codeBlock(s, 0.5, 1.9, 4.4, 1.7, [
    { t: "<Combo id=\"cbo_dept\"" },
    { t: "  innerdataset=\"ds_dept\"" },
    { t: "  codecolumn=\"CODE\"    // 값: D01", c: "7C8DB5" },
    { t: "  datacolumn=\"NAME\"/>  // 표시: 개발팀", c: "7C8DB5" },
    { t: "" },
    { t: "cbo_dept.value  // \"D01\"  (코드)" },
    { t: "cbo_dept.text   // \"개발팀\" (명칭)" },
  ], 11);
  s.addText("사용자에게는 이름을, 서버에는 코드를 — 모든 코드성 데이터(부서·직급·상태)의 공통 패턴", {
    x: 0.5, y: 3.7, w: 4.4, h: 0.6, margin: 0, fontFace: KR, fontSize: 11.5, italic: true, color: MUTED, valign: "top",
  });
  // 우: Calendar
  s.addText("Calendar — 두 얼굴의 날짜", { x: 5.1, y: 1.45, w: 4.4, h: 0.35, margin: 0, fontFace: KR, fontSize: 15, bold: true, color: DARKTXT });
  codeBlock(s, 5.1, 1.9, 4.4, 1.7, [
    { t: "<Calendar id=\"cal_from\"" },
    { t: "  dateformat=\"yyyy-MM-dd\"/>" },
    { t: "" },
    { t: "// 화면 표시: 2026-06-12", c: "7C8DB5" },
    { t: "// 실제 값  : \"20260612\"", c: "7C8DB5" },
    { t: "cal_from.value  // 항상 yyyyMMdd" },
    { t: "" },
  ], 11);
  s.addText("값이 항상 yyyyMMdd 문자열이므로 날짜 비교는 문자열 비교로 충분 (from > to 체크 등)", {
    x: 5.1, y: 3.7, w: 4.4, h: 0.6, margin: 0, fontFace: KR, fontSize: 11.5, italic: true, color: MUTED, valign: "top",
  });
  tipBar(s, "함정", "dateformat(표시)과 value(값)를 혼동하면 날짜 저장·비교가 전부 꼬인다. “표시는 자유, 값은 yyyyMMdd 고정”으로 기억하기.", 4.4, 0.7);
}

// 9. 실습 검색바
{
  const s = pres.addSlide();
  titleBar(s, "6차시 — 실습", "실습 ② 검색 조건 영역(검색바)");
  // 검색바 미니어처
  const X = 0.5, Y = 1.6, W = 9.0, H = 0.75;
  s.addShape(pres.shapes.RECTANGLE, { x: X, y: Y, w: W, h: H, fill: { color: LIGHT }, line: { color: "C5D3EC", width: 1 } });
  const seg = [
    ["부서", 0.55, "DCE6F5"], ["콤보 ▾", 1.0, "FFFFFF"],
    ["이름", 0.55, "DCE6F5"], ["Edit", 1.0, "FFFFFF"],
    ["입사일", 0.65, "DCE6F5"], ["달력", 0.95, "FFFFFF"], ["~", 0.3, "F0F4FB"], ["달력", 0.95, "FFFFFF"],
  ];
  let sx = X + 0.25;
  seg.forEach(([t, w2, f]) => {
    s.addShape(pres.shapes.RECTANGLE, { x: sx, y: Y + 0.19, w: w2, h: 0.37, fill: { color: f }, line: { color: "B7C7E4", width: 0.75 } });
    s.addText(t, { x: sx, y: Y + 0.19, w: w2, h: 0.37, margin: 0, fontFace: KR, fontSize: 9.5, color: DARKTXT, align: "center", valign: "middle" });
    sx += w2 + 0.12;
  });
  s.addShape(pres.shapes.RECTANGLE, { x: X + W - 1.05, y: Y + 0.19, w: 0.8, h: 0.37, fill: { color: NAVY } });
  s.addText("조회", { x: X + W - 1.05, y: Y + 0.19, w: 0.8, h: 0.37, margin: 0, fontFace: KR, fontSize: 9.5, bold: true, color: WHITE, align: "center", valign: "middle" });
  s.addText("→ right 기준 배치: 창이 넓어져도 [조회]는 항상 오른쪽 끝", {
    x: X, y: Y + H + 0.07, w: 9, h: 0.3, margin: 0, fontFace: KR, fontSize: 10.5, italic: true, color: MUTED,
  });

  s.addText([
    { text: "구현 순서", options: { bold: true, fontSize: 13.5, color: DARKTXT, breakLine: true } },
    { text: "1.  배경 Static: left 20, right 20 → 가로로 늘어나는 영역", options: { breakLine: true } },
    { text: "2.  부서 Combo + 이름 Edit + 기간 Calendar 2개 배치", options: { breakLine: true } },
    { text: "3.  [조회] 버튼은 right 속성으로 오른쪽 고정", options: { breakLine: true } },
    { text: "4.  날짜 범위 검증: from > to 면 경고 후 setFocus()", options: {} },
  ], { x: 0.5, y: 2.85, w: 4.4, h: 2.2, margin: 0, fontFace: KR, fontSize: 12, color: "374151", paraSpaceAfter: 8, valign: "top" });

  codeBlock(s, 5.1, 2.85, 4.4, 2.3, [
    { t: "// 날짜 범위 검증 — 문자열 비교면 충분", c: "7C8DB5" },
    { t: "var from = this.cal_from.value;" },
    { t: "var to   = this.cal_to.value;" },
    { t: "" },
    { t: "if (from != null && to != null" },
    { t: "    && from > to) {" },
    { t: "    alert(\"시작일이 더 늦습니다.\");" },
    { t: "    this.cal_from.setFocus();" },
    { t: "    return;" },
    { t: "}" },
  ], 11.5);
}

// ───────────────────────── 7차시 (핵심) ─────────────────────────
divider("07", "Dataset 이해  ★ 핵심", [
  "Dataset = 메모리 위의 2차원 테이블",
  "rowposition — “현재 행”이라는 개념",
  "조작 API: addRow · setColumn · deleteRow · findRow",
  "실습 — 화면 없이 데이터만 다뤄보기",
]);

// 11. Dataset이란
{
  const s = pres.addSlide();
  titleBar(s, "7차시 — Dataset ★", "Dataset = 메모리 위의 2차원 테이블");
  // 테이블 다이어그램
  const X = 0.5, Y = 1.7, CW = [1.1, 1.2, 1.0, 1.0], RH = 0.42;
  const data = [
    ["EMP_ID", "EMP_NM", "DEPT_CD", "SALARY"],
    ["E001", "김철수", "D01", "3500"],
    ["E002", "이영희", "D02", "4200"],
    ["E003", "박민준", "D01", "2900"],
  ];
  data.forEach((row, ri) => {
    let cx = X;
    row.forEach((c, ci) => {
      const head = ri === 0;
      const cur = ri === 2; // rowposition 표시 행
      s.addShape(pres.shapes.RECTANGLE, {
        x: cx, y: Y + ri * RH, w: CW[ci], h: RH,
        fill: { color: head ? NAVY : cur ? "DCE6F9" : WHITE },
        line: { color: "B7C7E4", width: 0.75 },
      });
      s.addText(c, {
        x: cx, y: Y + ri * RH, w: CW[ci], h: RH, margin: 0,
        fontFace: head ? MONO : KR, fontSize: 10.5, bold: head,
        color: head ? WHITE : DARKTXT, align: "center", valign: "middle",
      });
      cx += CW[ci];
    });
  });
  s.addText("▶", {
    x: X - 0.27, y: Y + 2 * RH, w: 0.25, h: RH, margin: 0,
    fontFace: KR, fontSize: 11, bold: true, color: ACCENT, align: "center", valign: "middle",
  });
  s.addText([
    { text: "▶ 표시 행 = rowposition(현재 행)", options: { bold: true, color: ACCENT, breakLine: true } },
    { text: "컬럼(ColumnInfo)은 구조, Row는 데이터 — DB 테이블을 화면 쪽으로 옮겨 놓은 그릇", options: { italic: true, color: MUTED } },
  ], {
    x: 0.5, y: Y + 4 * RH + 0.12, w: 4.6, h: 0.95, margin: 0, fontFace: KR, fontSize: 11.5, valign: "top",
  });

  // 우측: 왜 중요한가
  const pts = [
    ["화면과 데이터의 분리", "컴포넌트는 보여주는 역할만, 데이터는 전부 Dataset이 가진다"],
    ["서버 통신의 단위", "조회 결과도 Dataset으로 받고, 저장할 변경분도 Dataset으로 보낸다 (3부)"],
    ["바인딩의 재료", "Grid·입력폼과 자동 연동되는 원천 (8차시)"],
  ];
  let y2 = 1.6;
  pts.forEach(([h2, b]) => {
    card(s, 5.55, y2, 3.95, 1.02, h2, b);
    y2 += 1.16;
  });
  tipBar(s, "한 줄 요약", "“넥사크로 개발 = Dataset에 데이터를 넣고 빼는 일” — 이 감각이 잡히면 나머지는 패턴 반복이다.", 4.95, 0.55);
}

// 12. Dataset API
{
  const s = pres.addSlide();
  titleBar(s, "7차시 — Dataset ★", "Dataset 조작 API — 다섯 가지면 충분하다");
  codeBlock(s, 0.5, 1.5, 5.6, 3.65, [
    { t: "// 1) 행 추가 — 새 행 인덱스를 돌려준다", c: "7C8DB5" },
    { t: "var nRow = this.ds_emp.addRow();" },
    { t: "" },
    { t: "// 2) 값 쓰기 / 3) 값 읽기", c: "7C8DB5" },
    { t: "this.ds_emp.setColumn(nRow, \"EMP_NM\", \"김철수\");" },
    { t: "var nm = this.ds_emp.getColumn(nRow, \"EMP_NM\");" },
    { t: "" },
    { t: "// 4) 행 삭제 / 5) 검색 (없으면 -1)", c: "7C8DB5" },
    { t: "this.ds_emp.deleteRow(nRow);" },
    { t: "var found = this.ds_emp.findRow(\"DEPT_CD\",\"D01\");" },
    { t: "" },
    { t: "// 순회와 집계", c: "7C8DB5" },
    { t: "for (var i=0; i<this.ds_emp.getRowCount(); i++){…}" },
    { t: "this.ds_emp.getSum(\"SALARY\")  // 합계 한 줄", c: "9FE8B6" },
  ], 11);

  card(s, 6.3, 1.5, 3.2, 1.25, "rowposition", "“현재 선택된 행” 번호. Grid 클릭, set_rowposition()으로 이동하며, 이동하면 onrowposchanged 이벤트가 발생한다.");
  card(s, 6.3, 2.95, 3.2, 1.25, "이벤트로 반응하기", "onrowposchanged(행 이동), oncolumnchanged(값 변경) — “데이터가 움직이면 화면이 반응한다”의 출발점.");
  s.addText("이 이벤트 구조가 다음 차시 ‘바인딩’의 동작 원리다 →", {
    x: 6.3, y: 4.4, w: 3.2, h: 0.6, margin: 0, fontFace: KR, fontSize: 11.5, italic: true, color: ACCENT, valign: "top",
  });
}

// 13. 실습 Dataset
{
  const s = pres.addSlide();
  titleBar(s, "7차시 — 실습", "실습 ③ 화면 없이 데이터만 다뤄보기");
  s.addText([
    { text: "이번 실습은 일부러 Grid 없이 합니다", options: { bold: true, fontSize: 14, color: DARKTXT, breakLine: true } },
    { text: "버튼 5개와 로그 창만으로 Dataset을 조작", options: { bullet: { code: "2022" }, breakLine: true } },
    { text: "[행 추가] [현재행 수정] [현재행 삭제] [검색] [전체 출력]", options: { bullet: { code: "2022" }, breakLine: true } },
    { text: "trace()와 로그로 “보이지 않는 데이터”의 변화를 추적", options: { bullet: { code: "2022" }, breakLine: true } },
    { text: "→ 데이터와 화면이 별개라는 감각을 만드는 것이 목적", options: { bullet: { code: "2022" } } },
  ], { x: 0.5, y: 1.5, w: 4.3, h: 2.3, margin: 0, fontFace: KR, fontSize: 12.5, color: "374151", paraSpaceAfter: 8, valign: "top" });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.0, w: 4.3, h: 1.15, fill: { color: LIGHT } });
  s.addText([
    { text: "예제 파일  ", options: { bold: true, color: ACCENT } },
    { text: "examples/lesson07_dataset/DatasetBasic.xfdl\n과제: 연봉 3,000 이상 사원만 출력하는 버튼을 추가해 보세요.", options: { color: "374151" } },
  ], { x: 0.68, y: 4.0, w: 4.0, h: 1.15, margin: 0, fontFace: KR, fontSize: 11.5, valign: "middle" });

  codeBlock(s, 5.05, 1.5, 4.45, 3.65, [
    { t: "// 합계 구하기 — 직접 순회 버전", c: "7C8DB5" },
    { t: "var total = 0;" },
    { t: "for (var i = 0;" },
    { t: "     i < this.ds_emp.getRowCount(); i++) {" },
    { t: "  total += Number(" },
    { t: "    this.ds_emp.getColumn(i, \"SALARY\"));" },
    { t: "}" },
    { t: "" },
    { t: "// 행 이동 이벤트 — 바인딩의 원리", c: "7C8DB5" },
    { t: "this.ds_emp_onrowposchanged =" },
    { t: "  function(obj, e)" },
    { t: "{" },
    { t: "  trace(e.oldrow + \" → \" + e.newrow);" },
    { t: "};" },
  ], 11.5);
}

// ───────────────────────── 8차시 ─────────────────────────
divider("08", "데이터 바인딩과 Grid", [
  "Bind — Dataset과 컴포넌트의 자동 연결",
  "Grid: binddataset과 bind: 표현",
  "displaytype — 코드를 이름으로, 숫자에 콤마를",
  "실습 — 사원 목록 + 상세 입력폼",
]);

// 15. 바인딩 개념
{
  const s = pres.addSlide();
  titleBar(s, "8차시 — 바인딩과 Grid", "바인딩 — 스크립트 0줄로 화면과 데이터 연동");
  // 다이어그램: Dataset 가운데, 좌 Grid, 우 입력폼
  s.addShape(pres.shapes.RECTANGLE, { x: 3.55, y: 2.0, w: 2.6, h: 1.3, fill: { color: NAVY } });
  s.addText("Dataset\nds_emp", { x: 3.55, y: 2.0, w: 2.6, h: 1.3, margin: 0, fontFace: KR, fontSize: 15, bold: true, color: WHITE, align: "center", valign: "middle" });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 2.0, w: 2.1, h: 1.3, fill: { color: LIGHT }, line: { color: ACCENT, width: 1 } });
  s.addText("Grid\n(목록 전체 행)", { x: 0.5, y: 2.0, w: 2.1, h: 1.3, margin: 0, fontFace: KR, fontSize: 13, bold: true, color: DARKTXT, align: "center", valign: "middle" });
  s.addShape(pres.shapes.RECTANGLE, { x: 7.1, y: 2.0, w: 2.1, h: 1.3, fill: { color: LIGHT }, line: { color: ACCENT, width: 1 } });
  s.addText("Edit · Combo\n(현재 행 1건)", { x: 7.1, y: 2.0, w: 2.1, h: 1.3, margin: 0, fontFace: KR, fontSize: 13, bold: true, color: DARKTXT, align: "center", valign: "middle" });
  s.addText([
    { text: "⇄", options: { fontSize: 15, breakLine: true } },
    { text: "binddataset", options: { fontSize: 8.5 } },
  ], { x: 2.6, y: 2.3, w: 0.95, h: 0.7, margin: 0, fontFace: KR, bold: true, color: ACCENT, align: "center" });
  s.addText([
    { text: "⇄", options: { fontSize: 15, breakLine: true } },
    { text: "BindItem", options: { fontSize: 8.5 } },
  ], { x: 6.15, y: 2.3, w: 0.95, h: 0.7, margin: 0, fontFace: KR, bold: true, color: ACCENT, align: "center" });

  s.addText([
    { text: "동작 시나리오 — 스크립트 한 줄 없이:", options: { bold: true, color: DARKTXT, breakLine: true } },
    { text: "1) Grid 행 클릭 → rowposition 이동   2) BindItem이 “현재 행”을 입력폼에 자동 표시   3) 입력폼 수정 → Dataset 변경 → Grid도 즉시 갱신", options: { color: "374151" } },
  ], { x: 0.5, y: 3.6, w: 9, h: 0.85, margin: 0, fontFace: KR, fontSize: 12.5, valign: "top" });
  tipBar(s, "기억", "양방향이다 — “화면 ↔ Dataset”. 7차시의 onrowposchanged 이벤트를 플랫폼이 대신 처리해 주는 것이 바인딩이다.", 4.55, 0.6);
}

// 16. Grid 구조
{
  const s = pres.addSlide();
  titleBar(s, "8차시 — 바인딩과 Grid", "Grid 해부 — Format · Band · Cell");
  codeBlock(s, 0.5, 1.5, 5.6, 3.65, [
    { t: "<Grid id=\"grd_emp\" binddataset=\"ds_emp\">" },
    { t: " <Format id=\"default\">" },
    { t: "  <Band id=\"head\">      <!-- 헤더 -->", c: "7C8DB5" },
    { t: "    <Cell text=\"이름\"/>" },
    { t: "  </Band>" },
    { t: "  <Band id=\"body\">      <!-- 데이터 -->", c: "7C8DB5" },
    { t: "    <Cell text=\"bind:EMP_NM\"/>" },
    { t: "    <Cell text=\"bind:DEPT_CD\"" },
    { t: "      displaytype=\"combocontrol\"  D01→개발팀", c: "9FE8B6" },
    { t: "      combodataset=\"ds_dept\" .../>" },
    { t: "    <Cell text=\"bind:SALARY\"" },
    { t: "      displaytype=\"numbercontrol\"" },
    { t: "      mask=\"#,##0\"/>              3,500", c: "9FE8B6" },
    { t: "  </Band>" },
    { t: " </Format>" },
    { t: "</Grid>" },
  ], 10.5);

  card(s, 6.3, 1.5, 3.2, 1.1, "bind:컬럼명", "body 셀과 Dataset 컬럼의 연결. 행 수만큼 자동 반복된다.");
  card(s, 6.3, 2.78, 3.2, 1.1, "displaytype", "저장값은 그대로, 표시만 변환 — 코드→명칭(combo), 콤마(number), 날짜(date).");
  card(s, 6.3, 4.06, 3.2, 1.1, "expr 표현식", "셀 안에서 계산식 사용. 예: 상태·합계 표시 (9차시에서 활용)");
}

// 17. 실습 EmpBind
{
  const s = pres.addSlide();
  titleBar(s, "8차시 — 실습", "실습 ④ 사원 목록 + 상세 입력폼");
  s.addText([
    { text: "만들 화면 — 위 Grid, 아래 상세폼", options: { bold: true, fontSize: 14, color: DARKTXT, breakLine: true } },
    { text: "Grid에 ds_emp 연결 (binddataset)", options: { bullet: { code: "2022" }, breakLine: true } },
    { text: "부서는 코드 대신 이름으로, 연봉은 콤마로 (displaytype)", options: { bullet: { code: "2022" }, breakLine: true } },
    { text: "아래 Edit·Combo·MaskEdit을 BindItem으로 연결", options: { bullet: { code: "2022" }, breakLine: true } },
    { text: "행을 클릭하며 상세폼이 따라오는지, 수정하면 Grid가 바뀌는지 확인", options: { bullet: { code: "2022" } } },
  ], { x: 0.5, y: 1.5, w: 4.3, h: 2.3, margin: 0, fontFace: KR, fontSize: 12.5, color: "374151", paraSpaceAfter: 8, valign: "top" });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.0, w: 4.3, h: 1.15, fill: { color: LIGHT } });
  s.addText([
    { text: "예제 파일  ", options: { bold: true, color: ACCENT } },
    { text: "examples/lesson08_bind_grid/EmpBind.xfdl\n이 폼의 Script 영역은 사실상 비어 있다 — 그것이 핵심 메시지.", options: { color: "374151" } },
  ], { x: 0.68, y: 4.0, w: 4.0, h: 1.15, margin: 0, fontFace: KR, fontSize: 11.5, valign: "middle" });

  codeBlock(s, 5.05, 1.5, 4.45, 3.65, [
    { t: "<!-- BindItem: 폼 XML의 <Bind> 영역 -->", c: "7C8DB5" },
    { t: "<Bind>" },
    { t: "  <BindItem compid=\"edt_nm\"" },
    { t: "            propid=\"value\"" },
    { t: "            datasetid=\"ds_emp\"" },
    { t: "            columnid=\"EMP_NM\"/>" },
    { t: "" },
    { t: "  <BindItem compid=\"cbo_dept\"" },
    { t: "            propid=\"value\"" },
    { t: "            datasetid=\"ds_emp\"" },
    { t: "            columnid=\"DEPT_CD\"/>" },
    { t: "</Bind>" },
    { t: "" },
    { t: "<!-- 컴포넌트.속성 ↔ Dataset.컬럼 -->", c: "9FE8B6" },
  ], 11.5);
}

// ───────────────────────── 9차시 ─────────────────────────
divider("09", "Grid 활용 심화", [
  "edittype — Grid에서 바로 편집하기",
  "헤더 클릭 정렬(keystring)과 Summary 합계",
  "rowtype — 추가·수정·삭제를 기억하는 Dataset",
  "실습 — 편집 가능한 사원 Grid",
]);

// 19. Grid 심화 기능
{
  const s = pres.addSlide();
  titleBar(s, "9차시 — Grid 심화", "편집 · 정렬 · 합계 — Grid를 일하게 만들기");
  const feats = [
    ["셀 편집 — edittype", "\"normal\" · \"combo\" · \"masknumber\" — 더블클릭으로 셀이 입력기가 되고, 수정 즉시 Dataset 반영."],
    ["정렬 — keystring", "set_keystring(\"S:+컬럼\") 오름차순, \"S:-\" 내림차순. onheadclick에서 토글이 표준 패턴."],
    ["합계 — Summary 밴드", "셀에 expr=\"dataset.getSum('SALARY')\" — 데이터가 바뀌면 합계도 자동 갱신."],
  ];
  let y = 1.5;
  feats.forEach(([h2, b]) => {
    card(s, 0.5, y, 4.5, 1.02, h2, b);
    y += 1.16;
  });

  // rowtype 다이어그램
  s.addText("rowtype — Dataset은 변경 이력을 기억한다", { x: 5.4, y: 1.5, w: 4.1, h: 0.35, margin: 0, fontFace: KR, fontSize: 14, bold: true, color: DARKTXT });
  const rows = [
    ["E001  김철수", "NORMAL (1)", "F7F9FE", MUTED],
    ["E006  신규사원", "INSERT (2)", "E8F6EC", "1B7F3B"],
    ["E002  이영희*", "UPDATE (4)", "FFF4E5", "B45309"],
    ["(E003 삭제됨)", "DELETED", "FBEAEA", "B42318"],
  ];
  let ry = 1.95;
  rows.forEach(([t, lab, f, c]) => {
    s.addShape(pres.shapes.RECTANGLE, { x: 5.4, y: ry, w: 2.5, h: 0.5, fill: { color: f }, line: { color: "D9E2F1", width: 0.75 } });
    s.addText(t, { x: 5.55, y: ry, w: 2.35, h: 0.5, margin: 0, fontFace: KR, fontSize: 10.5, color: DARKTXT, valign: "middle" });
    s.addText(lab, { x: 8.0, y: ry, w: 1.5, h: 0.5, margin: 0, fontFace: MONO, fontSize: 9.5, bold: true, color: c, valign: "middle" });
    ry += 0.57;
  });
  s.addText("→ 3부(11차시)에서 이 정보 그대로 “변경분만 서버 전송”에 쓴다", {
    x: 5.4, y: ry + 0.05, w: 4.1, h: 0.55, margin: 0, fontFace: KR, fontSize: 11.5, italic: true, color: ACCENT, valign: "top",
  });
  tipBar(s, "주의", "deleteRow()는 화면에서만 지운다 — Dataset이 삭제분을 기억했다가 저장 시 서버에 알린다. “지웠는데 남아있다”가 정상.", 4.95, 0.55);
}

// 20. 실습 + 2부 정리
{
  const s = pres.addSlide();
  titleBar(s, "9차시 — 실습 / 2부 정리", "실습 ⑤ 편집 가능한 Grid — 그리고 2부 정리");
  codeBlock(s, 0.5, 1.5, 5.3, 3.0, [
    { t: "// 헤더 클릭 정렬 토글", c: "7C8DB5" },
    { t: "this.grd_emp_onheadclick = function(obj, e)" },
    { t: "{" },
    { t: "  var col = \"EMP_NM\";  // 클릭한 컬럼" },
    { t: "  var cur = this.ds_emp.keystring || \"\";" },
    { t: "  this.ds_emp.set_keystring(" },
    { t: "    cur == \"S:+\" + col ? \"S:-\" + col" },
    { t: "                        : \"S:+\" + col);" },
    { t: "};" },
    { t: "" },
    { t: "// 변경 내역 집계 (rowtype)", c: "7C8DB5" },
    { t: "t = ds.getRowType(i);  // 2=추가, 4=수정" },
    { t: "ds.getDeletedRowCount() // 삭제분", c: undefined },
  ], 11);

  s.addText("2부에서 익힌 것", { x: 6.0, y: 1.5, w: 3.5, h: 0.35, margin: 0, fontFace: KR, fontSize: 15, bold: true, color: DARKTXT });
  s.addText([
    { text: "컴포넌트 3요소와 입력·선택 컴포넌트", options: { bullet: { code: "2713" }, breakLine: true } },
    { text: "Combo·Calendar, 코드/명칭 분리 패턴", options: { bullet: { code: "2713" }, breakLine: true } },
    { text: "Dataset 조작과 rowposition ★", options: { bullet: { code: "2713" }, breakLine: true } },
    { text: "바인딩(BindItem)과 Grid, rowtype", options: { bullet: { code: "2713" } } },
  ], { x: 6.0, y: 1.95, w: 3.5, h: 1.7, margin: 0, fontFace: KR, fontSize: 12, color: "374151", paraSpaceAfter: 8, valign: "top" });

  s.addShape(pres.shapes.RECTANGLE, { x: 6.0, y: 3.8, w: 3.5, h: 1.35, fill: { color: NAVY } });
  s.addText([
    { text: "다음 시간 (3부 · 10차시)", options: { bold: true, color: ICE, breakLine: true, fontSize: 12 } },
    { text: "서버 통신 transaction()\n드디어 진짜 데이터를 조회합니다", options: { color: WHITE, fontSize: 12.5 } },
  ], { x: 6.2, y: 3.8, w: 3.1, h: 1.35, margin: 0, fontFace: KR, valign: "middle" });
}

pres.writeFile({ fileName: "/Users/yeon97/PRJT/OCR_PIPLELINE/nexacro_course/넥사크로_2부_강의자료.pptx" })
  .then(() => console.log("done"));
