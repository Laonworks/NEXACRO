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
pres.title = "넥사크로 4부 — 실습 프로젝트 (13~16차시)";

// ───────── helpers (1~3부와 동일) ─────────
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

function checkRow(slide, x, y, w, no, text, crit) {
  slide.addShape(pres.shapes.RECTANGLE, { x, y, w, h: 0.62, fill: { color: no % 2 ? "F7F9FE" : LIGHT } });
  slide.addText("☐", { x: x + 0.12, y, w: 0.35, h: 0.62, margin: 0, fontFace: KR, fontSize: 14, color: ACCENT, valign: "middle" });
  slide.addText(text, { x: x + 0.52, y: y + 0.05, w: w - 0.65, h: 0.3, margin: 0, fontFace: KR, fontSize: 11.5, bold: true, color: DARKTXT });
  slide.addText(crit, { x: x + 0.52, y: y + 0.33, w: w - 0.65, h: 0.27, margin: 0, fontFace: KR, fontSize: 10, color: MUTED });
}

// ───────────────────────── 1. 표지 ─────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: NAVY };
  s.addText("NEXACRO PLATFORM 입문 과정", {
    x: 0.7, y: 1.15, w: 8.6, h: 0.4, margin: 0,
    fontFace: KR, fontSize: 15, bold: true, color: ACCENT, charSpacing: 3,
  });
  s.addText("4부 — 실습 프로젝트", {
    x: 0.7, y: 1.65, w: 8.6, h: 1.0, margin: 0,
    fontFace: KR, fontSize: 40, bold: true, color: WHITE,
  });
  s.addText("사원 관리 시스템: 설계 · 목록 · 상세 · 배포  (13~16차시)", {
    x: 0.7, y: 2.75, w: 8.6, h: 0.5, margin: 0,
    fontFace: KR, fontSize: 16, color: ICE,
  });
  s.addShape(pres.shapes.LINE, { x: 0.72, y: 3.55, w: 2.2, h: 0, line: { color: ACCENT, width: 3 } });
  s.addText("Nexacro N  ·  TOBESOFT", {
    x: 0.7, y: 4.65, w: 8.6, h: 0.35, margin: 0,
    fontFace: KR, fontSize: 12, color: "8FA8D9",
  });
}

// ───────────────────────── 2. 로드맵 ─────────────────────────
{
  const s = pres.addSlide();
  titleBar(s, "PART 4 ROADMAP", "4부 — 배운 전부를 하나의 시스템으로");
  s.addText([
    { text: "이번 부의 규칙: ", options: { bold: true, color: ACCENT } },
    { text: "강사는 설계서와 완성 기준만 준다. 코드는 여러분이 짠다 — 막히면 1~3부 자료가 답이다.", options: { color: "374151" } },
  ], { x: 0.5, y: 1.35, w: 9, h: 0.4, margin: 0, fontFace: KR, fontSize: 13.5 });

  const items = [
    ["13", "설계와 골격", "요구사항 정의 → 화면 구성도 → 메인 프레임 + 공통 모듈(comm.xjs)", "산출물: 프로젝트 골격"],
    ["14", "목록 화면", "검색조건 + Grid + 건수/정렬 + 더블클릭 상세 이동", "산출물: EMP_M001"],
    ["15", "상세/등록 화면", "신규·수정 겸용 폼 + 검증 + 저장/삭제 + 부서 팝업", "산출물: EMP_M002, POP"],
    ["16", "배포와 총정리", "Generate → 웹서버 배포 → 코드 리뷰 → 과정 총정리", "산출물: 동작하는 시스템"],
  ];
  const w = 2.1, gap = 0.2, y = 1.95, h = 2.85;
  items.forEach(([n, t, d, lab], i) => {
    const x = 0.5 + i * (w + gap);
    s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: LIGHT } });
    s.addShape(pres.shapes.OVAL, { x: x + 0.16, y: y + 0.18, w: 0.5, h: 0.5, fill: { color: NAVY } });
    s.addText(n, { x: x + 0.16, y: y + 0.18, w: 0.5, h: 0.5, margin: 0, fontFace: KR, fontSize: 17, bold: true, color: WHITE, align: "center", valign: "middle" });
    s.addText(t, { x: x + 0.16, y: y + 0.8, w: w - 0.32, h: 0.4, margin: 0, fontFace: KR, fontSize: 14, bold: true, color: DARKTXT });
    s.addText(d, { x: x + 0.16, y: y + 1.25, w: w - 0.32, h: 1.1, margin: 0, fontFace: KR, fontSize: 10.5, color: "374151", valign: "top" });
    s.addText(lab, { x: x + 0.16, y: y + h - 0.45, w: w - 0.32, h: 0.32, margin: 0, fontFace: KR, fontSize: 10, bold: true, color: ACCENT });
  });
  s.addText("평가: 최종 프로젝트 50% — 기능 완성도 + 코드 품질 + 발표 (강의계획서 5.2)", {
    x: 0.5, y: 5.0, w: 9, h: 0.35, margin: 0, fontFace: KR, fontSize: 11.5, italic: true, color: MUTED,
  });
}

// ───────────────────────── 13차시 ─────────────────────────
divider("13", "프로젝트 설계와 골격", [
  "요구사항 정의 — 무엇을 만드는가",
  "화면 구성도와 명명 규칙",
  "공통 모듈(comm.xjs) — 프로젝트의 기반 공사",
  "실습 — 메인 프레임 + 공통 구조 완성",
]);

// 4. 요구사항
{
  const s = pres.addSlide();
  titleBar(s, "13차시 — 설계", "요구사항 정의서 — 사원 관리 시스템");
  const rows = [
    ["ID", "기능", "상세 요구사항", "사용 기술(복습)"],
    ["R-01", "사원 목록 조회", "부서·이름 검색조건, Grid 표시, 총 건수, 헤더 정렬", "transaction, Grid (10·9차시)"],
    ["R-02", "상세 보기", "목록 더블클릭 → 상세 화면, 단건 데이터 표시", "화면 전환, 바인딩 (12·8차시)"],
    ["R-03", "신규 등록", "빈 폼에서 입력 → 저장. 사번은 서버 채번", "Dataset, CRUD (7·11차시)"],
    ["R-04", "수정 / 삭제", "기존 사원 수정·삭제, 필수값 검증, 확인창", "검증, :U 전송 (4·11차시)"],
    ["R-05", "부서 검색 팝업", "돋보기 → Modal 팝업에서 부서 선택", "showModal (12차시)"],
    ["R-06", "공통화", "메시지·통신·팝업은 공통 함수(gfn_)로", ".xjs include (12차시)"],
  ];
  s.addTable(rows.map((r, ri) => r.map((c, ci) => ({
    text: c,
    options: {
      fontFace: ci === 0 ? MONO : KR,
      fontSize: ri === 0 ? 11.5 : 10.5,
      bold: ri === 0,
      color: ri === 0 ? WHITE : "374151",
      fill: { color: ri === 0 ? NAVY : ri % 2 ? "F7F9FE" : WHITE },
      align: "left", valign: "middle",
    },
  }))), {
    x: 0.5, y: 1.5, w: 9.0, colW: [0.8, 1.8, 4.0, 2.4], rowH: 0.46,
    border: { pt: 0.75, color: "D9E2F1" },
  });
  s.addText("모든 요구사항이 이미 배운 것의 조합이다 — 새 기술은 없다. 조립하는 힘이 이번 부의 목표.", {
    x: 0.5, y: 4.95, w: 9, h: 0.4, margin: 0, fontFace: KR, fontSize: 12, italic: true, color: ACCENT,
  });
}

// 5. 화면 구성도
{
  const s = pres.addSlide();
  titleBar(s, "13차시 — 설계", "화면 구성도와 명명 규칙");
  // 구성도
  flowBox(s, 0.5, 1.6, 2.5, 0.8, "PRJ_Main\n메인 (메뉴+작업영역)", { fill: NAVY, fontSize: 11.5 });
  flowBox(s, 3.6, 1.6, 2.5, 0.8, "EMP_M001_List\n사원 목록", { fill: ACCENT, fontSize: 11.5 });
  flowBox(s, 6.7, 1.6, 2.5, 0.8, "EMP_M002_Detail\n사원 상세/등록", { fill: ACCENT, fontSize: 11.5 });
  flowBox(s, 6.7, 2.7, 2.5, 0.6, "POP_Dept\n부서 검색 팝업", { fill: LIGHT, color: DARKTXT, fontSize: 11 });
  s.addText("→ div_work에 로드", { x: 3.0, y: 1.32, w: 1.7, h: 0.26, margin: 0, fontFace: KR, fontSize: 8.5, bold: true, color: MUTED, align: "center" });
  s.addText("→", { x: 3.05, y: 1.8, w: 0.5, h: 0.4, margin: 0, fontFace: KR, fontSize: 16, bold: true, color: MUTED, align: "center" });
  s.addText("더블클릭 ⇄ 목록", { x: 6.12, y: 1.32, w: 1.6, h: 0.26, margin: 0, fontFace: KR, fontSize: 8.5, bold: true, color: MUTED, align: "center" });
  s.addText("⇄", { x: 6.15, y: 1.8, w: 0.5, h: 0.4, margin: 0, fontFace: KR, fontSize: 16, bold: true, color: MUTED, align: "center" });
  s.addText("↑ showModal", { x: 7.95, y: 2.42, w: 1.25, h: 0.26, margin: 0, fontFace: KR, fontSize: 9, bold: true, color: MUTED });

  // 명명 규칙
  s.addText("명명 규칙 — 이름만 봐도 알 수 있게 (SI 현장 관례)", { x: 0.5, y: 3.0, w: 5.5, h: 0.35, margin: 0, fontFace: KR, fontSize: 14, bold: true, color: DARKTXT });
  s.addTable([
    ["부분", "의미", "예"].map(t => ({ text: t, options: { bold: true, fill: { color: NAVY }, color: WHITE, fontSize: 10.5, fontFace: KR } })),
    [{ text: "EMP", options: { fontFace: MONO, fontSize: 10.5, color: "374151" } }, { text: "업무 코드 (사원)", options: { fontSize: 10.5, fontFace: KR, color: "374151" } }, { text: "DEPT, ORD …", options: { fontSize: 10.5, fontFace: KR, color: "374151" } }],
    [{ text: "M001", options: { fontFace: MONO, fontSize: 10.5, color: "374151" } }, { text: "화면 구분 + 일련번호", options: { fontSize: 10.5, fontFace: KR, color: "374151" } }, { text: "M=Main, POP=팝업", options: { fontSize: 10.5, fontFace: KR, color: "374151" } }],
    [{ text: "_List", options: { fontFace: MONO, fontSize: 10.5, color: "374151" } }, { text: "용도", options: { fontSize: 10.5, fontFace: KR, color: "374151" } }, { text: "_List, _Detail", options: { fontSize: 10.5, fontFace: KR, color: "374151" } }],
  ], { x: 0.5, y: 3.45, w: 5.5, colW: [1.2, 2.3, 2.0], rowH: 0.4, border: { pt: 0.75, color: "D9E2F1" } });

  card(s, 6.3, 3.55, 3.2, 1.5, "왜 규칙이 먼저인가", "화면이 수백 개가 되면 “이름 = 문서”다.\n파일명·컴포넌트 접두어(edt_, grd_)·함수 접두어(fn_, gfn_)를 첫날 정하고 끝까지 지키는 것이 설계의 절반.");
}

// 6. 공통 모듈
{
  const s = pres.addSlide();
  titleBar(s, "13차시 — 설계", "기반 공사 — comm.xjs 공통 모듈");
  s.addText([
    { text: "화면을 만들기 전에 공통부터 — 순서가 중요하다", options: { bold: true, fontSize: 13.5, color: DARKTXT, breakLine: true } },
    { text: "화면 3개를 만든 뒤 공통화하면 “3번 고치는 일”이 된다", options: { bullet: { code: "2022" }, breakLine: true } },
    { text: "첫 화면을 짜기 전에 gfn_ 함수를 먼저 확정", options: { bullet: { code: "2022" }, breakLine: true } },
    { text: "통신 래퍼(gfn_transaction)에 로그를 심으면 디버깅이 쉬워진다", options: { bullet: { code: "2022" } } },
  ], { x: 0.5, y: 1.5, w: 4.4, h: 1.9, margin: 0, fontFace: KR, fontSize: 12, color: "374151", paraSpaceAfter: 7, valign: "top" });

  s.addTable([
    ["함수", "역할"].map(t => ({ text: t, options: { bold: true, fill: { color: NAVY }, color: WHITE, fontSize: 10.5, fontFace: KR } })),
    [{ text: "gfn_isEmpty / gfn_nvl", options: { fontFace: MONO, fontSize: 9.5, color: "374151" } }, { text: "널·공백 처리", options: { fontSize: 10, fontFace: KR, color: "374151" } }],
    [{ text: "gfn_alert / gfn_confirm", options: { fontFace: MONO, fontSize: 9.5, color: "374151" } }, { text: "메시지 (추후 일괄 교체 대비)", options: { fontSize: 10, fontFace: KR, color: "374151" } }],
    [{ text: "gfn_transaction", options: { fontFace: MONO, fontSize: 9.5, color: "374151" } }, { text: "통신 래퍼 + 요청/응답 로그", options: { fontSize: 10, fontFace: KR, color: "374151" } }],
    [{ text: "gfn_callbackCheck", options: { fontFace: MONO, fontSize: 9.5, color: "374151" } }, { text: "콜백 1차 오류 처리", options: { fontSize: 10, fontFace: KR, color: "374151" } }],
    [{ text: "gfn_openPopup", options: { fontFace: MONO, fontSize: 9.5, color: "374151" } }, { text: "Modal 팝업 표준 호출", options: { fontSize: 10, fontFace: KR, color: "374151" } }],
    [{ text: "gfn_hasChanges", options: { fontFace: MONO, fontSize: 9.5, color: "374151" } }, { text: "Dataset 변경분 존재 체크", options: { fontSize: 10, fontFace: KR, color: "374151" } }],
  ], { x: 0.5, y: 3.42, w: 4.4, colW: [2.1, 2.3], rowH: 0.28, border: { pt: 0.75, color: "D9E2F1" } });

  codeBlock(s, 5.15, 1.5, 4.35, 3.65, [
    { t: "// 각 폼의 콜백 — 공통 체크 후 분기", c: "7C8DB5" },
    { t: "this.fn_callback =" },
    { t: "  function(svcID, code, msg)" },
    { t: "{" },
    { t: "  if (!this.gfn_callbackCheck(" },
    { t: "        svcID, code, msg)) return;" },
    { t: "" },
    { t: "  if (svcID == \"svcEmpList\") { … }" },
    { t: "};" },
    { t: "" },
    { t: "// 통신도 래퍼로 통일", c: "7C8DB5" },
    { t: "this.gfn_transaction(\"svcEmpList\"," },
    { t: "  \"svc::emp/list.do\", \"\"," },
    { t: "  \"ds_emp=ds_out\", args, \"fn_callback\");" },
  ], 10.5);
}

// 7. 13차시 실습
{
  const s = pres.addSlide();
  titleBar(s, "13차시 — 실습", "오늘의 작업 — 골격 완성 체크리스트");
  const checks = [
    ["프로젝트 생성 + Services 등록 (svc → localhost:8090)", "TypeDefinition에서 확인"],
    ["Lib 폴더에 comm.xjs 작성, include 동작 확인", "아무 폼에서 gfn_alert() 호출이 떠야 함"],
    ["PRJ_Main: 상단 타이틀 + 좌측 메뉴 + div_work", "anchor로 창 크기 변경에 따라오는지 확인"],
    ["메뉴 클릭 → div_work.set_url 화면 전환 동작", "빈 폼 2개로 전환 테스트"],
    ["fn_moveDetail / fn_moveList 공개 함수 골격", "gv_empId 전달 방식 — 14·15차시에서 사용"],
  ];
  let y = 1.5;
  checks.forEach(([t, c], i) => { checkRow(s, 0.5, y, 5.6, i, t, c); y += 0.7; });

  card(s, 6.3, 1.5, 3.2, 1.5, "참고 코드", "examples/project_emp_mgmt/\n· PRJ_Main.xfdl\n· comm.xjs\n막히면 열어보되, 먼저 직접 시도!");
  s.addShape(pres.shapes.RECTANGLE, { x: 6.3, y: 3.2, w: 3.2, h: 1.95, fill: { color: NAVY } });
  s.addText([
    { text: "오늘의 함정 ⚠", options: { bold: true, color: ICE, breakLine: true, fontSize: 12.5 } },
    { text: "set_url은 비동기 — 화면 전환 직후 자식 폼 함수 호출은 실패한다. 값은 부모에 두고(gv_empId), 자식 onload에서 가져가게 설계할 것.", options: { color: WHITE, fontSize: 11.5 } },
  ], { x: 6.5, y: 3.2, w: 2.8, h: 1.95, margin: 0, fontFace: KR, valign: "middle" });
}

// ───────────────────────── 14차시 ─────────────────────────
divider("14", "목록 화면 개발", [
  "화면 설계서 읽기 — EMP_M001_List",
  "조회 흐름: 부서 로드 → 첫 조회 (콜백 체인)",
  "더블클릭 상세 이동, Enter 검색, 정렬",
  "실습 — 목록 화면 완성",
]);

// 9. 목록 설계서
{
  const s = pres.addSlide();
  titleBar(s, "14차시 — 목록 화면", "화면 설계서 — EMP_M001_List");
  // 목업
  const X = 0.5, Y = 1.55, W = 5.4, H = 3.4;
  s.addShape(pres.shapes.RECTANGLE, { x: X, y: Y, w: W, h: H, fill: { color: WHITE }, line: { color: NAVY, width: 1.5 } });
  s.addText("사원 목록", { x: X + 0.15, y: Y + 0.08, w: 2, h: 0.3, margin: 0, fontFace: KR, fontSize: 11, bold: true, color: DARKTXT });
  // 검색영역
  s.addShape(pres.shapes.RECTANGLE, { x: X + 0.15, y: Y + 0.45, w: W - 0.3, h: 0.5, fill: { color: LIGHT }, line: { color: "C5D3EC", width: 0.75 } });
  s.addText("부서[콤보]  이름[Edit]                    [조회] [신규 등록]", { x: X + 0.25, y: Y + 0.45, w: W - 0.5, h: 0.5, margin: 0, fontFace: KR, fontSize: 9, color: "374151", valign: "middle" });
  // Grid
  s.addShape(pres.shapes.RECTANGLE, { x: X + 0.15, y: Y + 1.1, w: W - 0.3, h: 1.75, fill: { color: "FBFCFE" }, line: { color: "C5D3EC", width: 0.75 } });
  s.addShape(pres.shapes.RECTANGLE, { x: X + 0.15, y: Y + 1.1, w: W - 0.3, h: 0.32, fill: { color: NAVY } });
  s.addText("사번 | 이름 | 부서 | 연봉 | 입사일 | 이메일", { x: X + 0.25, y: Y + 1.1, w: W - 0.5, h: 0.32, margin: 0, fontFace: KR, fontSize: 8.5, color: WHITE, valign: "middle" });
  s.addText("Grid (binddataset=ds_emp)\n· 부서: 코드→명칭  · 연봉: #,##0  · 입사일: yyyy-MM-dd\n· 더블클릭 → 상세 이동", { x: X + 0.3, y: Y + 1.5, w: W - 0.6, h: 1.2, margin: 0, fontFace: KR, fontSize: 9.5, color: MUTED, valign: "middle" });
  // 하단
  s.addText("총 N건", { x: X + 0.15, y: Y + H - 0.42, w: 1.5, h: 0.3, margin: 0, fontFace: KR, fontSize: 9, color: "374151" });
  s.addText("(행 더블클릭 안내)", { x: X + W - 1.8, y: Y + H - 0.42, w: 1.6, h: 0.3, margin: 0, fontFace: KR, fontSize: 9, color: MUTED, align: "right" });

  // 우측 요구 매핑
  const map = [
    ["검색영역", "6차시 검색바 그대로 + [신규 등록] 버튼 추가"],
    ["Grid 표시", "8차시 displaytype 3종 (combo·number·date)"],
    ["정렬·건수", "9차시 keystring + getRowCount()"],
    ["상세 이동", "parent.parent.fn_moveDetail(사번)"],
  ];
  let my = 1.55;
  map.forEach(([h2, b]) => {
    card(s, 6.2, my, 3.3, 0.82, h2, b);
    my += 0.94;
  });
}

// 10. 콜백 체인
{
  const s = pres.addSlide();
  titleBar(s, "14차시 — 목록 화면", "구현 포인트 ① — 초기화 순서: 콜백 체인");
  s.addText("문제: 부서 콤보가 로드되기 전에 첫 조회를 하면? — 비동기이므로 순서가 보장되지 않는다", {
    x: 0.5, y: 1.4, w: 9, h: 0.35, margin: 0, fontFace: KR, fontSize: 13, bold: true, color: "B42318",
  });
  // 체인 다이어그램
  flowBox(s, 0.5, 1.95, 2.0, 0.8, "onload\n부서 조회 요청", { fill: NAVY, fontSize: 11 });
  flowBox(s, 3.0, 1.95, 2.3, 0.8, "콜백(svcDeptList)\n“전체” 행 추가", { fill: LIGHT, color: DARKTXT, fontSize: 11 });
  flowBox(s, 5.8, 1.95, 1.9, 0.8, "fn_search()\n사원 조회 요청", { fill: ACCENT, fontSize: 11 });
  flowBox(s, 8.2, 1.95, 1.3, 0.8, "콜백\n건수 표시", { fill: NAVY, fontSize: 11 });
  s.addText("→", { x: 2.52, y: 2.15, w: 0.45, h: 0.4, margin: 0, fontFace: KR, fontSize: 16, bold: true, color: MUTED, align: "center" });
  s.addText("→", { x: 5.32, y: 2.15, w: 0.45, h: 0.4, margin: 0, fontFace: KR, fontSize: 16, bold: true, color: MUTED, align: "center" });
  s.addText("→", { x: 7.72, y: 2.15, w: 0.45, h: 0.4, margin: 0, fontFace: KR, fontSize: 16, bold: true, color: MUTED, align: "center" });

  codeBlock(s, 0.5, 3.0, 5.6, 2.1, [
    { t: "this.fn_callback = function(svcID, code, msg)" },
    { t: "{" },
    { t: "  if (!this.gfn_callbackCheck(svcID,code,msg)) return;" },
    { t: "" },
    { t: "  if (svcID == \"svcDeptList\") {" },
    { t: "    var n = this.ds_dept.insertRow(0);  // \"전체\"", c: "9FE8B6" },
    { t: "    this.cbo_dept.set_index(0);" },
    { t: "    this.fn_search();   // ← 여기서 다음 단계!", c: "9FE8B6" },
    { t: "  }" },
    { t: "};" },
  ], 10.5);
  card(s, 6.3, 3.0, 3.2, 2.1, "패턴 이름: 콜백 체인", "다음 작업을 “이전 작업의 콜백 안에서” 시작한다.\n\n비동기 세계에서 순서를 만드는 유일한 방법 — 3부 비동기 개념의 실전 적용이다.");
}

// 11. 상세 이동 + 디테일
{
  const s = pres.addSlide();
  titleBar(s, "14차시 — 목록 화면", "구현 포인트 ② — 이동과 사용성 디테일");
  codeBlock(s, 0.5, 1.5, 5.6, 2.6, [
    { t: "// 더블클릭 → 상세 (신규는 null 전달)", c: "7C8DB5" },
    { t: "this.grd_emp_oncelldblclick = function(obj,e)" },
    { t: "{" },
    { t: "  var empId = this.ds_emp.getColumn(" },
    { t: "                  e.row, \"EMP_ID\");" },
    { t: "  this.parent.parent.fn_moveDetail(empId);" },
    { t: "};" },
    { t: "" },
    { t: "// Enter로 조회 — 작지만 체감 큰 디테일", c: "7C8DB5" },
    { t: "this.edt_name_onkeyup = function(obj, e)" },
    { t: "{" },
    { t: "  if (e.keycode == 13) this.fn_search();" },
    { t: "};" },
  ], 10.5);
  card(s, 6.3, 1.5, 3.2, 1.25, "e.row를 쓰는 이유", "더블클릭한 바로 그 행 — rowposition과 거의 같지만, 이벤트가 알려주는 값이 더 정확하다.");
  card(s, 6.3, 2.93, 3.2, 1.17, "사용성 3종 세트", "① Enter 조회\n② 더블클릭 상세\n③ 총 건수 표시 — 실무 화면의 기본 매너.");
  tipBar(s, "헤더 정렬", "9차시 onheadclick 코드를 그대로 재사용 — “한 번 익힌 패턴은 복사가 아니라 재사용”. 공통화 후보가 또 하나 늘었다.", 4.4, 0.7);
}

// 12. 14차시 실습
{
  const s = pres.addSlide();
  titleBar(s, "14차시 — 실습", "오늘의 완성 기준 — 목록 화면");
  const checks = [
    ["부서 콤보에 “전체” 포함 로드 → 자동 첫 조회", "화면 열자마자 5명 표시"],
    ["부서·이름 검색 동작 (조합 검색 포함)", "개발팀+\"김\" → 1명"],
    ["Grid: 부서명·콤마·날짜 형식 표시", "D01이 아니라 “개발팀”"],
    ["총 건수 표시 + 헤더 클릭 정렬", "연봉 클릭 → 오름/내림 토글"],
    ["더블클릭 → 상세 이동 / [신규 등록] → 빈 상세", "15차시 화면과 연결"],
  ];
  let y = 1.5;
  checks.forEach(([t, c], i) => { checkRow(s, 0.5, y, 5.6, i, t, c); y += 0.7; });

  card(s, 6.3, 1.5, 3.2, 1.5, "참고 코드", "examples/project_emp_mgmt/\n· EMP_M001_List.xfdl\n완성 기준을 모두 통과한 뒤 비교 리뷰할 것.");
  s.addShape(pres.shapes.RECTANGLE, { x: 6.3, y: 3.2, w: 3.2, h: 1.95, fill: { color: NAVY } });
  s.addText([
    { text: "막혔을 때 진단 순서", options: { bold: true, color: ICE, breakLine: true, fontSize: 12.5 } },
    { text: "① 출력창에 trace 로그 있나?\n② 콜백 함수명 오타?\n③ Mock 서버 살아있나?\n④ Services url 등록했나?", options: { color: WHITE, fontSize: 11.5 } },
  ], { x: 6.5, y: 3.2, w: 2.8, h: 1.95, margin: 0, fontFace: KR, valign: "middle" });
}

// ───────────────────────── 15차시 ─────────────────────────
divider("15", "상세/등록 화면 개발", [
  "신규·수정 겸용 폼 — 모드 패턴",
  "단건 Dataset과 바인딩 — 빈 행의 비밀",
  "저장·삭제와 부서 팝업 연동",
  "실습 — 상세 화면 완성, 시스템 연결",
]);

// 14. 모드 패턴
{
  const s = pres.addSlide();
  titleBar(s, "15차시 — 상세 화면", "하나의 폼, 두 가지 모드 — 신규/수정 겸용");
  // 모드 분기 다이어그램
  flowBox(s, 0.5, 1.6, 2.3, 0.75, "onload\ngv_empId 확인", { fill: NAVY, fontSize: 11.5 });
  flowBox(s, 3.6, 1.35, 2.7, 0.62, "null → 신규 모드\n빈 폼, [삭제] 비활성", { fill: LIGHT, color: DARKTXT, fontSize: 10.5 });
  flowBox(s, 3.6, 2.15, 2.7, 0.62, "값 있음 → 수정 모드\n단건 조회 후 표시", { fill: LIGHT, color: DARKTXT, fontSize: 10.5 });
  s.addText("→", { x: 2.85, y: 1.5, w: 0.7, h: 0.35, margin: 0, fontFace: KR, fontSize: 14, bold: true, color: MUTED, align: "center" });
  s.addText("→", { x: 2.85, y: 2.25, w: 0.7, h: 0.35, margin: 0, fontFace: KR, fontSize: 14, bold: true, color: MUTED, align: "center" });

  codeBlock(s, 0.5, 3.1, 5.8, 2.05, [
    { t: "this.EMP_M002_Detail_onload = function(obj,e)" },
    { t: "{" },
    { t: "  var empId = this.parent.parent.gv_empId;" },
    { t: "  this.gv_isNew = this.gfn_isEmpty(empId);" },
    { t: "" },
    { t: "  this.ds_detail.clearData();" },
    { t: "  this.ds_detail.addRow();  // ★ 빈 행 1개", c: "9FE8B6" },
    { t: "" },
    { t: "  if (this.gv_isNew) { /* 신규 준비 */ }" },
    { t: "  else { /* 단건 조회 요청 */ }" },
    { t: "};" },
  ], 10.5);

  card(s, 6.6, 1.35, 2.9, 1.42, "왜 겸용으로 만드나", "신규 폼과 수정 폼은 95% 동일 — 따로 만들면 수정할 곳이 2배.\n모드 플래그(gv_isNew) 하나로 분기하는 것이 표준.");
  card(s, 6.6, 2.95, 2.9, 1.42, "★ 빈 행의 비밀", "BindItem은 “현재 행”에 연결된다 — 행이 0개면 입력해도 갈 곳이 없다!\naddRow() 한 줄이 바인딩 폼의 필수 초기화.");
}

// 15. 단건 조회/copyRow
{
  const s = pres.addSlide();
  titleBar(s, "15차시 — 상세 화면", "구현 포인트 ① — 단건 데이터 채우기");
  codeBlock(s, 0.5, 1.5, 5.6, 3.0, [
    { t: "// 수정 모드: 조회 결과에서 해당 사원 찾아 복사", c: "7C8DB5" },
    { t: "this.fn_callback = function(svcID, code, msg)" },
    { t: "{" },
    { t: "  if (!this.gfn_callbackCheck(svcID,code,msg))" },
    { t: "    return;" },
    { t: "" },
    { t: "  if (svcID == \"svcEmpOne\") {" },
    { t: "    var n = this.ds_emp.findRow(" },
    { t: "              \"EMP_ID\", this.gv_empId);" },
    { t: "    // 결과 행 → 상세 DS 0행으로 복사", c: "7C8DB5" },
    { t: "    this.ds_detail.copyRow(0, this.ds_emp, n);", c: "9FE8B6" },
    { t: "  }" },
    { t: "};" },
  ], 10.5);
  card(s, 6.3, 1.5, 3.2, 1.3, "copyRow의 역할", "목록용 ds_emp에서 상세용 ds_detail로 한 행을 통째로 복사 — 바인딩이 즉시 폼을 채운다.");
  card(s, 6.3, 3.0, 3.2, 1.5, "과제로 생각해 보기", "지금은 목록 서비스를 재사용해 단건을 찾는다.\n실무라면? — 서버에 “단건 조회 서비스”를 따로 만드는 것이 정석. 이유를 토론해 보자.");
}

// 16. 저장/삭제/팝업
{
  const s = pres.addSlide();
  titleBar(s, "15차시 — 상세 화면", "구현 포인트 ② — 저장 · 삭제 · 부서 팝업");
  const items = [
    ["저장", "11차시 4단계 그대로: 검증 → confirm → ds_detail:U 전송 → 콜백에서 fn_moveList()", "신규는 INSERT 상태(addRow), 수정은 UPDATE — 모드 분기 없이 :U가 알아서 구분"],
    ["삭제", "deleteRow(0) 후 :U 전송 — “삭제도 저장의 일종”", "confirm 필수. 성공 후 목록 복귀"],
    ["부서 팝업", "🔍 → gfn_openPopup(POP_Dept) → 콜백에서 코드·명칭 setColumn", "바인딩 덕분에 setColumn만 하면 화면 자동 갱신"],
  ];
  let y = 1.5;
  items.forEach(([h2, b, foot]) => {
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 9.0, h: 1.0, fill: { color: LIGHT } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 0.07, h: 1.0, fill: { color: NAVY } });
    s.addText(h2, { x: 0.72, y: y + 0.1, w: 1.3, h: 0.8, margin: 0, fontFace: KR, fontSize: 14, bold: true, color: DARKTXT, valign: "middle" });
    s.addText(b, { x: 2.1, y: y + 0.1, w: 4.4, h: 0.8, margin: 0, fontFace: KR, fontSize: 10.5, color: "374151", valign: "middle" });
    s.addText(foot, { x: 6.65, y: y + 0.1, w: 2.75, h: 0.8, margin: 0, fontFace: KR, fontSize: 9.5, italic: true, color: ACCENT, valign: "middle" });
    y += 1.12;
  });
  tipBar(s, "연결 확인", "저장 성공 → 목록 복귀 → 방금 등록한 사원이 보이는가? 이 “한 바퀴”가 돌면 시스템이 연결된 것이다.", 4.9, 0.55);
}

// 17. 15차시 실습
{
  const s = pres.addSlide();
  titleBar(s, "15차시 — 실습", "오늘의 완성 기준 — 상세 화면과 전체 연결");
  const checks = [
    ["신규 모드: 빈 폼 + [삭제] 비활성 + 이름 포커스", "목록 [신규 등록]으로 진입"],
    ["수정 모드: 더블클릭한 사원 정보가 채워짐", "타이틀에 사번 표시"],
    ["필수값(이름·부서) + 이메일 형식 검증", "빈 값 저장 시도 → 경고 + 포커스"],
    ["부서 팝업 선택 → 폼에 부서명 표시", "바인딩 자동 갱신 확인"],
    ["저장/삭제 → 목록 복귀 → 결과 반영 확인", "“한 바퀴” 시나리오 통과"],
  ];
  let y = 1.5;
  checks.forEach(([t, c], i) => { checkRow(s, 0.5, y, 5.6, i, t, c); y += 0.7; });

  card(s, 6.3, 1.5, 3.2, 1.5, "참고 코드", "examples/project_emp_mgmt/\n· EMP_M002_Detail.xfdl\n· POP_Dept.xfdl");
  s.addShape(pres.shapes.RECTANGLE, { x: 6.3, y: 3.2, w: 3.2, h: 1.95, fill: { color: NAVY } });
  s.addText([
    { text: "심화 과제 (여유 있는 사람)", options: { bold: true, color: ICE, breakLine: true, fontSize: 12.5 } },
    { text: "· 수정 모드에서 “변경 없음” 저장 차단\n· 닫기 전 미저장 변경 경고\n· 부서 관리 화면(R-06 너머) 도전", options: { color: WHITE, fontSize: 11.5 } },
  ], { x: 6.5, y: 3.2, w: 2.8, h: 1.95, margin: 0, fontFace: KR, valign: "middle" });
}

// ───────────────────────── 16차시 ─────────────────────────
divider("16", "배포와 총정리", [
  "Generate와 배포 — 1부 아키텍처의 회수",
  "캐시와 업데이트의 원리",
  "코드 리뷰 — 자주 하는 실수 체크리스트",
  "과정 총정리와 다음 단계",
]);

// 19. 배포
{
  const s = pres.addSlide();
  titleBar(s, "16차시 — 배포", "배포 — 1부에서 본 그림을 직접 해본다");
  flowBox(s, 0.5, 1.7, 2.2, 0.95, "소스\n.xfdl · .xjs · .xadl", { fill: LIGHT, color: DARKTXT, fontSize: 11.5 });
  flowBox(s, 3.2, 1.7, 2.2, 0.95, "Generate\nBuild > Generate\nApplication", { fill: ACCENT, fontSize: 11 });
  flowBox(s, 5.9, 1.7, 2.2, 0.95, "웹서버 복사\nTomcat·nginx 등\n문서 루트", { fill: LIGHT, color: DARKTXT, fontSize: 11 });
  flowBox(s, 8.45, 1.7, 1.05, 0.95, "브라우저\n접속", { fill: NAVY, fontSize: 11 });
  s.addText("→", { x: 2.72, y: 1.95, w: 0.45, h: 0.4, margin: 0, fontFace: KR, fontSize: 16, bold: true, color: MUTED, align: "center" });
  s.addText("→", { x: 5.42, y: 1.95, w: 0.45, h: 0.4, margin: 0, fontFace: KR, fontSize: 16, bold: true, color: MUTED, align: "center" });
  s.addText("→", { x: 8.1, y: 1.95, w: 0.35, h: 0.4, margin: 0, fontFace: KR, fontSize: 16, bold: true, color: MUTED, align: "center" });

  card(s, 0.5, 3.0, 4.4, 1.6, "캐시의 원리", "런타임은 변환된 파일을 로컬에 저장(캐시)한다.\n재배포 후에도 화면이 안 바뀌면 → 십중팔구 캐시.\n개발 중: 강력 새로고침(Ctrl+Shift+R)\n운영: 버전 갱신으로 캐시 무효화");
  card(s, 5.1, 3.0, 4.4, 1.6, "F6과 배포의 차이", "QuickView(F6) = Studio가 임시로 띄워주는 개발용 실행.\n배포 = Generate 결과물을 웹서버에 올려 “남이 쓸 수 있게” 만드는 것.\n프로젝트의 마지막 단계는 항상 배포 검증.");
  tipBar(s, "실습", "Generate 실행 → 출력 폴더 확인(.xfdl.js로 변환됨) → 간단한 웹서버로 띄워 브라우저 접속까지. “내 손으로 한 번”이 중요.", 4.8, 0.6);
}

// 20. 실수 체크리스트
{
  const s = pres.addSlide();
  titleBar(s, "16차시 — 코드 리뷰", "자주 하는 실수 8 — 동료 코드 리뷰 체크리스트");
  const rows = [
    ["#", "실수", "증상", "처방"],
    ["1", "set_xxx() 대신 직접 대입", "화면이 안 바뀜", "실행 중 속성 변경은 setter"],
    ["2", "콜백 함수명 오타", "조회해도 무반응", "문자열이라 에러 없음 — trace로 확인"],
    ["3", "바인딩 폼에 빈 행 없음", "입력해도 값이 안 들어감", "onload에서 addRow()"],
    ["4", "저장 후 재조회 누락", "채번 미반영, U표시 안 풀림", "성공 콜백에서 fn_search()"],
    ["5", "transaction 다음 줄에서 결과 사용", "건수 0, 빈 Grid", "결과는 콜백 안에서"],
    ["6", "close()에 객체 전달", "부모 콜백 undefined", "JSON.stringify / parse"],
    ["7", "Calendar 값 형식 혼동", "날짜 비교·저장 오류", "value는 항상 yyyyMMdd"],
    ["8", "deleteRow를 즉시 삭제로 착각", "중복 삭제 요청", "삭제 확정은 저장 성공 시"],
  ];
  s.addTable(rows.map((r, ri) => r.map((c, ci) => ({
    text: c,
    options: {
      fontFace: KR, fontSize: ri === 0 ? 11 : 10,
      bold: ri === 0 || ci === 1 && ri > 0,
      color: ri === 0 ? WHITE : ci === 1 ? "B42318" : "374151",
      fill: { color: ri === 0 ? NAVY : ri % 2 ? "F7F9FE" : WHITE },
      align: ci === 0 ? "center" : "left", valign: "middle",
    },
  }))), {
    x: 0.5, y: 1.45, w: 9.0, colW: [0.45, 2.9, 2.6, 3.05], rowH: 0.395,
    border: { pt: 0.75, color: "D9E2F1" },
  });
}

// 21. 과정 총정리
{
  const s = pres.addSlide();
  titleBar(s, "과정 총정리", "16차시의 여정 — 무엇을 할 수 있게 되었나");
  const parts = [
    ["1부 (1~4)", "시작하기", "플랫폼 구조 이해, Studio, 폼과 이벤트, 스크립트 기초"],
    ["2부 (5~9)", "컴포넌트와 데이터", "입력 컴포넌트, Dataset ★, 바인딩, Grid 편집·정렬·합계"],
    ["3부 (10~12)", "서버 연동", "transaction과 비동기 콜백, CRUD 패턴, 팝업·공통화"],
    ["4부 (13~16)", "프로젝트", "설계→목록→상세→배포, 완성 기준과 코드 리뷰"],
  ];
  let y = 1.45;
  parts.forEach(([n, t, d], i) => {
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 5.6, h: 0.74, fill: { color: i === 3 ? NAVY : LIGHT } });
    s.addText(n, { x: 0.68, y: y + 0.06, w: 1.3, h: 0.62, margin: 0, fontFace: KR, fontSize: 11.5, bold: true, color: i === 3 ? ICE : ACCENT, valign: "middle" });
    s.addText(t, { x: 2.0, y: y + 0.06, w: 1.6, h: 0.62, margin: 0, fontFace: KR, fontSize: 12.5, bold: true, color: i === 3 ? WHITE : DARKTXT, valign: "middle" });
    s.addText(d, { x: 3.6, y: y + 0.06, w: 2.4, h: 0.62, margin: 0, fontFace: KR, fontSize: 9.5, color: i === 3 ? ICE : "374151", valign: "middle" });
    y += 0.84;
  });

  s.addText("이제 여러분은", { x: 6.4, y: 1.45, w: 3.1, h: 0.35, margin: 0, fontFace: KR, fontSize: 15, bold: true, color: DARKTXT });
  s.addText([
    { text: "요구사항을 화면 설계로 옮기고", options: { bullet: { code: "2713" }, breakLine: true } },
    { text: "Dataset 중심으로 화면을 조립하고", options: { bullet: { code: "2713" }, breakLine: true } },
    { text: "서버와 데이터를 주고받고", options: { bullet: { code: "2713" }, breakLine: true } },
    { text: "배포까지 — 혼자서 한 바퀴 돌 수 있다", options: { bullet: { code: "2713" } } },
  ], { x: 6.4, y: 1.9, w: 3.1, h: 1.8, margin: 0, fontFace: KR, fontSize: 11.5, color: "374151", paraSpaceAfter: 8, valign: "top" });
  tipBar(s, "면접 팁", "“넥사크로 해봤어요?”에 대한 최고의 답 — 이 프로젝트를 화면 구성도와 함께 5분으로 설명할 수 있게 정리해 둘 것.", 4.93, 0.55);
}

// 22. 다음 단계
{
  const s = pres.addSlide();
  s.background = { color: NAVY };
  s.addText("다음 단계", {
    x: 0.7, y: 0.85, w: 8.6, h: 0.5, margin: 0,
    fontFace: KR, fontSize: 15, bold: true, color: ACCENT, charSpacing: 3,
  });
  s.addText("기본기 위에 쌓을 것들", {
    x: 0.7, y: 1.3, w: 8.6, h: 0.7, margin: 0,
    fontFace: KR, fontSize: 30, bold: true, color: WHITE,
  });
  const nexts = [
    ["Nexacro N 심화", "MVC 블록 조합 개발, QuickCode(Low-Code) — 기본기를 아는 사람의 가속 페달"],
    ["Module Developer", "사내 공통 컴포넌트를 모듈로 만들어 배포 — 팀의 생산성을 만드는 역할"],
    ["고급 Grid · 테마", "멀티헤더, 트리 Grid, 대용량 처리 / XCSS로 디자인 시스템 적용"],
  ];
  let y = 2.25;
  nexts.forEach(([t, d]) => {
    s.addShape(pres.shapes.RECTANGLE, { x: 0.7, y, w: 8.6, h: 0.72, fill: { color: "27336E" } });
    s.addText(t, { x: 0.95, y: y + 0.08, w: 2.3, h: 0.56, margin: 0, fontFace: KR, fontSize: 13, bold: true, color: WHITE, valign: "middle" });
    s.addText(d, { x: 3.35, y: y + 0.08, w: 5.8, h: 0.56, margin: 0, fontFace: KR, fontSize: 11, color: ICE, valign: "middle" });
    y += 0.84;
  });
  s.addText("학습 자료:  docs.tobesoft.com/nexacro_n_ko (공식 매뉴얼)  ·  playnexacro.com (개발자 커뮤니티)", {
    x: 0.7, y: 5.0, w: 8.6, h: 0.35, margin: 0, fontFace: KR, fontSize: 12, color: "8FA8D9",
  });
}

pres.writeFile({ fileName: "/Users/yeon97/PRJT/OCR_PIPLELINE/nexacro_course/넥사크로_4부_강의자료.pptx" })
  .then(() => console.log("done"));
