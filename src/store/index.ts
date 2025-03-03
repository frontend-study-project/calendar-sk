import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NewScheduleType } from '../types/calendar';

interface CalendarStore {
  events: NewScheduleType[];
  setEvent: (newData: NewScheduleType) => void;
  updateEvent: (updateId: string, updateData: string) => void;
  deleteEvent: (deleteId: string) => void;
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
    }),
    {
      name: 'calendar-storage',
    }
  )
);
