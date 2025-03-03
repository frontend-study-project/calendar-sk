import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NewScheduleType } from '../types/calendar';

interface CalendarStore {
  events: NewScheduleType[];
  setEvent: (newData: NewScheduleType) => void;
  updateEvent: (updateId: string, updateData: string) => void;
  deleteEvent: (deleteId: string) => void;
  updateEventColor: (eventId: string, color: string) => void;
}

export const useCalendarStore = create<CalendarStore>()(
  persist(
    (set) => ({
      events: [],
      setEvent: (newData) => {
        set((state) => ({
          events: [...state.events, newData],
        }));
      },
      updateEvent: (updateId, title) => {
        set((state) => ({
          events: state.events.map((event) =>
            event.id === updateId
              ? {
                  ...event,
                  title,
                }
              : event
          ),
        }));
      },
      deleteEvent: (deleteId) => {
        set((state) => ({
          events: state.events.filter((event) => event.id !== deleteId),
        }));
      },
      updateEventColor: (eventId, color) => {
        set((state) => ({
          events: state.events.map((event) =>
            event.id === eventId
              ? {
                  ...event,
                  backgroundColor: color, // FullCalendar는 일반적으로 backgroundColor 속성을 사용합니다
                  borderColor: color, // 선택적으로 borderColor도 함께 업데이트
                }
              : event
          ),
        }));
      },
    }),
    {
      name: 'calendar-storage',
    }
  )
);
