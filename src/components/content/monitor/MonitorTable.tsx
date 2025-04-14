import { useCallback, useEffect, useState } from "react";

import { DATE_INPUT_DELAY, SUMMARY_UPDATE_INTERVAL } from "../../../configs/constants";
import DataRepository from "../../../repositories/DataRepository";
import { DateISODate } from "../../../types/DateISOStrings";
import Departments from "../../../types/Departments";
import Summary from "../../../types/Summary";

import styles from "./MonitorTable.module.css";

type MonitorTableProps = {
  department: Departments;
  diaryDate: DateISODate;
};

function MonitorTable({ department, diaryDate }: MonitorTableProps) {
  const [summary, setSummary] = useState<Summary[]>([]);

  const getSummary = useCallback(() => {
    const dataRepository = new DataRepository();
    dataRepository.getSummary(department, diaryDate).then(setSummary).catch(console.warn);
  }, [department, diaryDate]);

  useEffect(() => {
    const intervalId = setInterval(getSummary, SUMMARY_UPDATE_INTERVAL);
    return () => clearInterval(intervalId);
  }, [diaryDate, department, getSummary]);

  useEffect(() => {
    const timeoutId = setTimeout(getSummary, DATE_INPUT_DELAY);
    return () => clearTimeout(timeoutId);
  }, [diaryDate, getSummary]);

  return (
    <div>
      <div className={styles.title}>МОНИТОР</div>
      {summary.length ? (
        <table>
          <thead>
            <tr>
              <th>№</th>
              <th>АСУ</th>
              <th>Ф. И. О.</th>
              <th>Возраст</th>
              <th>Отделение</th>
              <th>Диагноз</th>
              <th>Время поступления</th>
              <th>Время обследования / результат</th>
            </tr>
          </thead>
          <tbody title="Выбор пациента">
            {summary.map(({ patient, case_disease }, index) => {
              const classList: string[] = [];
              if (case_disease.is_reanimation) {
                classList.push(styles.reanimation);
              } else if (case_disease.is_inpatient) {
                classList.push(styles.inpatient);
              }
              if (!case_disease.is_outcome) {
                classList.push(styles.processing);
              }
              return (
                <tr className={classList.join(" ")} key={case_disease.card_id}>
                  <td>{index + 1}</td>
                  <td>{case_disease.card_id}</td>
                  <td>{patient.full_name}</td>
                  <td>{patient.age}</td>
                  <td>{case_disease.department}</td>
                  <td>{case_disease.diagnosis}</td>
                  <td>{case_disease.admission_date}</td>
                  <td>{case_disease.result}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className={styles.title}>НЕТ ОБРАЩЕНИЙ</div>
      )}
    </div>
  );
}

export default MonitorTable;
