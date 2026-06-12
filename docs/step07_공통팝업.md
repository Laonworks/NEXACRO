# Step 07. 공통 팝업 — 화면 간 데이터 전달 (중급)

> **완성 소스**: `src/Base/EmpSearchPopup.xfdl`(팝업) + `src/Base/PopupDemo.xfdl`(호출 측) + `data/zip_list.xml`(과제용)
> **학습 목표**: 모달 팝업 호출, 부모 → 팝업 인자 전달, 팝업 → 부모 결과 반환의 왕복 흐름을 익힌다.

---

## 1. 들어가기 — 공통 팝업이란

"사원검색", "우편번호검색"처럼 **여러 화면에서 같은 방식으로 호출하는 보조 화면**입니다.
설계 원칙은 하나: 팝업은 호출한 화면을 몰라야 합니다. (인자로 받고, 반환값으로 돌려줄 뿐)

```
부모 화면                              팝업 (EmpSearchPopup)
  showModal(frame, {sInitNm:"김"}, ─▶  onload에서 인자 수신
            this, "콜백함수명")          검색/선택
  콜백함수(sPopupId, sRtn) ◀────────   close(JSON.stringify({...}))
```

## 2. 팝업 호출 — ChildFrame + showModal

`PopupDemo.xfdl`의 `fnOpenPopup`이 핵심 패턴입니다:

```javascript
this.fnOpenPopup = function(sPopupId, sUrl, nWidth, nHeight, oArgs, sCallback)
{
    var objChildFrame = new ChildFrame();
    objChildFrame.init(sPopupId, 0, 0, nWidth, nHeight, null, null, sUrl);
    objChildFrame.set_dragmovetype("all");          // 드래그 이동
    objChildFrame.set_openalign("center middle");   // 부모 중앙 정렬
    objChildFrame.showModal(this.getOwnerFrame(), oArgs, this, sCallback);
};
```

- **showModal 4개 인자**: 부모 프레임, 인자 객체, 콜백 폼(this), 콜백 함수명
- 모달이므로 팝업이 닫힐 때까지 부모는 조작 불가
- 6단계 복습: 프레임을 동적으로 만들어(`new + init`) 폼을 담는다 — MDI 탭과 같은 원리

> 💡 강의 포인트: 이 함수가 화면마다 복사되면? — 8단계 공통모듈 `gfn_openPopup`의 동기 부여입니다. "벌써 두 번째 반복되는 코드"(통신 콜백에 이어)임을 짚어 주세요.
> ⚠️ `ChildFrame.init`/`showModal`/`arguments`의 세부 시그니처는 버전에 따라 다를 수 있습니다 — Studio F1 레퍼런스로 확인하는 습관을 함께 가르치세요.

## 3. 팝업에서 인자 수신

```javascript
// EmpSearchPopup.xfdl - onload
var oArgs = this.getOwnerFrame().arguments;
if (oArgs != undefined && oArgs["sInitNm"] != undefined) {
    this.edtSearchNm.set_value(oArgs["sInitNm"]);   // 초기 검색어
}
```

부모가 입력 중이던 사원명이 팝업의 초기 검색어로 들어갑니다 — 작은 배려가 UX를 만듭니다.

## 4. 팝업에서 결과 반환 — close()

```javascript
// EmpSearchPopup.xfdl - 선택 시
var oRtn = { empId: ..., empNm: ..., deptCd: ... };
this.close(JSON.stringify(oRtn));    // close의 인자가 부모 콜백으로 전달

// 취소 시
this.close("");
```

`close()`의 인자는 **문자열**입니다. 여러 값은 JSON 문자열로 묶고, 부모가 `JSON.parse`로 풉니다.
(구버전/사내 표준에 따라 `"E1001|김민준"` 구분자 방식도 쓰입니다 — 비교 소개)

```javascript
// PopupDemo.xfdl - 콜백
this.fnEmpPopupCallback = function(sPopupId, sRtn)
{
    if (sRtn == null || sRtn == "") return;   // 취소 처리 필수!
    var oRtn = JSON.parse(sRtn);
    this.edtEmpId.set_value(oRtn.empId);
    this.edtEmpNm.set_value(oRtn.empNm);
};
```

> 💡 강의 포인트: 취소(빈 반환값) 처리를 빼먹으면 JSON.parse에서 오류 — 일부러 빼고 실행해 오류를 보여준 뒤 가드를 추가하면 기억에 남습니다.

## 5. 팝업 내부 — 지금까지의 종합

`EmpSearchPopup.xfdl`은 새 개념 없이 기존 학습의 조합입니다:
- transaction으로 사원/부서 조회 (5단계)
- 검색어 filter + Enter 키 검색 (2단계 과제 + 1단계)
- Grid combotext 부서명 표시 (3단계)
- 더블클릭 선택 (4단계)

## 6. 메뉴 연결 — 6단계의 약속 확인

`Main.xfdl`의 dsMenu에 **행 하나만 추가**했습니다:

```xml
<Row><Col id="MENU_ID">M004</Col><Col id="MENU_NM">공통 팝업 데모</Col>
     <Col id="FORM_URL">Base::PopupDemo.xfdl</Col></Row>
```

코드 수정 없이 메뉴가 늘어나는 것 — 6단계에서 약속한 "데이터 기반 메뉴"의 증명입니다.

## 7. 실행과 확인

1. 로그인 → 메뉴 "공통 팝업 데모" 클릭
2. 확인 시나리오:
   - [사원검색] → 팝업이 부모 중앙에 모달로 표시, 뒤 화면 조작 불가
   - 팝업에서 "김" 검색 → 더블클릭 선택 → 부모 입력란에 사번/사원명 채워짐
   - 로그 영역에서 호출 인자와 반환 JSON 문자열 확인
   - 사원명이 입력된 상태에서 다시 [사원검색] → 초기 검색어로 전달되는지
   - [취소] → 부모 값이 변하지 않는지

## 8. 과제 — 우편번호 검색 팝업

`ZipPopup.xfdl`을 직접 만들어 [우편번호 🔍] 버튼에 연결하세요 (PopupDemo에 힌트 주석 있음).

- 데이터: `svcData::zip_list.xml` (`dsZip` — ZIP_CD/ADDR, 8건 제공)
- EmpSearchPopup을 본떠서: 주소 일부로 filter 검색 → 선택 시 `close(JSON.stringify({zipCd, addr}))`
- 콜백 `fnZipPopupCallback`에서 우편번호/주소 입력란 채우기
- 심화: 두 팝업의 코드가 얼마나 비슷한지 비교 — "팝업 골격도 공통화할 수 있지 않을까?" (8단계 예고)

## 9. 핵심 정리

| 개념 | 내용 |
|---|---|
| showModal | ChildFrame 동적 생성 후 모달 표시, 인자/콜백 지정 |
| arguments | 팝업에서 부모가 넘긴 인자 수신 |
| close(문자열) | 팝업 → 부모 반환. 여러 값은 JSON 문자열 |
| 콜백 | (팝업ID, 반환값) 수신 — 취소(빈 값) 가드 필수 |
| 공통 팝업 설계 | 팝업은 호출자를 모른다 — 인자와 반환값으로만 대화 |

**다음 단계 →** Step 08. 공통모듈: 반복된 코드(fnIsNull, 통신 콜백, fnOpenPopup, 코드 콤보)를 .xjs 라이브러리로 묶고 기존 화면을 리팩토링합니다.
