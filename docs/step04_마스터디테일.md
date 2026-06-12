# Step 04. 부서-사원 마스터/디테일 — Dataset 관계 (초급)

> **완성 소스**: `src/Base/DeptEmp.xfdl`
> **학습 목표**: 두 Dataset을 연동하는 **마스터/디테일** 화면 패턴을 익힌다. 초급 과정의 종합 복습 단계.

---

## 1. 들어가기 — 마스터/디테일 패턴

업무 시스템에서 가장 흔한 화면 구조입니다: 왼쪽에서 상위 항목(부서)을 고르면 오른쪽에 하위 목록(사원)이 따라오는 구조.

```
dsDept (마스터)                    dsEmp (디테일)
   │  rowposition 변경                 │
   └─ onrowposchanged ──────────▶ filter("DEPT_CD == '선택부서'")
```

핵심은 단 하나의 이벤트 연결입니다 — **마스터의 onrowposchanged에서 디테일을 filter**.

> 💡 강의 포인트: 1~3단계에서 배운 것(Dataset, Grid 바인딩, rowposition 이벤트, bind item, filter)만으로 완성되는 화면입니다. "새로운 것은 연결 방법뿐"임을 강조하면 수강생 자신감이 올라갑니다.

## 2. 화면 구성

- **좌측**: 부서 Grid(`grdDept` ← `dsDept` 6건)
- **우측**: 사원 Grid(`grdEmp` ← `dsEmp` 10건) + 사원 수 표시 + "전체 사원 보기" 버튼
- **하단**: 사원 상세 영역(초기 `visible=false`, 더블클릭 시 표시) — bind item으로 자동 표시

## 3. 핵심 스크립트

```javascript
// ★ 마스터 행 이동 → 디테일 필터링 (이 화면의 전부)
this.dsDept_onrowposchanged = function(obj, e)
{
    this.fnFilterEmp(e.newrow);
};

this.fnFilterEmp = function(nRow)
{
    if (nRow < 0) {
        this.dsEmp.filter("");
    } else {
        var sDeptCd = this.dsDept.getColumn(nRow, "DEPT_CD");
        this.dsEmp.filter("DEPT_CD == '" + sDeptCd + "'");  // 문자열 비교는 따옴표 필수
    }
    this.fnDisplayCount();
};
```

> 💡 강의 포인트
> - filter 조건식은 **문자열로 만든 표현식** — 문자열 값 비교 시 `'…'` 따옴표를 빼먹는 실수가 가장 흔합니다. 일부러 빼고 실행해 오류를 보여주세요.
> - 이벤트를 Grid가 아닌 **Dataset에** 거는 이유(2단계 복습): 클릭이든 키보드든 한 곳에서 처리.

## 4. 상세 영역 — show/hide 패턴

사원 행 더블클릭(`oncelldblclick`) 시 하단 상세를 열고, 값 표시는 bind item이 자동 처리합니다(3단계 복습).

```javascript
var DETAIL_COMPS = ["stDetailTitle", "btnCloseDetail", /* ... */];

this.fnShowDetail = function(bShow)
{
    for (var i = 0; i < DETAIL_COMPS.length; i++) {
        this[DETAIL_COMPS[i]].set_visible(bShow);   // this["컴포넌트id"] 동적 접근
    }
};
```

> 💡 강의 포인트
> - `this["id"]` 동적 접근은 8단계 공통모듈(일괄 검증 함수)에서 다시 사용되는 기법입니다.
> - 컴포넌트가 많아지면 이런 일괄 제어가 번거로워짐 → **Div로 묶으면 한 번에 제어 + 재사용 가능**함을 소개하고, 7단계(공통 팝업)에서 화면 분리로 발전한다고 예고하세요.

## 5. 실행과 확인

1. **F5** 실행
2. 확인 시나리오:
   - 부서 클릭 → 우측에 해당 부서 사원만 표시 + 사원 수 갱신
   - 키보드 ↑↓로 부서 이동 → 동일하게 연동
   - 사원이 없는 부서(마케팅팀 D006) → 0명, 빈 Grid
   - "전체 사원 보기" → 필터 해제, 10명
   - 사원 더블클릭 → 하단 상세 열림, 다른 행 클릭 시 상세도 따라 변경(bind item)

## 6. 과제 — 부서별 사원 수 expr 컬럼

부서 Grid에 "사원수" 컬럼을 추가하세요 (완성 소스 하단에 힌트 주석 있음).

```xml
<Cell col="2" text='expr:dataset.parent.dsEmp.getCaseCount("DEPT_CD == \"" + DEPT_CD + "\"")'/>
```

- `expr:` — 셀 값을 수식으로 계산. 수식 안의 `DEPT_CD`는 그 행의 값
- `dataset.parent` — 폼으로 올라가 다른 Dataset(dsEmp) 참조
- **함정 관찰**: 부서를 클릭하면 사원수가 변합니다! `getCaseCount`가 filter된(보이는) 행만 세기 때문
- **토론 주제**: 해결 방법은?
  1. 화면표시용/원본 Dataset 분리 (`copyData`)
  2. filter 대신 부서 선택 시 **서버 재조회** — 5단계에서 다룰 전략과 직결되는 논점

> 💡 강의 포인트: 이 "filter vs 재조회" 토론이 초급 → 중급을 잇는 다리입니다. 데이터가 1만 건이라면? 어느 쪽이 맞을까? — 라는 질문으로 5단계를 예고하며 초급 과정을 마무리하세요.

## 7. 핵심 정리 (초급 과정 총정리)

| 단계 | 배운 것 |
|---|---|
| 01 | Form, 컴포넌트, 이벤트, `.value` / `set_속성()` |
| 02 | Dataset(데이터의 원본), Grid 바인딩, rowposition, filter |
| 03 | bind item(양방향), 코드 콤보, addRow/deleteRow, rowtype, 검증 |
| 04 | 마스터/디테일(Dataset 간 연동), expr, show/hide 패턴 |

**다음 단계 →** Step 05 (중급 시작). **transaction()** 으로 하드코딩 데이터를 서버(정적 XML) 조회로 전환합니다.
