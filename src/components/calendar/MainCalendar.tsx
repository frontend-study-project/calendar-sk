import Calendar from 'react-calendar';

const MainCalendar = () => (
  <main className="w-[calc(100%-300px)]">
    <Calendar next2Label={null} prev2Label={null} calendarType="gregory" />
  </main>
);

export default MainCalendar;
