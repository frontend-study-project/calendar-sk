import { DateInput } from '@fullcalendar/core';

export type NewScheduleType = {
  id: string;
  title: string;
  start: DateInput;
  end: DateInput;
  allDay: boolean;
};

export type ModalInfoType = {
  modal: string | null;
  id: string;
  title: string;
  x: string;
  y: string;
  start: Date | null;
  end: Date | null;
};
