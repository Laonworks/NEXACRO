# Step 09. 마무리 — 엑셀 내보내기 · 다국어 · 종합 과제 (중급)

> **완성 소스**: `EmpListSvc.xfdl`(9단계 기능 추가) + `comm.xjs`(gfn_msg) + `data/msg_list.xml`, `data/vacation_list.xml`(종합 과제용)
> **학습 목표**: 운영 시스템의 단골 요구사항 두 가지를 구현하고, 종합 과제로 전 과정을 마무리한다.

---

## 1. 엑셀 내보내기

### 1-1. 이번 실습 — 클립보드 TSV 방식 (서버 불필요)

Grid 데이터를 **탭 구분 텍스트(TSV)** 로 만들어 클립보드에 복사합니다. 엑셀에 붙여넣으면 셀 단위로 들어갑니다.

```javascript
// 헤더(현재 언어) + 데이터 행을 \t 와 \n 으로 연결
sText += arrLine.join("\t") + "\n";
...
system.setClipboard("CF_TEXT", sText);
```

구현 포인트 (`fnExportToClipboard`):
- **filter 상태면 보이는 행만** 내보냄 — "조회 결과 = 내보내기 결과"라는 자연스러운 규칙
- 코드 → 이름 변환(`fnCodeName`: findRow + getColumn) — Grid의 combotext가 하던 일을 스크립트로
- 헤더 문구를 `gfn_msg`로 — 영어 모드면 영어 헤더로 내보내짐 (다국어와의 합주)

### 1-2. 실무 표준 — ExcelExportObject (이론)

실무에서는 **ExcelExportObject + 서버 export 모듈(XENI)** 로 진짜 .xlsx 파일을 만듭니다:

```javascript
var objExport = new nexacro.ExcelExportObject();
objExport.addEventHandler("onsuccess", this.fnExportSuccess, this);
objExport.set_exporttype(nexacro.ExportTypes.EXCEL2007);
objExport.set_exporturl("svcUrl::XExportImport.do");   // ★ 서버 모듈 필요
objExport.addExportItem(nexacro.ExportItemTypes.GRID, this.grdEmp, "Sheet1!A1");
objExport.exportData();
```

> 💡 강의 포인트: 우리 실습 환경(정적 XML)에는 export 서버 모듈이 없어 동작하지 않습니다 — **"왜 안 되는가"를 설명하는 것 자체가 수업**입니다(클라이언트만으로 파일 생성이 제한되는 이유, 서버 모듈의 역할). 코드 스켈레톤을 보여주고, 클립보드 방식과 장단점을 비교하세요.

## 2. 다국어 처리 — 한/영 전환

### 구조 (8단계 공통코드와 같은 패턴)

```
data/msg_list.xml ──(앱 기동 시 1회)──▶ gdsMsg (application Dataset)
                                          │
화면 문구는 전부:  this.gfn_msg("BTN_SEARCH")   ← gvLang("KO"/"EN")에 따라 반환
```

- **리소스 Dataset**: MSG_ID / KO / EN 3컬럼 — 언어 추가 = 컬럼 추가
- `gfn_msg`는 미등록 ID를 **ID 그대로 반환** → 화면에 "BTN_XXX"가 보이면 리소스 누락을 바로 발견
- 템플릿 메시지: `"총 {0}명"` → `.replace("{0}", 건수)` — 어순이 다른 언어 대응의 기본기

### 화면 적용 — fnApplyLang

```javascript
this.btnSearch.set_text(this.gfn_msg("BTN_SEARCH"));          // 일반 컴포넌트
this.grdEmp.setCellProperty("head", i, "text", this.gfn_msg(arrHdr[i]));  // Grid 헤더
```

> 💡 강의 포인트 (토론): 지금은 EmpListSvc 한 화면만 전환됩니다. 전 화면 적용은?
> - 각 폼이 onload + 언어변경 시 `fnApplyLang`을 실행하는 규약 (지금 방식의 확장)
> - 열린 화면들에 전파하는 이벤트 체계, 또는 환경설정 후 재기동
> - Nexacro가 제공하는 환경변수/로케일 기능 소개 — "프레임워크가 왜 필요한가"의 마지막 논점

## 3. 실행과 확인

1. 로그인 → "사원 목록 (서버연동)" 탭
2. 확인 시나리오:
   - [엑셀 복사] → 알림 확인 → 엑셀(또는 스프레드시트)에 붙여넣기 → 셀 단위로 들어가는지
   - 사원명 검색(과제 구현 시) 후 [엑셀 복사] → 검색된 행만 복사되는지
   - [English] → 제목/버튼/Grid 헤더/건수 표시가 모두 영어로, 버튼은 "한국어"로
   - 영어 모드에서 [엑셀 복사] → 영어 헤더로 복사되는지
   - 한/영 토글 반복 정상 동작

## 4. 종합 과제 — 휴가신청 화면 (배운 것 전부)

`VacationRequest.xfdl`을 **처음부터 끝까지 스스로** 만듭니다. 전 단계의 기술이 모두 들어갑니다.

### 요구사항

| # | 기능 | 사용 기술 (단계) |
|---|---|---|
| 1 | 휴가 목록 조회 — `svcData::vacation_list.xml` (5건 제공) | transaction, 콜백 (5) |
| 2 | 휴가구분/상태를 이름으로 표시 — `code_list.xml`에 VACATION(V01 연차/V02 병가/V03 경조), STATUS(S01 신청/S02 승인/S03 반려) 그룹을 **직접 추가** | 코드 콤보, "서버" 데이터 수정 (3·5) |
| 3 | 신규 신청 — addRow + bind item 입력 폼 | Dataset 조작, 바인딩 (3) |
| 4 | 신청 사원 선택 — **EmpSearchPopup 재사용** | 공통 팝업 (7) |
| 5 | 검증 — 필수값은 `gfn_validate`(8단계 과제 완성본), 기간은 시작일 ≤ 종료일 | 공통모듈, 업무 검증 (3·8) |
| 6 | 시작일 기본값 `gfn_getToday()` | 공통모듈 (8) |
| 7 | 메인 메뉴에 M005로 등록 | 메뉴 Dataset (6) |
| 8 | 목록 엑셀 복사 | 클립보드 TSV (9) |

### 채점 체크리스트 (강사용)

- [ ] include + gfn_ 함수만으로 메시지/검증 처리 (alert 직접 호출 없음)
- [ ] 팝업 반환값의 취소 가드 처리
- [ ] 기간 역전(종료일 < 시작일) 시 해당 컴포넌트로 포커스 이동
- [ ] 같은 메뉴 재클릭 시 탭 중복 생성 없음 (6단계 검증)
- [ ] 코드 추가를 code_list.xml(서버 측)에만 하고 화면 하드코딩 없음

## 5. 과정 총정리 — HR Admin이 담고 있는 것

| 단계 | 주제 | 핵심 |
|---|---|---|
| 01 | 로그인 | Form, 이벤트, value/set_속성 |
| 02 | 사원 목록 | Dataset = 데이터의 원본, Grid 바인딩, rowposition |
| 03 | 등록/수정 | bind item, 코드 콤보, rowtype, 검증 |
| 04 | 마스터/디테일 | Dataset 연동, filter, expr |
| 05 | 서버 연동 | transaction, 비동기 콜백, PlatformXml, 서비스 등록 |
| 06 | MDI 프레임 | 프레임/폼 전환, 메뉴 Dataset, 동적 탭, Div.set_url |
| 07 | 공통 팝업 | showModal, 인자/반환값, 공통 팝업 설계 원칙 |
| 08 | 공통모듈 | .xjs include, gfn_, application Dataset, 리팩토링 |
| 09 | 마무리 | 엑셀, 다국어, 종합 과제 |

수료 후 다음 행선지: 실제 WAS 연동(X-API), FrameSet 기반 정식 MDI, 권한별 메뉴, Nexacro 컴포넌트 심화(Tree/복합 Grid), 모바일 빌드 — 고급 과정의 후보 주제들입니다.
