import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { DATE_INPUT_DELAY, SUMMARY_UPDATE_INTERVAL } from "../../configs/config";
import { getDataRepository } from "../../repositories/DataRepository";
import { DateISODate } from "../../types/DateISOStrings";
import Departments from "../../types/Departments";
import SummaryResponse from "../../types/SummaryResponse";
import Table from "../common/Table";

import styles from "../common/Table.module.css";

type MonitorTableProps = {
  department: Departments;
  diaryDate: DateISODate;
};

function MonitorTable({ department, diaryDate }: MonitorTableProps) {
  const [summary, setSummary] = useState<SummaryResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const headTitles = [
    "№",
    "АСУ",
    "Ф. И. О.",
    "Возраст",
    "Отделение",
    "Диагноз",
    "Время поступления",
    "Время обследования / результат",
  ];

  const getSummary = useCallback(() => {
    getDataRepository()
      .getSummary(department, diaryDate)
      .then(setSummary)
      .catch(console.warn)
      .finally(() => setIsLoading(false));
  }, [department, diaryDate]);

  useEffect(() => {
    const intervalId = setInterval(getSummary, SUMMARY_UPDATE_INTERVAL);
    setIsLoading(true);
    return () => clearInterval(intervalId);
  }, [diaryDate, department, getSummary]);

  useEffect(() => {
    const timeoutId = setTimeout(getSummary, DATE_INPUT_DELAY);
    return () => clearTimeout(timeoutId);
  }, [diaryDate, getSummary]);

  const rows = (function () {
    let counter = 1;

    return summary.map(({ patient, case_disease }) => {
      const classList: string[] = [];
      if (case_disease.is_reanimation) {
        classList.push(styles.reanimation);
      } else if (case_disease.is_inpatient) {
        classList.push(styles.inpatient);
      }
      if (!case_disease.is_outcome) {
        classList.push(styles.processing);
      }
      if (!["РЕАН. ЗАЛ", "ВСЕ ОТДЕЛЕНИЯ"].includes(department)) {
        if (case_disease.is_inpatient && case_disease.inpatient_department !== department) {
          classList.push(styles.toOtherDepartment);
        }
        if (case_disease.is_inpatient && case_disease.department !== department) {
          classList.push(styles.fromOtherDepartment);
        }
      }
      const index =
        case_disease.department === department || ["РЕАН. ЗАЛ", "ВСЕ ОТДЕЛЕНИЯ"].includes(department) ? counter++ : "";
      return (
        <tr
          className={classList.join(" ")}
          key={case_disease.card_id}
          onClick={() => navigate(`/patients/${patient.patient_id}`, { relative: "path" })}
        >
          <td>{index}</td>
          <td>{case_disease.card_id}</td>
          <td>{patient.full_name}</td>
          <td>{patient.age}</td>
          <td>{case_disease.department}</td>
          <td>{case_disease.diagnosis}</td>
          <td>{case_disease.admission_date}</td>
          <td>{case_disease.result}</td>
        </tr>
      );
    });
  })();

  return (
    <Table
      title="МОНИТОР"
      helpMessage="Выбор пациента"
      noDataMessage="НЕТ ОБРАЩЕНИЙ"
      headTitles={headTitles}
      rows={rows}
      isLoading={isLoading}
    />
  );
}

export default MonitorTable;
