import { ISODate, ISODateTime, isISODate, isISODateTime } from "../types/ISODateStrings";

function formatToLocaleDate(date: ISODate | ISODateTime) {
  if (isISODate(date)) {
    const dateString = new Date(Date.parse(date)).toLocaleString();
    return dateString.replace(/,.*$/, "");
  }
  if (isISODateTime(date)) {
    const dateString = new Date(Date.parse(date)).toLocaleString();
    return dateString.replace(",", "").replace(/:[0-5]\d$/, "");
  }
  return date;
}

export default formatToLocaleDate;
