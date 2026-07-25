export type LiveClass = {
  _id: string;

  courseId: {
    _id?: string;
    title: string;
  };

  trainerId: {
    _id?: string;
    name: string;
  };
  topic: string;
  date: string;
  time: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  timezone: string;
  zoomLink: string;
  isFree: boolean;
};

export type Course = {
  _id: string;
  title: string;
};

export type Trainer = {
  _id: string;
  name: string;
};

export const initialForm = {
  courseId: "",
  trainerId: "",
  topic: "",
  date: "",
  time: "",
  durationMinutes: "",
  zoomLink: "",
};
