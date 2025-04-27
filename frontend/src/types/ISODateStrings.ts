type Year = `${number}${number}${number}${number}`;
type Month = `${number}${number}`;
type Day = `${number}${number}`;
type Hours = `${number}${number}`;
type Minutes = `${number}${number}`;
type Seconds = `${number}${number}`;
type Milliseconds = `${number}${number}${number}`;

export type ISODate = `${Year}-${Month}-${Day}`;
// export type ISOTime = `${Hours}:${Minutes}:${Seconds}.${Milliseconds}`;
export type ISOTime = `${Hours}:${Minutes}:${Seconds}`;
export type ISODateTime = `${ISODate}T${ISOTime}`;

export function isISODate(entity: unknown): entity is ISODate {
  const dateISO: string = entity as string;
  return typeof dateISO === "string" && !!dateISO.match(/^\d{4}-[0-1]\d-[0-3]\d$/);
}

export function isISODateTime(entity: unknown): entity is ISODateTime {
  const dateTimeISO: string = entity as string;
  return typeof dateTimeISO === "string" && !!dateTimeISO.match(/^\d{4}-[0-1]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d$/);
}
