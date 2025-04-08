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
];

const DEFAULT_DEPARTMENT = DEPARTMENTS.indexOf("ТРАВМАТОЛОГИЯ") || 0;

const INPUT_DELLAY = 500;
const SUMMARY_UPDATE_INTERVAL = 15 * 1000;

export {
  DEPARTMENTS,
  DEFAULT_DEPARTMENT,
  INPUT_DELLAY,
  SUMMARY_UPDATE_INTERVAL,
};
