# Step 02. 사원 목록 — Dataset과 Grid (초급)

> **완성 소스**: `src/Base/EmpList.xfdl`
> **학습 목표**: Nexacro 데이터 처리의 중심인 **Dataset**을 이해하고, **Grid 바인딩**으로 목록 화면을 만든다.

---

## 1. 들어가기 — Dataset이 왜 중심인가

Nexacro에서 화면의 데이터는 컴포넌트가 아니라 **Dataset**(메모리 상의 2차원 테이블)이 가집니다.

```
[서버/파일]  ⇄  Dataset (데이터 보관)  ⇄  Grid/Edit/Combo (바인딩으로 표시)
```

- 컴포넌트는 Dataset을 "보여주는 창"일 뿐, 원본은 항상 Dataset
- 이 구조 덕분에 같은 Dataset을 Grid·상세폼·콤보가 동시에 공유 가능

> 💡 강의 포인트: 이 그림 하나를 칠판에 먼저 그리고 시작하세요. 3~5단계 내내 재사용되는 핵심 멘탈모델입니다.

## 2. Dataset 만들기 (Invisible Object)

1. `Base` 폴더에 새 Form `EmpList`(1280×720) 생성
2. 툴박스에서 **Dataset**을 폼에 드래그 → 화면 아래 *Invisible Object* 영역에 `dsEmp` 생성
3. Dataset 편집기(더블클릭)에서 컬럼 정의:

| Column id | type | size | 비고 |
|---|---|---|---|
| EMP_ID | STRING | 10 | 사번 |
| EMP_NM | STRING | 50 | 사원명 |
| DEPT_CD | STRING | 10 | 부서코드 |
| POSITION_CD | STRING | 10 | 직급코드 |
| GENDER_CD | STRING | 1 | 성별 |
| HIRE_DT | STRING | 8 | 입사일(YYYYMMDD) |
| EMAIL | STRING | 100 | 이메일 |
| PHONE | STRING | 20 | 전화번호 |
| SALARY | INT | 10 | 연봉(만원) |
| USE_YN | STRING | 1 | 재직여부 |

4. **Rows(InitValue)** 탭에서 실습 데이터 10건 입력 — `data/emp_list.xml`의 값과 동일하게 입력합니다.
   (수업 시간 절약을 위해 완성 소스 `EmpList.xfdl`의 `<Rows>` 부분을 소스 탭에 붙여넣어도 됩니다)

> 💡 강의 포인트: "지금은 데이터를 화면에 하드코딩하지만, 5단계에서 이 데이터가 서버(XML 파일)에서 내려오게 바뀐다"는 큰 그림을 예고하세요.

## 3. Grid 배치와 바인딩

1. Grid(`grdEmp`)를 화면 상단에 크게 배치 (left 20, top 55, 1240×430)
2. **binddataset** 속성에 `dsEmp` 지정 — 또는 Dataset을 끌어다 Grid 위에 드롭하면 자동 바인딩
3. 컬럼 자동 생성 후 Grid Contents 편집기에서:
   - head 셀 제목을 한글로 변경 (사번/사원명/부서/…)
   - body 셀은 `bind:컬럼ID` 표현으로 연결되어 있음을 소스에서 확인
   - `autofittype=col`로 폭 자동 맞춤

> 💡 강의 포인트
> - head/body **Band** 구조와 `bind:` 표기를 소스 탭에서 직접 보여주기
> - 부서/직급이 코드(D001, P01)로 보이는 "불편함"을 일부러 남겨두기 → 3·8단계 개선 동기 부여

## 4. 검색 영역과 상세 영역

- 상단: `edtSearchNm`(사원명) + `btnSearch`(조회) + `btnReset`(초기화)
- Grid 아래: `stTotal`(총 N명) + 읽기전용 Edit 6개(사번/사원명/입사일/연봉/이메일/전화번호)

## 5. 스크립트 — rowposition 따라가기

핵심은 **Grid 행 클릭 → Dataset rowposition 이동 → onrowposchanged 이벤트** 흐름입니다.

```javascript
// Dataset의 현재 행이 바뀔 때마다 상세 영역 갱신
this.dsEmp_onrowposchanged = function(obj, e)
{
    this.fnDisplayDetail(e.newrow);   // e.newrow = 새로 선택된 행 인덱스
};

this.fnDisplayDetail = function(nRow)
{
    if (nRow < 0) { /* 행 없음 → 비우기 */ return; }
    this.edtEmpId.set_value(this.dsEmp.getColumn(nRow, "EMP_ID"));
    this.edtEmpNm.set_value(this.dsEmp.getColumn(nRow, "EMP_NM"));
    // ...
};

this.fnDisplayCount = function()
{
    this.stTotal.set_text("총 " + this.dsEmp.getRowCount() + "명");
};
```

> 💡 강의 포인트
> - 이벤트를 **Grid가 아니라 Dataset에** 거는 이유: 어떤 경로로 행이 바뀌든(클릭, 키보드, 스크립트) 한 곳에서 처리됨
> - `getColumn(행, "컬럼")`으로 셀 단위 읽기 — 다음 단계(bind item)와 비교 예고
> - 지금은 상세를 getColumn으로 "수동 복사"하지만, 3단계에서 **bind item**으로 자동화됨

## 6. 실행과 확인

1. **F5** 실행
2. 확인 시나리오:
   - 목록 10건 표시, "총 10명" 표시
   - Grid 행 클릭 → 하단 상세가 즉시 갱신
   - 키보드 ↑↓로 행 이동 시에도 상세 갱신 (Dataset 이벤트의 장점!)
   - 초기화 버튼 → 검색어/필터 해제

## 7. 과제 — 사원명 검색 (filter)

`btnSearch_onclick`을 완성하세요. 완성 소스에는 힌트 주석만 있습니다.

- 검색어가 있으면: `this.dsEmp.filter("String(EMP_NM).indexOf('" + sName + "') >= 0")`
- 검색어가 비었으면: `this.dsEmp.filter("")` (필터 해제)
- 검색 후 `fnDisplayCount()` 호출 → filter 상태에서 `getRowCount()`가 보이는 행 수만 반환함을 확인
- 심화: Enter 키로도 검색되게 `edtSearchNm`의 onkeyup 연결 (1단계 복습)

## 8. 핵심 정리

| 개념 | 내용 |
|---|---|
| Dataset | 메모리 2차원 테이블, 화면 데이터의 원본 (Invisible Object) |
| binddataset | Grid ↔ Dataset 연결, body 셀은 `bind:컬럼ID` |
| rowposition | Dataset의 현재 행. 변경 시 onrowposchanged 발생 |
| getColumn / getRowCount | 셀 읽기 / (필터 적용된) 행 수 |
| filter | 조건식으로 보이는 행 제한, `""`로 해제 |

**다음 단계 →** Step 03. 사원 등록/수정: **bind item**으로 컴포넌트-Dataset을 양방향 바인딩하고, 입력 검증과 행 추가/삭제를 배웁니다.
