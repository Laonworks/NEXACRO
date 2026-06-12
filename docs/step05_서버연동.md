# Step 05. 서버 연동 — transaction (중급)

> **완성 소스**: `src/Base/EmpListSvc.xfdl` + `data/*.xml`
> **학습 목표**: Nexacro 표준 통신 **transaction()** 으로 데이터를 서버에서 받아오는 구조를 이해한다. 중급 과정의 시작.

---

## 1. 들어가기 — 하드코딩과의 작별

초급에서는 Dataset의 `<Rows>`에 데이터를 직접 넣었습니다. 실무에서는 데이터가 항상 서버에서 옵니다.

```
초급:  Dataset <Rows>에 하드코딩          (화면을 고쳐야 데이터가 바뀜)
중급:  Dataset ← transaction() ← 서버    (화면은 그대로, 데이터만 갱신)
```

이번 강의는 별도 서버 없이 **정적 XML 파일**(`data/*.xml`)을 서버 응답처럼 사용합니다.
파일 내용이 Nexacro 표준 응답 포맷(PlatformXml)과 동일하므로, 나중에 실제 WAS로 바꿔도 화면 코드는 거의 그대로입니다.

## 2. 서버 응답 포맷 — PlatformXml

`data/emp_list.xml`을 열어 구조를 확인하세요:

```xml
<Root xmlns="http://www.nexacroplatform.com/platform/dataset">
  <Parameters>
    <Parameter id="ErrorCode" type="int">0</Parameter>   <!-- 음수면 실패 -->
    <Parameter id="ErrorMsg" type="string">SUCCESS</Parameter>
  </Parameters>
  <Dataset id="dsEmp">
    <ColumnInfo> ... </ColumnInfo>
    <Rows> ... </Rows>
  </Dataset>
</Root>
```

> 💡 강의 포인트: `ErrorCode`/`ErrorMsg`는 Nexacro가 자동 해석하는 약속된 파라미터입니다. 음수 ErrorCode면 콜백의 두 번째 인자로 전달되어 실패 처리됩니다.

## 3. 사전 준비 — 서비스 등록

1. 이 저장소의 `data/` 폴더(3개 XML)를 **Nexacro 프로젝트 폴더 안에 복사**
2. Studio에서 `typedefinition.xml` 더블클릭 → **Services** 탭 → 추가:
   - `prefixid` = `svcData`
   - `url` = `data/` (상대 경로)
3. 이후 모든 통신 URL은 `svcData::emp_list.xml` 형태로 사용

```
"svcData::emp_list.xml"  →  (실행 시)  →  "<앱 베이스 URL>/data/emp_list.xml"
```

> 💡 강의 포인트: prefixid의 가치 — 개발/운영 서버 주소가 바뀌어도 **typedefinition 한 곳만** 수정하면 됩니다. 화면 코드에 URL을 하드코딩하지 않는 이유.
>
> ⚠️ Quick View(F5)에서 상대 경로 로드가 안 되는 환경이라면(브라우저 보안 정책 등), 프로젝트 폴더에서 `python3 -m http.server 8080` 으로 간이 웹서버를 띄우고 url을 `http://localhost:8080/data/` 로 등록하세요.

## 4. transaction() — 6개 인자

```javascript
this.transaction(
    "svcEmp",                  // 1. 통신 ID — 콜백에서 어떤 요청인지 식별
    "svcData::emp_list.xml",   // 2. URL — "서비스prefixid::경로"
    "",                        // 3. 입력 Dataset — "서버이름=화면이름" (조회는 보통 "")
    "dsEmp=dsEmp",             // 4. 출력 Dataset — "화면이름=서버이름"
    "",                        // 5. 인자 — "키=값 키2=값2"
    "fnCallback"               // 6. 콜백 함수명
);
```

암기 팁: **"아이디, 주소, 보낼 것, 받을 것, 인자, 콜백"**

입·출력 매핑의 방향이 헷갈리기 쉽습니다:
- 입력(3번): `서버에서 받을 이름 = 내 화면의 Dataset`
- 출력(4번): `내 화면의 Dataset = 서버가 보낸 Dataset id`

## 5. 비동기와 콜백 — 응답은 나중에 온다

transaction은 요청만 던지고 **즉시 다음 줄로 넘어갑니다**(비동기). 응답이 도착하면 콜백이 실행됩니다.

```javascript
this.fnCallback = function(sSvcId, nErrorCode, sErrorMsg)
{
    if (nErrorCode < 0) {              // 1) 공통 오류 처리
        this.alert("통신 오류: " + sErrorMsg);
        return;
    }
    switch (sSvcId) {                  // 2) 통신 ID별 후처리
        case "svcCode": /* 코드 분리 */ break;
        case "svcEmp":  this.fnDisplayCount(); break;
    }
}
```

완성 소스의 **통신 로그(TextArea)** 가 학습 장치입니다 — onload에서 요청 3건을 던진 직후
"요청 완료" 로그가 먼저 찍히고, 성공 로그가 **나중에, 순서 보장 없이** 도착하는 것을 눈으로 확인하세요.

> 💡 강의 포인트
> - "transaction 다음 줄에서 `dsEmp.getRowCount()`를 찍으면 몇 건일까?" → 0건. 비동기 이해도를 확인하는 최고의 질문입니다.
> - 콜백을 통신마다 따로 만들지 않고 **하나로 모아 sSvcId로 분기**하는 구조 — 8단계 공통모듈의 복선입니다.

## 6. 공통코드 분리 — filter + copyData

`code_list.xml` 한 번 조회로 받은 dsCode를 그룹별 Dataset으로 나눕니다:

```javascript
this.fnSplitCode = function(sGroupCd, objTargetDs)
{
    this.dsCode.filter("GROUP_CD == '" + sGroupCd + "'");
    objTargetDs.copyData(this.dsCode, true);   // true = filter된 행만
    this.dsCode.filter("");
};
```

4단계 과제 토론(filter된 행만 세는 getCaseCount)에서 예고한 **원본/용도별 Dataset 분리**가 바로 이 패턴입니다.

## 7. 실습 — 기존 화면 전환

1. `EmpListSvc.xfdl`을 프로젝트에 추가하고 실행(F5)
2. 2단계 `EmpList.xfdl`과 나란히 놓고 차이 비교:
   - Dataset에 `<Rows>` 없음 (소스가 짧아짐!)
   - 부서/직급/재직이 코드가 아닌 **이름**으로 표시 (서버에서 받은 코드 Dataset 활용)
3. 시간이 되면 4단계 `DeptEmp.xfdl`도 같은 방식으로 직접 전환 (좋은 자율 실습)

## 8. 실행과 확인

- 화면 로드 → 통신 로그에 "요청 완료"가 먼저, 성공 3건이 나중에 찍히는지
- 목록 10건 + 부서/직급/재직 이름 표시 + "총 10명"
- "전체 재조회" → 같은 데이터 다시 수신
- **오류 체험**: 서비스 url을 일부러 틀리게(`data2/`) 바꾸고 실행 → ErrorCode 음수 + alert 확인 후 원복

## 9. 과제 — 조회 조건 인자 전달

`btnSearch_onclick`을 완성하세요 (소스에 힌트 주석 있음).

1. 5번째 인자로 `"sEmpNm=" + nexacro.wrapQuote(검색어)` 전달, 통신 ID는 `svcEmpSearch`로 구분
2. 실행 결과 관찰: **정적 파일은 인자를 무시하고 전체를 반환** → 콜백의 `svcEmpSearch` 케이스에서 클라이언트 filter로 거르기
3. 토론: 실제 서버라면 인자를 받아 SQL WHERE로 거른 결과만 반환합니다.
   - "1만 건이라면 어디서 걸러야 하나?" (4단계 토론의 결론)
   - 정적 파일 방식의 한계와, 화면 코드는 그대로 두고 서버만 교체 가능한 구조의 가치

## 10. 핵심 정리

| 개념 | 내용 |
|---|---|
| transaction() | ID, URL, 입력, 출력, 인자, 콜백 — 6개 인자 |
| 비동기 | 요청 후 즉시 리턴, 응답은 콜백으로 |
| PlatformXml | Parameters(ErrorCode/Msg) + Dataset 구조의 표준 응답 |
| 서비스 등록 | typedefinition prefixid — URL 하드코딩 방지 |
| copyData | filter와 조합해 원본/용도별 Dataset 분리 |

**다음 단계 →** Step 06. MDI 프레임: 로그인 → 메인 프레임 → 메뉴로 업무화면을 탭으로 여는 실무 시스템 뼈대를 만듭니다.
