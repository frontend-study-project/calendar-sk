import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useEffect, useState } from 'react';
import ModalSelectOption from '../modal/ModalSelectOption';
import { ModalInfoType, NewScheduleType } from '../../types/calendar';
import { nanoid } from 'nanoid';
import ModalAddSchedule from '../modal/ModalAddSchedule';
import ModalDimmed from '../modal/ModalDimmed';
import { useCalendarStore } from '../../store';

const ResetModalInfo = {
  modal: null,
  id: '',
  title: '',
  x: '',
  y: '',
  start: null,
  end: null,
};

const MainCalendar = () => {
  const [modalInfo, setModalInfo] = useState<ModalInfoType>(ResetModalInfo);

  const { events, setEvent, updateEvent, deleteEvent } = useCalendarStore();

  const handleDayCellContent = (arg) => {
    const dayNumber = arg.dayNumberText.replace('일', '');
    return dayNumber;
  };

  const handleDateSelect = (selectInfo) => {
    const id = nanoid();

    setEvent({
      id: id,
      title: '',
      start: selectInfo.start,
      end: selectInfo.end,
      allDay: selectInfo.allDay,
    });

    setModalInfo({
      modal: 'first',
      id: id,
      title: '',
      x: selectInfo.jsEvent.clientX,
      y: selectInfo.jsEvent.clientY,
      start: selectInfo.start,
      end: selectInfo.end,
    });
  };

  const handleSelectScheduleType = () => {
    setModalInfo((prev) => ({
      ...prev,
      modal: 'second',
    }));
  };

  const handleAddScheduleDetail = (eventId: string, title: string) => {
    updateEvent(eventId, title);
  };

  const handleEventClick = (clickInfo) => {
    setModalInfo((prev) => ({
      ...prev,
      modal: 'second',
      id: clickInfo.event._def.publicId,
      title: clickInfo.event._def.title,
      start: clickInfo.event._instance.range.start,
      end: clickInfo.event._instance.range.end,
    }));
  };

  const handleEventDidMount = (info) => {
    info.el.addEventListener('contextmenu', (e) => {
      e.preventDefault();

      const deleteId = info.event._def.publicId;

      const check = confirm('삭제하시겠습니까?');

      if (check) {
        deleteEvent(deleteId);
      }
    });
  };

  const handleModalClose = () => {
    setModalInfo(ResetModalInfo);
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
        events={events}
        eventClick={handleEventClick}
        editable={true}
        eventDidMount={handleEventDidMount}
      />
      {modalInfo.modal && <ModalDimmed onModalClose={handleModalClose} />}
      {modalInfo.modal === 'first' && (
        <ModalSelectOption
          clientX={modalInfo.x}
          clientY={modalInfo.y}
          onSelectScheduleType={handleSelectScheduleType}
        />
      )}
      {modalInfo.modal === 'second' && (
        <ModalAddSchedule
          prevTitle={modalInfo.title}
          eventId={modalInfo.id}
          start={modalInfo.start}
          end={modalInfo.end}
          onAddScheduleDetail={handleAddScheduleDetail}
          onClose={handleModalClose}
        />
      )}
    </section>
  );
};

export default MainCalendar;
