export const getTimeParts = (time: string) => {
  if (!time) {
    return {
      hour: "",
      minute: "",
      period: "AM",
    };
  }

  const [hourString, minute] = time.split(":");
  const hour24 = Number(hourString);

  const period = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 || 12;

  return {
    hour: String(hour12),
    minute: minute || "00",
    period,
  };
};

export const convertTo24Hour = (
  hour: string,
  minute: string,
  period: string,
) => {
  if (!hour) return "";

  let hour24 = Number(hour);

  if (period === "AM" && hour24 === 12) {
    hour24 = 0;
  }

  if (period === "PM" && hour24 !== 12) {
    hour24 += 12;
  }

  return `${String(hour24).padStart(2, "0")}:${minute || "00"}`;
};

export const formatTime = (time?: string | null) => {
  if (!time) return "-";

  const { hour, minute, period } = getTimeParts(time);

  return `${hour}:${minute} ${period}`;
};

export const formatDateTimeIST = (dateTime?: string | null) => {
  if (!dateTime) {
    return "-";
  }

  const date = new Date(dateTime);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
};
