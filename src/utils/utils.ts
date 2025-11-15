export function getTodayDayAndDate() {
  const today = new Date();

  const dayName = today.toLocaleDateString("en-US", {
    weekday: "long",
  });

  const formattedDate = today.toLocaleDateString("en-GB");

  return { dayName, formattedDate };
}
