// eslint-disable-next-line
import dotenv from "dotenv";

import Departments from "../types/Departments";

let BASE_URL: string;
process.env.NODE_ENV === "production"
  ? (BASE_URL = "https://qinpatients.m4site.ru/api")
  : (BASE_URL = "http://localhost:8000/api");

const DEFAULT_DEPARTMENT: Departments = "ТРАВМАТОЛОГИЯ";

const DATE_INPUT_DELAY = 500;

const SUMMARY_UPDATE_INTERVAL = 15 * 1000;
const PATIENT_INFO_UPDATE_INTERVAL = 60 * 1000;

export { BASE_URL, DEFAULT_DEPARTMENT, DATE_INPUT_DELAY, SUMMARY_UPDATE_INTERVAL, PATIENT_INFO_UPDATE_INTERVAL };
