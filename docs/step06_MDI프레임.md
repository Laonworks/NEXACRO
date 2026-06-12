# Step 06. MDI 프레임 — 업무 시스템의 뼈대 (중급)

> **완성 소스**: `src/Base/Main.xfdl` + `src/Base/Login.xfdl`(수정)
> **학습 목표**: 로그인 → 메인 진입 → 메뉴 클릭으로 업무화면을 **탭으로 여는** 실무형 구조를 만든다.

---

## 1. 들어가기 — 화면에서 "시스템"으로

지금까지는 화면을 하나씩 따로 실행했습니다. 이번 단계에서 화면들이 하나의 시스템으로 묶입니다.

```
app.xadl (애플리케이션)
 └─ 프레임 (formurl = Login.xfdl)
      로그인 성공 → formurl을 Main.xfdl로 교체
      └─ Main: 상단바 + 좌측 메뉴 Grid + 우측 Tab(작업영역)
                 메뉴 클릭 → 탭 생성 → Div.set_url("업무화면.xfdl")
```

> 💡 강의 포인트 (이론): ADL과 FrameSet
> - `app.xadl`은 애플리케이션의 시작 정의 — 어떤 프레임에 어떤 폼을 띄울지 결정합니다.
> - 정식 MDI는 ADL에서 **FrameSet/ChildFrame**(상단/좌측/작업 프레임 분할)으로 구성하지만,
>   실무에서는 이번 실습처럼 **단일 프레임 + Main 폼 안의 Tab** 구조도 널리 쓰입니다.
>   (구조가 단순하고 폼 간 접근이 쉬워서 교육·중소 프로젝트에 적합)
> - 두 방식 비교를 칠판에 그려 주면 "프레임"과 "폼"의 경계가 명확해집니다.

## 2. 사전 준비

1. `app.xadl`의 메인 프레임 **formurl을 `Base::Login.xfdl`로** 지정 (앱 시작 = 로그인)
2. `Main.xfdl`을 프로젝트에 추가
3. typedefinition Services에서 폼 경로 서비스(prefixid `Base`)가 프로젝트 폼 폴더를 가리키는지 확인
   — 새 프로젝트 생성 시 기본 등록되어 있습니다. `Base::Main.xfdl` 같은 URL이 이 서비스를 사용합니다.

## 3. 로그인 → 메인 전환 (Login.xfdl 수정)

1단계에 남겨둔 `TODO(6단계)`를 드디어 구현합니다:

```javascript
if (sUserId == "admin" && sPassword == "1234") {
    nexacro.getApplication().gvUserId = sUserId;          // 전역에 사용자 보관
    this.getOwnerFrame().set_formurl("Base::Main.xfdl");  // 프레임의 폼 교체
}
```

- `getOwnerFrame()` — 지금 이 폼을 담고 있는 프레임. 프레임 이름과 무관하게 동작하는 안전한 접근법
- `nexacro.getApplication()` — 애플리케이션 객체. 여기에 붙인 값(`gvUserId`)은 모든 폼에서 공유
  (정식으로는 app.xadl에 애플리케이션 변수로 등록하는 방법도 소개)

## 4. 메뉴 Dataset — 데이터 기반 메뉴

메뉴를 코드가 아니라 **Dataset**으로 관리합니다:

| MENU_ID | MENU_NM | FORM_URL |
|---|---|---|
| M001 | 사원 목록 (서버연동) | Base::EmpListSvc.xfdl |
| M002 | 사원 등록/수정 | Base::EmpEdit.xfdl |
| M003 | 부서별 사원 현황 | Base::DeptEmp.xfdl |

> 💡 강의 포인트: "메뉴 추가 = 행 추가, 코드 수정 없음"을 시연하세요 — dsMenu에 행을 하나 추가하고 재실행하면 메뉴가 늘어납니다. 실무에서는 이 Dataset이 서버(권한별 메뉴 조회)에서 내려옵니다(5단계 연결).

## 5. 멀티탭 — 동적 탭 생성과 중복 방지

`fnOpenMenu`의 4단계 흐름이 이 화면의 핵심입니다:

```javascript
// 1) 중복 방지: 이미 열려 있으면 선택만
var nFound = this.fnFindTabpage(sTpId);
if (nFound >= 0) { this.tabWork.set_tabindex(nFound); return; }

// 2) 탭 동적 추가
var nIndex = this.tabWork.tabpages.length;
this.tabWork.insertTabpage(sTpId, nIndex, nIndex, sMenuNm);

// 3) 탭 안에 Div 동적 생성 → 폼 로드
var objDiv = new Div();
objDiv.init("divWork", 0, 0, null, null, 0, 0);  // right/bottom=0 → 가득 채움
this.tabWork.tabpages[nIndex].addChild("divWork", objDiv);
objDiv.show();
objDiv.set_url(sFormUrl);   // ★ 초급에서 만든 화면이 그대로 열린다

// 4) 새 탭 선택
this.tabWork.set_tabindex(nIndex);
```

> 💡 강의 포인트
> - **Div.set_url** — 폼을 다른 폼 안에 "부품처럼" 끼워 넣는 방법. 7단계 팝업에서도 같은 원리 사용
> - 동적 컴포넌트 생성 3종 세트: `new + init → addChild → show` — 순서가 중요합니다
> - `insertTabpage` 등 API 인자는 버전에 따라 다를 수 있으니 **Studio에서 F1(레퍼런스)로 확인하는 습관**을 함께 가르치세요
> - 중복 방지 로직이 없으면 같은 메뉴를 누를 때마다 탭이 늘어나는 것을 먼저 보여주고(주석 처리), 그 다음 방지 로직을 추가하면 효과적입니다

## 6. 실행과 확인

1. **F5는 이제 app 단위로** — Login이 먼저 뜹니다
2. 확인 시나리오:
   - `admin`/`1234` 로그인 → 메인 진입, 우상단에 "admin 님"
   - 메뉴 3개를 차례로 클릭 → 탭 3개 + 홈 탭
   - 같은 메뉴 다시 클릭 → 새 탭이 생기지 않고 기존 탭 선택 (중복 방지)
   - 사원 목록(서버연동) 탭에서 데이터가 정상 조회되는지 (5단계 통신이 탭 안에서도 동작)
   - 로그아웃 → 로그인 화면 복귀 → 재로그인

## 7. 과제 — 탭 닫기

`btnCloseTab_onclick` / `btnCloseAll_onclick`을 완성하세요 (소스에 힌트 주석 있음).

- **현재 탭 닫기**: `removeTabpage(tabindex)`. 홈 탭(0번)은 보호. 닫은 뒤 어느 탭을 선택할지도 결정
- **전체 닫기**: 홈 탭만 남기고 **뒤에서부터** 제거 — 앞에서부터 지우면 인덱스가 꼬이는 이유를 직접 겪고 설명해 보기
- 심화: 탭버튼에 X 표시(showextrabutton 계열 속성/이벤트)도 레퍼런스에서 찾아 적용해 보기

## 8. 핵심 정리

| 개념 | 내용 |
|---|---|
| app.xadl / 프레임 | 앱 시작 정의, 프레임의 formurl 교체로 화면 전환 |
| getOwnerFrame() | 현재 폼을 담은 프레임에 안전하게 접근 |
| application 전역값 | `nexacro.getApplication().gvXXX` — 폼 간 데이터 공유 |
| 메뉴 Dataset | 데이터 기반 메뉴 — 추가/권한 제어가 데이터로 가능 |
| 동적 생성 | `new + init → addChild → show`, Tab insertTabpage/removeTabpage |
| Div.set_url | 폼을 컨테이너에 로드 — MDI와 팝업의 공통 원리 |

**다음 단계 →** Step 07. 공통 팝업: 어느 화면에서든 호출하는 사원검색 팝업과 부모-자식 간 값 전달을 배웁니다.
