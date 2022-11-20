import formatDuration from "format-duration";

export const formatTime = (timeInSeconds = 0): string => {
  return formatDuration(timeInSeconds * 1000);
};

export const formatDate = (date: string): string => {
  const formattedDate = new Date(date);
  return formattedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
