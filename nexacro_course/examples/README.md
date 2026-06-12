# 넥사크로(Nexacro) 강의 실습 예제 코드

16차시 과정의 차시별 실습 예제입니다. 강의계획서(`../넥사크로_강의계획서.docx`)와 함께 사용하세요.

## 폴더 구성

| 폴더 | 차시 | 내용 | 핵심 학습 포인트 |
|------|------|------|------------------|
| `lesson02_hello/` | 2차시 | Hello Nexacro | 폼/컴포넌트/이벤트 기본 구조, trace |
| `lesson03_frame/` | 3차시 | 메뉴+작업영역 레이아웃 | Div, anchor(right/bottom), set_url |
| `lesson04_script/` | 4차시 | 입력값 검증 | onload, 함수 분리(fn_), setFocus, 정규식 |
| `lesson05_comp1/` | 5차시 | 회원가입 폼 | Edit/MaskEdit/TextArea/CheckBox/Radio, set_xxx() |
| `lesson06_comp2/` | 6차시 | 검색 조건 영역 | Combo+innerdataset, Calendar, anchor 레이아웃 |
| `lesson07_dataset/` | 7차시 | Dataset 기초 (★핵심) | addRow/setColumn/deleteRow, rowposition, findRow, 이벤트 |
| `lesson08_bind_grid/` | 8차시 | 바인딩과 Grid | binddataset, BindItem, displaytype, bind: 표현 |
| `lesson09_grid_adv/` | 9차시 | Grid 심화 | edittype, 헤더 정렬(keystring), Summary, rowtype |
| `lesson10_transaction/` | 10차시 | 서버 통신 | transaction 6요소, 콜백, ErrorCode |
| `lesson11_crud/` | 11차시 | CRUD 완성 | 변경분 전송(:U), 저장 후 재조회, 변경 체크 |
| `lesson12_popup/` | 12차시 | 팝업과 공통 스크립트 | showModal, 파라미터 전달, close(JSON), .xjs include |
| `project_emp_mgmt/` | 13~15차시 | 실습 프로젝트: 사원 관리 | 전체 종합 (메인/목록/상세/팝업/공통) |
| `lesson16_deploy/` | 16차시 | 배포 가이드 | Generate/Deploy, 캐시, 실수 체크리스트 |
| `mock_server/` | 10차시~ | 실습용 Mock 서버 | Node.js, 넥사크로 PlatformXml 응답 |

## 실습 환경 준비

### 1) Nexacro Studio 프로젝트 만들기

1. Nexacro Studio 실행 → **File > New > Project** (예: `NexaEdu`)
2. **TypeDefinition > Services** 에 서비스 등록:
   - `prefixid` : `svc`
   - `url` : `http://localhost:8090/`
3. TypeDefinition 에 경로 별칭 확인/추가:
   - `Base` : 폼 폴더 (xfdl 파일을 여기에 복사)
   - `Lib` : 라이브러리 폴더 (xjs 파일을 여기에 복사)

### 2) 예제 파일 가져오기

- 해당 차시 폴더의 `.xfdl` / `.xjs` 파일을 프로젝트의 Base/Lib 폴더에 복사
  (또는 Studio 의 Project Explorer 에서 우클릭 → Add > Existing Item)
- 폼을 열고 **F6 (QuickView)** 으로 실행

### 3) Mock 서버 실행 (10차시부터 필요)

```bash
cd mock_server
node server.js
# → http://localhost:8090 에서 대기
```

제공 서비스:

| URL | 기능 | 파라미터 |
|-----|------|----------|
| `/emp/list.do` | 사원 목록 조회 | `DEPT_CD`, `EMP_NM` |
| `/emp/save.do` | 사원 저장 (rowtype 기반 CRUD) | 입력 DS `ds_save` |
| `/dept/list.do` | 부서 목록 조회 | - |

## 강의 진행 팁

- 2~9차시 예제는 서버 없이 단독 실행됩니다 (Dataset 에 초기 데이터 내장).
- 예제마다 파일 상단 주석에 "학습 포인트"가 정리되어 있습니다 — 수업 도입부에서 함께 읽고 시작하세요.
- 7차시(Dataset)와 8차시(바인딩)는 과정의 분수령입니다. 진도보다 이해를 우선하세요.
- 13~15차시 프로젝트는 정답 코드입니다. 수강생에게는 화면 설계서만 주고 직접 만들게 한 뒤, 이 코드와 비교 리뷰하는 방식을 권합니다.
- 버전 참고: 예제는 FDL 2.1 / xscript5.1 기준으로 작성되어 Nexacro 17 및 Nexacro N 에서 사용 가능한 표준 패턴 위주입니다. 사용 중인 Studio 버전에 따라 폼 생성 마법사로 새 폼을 만든 뒤 Objects/Layouts/Script 내용을 옮겨 넣는 방식이 가장 안전합니다.
