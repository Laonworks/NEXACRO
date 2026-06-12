# Nexacro N 강의 실습 프로젝트 — 사원/인사관리 시스템 (HR Admin)

Tobesoft Nexacro 강의(초급 → 중급)와 함께 단계적으로 확장하는 실습 프로젝트입니다.
강의 진행에 따라 단계별 실습 가이드(`docs/`)와 소스(`src/`)가 추가/업데이트됩니다.

## 시나리오

사내 인사관리 어드민 시스템을 처음부터 끝까지 만들어 봅니다.
부서·사원이라는 직관적인 도메인 위에서 Nexacro의 핵심(컴포넌트, Dataset 바인딩,
Grid, 이벤트 스크립팅 → transaction, MDI 프레임, 공통모듈)을 모두 다룹니다.

## 커리큘럼 / 진행 현황

| 단계 | 레벨 | 주제 | 핵심 학습 요소 | 상태 |
|---|---|---|---|---|
| 01 | 초급 | 로그인 화면 | Form, Edit/Button/Static, 이벤트, 스크립트 기초 | ✅ 완료 |
| 02 | 초급 | 사원 목록 | Dataset, Grid 바인딩, 조회 패턴 | ✅ 완료 |
| 03 | 초급 | 사원 등록/수정 | 컴포넌트 바인딩, 입력 검증, Dataset 조작 | ✅ 완료 |
| 04 | 초급 | 부서-사원 마스터/디테일 | Dataset 관계, filter, 이벤트 연계 | ✅ 완료 |
| 05 | 중급 | 서버 연동 | transaction(), 정적 XML 서비스, 콜백 처리 | ✅ 완료 |
| 06 | 중급 | MDI 프레임 | FrameSet, 메뉴, 멀티탭 업무화면 | ✅ 완료 |
| 07 | 중급 | 공통 팝업 | 모달 팝업, 파라미터 전달(사원검색/우편번호) | ✅ 완료 |
| 08 | 중급 | 공통모듈 | 메시지/검증/코드콤보 공통 함수, include | ✅ 완료 |
| 09 | 중급 | 마무리 | 엑셀 내보내기, 다국어 처리, 종합 과제 | ✅ 진행 중 |

## 폴더 구조

```
NEXACRO/
├── README.md            # 이 파일 — 개요와 진행 현황
├── docs/                # 강의안 + 단계별 실습 가이드
│   ├── 00_커리큘럼.md
│   ├── step01_로그인화면.md
│   ├── step02_사원목록.md
│   ├── step03_사원등록수정.md
│   ├── step04_마스터디테일.md
│   ├── step05_서버연동.md
│   ├── step06_MDI프레임.md
│   ├── step07_공통팝업.md
│   ├── step08_공통모듈.md
│   └── step09_마무리.md
├── src/                 # Nexacro 폼/스크립트 소스 (Nexacro Studio 프로젝트에 추가)
│   ├── Base/
│   │   ├── Login.xfdl   # 6단계에서 메인 전환 로직 추가됨
│   │   ├── EmpList.xfdl
│   │   ├── EmpEdit.xfdl
│   │   ├── DeptEmp.xfdl
│   │   ├── EmpListSvc.xfdl  # 9단계에서 엑셀 복사/한·영 전환 추가됨
│   │   ├── Main.xfdl    # 7단계 메뉴, 8단계 공통코드, 9단계 다국어 리소스 조회 추가됨
│   │   ├── EmpSearchPopup.xfdl
│   │   └── PopupDemo.xfdl  # 8단계에서 공통모듈 사용으로 리팩토링됨
│   └── Comm/
│       └── comm.xjs     # 8단계 공통 함수 + 9단계 gfn_msg(다국어)
└── data/                # 정적 XML 서비스 데이터 (5단계~ transaction 실습용)
    ├── dept_list.xml
    ├── emp_list.xml
    ├── code_list.xml
    ├── zip_list.xml      # 7단계 과제(우편번호 팝업)용
    ├── msg_list.xml      # 9단계 다국어 리소스
    └── vacation_list.xml # 9단계 종합 과제(휴가신청)용
```

## 실습 환경

- **Nexacro N** (Nexacro Studio) — [Tobesoft 홈페이지](https://www.tobesoft.com/product/nexacro)에서 평가판 다운로드
- 실제 프로젝트(.xprj)는 각자 Nexacro Studio에서 생성하고, 이 저장소의 `src/` 폼 파일을
  프로젝트에 추가하는 방식으로 실습합니다. (절차는 각 단계 가이드 참고)
- 서버 연동(5단계~)은 별도 서버 없이 `data/`의 정적 XML 파일로 진행합니다.
# NEXACRO
