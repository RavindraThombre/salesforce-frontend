export type CourseProgress = {
  courseName: string;
  progress: number;
};

export type ActivityItem = {
  text: string;
  date: string;
};

export type NotificationItem = {
  message: string;
  createdAt: string;
};

export type UpcomingClass = {
  topic?: string;
  date?: string;
  time?: string;
  zoomLink?: string;

  courseId?: {
    title?: string;
  };
};

export type DashboardData = {
  totalCourses: number;
  totalLiveClasses: number;
  totalCertificates: number;
  upcomingClass?: UpcomingClass | null;

  courseProgress: CourseProgress[];
  activity: ActivityItem[];
  notifications: NotificationItem[];
};
