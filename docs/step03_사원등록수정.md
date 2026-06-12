# Step 03. 사원 등록/수정 — 바인딩과 검증 (초급)

> **완성 소스**: `src/Base/EmpEdit.xfdl`
> **학습 목표**: **bind item**으로 입력 폼을 Dataset에 양방향 바인딩하고, 행 추가/삭제와 입력 검증, 변경 상태(rowtype) 관리를 배운다.

---

## 1. 들어가기 — 2단계의 불편함 해소

2단계에서는 행을 선택할 때마다 `getColumn`으로 상세 영역에 값을 **수동 복사**했습니다.
이번 단계의 핵심인 **bind item**을 쓰면:

- 행 이동 → 입력 컴포넌트 값 자동 갱신 (복사 코드 0줄)
- 컴포넌트에 입력 → Dataset에 자동 반영 (**양방향**)

> 💡 강의 포인트: 2단계 `fnDisplayDetail` 코드를 먼저 보여준 뒤 "이 코드가 전부 사라집니다"로 시작하면 동기 부여가 확실합니다.

## 2. 화면 구성

좌측 Grid(목록) + 우측 입력 폼 구조입니다.

- **Dataset 5개**: `dsEmp`(사원, 2단계와 동일 10건) + 코드용 `dsDept`/`dsPosition`/`dsGender`/`dsUseYn`
- **우측 입력 폼**: Edit(사번·사원명·이메일·연봉), Combo(부서·직급·성별·재직), Calendar(입사일), MaskEdit(전화번호)
- **버튼**: 신규 / 삭제(과제) / 변경취소 / 저장
- **상태 표시**: 현재 행 상태(일반/신규/수정), 전체 변경 내역(신규 n, 수정 n, 삭제 n)

## 3. 코드 콤보 — innerdataset

2단계에서 코드(D001, P01)가 그대로 보이던 문제를 해결합니다.

**입력 폼의 Combo**: `innerdataset=dsDept`, `codecolumn=DEPT_CD`, `datacolumn=DEPT_NM`
→ 화면에는 이름, Dataset에는 코드가 저장됩니다.

**Grid 셀**도 같은 원리로 이름을 표시합니다:

```xml
<Cell col="2" text="bind:DEPT_CD" displaytype="combotext"
      combodataset="dsDept" combocodecol="DEPT_CD" combodatacol="DEPT_NM"/>
```

> 💡 강의 포인트: "코드는 저장용, 이름은 표시용" — 코드성 데이터의 기본 원칙. 지금은 화면마다 코드 Dataset을 두지만 8단계에서 공통코드 모듈로 일원화됨을 예고하세요.

## 4. bind item 연결

Studio에서: 입력 컴포넌트 선택 → 속성창 Bind 영역에서 Dataset/컬럼 지정 (또는 Invisible Object의 Dataset 컬럼을 컴포넌트 위로 드래그).

소스 탭에서 보이는 결과 — `<Bind>` 블록:

```xml
<Bind>
  <BindItem id="item0" compid="edtEmpId" propid="value" datasetid="dsEmp" columnid="EMP_ID"/>
  <BindItem id="item2" compid="cboDept"  propid="value" datasetid="dsEmp" columnid="DEPT_CD"/>
  ...
</Bind>
```

연결 후 실행해서 ① 행 이동 시 폼 자동 갱신, ② 폼 수정 시 Grid 즉시 반영(양방향)을 확인하세요.

## 5. Dataset 조작 — addRow와 rowtype

```javascript
// 신규: 행 추가 → rowposition 자동 이동 → bind item이 빈 폼 표시
this.btnAdd_onclick = function(obj, e)
{
    var nRow = this.dsEmp.addRow();
    this.dsEmp.setColumn(nRow, "USE_YN", "Y");  // 기본값
    this.edtEmpId.setFocus();
};
```

Dataset은 모든 행의 **변경 상태(rowtype)** 를 자동 추적합니다:

| 상태 | 상수 | 의미 |
|---|---|---|
| 일반 | `Dataset.ROWTYPE_NORMAL` | 변경 없음 |
| 신규 | `Dataset.ROWTYPE_INSERT` | addRow로 추가됨 |
| 수정 | `Dataset.ROWTYPE_UPDATE` | 기존 행의 값이 변경됨 |
| 삭제 | (`getDeletedRowCount()`로 조회) | deleteRow로 삭제됨 |

- `applyChange()` — 변경 확정(모두 NORMAL로). 저장 성공 후 호출
- `reset()` — 마지막 확정 시점으로 되돌리기. "변경취소" 버튼
- 화면의 상태 표시(`fnDisplayStatus`)가 `onrowposchanged` + `oncolumnchanged`에서 갱신되므로, **값을 고치는 순간 일반 → 수정으로 바뀌는 것**을 눈으로 확인할 수 있습니다

> 💡 강의 포인트: rowtype은 5단계 서버 연동의 핵심 복선입니다 — "서버에는 변경된 행만 보낸다"가 이 상태값으로 가능해집니다.

## 6. 입력 검증 — fnValidate

저장 전 변경된(신규/수정) 행만 골라 검사합니다.

- 필수값: 사번/사원명/부서/직급/입사일
- 형식: 이메일 정규식 검사
- 업무 규칙: 사번 중복 검사 (자기 자신 제외)
- 실패 시: **해당 행으로 이동(`set_rowposition`) + 메시지 + 포커스** — bind item 덕분에 행 이동만으로 문제 값이 폼에 표시됩니다

```javascript
this.fnInvalid = function(nRow, sMsg, objComp)
{
    this.dsEmp.set_rowposition(nRow);  // 문제 행으로 이동
    this.alert(sMsg);
    objComp.setFocus();
    return false;
};
```

## 7. 실행과 확인

1. **F5** 실행
2. 확인 시나리오:
   - Grid 행 클릭 → 우측 폼 자동 갱신 (getColumn 코드 없이!)
   - 폼에서 사원명 수정 → Grid 즉시 반영 + 상태가 "수정"으로 변경
   - 신규 → 빈 폼 + 상태 "신규" → 값 입력 후 저장 → "신규 1건" 알림 → 상태 "일반"
   - 사번을 빈 채로 저장 → 해당 행으로 이동하며 오류 메시지
   - 기존 사번(E1001)으로 신규 등록 → 중복 오류
   - 여러 건 수정 후 변경취소 → 모두 원복

## 8. 과제 — 삭제 기능

`btnDelete_onclick`을 완성하세요 (완성 소스에 힌트 주석 있음).

- 선택 행이 없으면 안내, 있으면 `confirm("OOO 사원을 삭제하시겠습니까?")` 후 `deleteRow(nRow)`
- 삭제 후 변경 내역에 "삭제 1"이 표시되고, **변경취소 시 살아나는 것**까지 확인
- 심화: 신규(미저장) 행을 삭제하면 삭제 건수에 잡히지 않는 이유 토론 (서버에 없는 행이므로)

## 9. 핵심 정리

| 개념 | 내용 |
|---|---|
| bind item | 컴포넌트 ↔ Dataset 컬럼 양방향 바인딩 (`<Bind>` 블록) |
| innerdataset | Combo의 코드/이름 매핑 (codecolumn/datacolumn) |
| displaytype=combotext | Grid 셀에서 코드 → 이름 표시 |
| addRow / deleteRow / setColumn | 행 추가/삭제/값 설정 |
| getRowType / applyChange / reset | 변경 추적 / 확정 / 취소 |

**다음 단계 →** Step 04. 부서-사원 마스터/디테일: 두 Dataset을 연동하는 실무 화면 패턴을 배웁니다.
