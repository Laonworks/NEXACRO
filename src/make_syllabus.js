const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, LevelFormat, HeadingLevel, BorderStyle, WidthType,
  ShadingType, VerticalAlign, PageNumber, Header, Footer, PageBreak,
  ExternalHyperlink,
} = require("docx");

const FONT = "Malgun Gothic";
const CONTENT_W = 9026; // A4, 1" margins

const border = { style: BorderStyle.SINGLE, size: 1, color: "BBBBBB" };
const borders = { top: border, bottom: border, left: border, right: border };
const cellMargins = { top: 80, bottom: 80, left: 120, right: 120 };

function cell(text, opts = {}) {
  const { w, fill, bold, align } = opts;
  const lines = Array.isArray(text) ? text : [text];
  return new TableCell({
    borders,
    width: { size: w, type: WidthType.DXA },
    margins: cellMargins,
    verticalAlign: VerticalAlign.CENTER,
    shading: fill ? { fill, type: ShadingType.CLEAR } : undefined,
    children: lines.map(
      (t) =>
        new Paragraph({
          alignment: align || AlignmentType.LEFT,
          children: [new TextRun({ text: t, bold: !!bold, size: 20, font: FONT })],
        })
    ),
  });
}

function headerRow(labels, widths) {
  return new TableRow({
    tableHeader: true,
    children: labels.map((l, i) =>
      cell(l, { w: widths[i], fill: "D5E8F0", bold: true, align: AlignmentType.CENTER })
    ),
  });
}

function kvTable(pairs) {
  const widths = [1800, 7226];
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: widths,
    rows: pairs.map(
      ([k, v]) =>
        new TableRow({
          children: [
            cell(k, { w: widths[0], fill: "EFF5F8", bold: true, align: AlignmentType.CENTER }),
            cell(v, { w: widths[1] }),
          ],
        })
    ),
  });
}

function h1(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(text)] });
}
function h2(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(text)] });
}
function p(text, opts = {}) {
  return new Paragraph({
    spacing: { after: 120 },
    children: [new TextRun({ text, size: 22, font: FONT, bold: !!opts.bold })],
  });
}
function bullet(text) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { after: 60 },
    children: [new TextRun({ text, size: 22, font: FONT })],
  });
}

// ---------- 차시별 계획 데이터 ----------
const lessons = [
  ["1", "1부 입문", "넥사크로 플랫폼 이해", ["UI 플랫폼 개념과 넥사크로의 위치", "Nexacro 17 / Nexacro N 차이, OSMU 개념", "웹 런타임 vs 네이티브 런타임(NRE) 아키텍처"], "이론 중심 (실습 없음)"],
  ["2", "1부 입문", "개발 환경 구축", ["Nexacro Studio 설치 및 라이선스 등록", "스튜디오 화면 구성(탐색기/디자인/속성/출력)", "프로젝트 생성과 QuickView 실행"], "Hello Nexacro 폼, 버튼 클릭 alert"],
  ["3", "1부 입문", "프로젝트 구조 이론", ["ADL → FrameSet → Form(XFDL) 구조", "TypeDefinition, 환경변수, 테마(XCSS)", "MainFrame / ChildFrame / WorkFrame"], "좌측 메뉴 + 작업영역 프레임 레이아웃"],
  ["4", "1부 입문", "스크립트 기초", ["JavaScript 기반 넥사크로 스크립트", "이벤트 모델(onclick, onload)", "컴포넌트 접근과 스코프(this, parent)"], "입력값 검증(Validation) 함수"],
  ["5", "2부 기본기능", "기본 컴포넌트 I", ["Button, Static, Edit, MaskEdit, TextArea", "CheckBox, Radio", "속성/메소드/이벤트의 관계"], "회원가입 입력 폼"],
  ["6", "2부 기본기능", "기본 컴포넌트 II / 레이아웃", ["Combo, Calendar, Spin, Tab, Div", "anchor 속성과 반응형 Layout"], "검색 조건 영역(콤보+달력+버튼)"],
  ["7", "2부 기본기능", "Dataset 이해 (핵심)", ["Dataset 개념: 메모리상 2차원 테이블", "컬럼 정의, row 추가/삭제/수정, rowposition", "Dataset 이벤트(onrowposchanged 등)"], "스크립트로 Dataset 조작(addRow/setColumn/deleteRow)"],
  ["8", "2부 기본기능", "데이터 바인딩과 Grid", ["Bind 개념: Dataset과 컴포넌트 연동", "Grid 기본: Dataset 연결, 컬럼 포맷, expr"], "사원 목록 Grid + 상세 입력폼 바인딩"],
  ["9", "2부 기본기능", "Grid 활용 심화", ["셀 편집, 헤더 클릭 정렬, 합계(Summary) 행", "Grid 이벤트(oncellclick, onheadclick)"], "편집 가능한 Grid + 변경 행 표시(rowtype)"],
  ["10", "3부 서버연동", "서버 통신(Transaction)", ["transaction() 구조: 서비스ID, URL, 입출력 Dataset, 콜백", "통신 포맷(XML/SSV), Service 설정", "Mock 서버/정적 데이터 활용법"], "조회 버튼 → 서버 호출 → Grid 출력"],
  ["11", "3부 서버연동", "CRUD 패턴 완성", ["조회/입력/수정/삭제 표준 패턴", "Dataset 변경분만 전송, 콜백 성공/실패 처리", "사용자 메시지 공통함수"], "사원 정보 등록·수정·삭제 왕복 처리"],
  ["12", "3부 서버연동", "화면 이동과 팝업", ["메뉴 → WorkFrame 화면 전환", "Modal/Modeless 팝업, 파라미터 전달", "공통 스크립트(.xjs) 분리와 include"], "사원 검색 팝업"],
  ["13", "4부 프로젝트", "프로젝트 설계 / 공통 구조", ["요구사항 정의: 사원 관리 시스템", "화면 설계서 작성, 프레임/메뉴 구성", "공통 함수(.xjs), 테마 적용"], "프로젝트 골격 + 공통 모듈 구성"],
  ["14", "4부 프로젝트", "목록 화면 개발", ["검색조건(부서/이름/입사일) → 조회 → Grid 출력", "건수 표시, 정렬, 더블클릭 상세 이동"], "사원 목록 화면 완성"],
  ["15", "4부 프로젝트", "상세/등록 화면 개발", ["바인딩 기반 상세 폼, 필수값 검증", "저장/삭제 처리, 부서 검색 팝업 연동", "저장 후 목록 갱신"], "사원 상세/등록 화면 완성"],
  ["16", "4부 프로젝트", "배포와 총정리", ["Generate/Build, 웹서버 배포, 업데이트(캐시)", "코드 리뷰: 자주 하는 실수 정리", "심화 안내: MVC 블록, QuickCode, Module Developer"], "프로젝트 배포 및 발표"],
];

const lessonWidths = [620, 1300, 1900, 3406, 1800];
const lessonTable = new Table({
  width: { size: CONTENT_W, type: WidthType.DXA },
  columnWidths: lessonWidths,
  rows: [
    headerRow(["차시", "구분", "주제", "주요 내용", "실습"], lessonWidths),
    ...lessons.map(
      ([no, part, topic, contents, lab]) =>
        new TableRow({
          children: [
            cell(no, { w: lessonWidths[0], align: AlignmentType.CENTER }),
            cell(part, { w: lessonWidths[1], align: AlignmentType.CENTER }),
            cell(topic, { w: lessonWidths[2], bold: true }),
            cell(contents.map((c) => "· " + c), { w: lessonWidths[3] }),
            cell(lab, { w: lessonWidths[4] }),
          ],
        })
    ),
  ],
});

// ---------- 문서 ----------
const doc = new Document({
  styles: {
    default: { document: { run: { font: FONT, size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 30, bold: true, font: FONT, color: "1F4E79" },
        paragraph: { spacing: { before: 300, after: 180 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 25, bold: true, font: FONT },
        paragraph: { spacing: { before: 200, after: 120 }, outlineLevel: 1 } },
    ],
  },
  numbering: {
    config: [
      { reference: "bullets",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 540, hanging: 270 } } } }] },
    ],
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: 11906, height: 16838 }, // A4
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
        },
      },
      headers: {
        default: new Header({
          children: [new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [new TextRun({ text: "넥사크로(Nexacro N) 입문 및 실습 과정", size: 16, color: "888888", font: FONT })],
          })],
        }),
      },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: "- ", size: 18, font: FONT }),
              new TextRun({ children: [PageNumber.CURRENT], size: 18, font: FONT }),
              new TextRun({ text: " -", size: 18, font: FONT }),
            ],
          })],
        }),
      },
      children: [
        // 표지부
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 600, after: 120 },
          children: [new TextRun({ text: "강 의 계 획 서", bold: true, size: 52, font: FONT })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 480 },
          border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: "1F4E79", space: 8 } },
          children: [new TextRun({ text: "넥사크로(Nexacro N) 입문 및 실습 프로젝트 과정", size: 30, font: FONT, color: "1F4E79" })],
        }),

        h1("1. 과정 개요"),
        kvTable([
          ["과정명", "넥사크로(Nexacro N) 입문 및 실습 프로젝트 과정"],
          ["교육 대상", "웹 개발 기초(HTML/JavaScript) 보유 입문자, SI 신입/전환 개발자"],
          ["교육 기간", "총 16차시 (차시당 2~3시간, 주 2회 기준 약 8주)"],
          ["개발 도구", "Nexacro Studio (투비소프트 체험판), 실습용 Mock 서버"],
          ["선수 지식", "HTML/JavaScript 기초 문법, 웹 동작 원리에 대한 기본 이해"],
          ["수료 목표", "단독으로 화면 설계 → 데이터 연동 → 배포까지 수행 가능한 수준"],
        ]),

        h1("2. 교육 목표"),
        bullet("넥사크로 플랫폼의 구조(ADL-FrameSet-Form)와 동작 원리를 이해한다."),
        bullet("Nexacro Studio를 활용하여 UI 화면을 설계하고 컴포넌트를 다룰 수 있다."),
        bullet("Dataset 중심의 데이터 처리와 바인딩, Grid 활용 능력을 갖춘다."),
        bullet("Transaction 기반 서버 통신으로 CRUD 화면을 완성할 수 있다."),
        bullet("미니 프로젝트(사원 관리 시스템)를 통해 실무형 개발 프로세스를 경험한다."),

        h1("3. 과정 구성"),
        new Table({
          width: { size: CONTENT_W, type: WidthType.DXA },
          columnWidths: [1500, 1300, 6226],
          rows: [
            headerRow(["구분", "차시", "내용"], [1500, 1300, 6226]),
            new TableRow({ children: [cell("1부 입문", { w: 1500, align: AlignmentType.CENTER }), cell("1~4차시", { w: 1300, align: AlignmentType.CENTER }), cell("플랫폼 이해, 설치, 프로젝트 구조, 스크립트 기초", { w: 6226 })] }),
            new TableRow({ children: [cell("2부 기본 기능", { w: 1500, align: AlignmentType.CENTER }), cell("5~9차시", { w: 1300, align: AlignmentType.CENTER }), cell("컴포넌트, Dataset, 바인딩, Grid", { w: 6226 })] }),
            new TableRow({ children: [cell("3부 서버 연동", { w: 1500, align: AlignmentType.CENTER }), cell("10~12차시", { w: 1300, align: AlignmentType.CENTER }), cell("Transaction, CRUD 패턴, 화면 이동/팝업", { w: 6226 })] }),
            new TableRow({ children: [cell("4부 프로젝트", { w: 1500, align: AlignmentType.CENTER }), cell("13~16차시", { w: 1300, align: AlignmentType.CENTER }), cell("사원 관리 시스템 설계·개발·배포 실습", { w: 6226 })] }),
          ],
        }),

        new Paragraph({ pageBreakBefore: true, heading: HeadingLevel.HEADING_1, children: [new TextRun("4. 차시별 강의 계획")] }),
        lessonTable,

        new Paragraph({ pageBreakBefore: true, heading: HeadingLevel.HEADING_1, children: [new TextRun("5. 실습 프로젝트 개요 — 사원 관리 시스템")] }),
        p("4부(13~16차시)에서는 과정에서 학습한 전체 내용을 통합하여 SI 실무 화면 구조(목록-상세-팝업)에 가까운 미니 프로젝트를 수행한다."),
        h2("5.1 주요 기능"),
        bullet("사원 목록 조회: 부서/이름/입사일 검색조건, Grid 출력, 정렬, 건수 표시"),
        bullet("사원 상세 보기 및 등록/수정/삭제 (필수값 검증 포함)"),
        bullet("부서 검색 팝업 (Modal, 부모-자식 파라미터 전달)"),
        bullet("공통 함수 라이브러리(.xjs) 및 테마 적용, 웹서버 배포"),
        h2("5.2 평가 기준"),
        new Table({
          width: { size: CONTENT_W, type: WidthType.DXA },
          columnWidths: [3000, 1500, 4526],
          rows: [
            headerRow(["항목", "배점", "평가 내용"], [3000, 1500, 4526]),
            new TableRow({ children: [cell("출석 및 차시별 실습", { w: 3000 }), cell("30%", { w: 1500, align: AlignmentType.CENTER }), cell("차시별 실습 과제 제출 여부 및 완성도", { w: 4526 })] }),
            new TableRow({ children: [cell("중간 점검 (9차시)", { w: 3000 }), cell("20%", { w: 1500, align: AlignmentType.CENTER }), cell("Dataset/바인딩/Grid 활용 실습 평가", { w: 4526 })] }),
            new TableRow({ children: [cell("최종 프로젝트", { w: 3000 }), cell("50%", { w: 1500, align: AlignmentType.CENTER }), cell("사원 관리 시스템 기능 완성도, 코드 품질, 발표", { w: 4526 })] }),
          ],
        }),

        h1("6. 준비물 및 참고 자료"),
        bullet("PC: Windows 10 이상 (Nexacro Studio는 Windows 전용), 메모리 8GB 이상 권장"),
        bullet("Nexacro Studio 체험판: 투비소프트 홈페이지(tobesoft.com/product)에서 다운로드"),
        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          spacing: { after: 60 },
          children: [
            new TextRun({ text: "공식 매뉴얼: ", size: 22, font: FONT }),
            new ExternalHyperlink({
              children: [new TextRun({ text: "docs.tobesoft.com/nexacro_n_ko", style: "Hyperlink", size: 22, font: FONT })],
              link: "https://docs.tobesoft.com/nexacro_n_ko",
            }),
          ],
        }),
        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          spacing: { after: 60 },
          children: [
            new TextRun({ text: "개발자 커뮤니티: ", size: 22, font: FONT }),
            new ExternalHyperlink({
              children: [new TextRun({ text: "playnexacro.com", style: "Hyperlink", size: 22, font: FONT })],
              link: "https://playnexacro.com",
            }),
          ],
        }),
        bullet("실습용 Mock 데이터 및 예제 코드: 강사 제공 (차시별 examples 폴더)"),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync("/Users/yeon97/PRJT/OCR_PIPLELINE/nexacro_course/넥사크로_강의계획서.docx", buffer);
  console.log("done");
});
