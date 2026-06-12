# Step 01. 로그인 화면 — Nexacro 첫걸음 (초급)

> **완성 소스**: `src/Base/Login.xfdl`
> **학습 목표**: Nexacro Studio로 첫 화면을 만들고, 컴포넌트·이벤트·스크립트의 기본 흐름을 이해한다.

---

## 1. 사전 준비 — 프로젝트 생성

1. [Tobesoft 홈페이지](https://www.tobesoft.com/product/nexacro)에서 Nexacro Studio(평가판) 설치
2. Nexacro Studio 실행 → **File > New > Project**
   - Project Name: `HRAdmin`
   - Template: Desktop(1280×720) 기본 선택
3. 생성된 프로젝트 트리 확인: `app.xadl`(애플리케이션), `Base/`(폼 폴더), `typedefinition.xml`(환경)

> 💡 강의 포인트: Nexacro 화면 = **XML 레이아웃 + JavaScript 스크립트**가 한 파일(.xfdl)에 담긴 구조임을 먼저 보여주세요. (디자인 탭 ↔ 소스 탭 전환)

## 2. 화면 레이아웃 작성

`Base` 폴더에 새 Form(`Login`, 1280×720)을 만들고 아래 컴포넌트를 배치합니다.

| 컴포넌트 | id | 주요 속성 |
|---|---|---|
| Static | stTitle | text=`HR Admin`, font 크게, textAlign=center |
| Static | stSubTitle | text=`사원/인사관리 시스템`, color=#888888 |
| Static | stUserId | text=`아이디` |
| Edit | edtUserId | displaynulltext=`아이디 입력` |
| Static | stPassword | text=`비밀번호` |
| Edit | edtPassword | **password=true**, displaynulltext=`비밀번호 입력` |
| Button | btnLogin | text=`로그인` |
| Static | stMessage | text 비움, color=#d9534f (오류 메시지 표시용) |

> 💡 강의 포인트
> - 속성창(Properties)에서 속성을 바꿀 때마다 소스 탭에서 XML이 어떻게 변하는지 같이 확인
> - `password=true`로 입력값 마스킹, `displaynulltext`로 placeholder 효과

## 3. 이벤트와 스크립트

연결할 이벤트 3개:

| 대상 | 이벤트 | 함수 | 역할 |
|---|---|---|---|
| Form | onload | Login_onload | 첫 포커스를 아이디 입력란으로 |
| btnLogin | onclick | btnLogin_onclick | 로그인 시도 |
| edtPassword | onkeyup | edtPassword_onkeyup | Enter(keycode 13) 시 로그인 시도 |

핵심 흐름 (`fnLogin` 사용자 정의 함수):

```javascript
this.fnLogin = function()
{
    var sUserId = this.edtUserId.value;      // 컴포넌트 값 읽기
    var sPassword = this.edtPassword.value;

    if (this.fnIsNull(sUserId)) {            // 1) 빈값 검증
        this.stMessage.set_text("아이디를 입력하세요.");  // 속성 변경은 set_XXX()
        this.edtUserId.setFocus();
        return;
    }
    // ...비밀번호 검증 동일...

    if (sUserId == "admin" && sPassword == "1234") {   // 2) 고정 계정 검증
        this.alert("로그인 성공! " + sUserId + "님 환영합니다.");
    } else {
        this.stMessage.set_text("아이디 또는 비밀번호가 올바르지 않습니다.");
        this.edtPassword.set_value("");
        this.edtPassword.setFocus();
    }
};
```

> 💡 강의 포인트
> - **값 읽기는 `.value`, 속성 변경은 `set_속성명()`** — Nexacro의 기본 규약
> - 버튼 onclick과 Enter 키 처리가 같은 `fnLogin()`을 호출하는 구조 → 로직 함수 분리 습관
> - 1단계는 서버가 없으므로 고정 계정(admin/1234). "실무에선 서버 검증"임을 예고(5단계 복선)

## 4. 실행과 확인

1. **F5**(Quick View)로 실행
2. 확인 시나리오:
   - 빈값으로 로그인 → 오류 메시지 + 포커스 이동
   - 틀린 계정 → 오류 메시지 + 비밀번호 초기화
   - `admin` / `1234` → 성공 alert
   - 비밀번호 입력 후 **Enter** → 버튼 클릭과 동일 동작

## 5. 과제

**"비밀번호 표시" CheckBox 추가하기**
- CheckBox(`chkShowPw`) 배치, oncheckchanged 이벤트에서
  `this.edtPassword.set_password(false/true)` 호출
- 힌트: 이벤트 객체 `e.postvalue`로 체크 상태 확인

## 6. 핵심 정리

| 개념 | 내용 |
|---|---|
| .xfdl | 화면 정의 파일 = XML 레이아웃 + 스크립트 |
| 이벤트 모델 | 컴포넌트 이벤트 → `this.함수명 = function(obj, e)` |
| 값/속성 | 읽기 `.value`, 쓰기 `set_속성명(값)` |
| 사용자 정의 함수 | 화면 로직은 `fnXXX`로 분리해 재사용 |

**다음 단계 →** Step 02. 사원 목록: Nexacro 데이터 처리의 핵심인 **Dataset**과 **Grid**를 배웁니다.
