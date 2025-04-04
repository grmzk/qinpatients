function getDiaryTodayDate(): Date {
  const today = new Date();
  if (today.getHours() < 8) {
    today.setDate(today.getDate() - 1);
  }
  return today;
}

function dateToIsoString(date: Date): string {
  let yyyy = date.getFullYear();
  let mm = String(date.getMonth() + 1).padStart(2, "0");
  let dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function getDiaryToday() {
  return dateToIsoString(getDiaryTodayDate());
}

export function getDiaryYesterday() {
  return dateToIsoString(
    new Date(getDiaryTodayDate().getTime() - 24 * 60 * 60 * 1000),
  );
}
