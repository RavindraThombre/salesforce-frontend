type CourseProgress = {
  courseName: string;
  progress: number;
};

type ActivityItem = {
  text: string;
  date: string;
};

type NotificationItem = {
  message: string;
  createdAt: string;
};

type UpcomingClass = {
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