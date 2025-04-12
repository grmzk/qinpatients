import { DateISODate, isDateISODate } from "../types/DateISOStrings";

function getDiaryTodayDate(): Date {
  const today = new Date();
  if (today.getHours() < 8) {
    today.setDate(today.getDate() - 1);
  }
  return today;
}

function dateToIsoString(date: Date): DateISODate {
  let yyyy = date.getFullYear();
  let mm = String(date.getMonth() + 1).padStart(2, "0");
  let dd = String(date.getDate()).padStart(2, "0");
  const dateISO = `${yyyy}-${mm}-${dd}`;
  if (!isDateISODate(dateISO)) {
    console.error(`DateISO format is invalid: ${dateISO}`);
    return "1970-01-01";
  }
  return dateISO;
}

export function getDiaryToday(): DateISODate {
  return dateToIsoString(getDiaryTodayDate());
}

export function getDiaryYesterday(): DateISODate {
  return dateToIsoString(new Date(getDiaryTodayDate().getTime() - 24 * 60 * 60 * 1000));
}
