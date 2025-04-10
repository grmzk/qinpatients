const BASE_URL = "http://192.168.230.128/api";

const DEPARTMENTS = [
  "ТРАВМАТОЛОГИЯ",
  "НЕЙРОХИРУРГИЯ",
  "I ХИРУРГИЯ",
  "II ХИРУРГИЯ",
  "УРОЛОГИЯ",
  "ОЖОГОВОЕ",
  "НЕВРОЛОГИЯ",
  "КАРДИОЛОГИЯ",
  "2 КАРДИОЛОГИЯ",
  "ГИНЕКОЛОГИЯ",
  "ТОКСИКОЛОГИЯ",
  "1 ТЕРАПИЯ",
  "2 ТЕРАПИЯ",
  "РЕАН. ЗАЛ",
  "ВСЕ ОТДЕЛЕНИЯ",
] as const;

const DEFAULT_DEPARTMENT = DEPARTMENTS.indexOf("ТРАВМАТОЛОГИЯ") || 0;

const INPUT_DELAY = 500;
const SUMMARY_UPDATE_INTERVAL = 15 * 1000;

export { BASE_URL, DEPARTMENTS, DEFAULT_DEPARTMENT, INPUT_DELAY, SUMMARY_UPDATE_INTERVAL };
