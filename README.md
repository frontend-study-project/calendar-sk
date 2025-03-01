# 캘린더 기능 만들기 (25.02.27 ~ )

## DAY01

1. 개발환경셋팅
2. react-calendar 적용시 이슈
   2-1. 스타일을 커스텀해서 사용하기 위해 src/css/calendar.css 파일에 커스텀할 스타일들을 넣었다.
   그러나, 일부 스타일들이 제대로 적용이 안되고 있었다. [구글링 결과](https://velog.io/@yangareum1818/%EC%97%90%EB%9F%AC-Error-react-calendar-custom-style) react-calendar 라이브러리가 css-module로는 커스텀할 수 없다는걸 알게 되었는데, 그 이유가 파일이 압축되어 읽히는 부분에서 문제가 발생한다는 것이였다.
   나는 css-module로 파일을 생성하지는 않았지만 파일 이름이 문제가 될 것 같아서 calendarCustom.css로 변경해봤다. 다행히 문제가 해결됐다!!

## DAY02

1. 캘린더 라이브러리를 다시 선택
   react-calendar로 구글 캘린더와 같은 일정관리하는 캘린더 자체를 생성하는데 있어 크게 어려움은 없었지만, 일정을 관리하기 위해 날짜를 선택하고 드래그하는 등은 쉽지 않을 것같았다.
   그래서 다시 검색한 결과 최종적으로 fullCalendar라는 라이브러리를 사용하기로 했다. (참고로, 달력 라이브러리로 react-datepicker같은 경우 가장 많이 사용하는 달력 라이브러리인데, 이는 input으로 달력을 사용할 때 많이 사용되는 듯 했다. 내가 만들고자 하는 기능과는 결이 달라서 선택하지 않았다.) [달력 라이브러리 npm 비교](https://npm-compare.com/ko-KR/@fullcalendar/react,react-big-calendar,react-calendar,react-datepicker,react-datetime,react-native-calendars,react-native-datepicker)

2. fullCalendar 어려웠던점

   2-1. 날짜들을 드래그해서 일정을 생성하고 싶음
   문제 : `selectable={true}` 와 `select={function (info) {
  alert('selected ' + info.startStr + ' to ' + info.endStr);
}}` 을 적용해보았지만 작동하지 않았음
   해결 : 1. 우선 interaction을 설치해줘야 함. `npm install @fullcalendar/interaction ` 2. 캘린더 컴포넌트에서 import interactionPlugin from '@fullcalendar/interaction'; 임포트해준 다음! FullCalendar 컴포넌트에다가 plugins={[dayGridPlugin, interactionPlugin]}을 추가해줘야 함 그리고 나서 아까 안됐었던 selectable, select 등과 같은 속성들을 추가하면 잘 적용 됨

   2-2. 드래그한 일정은 어떻게 일정으로 캘린더에 등록하지?
   => FullCalendar 컴포넌트한테 events라는 속성에 전달하면 됨.

3. 드래그한 기간만큼의 일정을 생성하기

   3-1. 일정/할일(추후 생성 예정) 등을 선택할 수 있는 창을 생성

   3-2. 일정을 클릭하면 일정 관련 세부사항(제목, 컬러 등)을 등록하기

## DAY03

1. 일정 삭제하기
   일정을 클릭하면 처음 일정을 등록했던 팝업에 정보가 입력되어 있는채로 나타나고, 우클릭하면 삭제할 수 있는 팝업이 나타나야 한다.
   그렇다면 fullCalendar로 생성해둔 여러 일정중 어떤 일정을 우클릭했을때 이벤트 등록을 어떻게 할 수 있는걸까?

   1-1. fullCalendar 컴포넌트에 eventDidMount 속성에 handleEventDidMount를 전달해줌
   `       <FullCalendar
        ...
        eventDidMount={handleEventDidMount}
      />
       `

   1-2. handleEventDidMount 함수에서 우클릭 관련 이벤트를 contextmenu 이벤트 리스너를 생성해서 정리해두면 된다.

2. 새로고침해도 등록해놨던 일정 보여주기
