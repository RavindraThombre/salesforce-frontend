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
  totalLiveSessions?: number;
  liveClasses?: unknown[];
};

export type Trainer = {
  _id: string;
  name: string;
};

export type LiveClassForm = {
  courseId: string;
  trainerId: string;
  topic: string;
  date: string;
  time: string;
  durationMinutes: string;
  zoomLink: string;
  isFree: boolean;
};

export const initialForm: LiveClassForm = {
  courseId: "",
  trainerId: "",
  topic: "",
  date: "",
  time: "",
  durationMinutes: "",
  zoomLink: "",
  isFree: false,
};
