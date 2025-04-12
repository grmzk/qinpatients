type Year = `${number}${number}${number}${number}`;
type Month = `${number}${number}`;
type Day = `${number}${number}`;
type Hours = `${number}${number}`;
type Minutes = `${number}${number}`;
type Seconds = `${number}${number}`;
type Milliseconds = `${number}${number}${number}`;

export type DateISODate = `${Year}-${Month}-${Day}`;
export type DateISOTime = `${Hours}:${Minutes}:${Seconds}.${Milliseconds}`;

export function isDateISODate(entity: unknown): entity is DateISODate {
  const dateISO: string = entity as string;
  return typeof dateISO === "string" && !!dateISO.match(/^\d{4}-[0-1]\d-[0-3]\d$/);
}
