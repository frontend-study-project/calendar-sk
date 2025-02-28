import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useState } from 'react';
import ModalAddOption from '../modal/ModalAddOption';

const MainCalendar = () => {
  const [events, setEvents] = useState({
    isMoadlOpen: false,
    x: '',
    y: '',
  });
  const handleDayCellContent = (arg) => {
    const dayNumber = arg.dayNumberText.replace('일', '');
    return dayNumber;
  };

  const handleDateSelect = (selectInfo) => {
    // const title = prompt('새 일정의 제목을 입력하세요:');
    // if (title) {
    //   const newEvent = {
    //     id: createEventId(), // 고유 ID 생성
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay,
    //   };
    //   setEvents([...events, newEvent]);
    // }
    // // 선택 해제 (중요: 다음 선택을 위해)
    // selectInfo.view.calendar.unselect();
    console.log();
    setEvents({
      isMoadlOpen: true,
      x: selectInfo.jsEvent.clientX,
      y: selectInfo.jsEvent.clientY,
    });
  };
  const handleEventClick = (clickInfo) => {
    console.log(clickInfo);
  };

  const handleModalClose = () => {
    setEvents({
      isMoadlOpen: false,
      x: '',
      y: '',
    });
  };
  console.log(events);

  return (
    <section className="w-[calc(100%-300px)]">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        height="100%"
        locale="kr"
        headerToolbar={{
          left: 'title prev,next today',
          right: '',
        }}
        fixedWeekCount={false}
        dayCellContent={handleDayCellContent}
        selectable={true}
        select={handleDateSelect}
        //events={events}  상태로 관리되는 이벤트 배열
        eventClick={handleEventClick} // 이벤트 클릭 핸들러
        editable={true}
        // eventSources={ 구글캘린더로 공휴일 받아오기
        //   googleCalendarId: '',
        //   backgroundColor: 'transparent',
        //   borderColor: 'transparent',
        //   className: 'kr-holiday',
        //   textColor: 'red',
        // }
      />
      {events.isMoadlOpen && (
        <ModalAddOption
          clientX={events.x}
          clientY={events.y}
          onModalClose={handleModalClose}
        />
      )}
    </section>
  );
};

export default MainCalendar;
