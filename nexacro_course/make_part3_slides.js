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
pres.title = "넥사크로 3부 — 서버 연동과 화면 흐름 (10~12차시)";

// ───────── helpers (1·2부와 동일) ─────────
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

// ───────────────────────── 1. 표지 ─────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: NAVY };
  s.addText("NEXACRO PLATFORM 입문 과정", {
    x: 0.7, y: 1.15, w: 8.6, h: 0.4, margin: 0,
    fontFace: KR, fontSize: 15, bold: true, color: ACCENT, charSpacing: 3,
  });
  s.addText("3부 — 서버 연동과 화면 흐름", {
    x: 0.7, y: 1.65, w: 8.6, h: 1.0, margin: 0,
    fontFace: KR, fontSize: 40, bold: true, color: WHITE,
  });
  s.addText("Transaction · CRUD 패턴 · 화면 이동과 팝업  (10~12차시)", {
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
  titleBar(s, "PART 3 ROADMAP", "3부에서 배우는 것 — 드디어 진짜 데이터");
  s.addText([
    { text: "지금까지(2부): ", options: { bold: true, color: DARKTXT } },
    { text: "Dataset에 미리 넣어둔 가짜 데이터로 연습  ", options: { color: "374151" } },
    { text: "→  이제부터(3부): ", options: { bold: true, color: ACCENT } },
    { text: "서버에서 조회하고, 서버에 저장한다", options: { color: "374151" } },
  ], { x: 0.5, y: 1.35, w: 9, h: 0.4, margin: 0, fontFace: KR, fontSize: 13.5 });

  const items = [
    ["10", "서버 통신 — Transaction", "transaction() 6요소 해부, 입출력 Dataset 매핑, 응답 포맷(PlatformXml)과 콜백, ErrorCode 규약", "실습: 조회 → Grid 출력"],
    ["11", "CRUD 패턴 완성", "조회→편집→저장→재조회 사이클. 변경분만 전송(:U), rowtype의 실전 활용, 저장 후 동기화", "실습: 등록·수정·삭제 왕복"],
    ["12", "화면 이동과 팝업", "set_url 화면 전환, Modal 팝업의 부모-자식 데이터 교환, 공통 스크립트(.xjs) 분리", "실습: 사원 검색 팝업"],
  ];
  const w = 2.9, gap = 0.15, y = 1.95, h = 2.85;
  items.forEach(([n, t, d, lab], i) => {
    const x = 0.5 + i * (w + gap);
    s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: LIGHT } });
    s.addShape(pres.shapes.OVAL, { x: x + 0.18, y: y + 0.2, w: 0.52, h: 0.52, fill: { color: NAVY } });
    s.addText(n, { x: x + 0.18, y: y + 0.2, w: 0.52, h: 0.52, margin: 0, fontFace: KR, fontSize: 17, bold: true, color: WHITE, align: "center", valign: "middle" });
    s.addText(t, { x: x + 0.85, y: y + 0.25, w: w - 1.0, h: 0.75, margin: 0, fontFace: KR, fontSize: 13.5, bold: true, color: DARKTXT, valign: "top" });
    s.addText(d, { x: x + 0.18, y: y + 1.05, w: w - 0.36, h: 1.3, margin: 0, fontFace: KR, fontSize: 11, color: "374151", valign: "top" });
    s.addText(lab, { x: x + 0.18, y: y + h - 0.45, w: w - 0.36, h: 0.32, margin: 0, fontFace: KR, fontSize: 10.5, bold: true, color: ACCENT });
  });
  s.addText("준비물: Mock 서버 실행(node server.js) + Services 등록(svc = http://localhost:8090/)", {
    x: 0.5, y: 5.0, w: 9, h: 0.4, margin: 0, fontFace: KR, fontSize: 11.5, italic: true, color: MUTED,
  });
}

// ───────────────────────── 10차시 ─────────────────────────
divider("10", "서버 통신 — Transaction", [
  "통신의 큰 그림 — 요청은 지금, 응답은 나중에(비동기)",
  "transaction() 6요소 해부",
  "입출력 Dataset 매핑과 응답 포맷(PlatformXml)",
  "콜백과 ErrorCode 규약, 실습 — 서버 조회",
]);

// 4. 비동기 큰 그림
{
  const s = pres.addSlide();
  titleBar(s, "10차시 — 서버 통신", "가장 중요한 한 가지 — 통신은 비동기다");
  // 타임라인 다이어그램
  flowBox(s, 0.5, 1.7, 2.2, 0.85, "① transaction() 호출\n(요청을 보내고 즉시 리턴)", { fill: NAVY, fontSize: 11 });
  flowBox(s, 3.2, 1.7, 2.2, 0.85, "② 서버 처리 중…\n(화면은 멈추지 않는다)", { fill: LIGHT, color: DARKTXT, fontSize: 11 });
  flowBox(s, 5.9, 1.7, 2.2, 0.85, "③ 응답 도착\n→ 콜백 함수 자동 호출", { fill: ACCENT, fontSize: 11 });
  s.addText("→", { x: 2.72, y: 1.95, w: 0.45, h: 0.4, margin: 0, fontFace: KR, fontSize: 18, bold: true, color: MUTED, align: "center" });
  s.addText("→", { x: 5.42, y: 1.95, w: 0.45, h: 0.4, margin: 0, fontFace: KR, fontSize: 18, bold: true, color: MUTED, align: "center" });

  codeBlock(s, 0.5, 2.85, 5.6, 1.95, [
    { t: "this.transaction(\"svcList\", …, \"fn_callback\");" },
    { t: "" },
    { t: "// 이 줄은 응답이 오기 '전'에 실행된다!", c: "F4A0A0" },
    { t: "var cnt = this.ds_emp.getRowCount();  // 0 !!", c: "F4A0A0" },
    { t: "" },
    { t: "// 결과 처리는 반드시 콜백 안에서", c: "9FE8B6" },
    { t: "this.fn_callback = function(id, code, msg) {" },
    { t: "    var cnt = this.ds_emp.getRowCount(); // OK" },
    { t: "};" },
  ], 11.5);

  card(s, 6.3, 2.85, 3.2, 1.95, "왜 비동기인가?", "응답을 기다리며 화면을 얼리면(동기) 사용자는 멈춘 프로그램을 보게 된다.\n\n“요청은 지금, 처리는 나중에 콜백에서” — 3부 전체를 관통하는 규칙.");
  tipBar(s, "사고 전환", "transaction 다음 줄에서 결과를 쓰는 실수가 입문자 오류 1위. “다음 줄”이 아니라 “콜백”이 통신의 다음 줄이다.", 4.95, 0.55);
}

// 5. transaction 6요소
{
  const s = pres.addSlide();
  titleBar(s, "10차시 — 서버 통신", "transaction() 6요소 해부");
  codeBlock(s, 0.5, 1.45, 9.0, 1.5, [
    { t: "this.transaction(" },
    { t: "    \"svcEmpList\",          // ① 서비스ID    \"svc::emp/list.do\",   // ② URL", c: undefined },
    { t: "    \"ds_save=ds_emp:U\",    // ③ 입력 DS     \"ds_emp=ds_out\",      // ④ 출력 DS", c: undefined },
    { t: "    \"DEPT_CD=D01\",         // ⑤ 파라미터    \"fn_callback\");       // ⑥ 콜백 함수명", c: undefined },
  ], 11.5);

  const expl = [
    ["① 서비스ID", "이 통신의 이름표. 콜백에서 어떤 요청의 응답인지 구분하는 키"],
    ["② URL", "svc:: 는 TypeDefinition에 등록한 주소 별칭(prefixid). 환경이 바뀌어도 코드는 그대로"],
    ["③ 입력 Dataset", "\"보낼DS=내DS\" 형식. :U 를 붙이면 변경분(추가·수정·삭제)만 전송 (11차시)"],
    ["④ 출력 Dataset", "\"내DS=서버DS\" 형식. 서버가 보낸 Dataset이 내 Dataset으로 자동 복사"],
    ["⑤ 파라미터", "\"키=값 키=값\" — 공백으로 구분. 검색조건 등 단순 값 전달"],
    ["⑥ 콜백 함수명", "응답 도착 시 호출될 함수의 '이름 문자열'. 오타가 나도 에러가 안 난다 — 주의!"],
  ];
  const colX = [0.5, 5.05], colW = 4.45;
  expl.forEach(([h2, b], i) => {
    const x = colX[i % 2], y = 3.15 + Math.floor(i / 2) * 0.72;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: colW, h: 0.64, fill: { color: i % 2 ? "F7F9FE" : LIGHT } });
    s.addText(h2, { x: x + 0.15, y: y + 0.05, w: 1.35, h: 0.54, margin: 0, fontFace: KR, fontSize: 12, bold: true, color: NAVY, valign: "middle" });
    s.addText(b, { x: x + 1.55, y: y + 0.05, w: colW - 1.7, h: 0.54, margin: 0, fontFace: KR, fontSize: 10, color: "374151", valign: "middle" });
  });
}

// 6. Dataset 매핑
{
  const s = pres.addSlide();
  titleBar(s, "10차시 — 서버 통신", "입출력 Dataset 매핑 — “=”의 방향 읽는 법");
  // 출력 매핑 다이어그램 (좌)
  s.addText("④ 출력:  \"ds_emp = ds_out\"  → 받는다", { x: 0.5, y: 1.5, w: 4.1, h: 0.35, margin: 0, fontFace: KR, fontSize: 14, bold: true, color: DARKTXT });
  flowBox(s, 0.5, 1.95, 1.6, 0.8, "서버의\nds_out", { fill: LIGHT, color: DARKTXT, fontSize: 11.5 });
  s.addText("복사 →", { x: 2.15, y: 2.15, w: 0.8, h: 0.4, margin: 0, fontFace: KR, fontSize: 10.5, bold: true, color: ACCENT, align: "center" });
  flowBox(s, 3.0, 1.95, 1.6, 0.8, "내 화면의\nds_emp", { fill: NAVY, fontSize: 11.5 });
  s.addText("내 것이 왼쪽! 서버가 준 것을 내 그릇에 담는다", {
    x: 0.5, y: 2.9, w: 4.1, h: 0.5, margin: 0, fontFace: KR, fontSize: 11, italic: true, color: MUTED, valign: "top",
  });

  // 세로 구분선
  s.addShape(pres.shapes.LINE, { x: 5.0, y: 1.5, w: 0, h: 1.85, line: { color: "D9E2F1", width: 1 } });

  // 입력 매핑 (우)
  s.addText("③ 입력:  \"ds_save = ds_emp\"  → 보낸다", { x: 5.45, y: 1.5, w: 4.05, h: 0.35, margin: 0, fontFace: KR, fontSize: 14, bold: true, color: DARKTXT });
  flowBox(s, 5.45, 1.95, 1.6, 0.8, "내 화면의\nds_emp", { fill: NAVY, fontSize: 11.5 });
  s.addText("전송 →", { x: 7.1, y: 2.15, w: 0.8, h: 0.4, margin: 0, fontFace: KR, fontSize: 10.5, bold: true, color: ACCENT, align: "center" });
  flowBox(s, 7.95, 1.95, 1.55, 0.8, "서버가 받을\nds_save", { fill: LIGHT, color: DARKTXT, fontSize: 11 });
  s.addText("서버가 받을 이름이 왼쪽 — 서버와의 “이름 약속”", {
    x: 5.45, y: 2.9, w: 4.05, h: 0.5, margin: 0, fontFace: KR, fontSize: 11, italic: true, color: MUTED, valign: "top",
  });

  s.addShape(pres.shapes.LINE, { x: 0.5, y: 3.55, w: 9.0, h: 0, line: { color: "D9E2F1", width: 1 } });
  s.addText([
    { text: "여러 개를 한 번에:  ", options: { bold: true, color: DARKTXT } },
    { text: "\"ds_emp=ds_out ds_dept=ds_dept2\" — 공백으로 구분해 나열. 컬럼 구조는 서버 응답이 만들어 주므로 빈 Dataset이어도 된다(<Dataset id=\"ds_emp\"/>).", options: { color: "374151" } },
  ], { x: 0.5, y: 3.75, w: 9, h: 0.6, margin: 0, fontFace: KR, fontSize: 12.5, valign: "top" });
  tipBar(s, "암기법", "출력 매핑은 대입문처럼 읽기 — ds_emp = ds_out 은 “ds_emp ← ds_out 을 담아라”. 입력도 같은 방향: 받는 쪽이 항상 왼쪽.", 4.5, 0.65);
}

// 7. 응답 포맷
{
  const s = pres.addSlide();
  titleBar(s, "10차시 — 서버 통신", "서버는 무엇을 보내오는가 — PlatformXml");
  codeBlock(s, 0.5, 1.45, 5.6, 3.7, [
    { t: "<?xml version=\"1.0\" encoding=\"utf-8\"?>" },
    { t: "<Root xmlns=\"http://www.nexacroplatform" },
    { t: "           .com/platform/dataset\">" },
    { t: "  <Parameters>   <!-- 처리 결과 약속 -->", c: "7C8DB5" },
    { t: "    <Parameter id=\"ErrorCode\">0</Parameter>", c: "9FE8B6" },
    { t: "    <Parameter id=\"ErrorMsg\">성공</Parameter>", c: "9FE8B6" },
    { t: "  </Parameters>" },
    { t: "  <Dataset id=\"ds_out\">  <!-- 데이터 -->", c: "7C8DB5" },
    { t: "    <ColumnInfo>" },
    { t: "      <Column id=\"EMP_ID\" type=\"STRING\"/>" },
    { t: "    </ColumnInfo>" },
    { t: "    <Rows><Row>" },
    { t: "      <Col id=\"EMP_ID\">E001</Col>" },
    { t: "    </Row></Rows>" },
    { t: "  </Dataset>" },
    { t: "</Root>" },
  ], 10.5);

  card(s, 6.3, 1.45, 3.2, 1.3, "ErrorCode 규약", "0 이상 = 성공, 음수 = 실패.\nErrorMsg는 사용자에게 보여줄 메시지. 서버와 화면이 공유하는 “결과 보고 양식”이다.");
  card(s, 6.3, 2.93, 3.2, 1.1, "포맷은 선택 가능", "XML(읽기 쉬움, 교육·디버깅에 유리) ↔ SSV(콤팩트 텍스트, 대용량에 유리). 동작 원리는 동일.");
  s.addText("서버 쪽은 무엇이든 가능 — Java(X-API), JSP, Spring, Node… “이 양식으로 응답”하기만 하면 넥사크로가 Dataset으로 복원한다.", {
    x: 6.3, y: 4.2, w: 3.2, h: 0.95, margin: 0, fontFace: KR, fontSize: 11, italic: true, color: MUTED, valign: "top",
  });
}

// 8. Service 설정 + Mock
{
  const s = pres.addSlide();
  titleBar(s, "10차시 — 서버 통신", "주소 관리 — TypeDefinition Services와 Mock 서버");
  s.addText("① 서비스 등록 (TypeDefinition > Services)", { x: 0.5, y: 1.5, w: 4.5, h: 0.35, margin: 0, fontFace: KR, fontSize: 14, bold: true, color: DARKTXT });
  s.addTable([
    [{ text: "prefixid", options: { bold: true, fill: { color: NAVY }, color: WHITE, fontFace: MONO, fontSize: 11 } },
     { text: "svc", options: { fontFace: MONO, fontSize: 11, color: "374151" } }],
    [{ text: "url", options: { bold: true, fill: { color: NAVY }, color: WHITE, fontFace: MONO, fontSize: 11 } },
     { text: "http://localhost:8090/", options: { fontFace: MONO, fontSize: 11, color: "374151" } }],
  ], { x: 0.5, y: 1.95, w: 4.5, colW: [1.3, 3.2], rowH: 0.42, border: { pt: 0.75, color: "D9E2F1" } });
  codeBlock(s, 0.5, 3.0, 4.5, 0.95, [
    { t: "// 코드에서는 별칭으로", c: "7C8DB5" },
    { t: "\"svc::emp/list.do\"" },
    { t: "// = http://localhost:8090/emp/list.do", c: "9FE8B6" },
  ], 11);
  s.addText("개발/검증/운영 서버가 달라져도 — 코드는 그대로, Services의 url만 바꾼다.", {
    x: 0.5, y: 4.1, w: 4.5, h: 0.55, margin: 0, fontFace: KR, fontSize: 11.5, italic: true, color: MUTED, valign: "top",
  });

  s.addText("② 실습용 Mock 서버", { x: 5.3, y: 1.5, w: 4.2, h: 0.35, margin: 0, fontFace: KR, fontSize: 14, bold: true, color: DARKTXT });
  codeBlock(s, 5.3, 1.95, 4.2, 0.8, [
    { t: "cd examples/mock_server" },
    { t: "node server.js   # localhost:8090 대기" },
  ], 11);
  s.addTable([
    ["URL", "기능"].map(t => ({ text: t, options: { bold: true, fill: { color: NAVY }, color: WHITE, fontSize: 10.5, fontFace: KR } })),
    [{ text: "/emp/list.do", options: { fontFace: MONO, fontSize: 10, color: "374151" } }, { text: "사원 조회 (DEPT_CD, EMP_NM)", options: { fontSize: 10, fontFace: KR, color: "374151" } }],
    [{ text: "/emp/save.do", options: { fontFace: MONO, fontSize: 10, color: "374151" } }, { text: "변경분 저장 (11차시)", options: { fontSize: 10, fontFace: KR, color: "374151" } }],
    [{ text: "/dept/list.do", options: { fontFace: MONO, fontSize: 10, color: "374151" } }, { text: "부서 목록 (콤보용)", options: { fontSize: 10, fontFace: KR, color: "374151" } }],
  ], { x: 5.3, y: 2.9, w: 4.2, colW: [1.5, 2.7], rowH: 0.38, border: { pt: 0.75, color: "D9E2F1" } });
  tipBar(s, "수업 운영", "백엔드를 수강생이 만들면 진도가 무너진다 — Mock 서버를 미리 띄워두고 화면 개발에만 집중시키는 것이 3부의 핵심 전략.", 4.7, 0.6);
}

// 9. 콜백 상세
{
  const s = pres.addSlide();
  titleBar(s, "10차시 — 서버 통신", "콜백 함수 — 응답을 받는 자리");
  codeBlock(s, 0.5, 1.5, 5.6, 3.6, [
    { t: "/* 모든 통신이 이 하나의 콜백을 공유한다 */", c: "7C8DB5" },
    { t: "this.fn_callback = function(svcID, errorCode, errorMsg)" },
    { t: "{" },
    { t: "    // 1단계: 실패부터 거른다", c: "7C8DB5" },
    { t: "    if (errorCode < 0) {" },
    { t: "        alert(\"오류 [\" + svcID + \"] \" + errorMsg);" },
    { t: "        return;" },
    { t: "    }" },
    { t: "" },
    { t: "    // 2단계: 서비스ID로 후처리 분기", c: "7C8DB5" },
    { t: "    if (svcID == \"svcEmpList\") {" },
    { t: "        this.sta_count.set_text(" },
    { t: "            this.ds_emp.getRowCount() + \"건\");" },
    { t: "    }" },
    { t: "    else if (svcID == \"svcDeptList\") { … }" },
    { t: "};" },
  ], 11);

  card(s, 6.3, 1.5, 3.2, 1.15, "errorCode < 0 의 의미", "서버가 보낸 ErrorCode 음수값 — 또는 통신 자체 실패(서버 다운, 404, 타임아웃)도 음수로 들어온다.");
  card(s, 6.3, 2.83, 3.2, 1.15, "svcID 분기 패턴", "콜백 하나 + if 분기가 표준. 통신마다 콜백을 따로 만들면 공통 에러 처리가 흩어진다.");
  card(s, 6.3, 4.16, 3.2, 0.95, "주의: 함수명은 문자열", "\"fn_callback\" 오타 시 에러 없이 조용히 무시된다. “반응이 없으면 콜백 이름부터 확인”.");
}

// 10. 실습①
{
  const s = pres.addSlide();
  titleBar(s, "10차시 — 실습", "실습 ① 서버에서 조회해 Grid에 뿌리기");
  s.addText([
    { text: "진행 순서", options: { bold: true, fontSize: 14, color: DARKTXT, breakLine: true } },
    { text: "1.  Mock 서버 실행 확인 (브라우저로 dept/list.do 호출)", options: { breakLine: true } },
    { text: "2.  TypeDefinition Services에 svc 등록", options: { breakLine: true } },
    { text: "3.  onload에서 부서 콤보 조회 (svcDeptList)", options: { breakLine: true } },
    { text: "4.  [조회] 버튼 → 검색조건 파라미터로 svcEmpList 호출", options: { breakLine: true } },
    { text: "5.  콜백에서 건수 표시, Grid 자동 갱신 확인", options: {} },
  ], { x: 0.5, y: 1.5, w: 4.4, h: 2.4, margin: 0, fontFace: KR, fontSize: 12, color: "374151", paraSpaceAfter: 8, valign: "top" });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.05, w: 4.4, h: 1.1, fill: { color: LIGHT } });
  s.addText([
    { text: "예제 파일  ", options: { bold: true, color: ACCENT } },
    { text: "examples/lesson10_transaction/EmpSearch.xfdl\n과제: 이름 Edit에서 Enter 키로도 조회되게 만들기(onkeyup).", options: { color: "374151" } },
  ], { x: 0.68, y: 4.05, w: 4.1, h: 1.1, margin: 0, fontFace: KR, fontSize: 11.5, valign: "middle" });

  codeBlock(s, 5.15, 1.5, 4.35, 3.65, [
    { t: "// 조회 버튼", c: "7C8DB5" },
    { t: "this.btn_search_onclick = function(obj,e)" },
    { t: "{" },
    { t: "  var args = \"DEPT_CD=\"" },
    { t: "    + (this.cbo_dept.value || \"\")" },
    { t: "    + \" EMP_NM=\"" },
    { t: "    + (this.edt_name.value || \"\");" },
    { t: "" },
    { t: "  this.transaction(\"svcEmpList\"," },
    { t: "    \"svc::emp/list.do\"," },
    { t: "    \"\",                // 보낼 DS 없음", c: "7C8DB5" },
    { t: "    \"ds_emp=ds_out\",   // 결과 받기", c: "7C8DB5" },
    { t: "    args, \"fn_callback\");" },
    { t: "};" },
  ], 11);
}

// ───────────────────────── 11차시 ─────────────────────────
divider("11", "CRUD 패턴 완성", [
  "조회 → 편집 → 저장 → 재조회, 표준 사이클",
  "변경분만 전송 — \":U\" 와 rowtype의 실전",
  "저장 로직: 검증 → 확인 → 전송 → 동기화",
  "실습 — 등록·수정·삭제 왕복 처리",
]);

// 12. CRUD 사이클
{
  const s = pres.addSlide();
  titleBar(s, "11차시 — CRUD", "SI 표준 패턴 — 한 화면의 일생");
  // 사이클 다이어그램
  flowBox(s, 0.5, 1.8, 2.0, 0.95, "① 조회\n서버 → ds_emp", { fill: NAVY, fontSize: 12 });
  flowBox(s, 2.95, 1.8, 2.0, 0.95, "② 편집\nGrid에서 추가·수정·삭제\n(Dataset이 전부 기억)", { fill: LIGHT, color: DARKTXT, fontSize: 10.5 });
  flowBox(s, 5.4, 1.8, 2.0, 0.95, "③ 저장\n변경분만 서버 전송\n(ds_emp:U)", { fill: ACCENT, fontSize: 11 });
  flowBox(s, 7.85, 1.8, 1.65, 0.95, "④ 재조회\n화면 동기화", { fill: NAVY, fontSize: 11.5 });
  s.addText("→", { x: 2.5, y: 2.05, w: 0.45, h: 0.4, margin: 0, fontFace: KR, fontSize: 17, bold: true, color: MUTED, align: "center" });
  s.addText("→", { x: 4.95, y: 2.05, w: 0.45, h: 0.4, margin: 0, fontFace: KR, fontSize: 17, bold: true, color: MUTED, align: "center" });
  s.addText("→", { x: 7.4, y: 2.05, w: 0.45, h: 0.4, margin: 0, fontFace: KR, fontSize: 17, bold: true, color: MUTED, align: "center" });

  s.addText([
    { text: "왜 “건별 즉시 저장”이 아니라 “모아서 한 번에”인가", options: { bold: true, fontSize: 13.5, color: DARKTXT, breakLine: true } },
    { text: "사용자는 여러 행을 고치고 마지막에 [저장] 한 번 — 통신 횟수 최소화", options: { bullet: { code: "2022" }, breakLine: true } },
    { text: "서버는 변경분을 한 트랜잭션으로 처리 — 전부 성공 or 전부 취소(원자성)", options: { bullet: { code: "2022" }, breakLine: true } },
    { text: "Dataset의 rowtype 추적(9차시) 덕분에 “무엇이 바뀌었나”를 화면이 들고 있다", options: { bullet: { code: "2022" } } },
  ], { x: 0.5, y: 3.1, w: 9.0, h: 1.6, margin: 0, fontFace: KR, fontSize: 12.5, color: "374151", paraSpaceAfter: 7, valign: "top" });
  tipBar(s, "재조회의 이유", "저장 성공 후 다시 조회해야 ① 서버가 채번한 값(사번 등)이 화면에 반영되고 ② rowtype이 초기화되어 “수정됨” 표시가 사라진다.", 4.75, 0.6);
}

// 13. :U 상세
{
  const s = pres.addSlide();
  titleBar(s, "11차시 — CRUD", "\"ds_save=ds_emp:U\" — 변경분만 보내는 마법");
  // 좌: 시각화
  s.addText("화면의 ds_emp (5행)", { x: 0.5, y: 1.45, w: 2.6, h: 0.3, margin: 0, fontFace: KR, fontSize: 12, bold: true, color: DARKTXT });
  const rows = [
    ["E001 (그대로)", "F7F9FE", MUTED, false],
    ["E002 수정됨", "FFF4E5", "B45309", true],
    ["E006 신규", "E8F6EC", "1B7F3B", true],
    ["E004 (그대로)", "F7F9FE", MUTED, false],
    ["(E003 삭제분)", "FBEAEA", "B42318", true],
  ];
  let ry = 1.82;
  rows.forEach(([t, f, c, sent]) => {
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: ry, w: 2.3, h: 0.46, fill: { color: f }, line: { color: "D9E2F1", width: 0.75 } });
    s.addText(t, { x: 0.62, y: ry, w: 2.18, h: 0.46, margin: 0, fontFace: KR, fontSize: 10.5, color: DARKTXT, valign: "middle" });
    if (sent) s.addText("→ 전송", { x: 2.9, y: ry, w: 0.85, h: 0.46, margin: 0, fontFace: KR, fontSize: 10.5, bold: true, color: ACCENT, valign: "middle" });
    ry += 0.53;
  });
  flowBox(s, 3.85, 2.55, 1.5, 1.3, "ds_save\n(3행만)\n+ 원본값\n(OrgRow)", { fill: NAVY, fontSize: 10.5 });

  // 우: 서버 처리
  s.addText("서버는 rowtype별로 처리", { x: 5.75, y: 1.45, w: 3.75, h: 0.3, margin: 0, fontFace: KR, fontSize: 12, bold: true, color: DARKTXT });
  codeBlock(s, 5.75, 1.82, 3.75, 2.7, [
    { t: "for (row of ds_save) {" },
    { t: "  switch (row.type) {" },
    { t: "    case \"insert\":  // INSERT 문", c: "9FE8B6" },
    { t: "      사번 채번 후 등록;" },
    { t: "    case \"update\":  // UPDATE 문", c: "F5D78E" },
    { t: "      키로 찾아 갱신;" },
    { t: "    case \"delete\":  // DELETE 문", c: "F4A0A0" },
    { t: "      키로 찾아 삭제;" },
    { t: "  }" },
    { t: "}" },
  ], 11);
  tipBar(s, "함께 가는 정보", "전송 시 수정 전 원본값(OrgRow)도 함께 직렬화된다 — 서버가 충돌 감지(낙관적 잠금)나 이력 기록에 활용할 수 있다.", 4.75, 0.6);
}

// 14. 저장 로직
{
  const s = pres.addSlide();
  titleBar(s, "11차시 — CRUD", "저장 버튼의 정석 — 4단계 방어 코드");
  codeBlock(s, 0.5, 1.5, 5.6, 3.65, [
    { t: "this.btn_save_onclick = function(obj, e)" },
    { t: "{" },
    { t: "  // [1] 변경이 없으면 통신도 없다", c: "7C8DB5" },
    { t: "  if (!this.fn_hasChanges()) {" },
    { t: "    alert(\"변경된 내용이 없습니다.\"); return;" },
    { t: "  }" },
    { t: "  // [2] 추가/수정 행만 필수값 검증", c: "7C8DB5" },
    { t: "  for (var i=0; i<ds.getRowCount(); i++) {" },
    { t: "    var t = ds.getRowType(i);" },
    { t: "    if (t==2 || t==4) { /* 검증 */ }" },
    { t: "  }" },
    { t: "  // [3] 사용자 확인", c: "7C8DB5" },
    { t: "  if (!confirm(\"저장하시겠습니까?\")) return;" },
    { t: "  // [4] 변경분 전송", c: "7C8DB5" },
    { t: "  this.transaction(\"svcSave\", \"svc::emp/save.do\"," },
    { t: "    \"ds_save=ds_emp:U\", \"\", \"\", \"fn_callback\");" },
    { t: "};" },
  ], 10.5);

  card(s, 6.3, 1.5, 3.2, 1.3, "콜백에서 마무리", "저장 성공 → alert(결과 메시지) → fn_search() 재조회.\n실패 → 메시지만 표시하고 화면 변경분은 그대로 보존(재시도 가능).");
  card(s, 6.3, 2.98, 3.2, 1.15, "검증은 변경 행만", "전체 행을 검증하면 조회만 한 행에서도 걸린다 — rowtype 2(추가)·4(수정)만 검사.");
  s.addText("4단계가 몸에 배면 어떤 저장 화면도 같은 틀로 짠다 — “패턴이 곧 생산성”", {
    x: 6.3, y: 4.3, w: 3.2, h: 0.8, margin: 0, fontFace: KR, fontSize: 11.5, italic: true, color: ACCENT, valign: "top",
  });
}

// 15. 실무 디테일
{
  const s = pres.addSlide();
  titleBar(s, "11차시 — CRUD", "실무 디테일 3가지 — 화면의 완성도를 가르는 것들");
  const items = [
    ["① 미저장 변경 경고", "변경분이 있는데 [조회]를 누르면 편집 내용이 날아간다.\nfn_hasChanges() 체크 후 confirm(\"무시하고 조회할까요?\") — 데이터 유실 방지의 기본기.", "조회 전 한 번, 화면 닫기 전 한 번"],
    ["② 키 채번은 서버 책임", "신규 행의 사번을 화면에서 만들면 동시 사용자와 충돌한다.\n화면은 비워서 보내고, 서버가 채번 → 재조회로 받아온다.", "PK는 서버가, 화면은 보여주기만"],
    ["③ deleteRow의 두 얼굴", "화면에서는 사라지지만 Dataset이 삭제분을 보관 중.\ngetDeletedRowCount()로 확인 — 저장 전까지는 “예약된 삭제”일 뿐.", "삭제 확정은 저장 성공 시점"],
  ];
  let y = 1.5;
  items.forEach(([h2, b, foot]) => {
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 9.0, h: 1.12, fill: { color: LIGHT } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 0.07, h: 1.12, fill: { color: NAVY } });
    s.addText(h2, { x: 0.72, y: y + 0.1, w: 2.5, h: 0.92, margin: 0, fontFace: KR, fontSize: 13.5, bold: true, color: DARKTXT, valign: "top" });
    s.addText(b, { x: 3.3, y: y + 0.1, w: 4.5, h: 0.92, margin: 0, fontFace: KR, fontSize: 10.5, color: "374151", valign: "top" });
    s.addText(foot, { x: 7.95, y: y + 0.1, w: 1.45, h: 0.92, margin: 0, fontFace: KR, fontSize: 10, bold: true, italic: true, color: ACCENT, valign: "middle" });
    y += 1.26;
  });
}

// 16. 실습②
{
  const s = pres.addSlide();
  titleBar(s, "11차시 — 실습", "실습 ② 사원 정보 등록·수정·삭제 왕복");
  s.addText([
    { text: "시나리오 테스트 (저장 → 재조회 확인까지)", options: { bold: true, fontSize: 14, color: DARKTXT, breakLine: true } },
    { text: "1.  [조회] — 5명 표시 확인", options: { breakLine: true } },
    { text: "2.  [행 추가] → 이름·부서 입력 → 상태 N 표시 확인", options: { breakLine: true } },
    { text: "3.  기존 행 연봉 수정 → 상태 U 확인", options: { breakLine: true } },
    { text: "4.  한 행 [행 삭제] — 화면에서 사라짐", options: { breakLine: true } },
    { text: "5.  [저장] → “추가 1/수정 1/삭제 1” 메시지", options: { breakLine: true } },
    { text: "6.  재조회 → 신규 사원에 서버가 채번한 사번 확인", options: {} },
  ], { x: 0.5, y: 1.5, w: 4.4, h: 2.6, margin: 0, fontFace: KR, fontSize: 12, color: "374151", paraSpaceAfter: 7, valign: "top" });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.2, w: 4.4, h: 0.95, fill: { color: LIGHT } });
  s.addText([
    { text: "예제 파일  ", options: { bold: true, color: ACCENT } },
    { text: "examples/lesson11_crud/EmpCrud.xfdl\n과제: 저장 전 “이메일 형식” 검증을 추가해 보세요.", options: { color: "374151" } },
  ], { x: 0.68, y: 4.2, w: 4.1, h: 0.95, margin: 0, fontFace: KR, fontSize: 11.5, valign: "middle" });

  codeBlock(s, 5.15, 1.5, 4.35, 3.65, [
    { t: "// 변경 여부 체크 유틸 — 그대로 외워두기", c: "7C8DB5" },
    { t: "this.fn_hasChanges = function()" },
    { t: "{" },
    { t: "  if (this.ds_emp.getDeletedRowCount() > 0)" },
    { t: "    return true;" },
    { t: "" },
    { t: "  for (var i = 0;" },
    { t: "       i < this.ds_emp.getRowCount(); i++) {" },
    { t: "    var t = this.ds_emp.getRowType(i);" },
    { t: "    if (t == 2 || t == 4) return true;" },
    { t: "  }" },
    { t: "  return false;" },
    { t: "};" },
  ], 11);
}

// ───────────────────────── 12차시 ─────────────────────────
divider("12", "화면 이동과 팝업", [
  "set_url — 작업영역 화면 전환과 파라미터",
  "Modal 팝업 — 부모·자식의 데이터 교환",
  "공통 스크립트(.xjs) — include와 gfn_ 관례",
  "실습 — 사원 검색 팝업",
]);

// 18. 화면 전환
{
  const s = pres.addSlide();
  titleBar(s, "12차시 — 화면 흐름", "화면 전환 — div_work.set_url() 복습 + 파라미터");
  codeBlock(s, 0.5, 1.5, 5.6, 2.2, [
    { t: "// 메뉴 클릭 → 작업영역 교체 (3차시 복습)", c: "7C8DB5" },
    { t: "this.div_work.set_url(\"Base::EmpList.xfdl\");" },
    { t: "" },
    { t: "// 주의: set_url은 비동기 — 로드 완료 전에", c: "F4A0A0" },
    { t: "// 자식 폼의 함수를 부르면 실패한다", c: "F4A0A0" },
    { t: "" },
    { t: "// 안전한 전달법: 부모에 값을 두고", c: "9FE8B6" },
    { t: "this.gv_empId = \"E002\";          // 부모", c: "9FE8B6" },
    { t: "// 자식 onload에서 가져간다" },
    { t: "var id = this.parent.parent.gv_empId;" },
  ], 11);
  s.addText([
    { text: "왜 parent.parent?  ", options: { bold: true, color: DARKTXT } },
    { text: "자식의 parent는 Div, Div의 parent가 부모 폼 — 한 단계는 그릇, 두 단계가 주인.", options: { color: "374151" } },
  ], { x: 0.5, y: 3.85, w: 5.6, h: 0.5, margin: 0, fontFace: KR, fontSize: 11.5, valign: "top" });

  card(s, 6.3, 1.5, 3.2, 1.25, "이동의 3가지 길", "① Div의 set_url (이번 과정)\n② FrameSet의 Frame 교체\n③ 팝업(ChildFrame) — 다음 슬라이드");
  card(s, 6.3, 2.93, 3.2, 1.25, "어디에 무엇을 쓰나", "본 화면 전환 = ①②\n잠깐 묻고 돌아오기(검색·확인) = ③ 팝업");
  tipBar(s, "설계 감각", "“돌아올 화면인가?”가 기준 — 돌아온다면 팝업, 아예 넘어간다면 전환. 실습 프로젝트(4부)에서 두 가지를 모두 쓴다.", 4.5, 0.65);
}

// 19. 팝업 흐름
{
  const s = pres.addSlide();
  titleBar(s, "12차시 — 화면 흐름", "Modal 팝업 — 부모와 자식의 대화법");
  // 흐름 다이어그램
  flowBox(s, 0.5, 1.55, 2.4, 1.0, "부모 폼\nshowModal(...args)", { fill: NAVY, fontSize: 11.5 });
  flowBox(s, 3.8, 1.55, 2.4, 1.0, "팝업(자식)\nonload에서\narguments 수신", { fill: LIGHT, color: DARKTXT, fontSize: 11 });
  flowBox(s, 7.1, 1.55, 2.4, 1.0, "자식 close(값)\n→ 부모 콜백 호출", { fill: ACCENT, fontSize: 11.5 });
  s.addText([
    { text: "→", options: { fontSize: 14, breakLine: true } },
    { text: "① args", options: { fontSize: 8.5 } },
  ], { x: 2.95, y: 1.75, w: 0.8, h: 0.6, margin: 0, fontFace: KR, bold: true, color: ACCENT, align: "center" });
  s.addText([
    { text: "→", options: { fontSize: 14, breakLine: true } },
    { text: "② 결과", options: { fontSize: 8.5 } },
  ], { x: 6.25, y: 1.75, w: 0.8, h: 0.6, margin: 0, fontFace: KR, bold: true, color: ACCENT, align: "center" });

  codeBlock(s, 0.5, 2.85, 4.5, 2.3, [
    { t: "// [부모] 팝업 열기", c: "7C8DB5" },
    { t: "var popup = new ChildFrame();" },
    { t: "popup.init(\"popEmp\",0,0,520,420," },
    { t: "  null,null,\"Base::EmpPopup.xfdl\");" },
    { t: "popup.showModal(this.getOwnerFrame()," },
    { t: "  {searchName:\"김\"},   // args", c: "9FE8B6" },
    { t: "  this, \"fn_popupCallback\");" },
    { t: "" },
    { t: "this.fn_popupCallback =" },
    { t: "  function(id, rtn) { JSON.parse(rtn) }" },
  ], 10.5);
  codeBlock(s, 5.15, 2.85, 4.35, 2.3, [
    { t: "// [자식] 값 받기 (onload)", c: "7C8DB5" },
    { t: "var arg = this.getOwnerFrame()" },
    { t: "              .arguments;" },
    { t: "arg.searchName;  // \"김\"" },
    { t: "" },
    { t: "// [자식] 결과 돌려주고 닫기", c: "7C8DB5" },
    { t: "this.close(JSON.stringify({" },
    { t: "  EMP_ID: \"E002\"," },
    { t: "  EMP_NM: \"이영희\" }));" },
    { t: "// 취소는 this.close(); 값 없이", c: "9FE8B6" },
  ], 10.5);
}

// 20. 공통 스크립트
{
  const s = pres.addSlide();
  titleBar(s, "12차시 — 화면 흐름", "공통 스크립트(.xjs) — 복붙을 멈추는 기술");
  s.addText([
    { text: "왜 분리하는가", options: { bold: true, fontSize: 14, color: DARKTXT, breakLine: true } },
    { text: "팝업 열기 코드 7줄을 화면마다 복붙? — 한 곳만 고치면 되게 묶는다", options: { bullet: { code: "2022" }, breakLine: true } },
    { text: "메시지창·널 체크·날짜 포맷 — 모든 화면이 쓰는 것은 전부 후보", options: { bullet: { code: "2022" }, breakLine: true } },
    { text: "관례: 전역 함수는 gfn_ 접두어, 파일은 Lib:: 별칭 폴더에", options: { bullet: { code: "2022" }, breakLine: true } },
    { text: "효과: 나중에 “alert을 디자인된 메시지창으로 교체” 같은 변경이 한 줄로 끝남", options: { bullet: { code: "2022" } } },
  ], { x: 0.5, y: 1.5, w: 4.4, h: 2.5, margin: 0, fontFace: KR, fontSize: 12, color: "374151", paraSpaceAfter: 8, valign: "top" });

  codeBlock(s, 5.15, 1.5, 4.35, 3.0, [
    { t: "// 폼 스크립트 첫 줄", c: "7C8DB5" },
    { t: "include \"Lib::lib_comm.xjs\";" },
    { t: "" },
    { t: "// 이후 어디서든", c: "7C8DB5" },
    { t: "this.gfn_isEmpty(val);" },
    { t: "this.gfn_alert(\"저장 완료\");" },
    { t: "this.gfn_openPopup(\"popEmp\"," },
    { t: "  \"Base::EmpPopup.xfdl\"," },
    { t: "  {searchName:\"김\"}," },
    { t: "  \"fn_popupCallback\", 520, 420);" },
  ], 11);
  tipBar(s, "4부 예고", "실습 프로젝트의 comm.xjs에는 gfn_transaction(통신 래퍼)까지 들어간다 — 로딩 표시·공통 로그를 한 곳에서 관리.", 4.7, 0.6);
}

// 21. 실습③
{
  const s = pres.addSlide();
  titleBar(s, "12차시 — 실습", "실습 ③ 사원 검색 팝업");
  s.addText([
    { text: "만들 것 — 실무 단골 “돋보기 패턴”", options: { bold: true, fontSize: 14, color: DARKTXT, breakLine: true } },
    { text: "1.  부모: 읽기전용 Edit + 🔍 버튼 → gfn_openPopup 호출", options: { breakLine: true } },
    { text: "2.  팝업: 검색 Edit + Grid, 열리자마자 1차 조회", options: { breakLine: true } },
    { text: "3.  더블클릭 또는 [선택] → close(JSON.stringify(사원))", options: { breakLine: true } },
    { text: "4.  부모 콜백: JSON.parse → Edit 2개(이름/사번) 채우기", options: { breakLine: true } },
    { text: "5.  [닫기] = close() — 부모는 “취소”로 인식", options: {} },
  ], { x: 0.5, y: 1.5, w: 4.4, h: 2.5, margin: 0, fontFace: KR, fontSize: 12, color: "374151", paraSpaceAfter: 8, valign: "top" });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.15, w: 4.4, h: 1.0, fill: { color: LIGHT } });
  s.addText([
    { text: "예제 파일  ", options: { bold: true, color: ACCENT } },
    { text: "examples/lesson12_popup/ (EmpMain·EmpPopup·lib_comm.xjs)\n과제: 팝업에 “부서 콤보” 검색조건을 추가해 보세요.", options: { color: "374151" } },
  ], { x: 0.68, y: 4.15, w: 4.1, h: 1.0, margin: 0, fontFace: KR, fontSize: 11.5, valign: "middle" });

  codeBlock(s, 5.15, 1.5, 4.35, 3.65, [
    { t: "// [자식] 더블클릭 = 선택 (실무 관례)", c: "7C8DB5" },
    { t: "this.grd_emp_oncelldblclick =" },
    { t: "  function(obj, e) { this.fn_select(); };" },
    { t: "" },
    { t: "this.fn_select = function()" },
    { t: "{" },
    { t: "  var n = this.ds_emp.rowposition;" },
    { t: "  if (n < 0) { alert(\"선택하세요\"); return; }" },
    { t: "" },
    { t: "  this.close(JSON.stringify({" },
    { t: "    EMP_ID: this.ds_emp.getColumn(n,\"EMP_ID\")," },
    { t: "    EMP_NM: this.ds_emp.getColumn(n,\"EMP_NM\")" },
    { t: "  }));" },
    { t: "};" },
  ], 10.5);
}

// 22. 3부 정리
{
  const s = pres.addSlide();
  titleBar(s, "3부 정리", "3부 총정리 — 그리고 프로젝트로");
  s.addText("자주 하는 실수 Top 4", { x: 0.5, y: 1.5, w: 5.0, h: 0.35, margin: 0, fontFace: KR, fontSize: 15, bold: true, color: DARKTXT });
  const mistakes = [
    ["transaction 다음 줄에서 결과 사용", "결과는 콜백 안에서만 — “콜백이 다음 줄”"],
    ["콜백 함수명 오타", "문자열이라 에러도 안 난다. 반응 없으면 제일 먼저 의심"],
    ["저장 후 재조회 누락", "채번값 미반영 + rowtype 안 풀림 — 성공 콜백에서 fn_search()"],
    ["close()에 객체 전달", "문자열만 가능 — JSON.stringify / parse 한 쌍으로"],
  ];
  let y = 1.95;
  mistakes.forEach(([h2, b], i) => {
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 5.0, h: 0.72, fill: { color: i % 2 ? "F7F9FE" : LIGHT } });
    s.addText(h2, { x: 0.65, y: y + 0.07, w: 4.7, h: 0.3, margin: 0, fontFace: KR, fontSize: 11.5, bold: true, color: "B42318" });
    s.addText(b, { x: 0.65, y: y + 0.37, w: 4.7, h: 0.3, margin: 0, fontFace: KR, fontSize: 10.5, color: "374151" });
    y += 0.8;
  });

  s.addText("3부에서 익힌 것", { x: 6.0, y: 1.5, w: 3.5, h: 0.35, margin: 0, fontFace: KR, fontSize: 15, bold: true, color: DARKTXT });
  s.addText([
    { text: "transaction 6요소와 비동기 콜백", options: { bullet: { code: "2713" }, breakLine: true } },
    { text: "입출력 DS 매핑, ErrorCode 규약", options: { bullet: { code: "2713" }, breakLine: true } },
    { text: "변경분 전송(:U)과 CRUD 사이클", options: { bullet: { code: "2713" }, breakLine: true } },
    { text: "팝업 데이터 교환, 공통 .xjs", options: { bullet: { code: "2713" } } },
  ], { x: 6.0, y: 1.95, w: 3.5, h: 1.6, margin: 0, fontFace: KR, fontSize: 12, color: "374151", paraSpaceAfter: 7, valign: "top" });

  s.addShape(pres.shapes.RECTANGLE, { x: 6.0, y: 3.75, w: 3.5, h: 1.4, fill: { color: NAVY } });
  s.addText([
    { text: "다음 시간 (4부 · 13차시)", options: { bold: true, color: ICE, breakLine: true, fontSize: 12 } },
    { text: "실습 프로젝트 시작 — 사원 관리 시스템\n지금까지의 전부를 하나의 시스템으로", options: { color: WHITE, fontSize: 12.5 } },
  ], { x: 6.2, y: 3.75, w: 3.1, h: 1.4, margin: 0, fontFace: KR, valign: "middle" });
}

pres.writeFile({ fileName: "/Users/yeon97/PRJT/OCR_PIPLELINE/nexacro_course/넥사크로_3부_강의자료.pptx" })
  .then(() => console.log("done"));
