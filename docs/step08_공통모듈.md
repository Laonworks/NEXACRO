# Step 08. 공통모듈 — 코드 재사용 (중급)

> **완성 소스**: `src/Comm/comm.xjs` + `Main.xfdl`/`PopupDemo.xfdl`(리팩토링)
> **학습 목표**: 반복 코드를 **.xjs 공통 라이브러리**로 묶고, 기존 화면을 리팩토링한다. 실무 프레임워크의 출발점.

---

## 1. 들어가기 — 우리가 복사해 온 코드들

지금까지 일부러 쌓아 온 "반복"을 먼저 세어 봅니다:

| 반복 코드 | 등장한 곳 |
|---|---|
| `fnIsNull` | Login(1), EmpEdit(3) |
| 통신 콜백의 오류 처리 | EmpListSvc(5), EmpSearchPopup(7) |
| `fnOpenPopup` | PopupDemo(7) — 팝업 쓰는 화면마다 복사될 운명 |
| 코드 Dataset (직급/성별/재직) | EmpEdit(3), DeptEmp(4), EmpListSvc(5) |

> 💡 강의 포인트: "공통화는 세 번째 반복이 나타날 때 하라"는 격언과 함께, 위 표를 수강생과 같이 채워 보면서 시작하세요. 공통화의 대상을 스스로 찾게 하는 것이 이 단계의 절반입니다.

## 2. .xjs와 include

**.xjs** = 폼이 아닌 **스크립트 전용 모듈**. 첫 줄이 `//XJS=파일명.xjs`로 시작합니다.

사용 절차:
1. Studio에서 프로젝트에 `Comm` 폴더 생성 → Script(.xjs) 파일 `comm.xjs` 추가
2. typedefinition Services에 경로 등록: `prefixid = Comm`, `url = Comm/` (폼 서비스와 동일 요령)
3. 사용할 폼 스크립트 **맨 위에** 한 줄:

```javascript
include "Comm::comm.xjs";
```

include된 함수는 그 폼의 함수가 됩니다 — `this.gfn_isNull(...)`처럼 호출.

> 💡 강의 포인트: 명명 규칙 `gfn_`(global function) vs `fn_`(화면 함수) — 어느 코드가 공통인지 이름만 보고 알 수 있게 하는 실무 관례입니다.

## 3. comm.xjs 둘러보기

| 함수 | 역할 | 출신 |
|---|---|---|
| `gfn_isNull` | 빈값 검사 | 1·3단계 fnIsNull |
| `gfn_alert` / `gfn_confirm` | 메시지 단일 통로 | 전 화면 |
| `gfn_getToday` | 오늘 날짜 YYYYMMDD | 신규 |
| `gfn_openPopup` | 모달 팝업 호출 | 7단계 fnOpenPopup |
| `gfn_setCombo` | 공통코드 콤보 일괄 세팅 | 3단계 코드 Dataset |
| `gfn_validate` | 필수입력 일괄 검증 | ★ 과제 |

`gfn_alert`가 "그냥 alert 한 줄 감싼 것"처럼 보이지만 — 나중에 메시지 제목, 로깅, **다국어(9단계)** 를 이 한 곳에만 추가하면 전 화면에 적용됩니다. **단일 통로의 가치**를 강조하세요.

## 4. 공통코드의 완성형 — application Dataset + gfn_setCombo

3단계부터 화면마다 코드 Dataset을 복사해 온 문제의 최종 해법입니다:

```
앱 시작(Main onload) ── transaction 1회 ──▶ gdsCode (application Dataset, 전 화면 공유)
화면에서는:  this.gfn_setCombo(this.cboDept... ❌)   // 부서는 dept_list — 코드성만!
            this.gfn_setCombo(this.cboPosition, "POSITION");   // 한 줄이면 끝
```

준비 절차:
1. **app.xadl을 열고** Invisible Object 영역에 Dataset `gdsCode` 추가 (application 소속 Dataset — 모든 폼에서 접근 가능)
2. `Main.xfdl` onload에 추가된 조회 확인: 출력 매핑이 `"gdsCode=dsCode"` — **받는 쪽이 application Dataset**인 것이 포인트
3. 이후 어느 화면이든: `this.gfn_setCombo(this.cboGender, "GENDER");`

`gfn_setCombo` 내부는 모두 배운 것의 조합입니다: filter(2단계) → 동적 Dataset 생성·addRow(3단계+6단계 동적 생성) → set_innerdataset(3단계).

## 5. 리팩토링 시연 — PopupDemo

8단계에서 실제로 바뀐 코드:

```diff
+ include "Comm::comm.xjs";

  this.btnSearchEmp_onclick = function(obj, e)
  {
      var oArgs = { sInitNm : this.edtEmpNm.value };
-     this.fnOpenPopup("EmpSearchPopup", ..., "fnEmpPopupCallback");
+     this.gfn_openPopup("EmpSearchPopup", ..., "fnEmpPopupCallback");
      ...
  };

- // ★ 모달 팝업 호출 공통 패턴 (8단계에서 공통모듈로 이동 예정)
- this.fnOpenPopup = function(sPopupId, sUrl, nWidth, nHeight, oArgs, sCallback)
- {
-     ... 12줄 ...
- };
```

**동작은 그대로, 화면 코드만 줄었다** — 리팩토링의 정의를 실행으로 확인하세요(실행 결과가 7단계와 동일해야 합니다).

## 6. 실습 — EmpEdit 리팩토링 (수강생 직접)

3단계 `EmpEdit.xfdl`을 직접 리팩토링합니다:

1. `include "Comm::comm.xjs";` 추가
2. `fnIsNull` 삭제 → 호출부를 `gfn_isNull`로 일괄 변경
3. 폼의 코드 Dataset(dsPosition/dsGender/dsUseYn) 삭제 → onload에서:
   ```javascript
   this.gfn_setCombo(this.cboPosition, "POSITION");
   this.gfn_setCombo(this.cboGender,  "GENDER");
   this.gfn_setCombo(this.cboUseYn,   "USE_YN");
   ```
   (주의: Grid 셀 combotext가 참조하는 Dataset은 남기거나 함께 전환 — 좋은 토론거리)
4. `alert`/`confirm` → `gfn_alert`/`gfn_confirm`
5. 실행해서 3단계와 동일하게 동작하는지 확인 — **리팩토링의 합격 기준은 "달라진 게 없음"**

## 7. 과제 — gfn_validate

`comm.xjs`의 `gfn_validate`를 완성하세요 (힌트 주석 있음).

```javascript
// 목표 사용법 — EmpEdit의 저장 검증이 이렇게 줄어듭니다
if (!this.gfn_validate([
    [this.edtEmpId, "사번"],
    [this.edtEmpNm, "사원명"],
    [this.cboDept,  "부서"]
])) return;
```

- 배열 순회 → `gfn_isNull(comp.value)` → 실패 시 `gfn_alert` + `setFocus` + false (첫 오류에서 중단)
- 4단계의 `this["컴포넌트id"]` 동적 접근을 응용하면 `[["edtEmpId", "사번"], ...]`처럼 id 문자열로도 받을 수 있습니다 (심화)

## 8. 핵심 정리

| 개념 | 내용 |
|---|---|
| .xjs + include | 스크립트 모듈, 폼 컨텍스트(this)로 포함됨 |
| gfn_ 명명 규칙 | 공통 함수와 화면 함수의 구분 |
| application Dataset | 앱 차원 1회 조회, 전 화면 공유 (gdsCode) |
| 단일 통로 | gfn_alert 한 곳 수정 = 전 화면 적용 (9단계 다국어의 발판) |
| 리팩토링 | 동작은 그대로, 구조만 개선 — 합격 기준은 "달라진 게 없음" |

**다음 단계 →** Step 09 (마무리). 엑셀 내보내기, 다국어 처리, 그리고 종합 과제(휴가신청 화면)로 과정을 완성합니다.
