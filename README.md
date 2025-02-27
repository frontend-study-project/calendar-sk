# 캘린더 기능 만들기 (25.02.27 ~ )

## DAY01

1. 개발환경셋팅
2. react-calendar 적용시 이슈
   2-1. 스타일을 커스텀해서 사용하기 위해 src/css/calendar.css 파일에 커스텀할 스타일들을 넣었다.
   그러나, 일부 스타일들이 제대로 적용이 안되고 있었다. [구글링 결과](https://velog.io/@yangareum1818/%EC%97%90%EB%9F%AC-Error-react-calendar-custom-style) react-calendar 라이브러리가 css-module로는 커스텀할 수 없다는걸 알게 되었는데, 그 이유가 파일이 압축되어 읽히는 부분에서 문제가 발생한다는 것이였다.
   나는 css-module로 파일을 생성하지는 않았지만 파일 이름이 문제가 될 것 같아서 calendarCustom.css로 변경해봤다. 다행히 문제가 해결됐다!!
