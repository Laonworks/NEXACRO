/*
  [10~16차시 공용] 넥사크로 실습용 Mock 서버
  - 넥사크로 표준 통신 포맷(PlatformXml)으로 응답하는 초간단 서버
  - 실행: node server.js  →  http://localhost:8090
  - 넥사크로 TypeDefinition > Services 에 아래와 같이 등록:
      prefixid: "svc" / url: "http://localhost:8090/"
  제공 서비스
    GET/POST /emp/list.do  : 사원 목록 조회 (파라미터: DEPT_CD, EMP_NM)
    POST     /emp/save.do  : 사원 추가/수정/삭제 반영 (rowtype 기반)
    GET/POST /dept/list.do : 부서 목록 조회
*/
const http = require("http");
const PORT = 8090;

// ── 메모리 DB (서버 재시작 시 초기화) ──────────────────────────
let emps = [
  { EMP_ID: "E001", EMP_NM: "김철수", DEPT_CD: "D01", SALARY: 3500, HIRE_DT: "20200301", EMAIL: "kim@test.com" },
  { EMP_ID: "E002", EMP_NM: "이영희", DEPT_CD: "D02", SALARY: 4200, HIRE_DT: "20180715", EMAIL: "lee@test.com" },
  { EMP_ID: "E003", EMP_NM: "박민준", DEPT_CD: "D01", SALARY: 2900, HIRE_DT: "20220502", EMAIL: "park@test.com" },
  { EMP_ID: "E004", EMP_NM: "최수진", DEPT_CD: "D03", SALARY: 3800, HIRE_DT: "20190910", EMAIL: "choi@test.com" },
  { EMP_ID: "E005", EMP_NM: "정도현", DEPT_CD: "D02", SALARY: 3100, HIRE_DT: "20210120", EMAIL: "jung@test.com" },
];
const depts = [
  { CODE: "D01", NAME: "개발팀" },
  { CODE: "D02", NAME: "영업팀" },
  { CODE: "D03", NAME: "인사팀" },
];
let seq = 6;

// ── 넥사크로 PlatformXml 응답 생성 ────────────────────────────
function xmlEscape(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function buildDataset(id, columns, rows) {
  let xml = `  <Dataset id="${id}">\n    <ColumnInfo>\n`;
  for (const c of columns) {
    xml += `      <Column id="${c.id}" type="${c.type}" size="${c.size || 256}"/>\n`;
  }
  xml += `    </ColumnInfo>\n    <Rows>\n`;
  for (const r of rows) {
    xml += `      <Row>\n`;
    for (const c of columns) xml += `        <Col id="${c.id}">${xmlEscape(r[c.id])}</Col>\n`;
    xml += `      </Row>\n`;
  }
  xml += `    </Rows>\n  </Dataset>\n`;
  return xml;
}

function respond(res, errorCode, errorMsg, datasetsXml = "") {
  const body =
    `<?xml version="1.0" encoding="utf-8"?>\n` +
    `<Root xmlns="http://www.nexacroplatform.com/platform/dataset">\n` +
    `  <Parameters>\n` +
    `    <Parameter id="ErrorCode" type="int">${errorCode}</Parameter>\n` +
    `    <Parameter id="ErrorMsg" type="string">${xmlEscape(errorMsg)}</Parameter>\n` +
    `  </Parameters>\n` + datasetsXml + `</Root>`;
  res.writeHead(200, {
    "Content-Type": "text/xml; charset=utf-8",
    "Access-Control-Allow-Origin": "*",          // 로컬 실습 편의용 CORS 허용
  });
  res.end(body);
}

const EMP_COLS = [
  { id: "EMP_ID", type: "STRING", size: 10 },
  { id: "EMP_NM", type: "STRING", size: 30 },
  { id: "DEPT_CD", type: "STRING", size: 10 },
  { id: "SALARY", type: "INT" },
  { id: "HIRE_DT", type: "STRING", size: 8 },
  { id: "EMAIL", type: "STRING", size: 50 },
];

// ── 넥사크로가 보내는 요청 본문(PlatformXml) 파싱 (초간단 버전) ──
function parseInputDataset(body, dsId) {
  // <Dataset id="dsId"> ... <Row type="insert|update|delete"> 추출
  const dsMatch = body.match(new RegExp(`<Dataset id="${dsId}"[\\s\\S]*?</Dataset>`));
  if (!dsMatch) return [];
  const rows = [];
  const rowRe = /<Row(?:\s+type="(\w+)")?\s*>([\s\S]*?)<\/Row>/g;
  let m;
  while ((m = rowRe.exec(dsMatch[0])) !== null) {
    // OrgRow(수정 전 원본값) 영역은 제외하고 현재값만 파싱
    const inner = m[2].replace(/<OrgRow>[\s\S]*?<\/OrgRow>/g, "");
    const row = { _type: m[1] || "normal" };
    const colRe = /<Col id="(\w+)">([\s\S]*?)<\/Col>/g;
    let c;
    while ((c = colRe.exec(inner)) !== null) row[c[1]] = c[2];
    rows.push(row);
  }
  return rows;
}

function parseParam(body, name) {
  const m = body.match(new RegExp(`<Parameter id="${name}"[^>]*>([\\s\\S]*?)</Parameter>`));
  return m ? m[1] : "";
}

// ── 라우팅 ───────────────────────────────────────────────────
const server = http.createServer((req, res) => {
  let body = "";
  req.on("data", (chunk) => (body += chunk));
  req.on("end", () => {
    const url = req.url.split("?")[0];
    console.log(`${req.method} ${req.url}`);

    if (url === "/dept/list.do") {
      const cols = [{ id: "CODE", type: "STRING", size: 10 }, { id: "NAME", type: "STRING", size: 30 }];
      return respond(res, 0, "SUCCESS", buildDataset("ds_dept", cols, depts));
    }

    if (url === "/emp/list.do") {
      // 검색조건: URL 쿼리 또는 입력 Parameter 양쪽 지원
      const q = new URL(req.url, `http://localhost:${PORT}`).searchParams;
      const deptCd = q.get("DEPT_CD") || parseParam(body, "DEPT_CD");
      const empNm = q.get("EMP_NM") || parseParam(body, "EMP_NM");

      let result = emps;
      if (deptCd) result = result.filter((e) => e.DEPT_CD === deptCd);
      if (empNm) result = result.filter((e) => e.EMP_NM.includes(empNm));
      return respond(res, 0, `${result.length}건 조회되었습니다.`, buildDataset("ds_out", EMP_COLS, result));
    }

    if (url === "/emp/save.do") {
      // rowtype 기반 CRUD 반영 — 넥사크로 Dataset 의 "변경분 전송" 결과 처리
      const rows = parseInputDataset(body, "ds_save");
      let ins = 0, upd = 0, del = 0;
      for (const r of rows) {
        if (r._type === "insert") {
          r.EMP_ID = "E" + String(seq++).padStart(3, "0");   // 사번 채번은 서버 책임
          delete r._type;
          emps.push(r);
          ins++;
        } else if (r._type === "update") {
          const idx = emps.findIndex((e) => e.EMP_ID === r.EMP_ID);
          if (idx >= 0) { delete r._type; emps[idx] = { ...emps[idx], ...r }; upd++; }
        } else if (r._type === "delete") {
          emps = emps.filter((e) => e.EMP_ID !== r.EMP_ID);
          del++;
        }
      }
      return respond(res, 0, `저장 완료 (추가 ${ins} / 수정 ${upd} / 삭제 ${del})`);
    }

    respond(res, -1, "알 수 없는 서비스입니다 : " + url);
  });
});

server.listen(PORT, () => {
  console.log(`넥사크로 실습용 Mock 서버 실행 중 → http://localhost:${PORT}`);
  console.log(`  /emp/list.do, /emp/save.do, /dept/list.do`);
});
