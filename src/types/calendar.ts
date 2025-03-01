export type newSchedule = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
};

export type modalInfoType = {
  modal: string | null;
  id: string;
  title: string;
  x: string;
  y: string;
  start: Date | null;
  end: Date | null;
};
