import "./MonitorTable.css";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  INPUT_DELLAY,
  SUMMARY_UPDATE_INTERVAL,
} from "../../../config/constants";
import ISummary from "../../types/ISummary";

interface IMonitorTableProps {
  department: string;
  diaryDate: string;
}

function MonitorTable({ department, diaryDate }: IMonitorTableProps) {
  const [summary, setSummary] = useState<ISummary[]>([]);

  async function fetchSummary() {
    await axios
      .get<ISummary[]>(
        `http://192.168.230.128/api/get_summary?department=${department}&date=${diaryDate}`,
      )
      .then((response) => setSummary(response.data))
      .catch(console.error);
  }

  useEffect(() => {
    fetchSummary();
  }, [department]);

  useEffect(() => {
    const intervalId = setInterval(fetchSummary, SUMMARY_UPDATE_INTERVAL);
    return () => clearInterval(intervalId);
  }, [diaryDate, department]);

  useEffect(() => {
    const timeoutId = setTimeout(fetchSummary, INPUT_DELLAY);
    return () => clearTimeout(timeoutId);
  }, [diaryDate]);

  return (
    <div id="MonitorTable">
      <div className="flex-brick title">МОНИТОР</div>
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
                classList.push("reanimation");
              } else if (case_disease.is_inpatient) {
                classList.push("inpatient");
              }
              if (!case_disease.is_outcome) {
                classList.push("processing");
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
        <div className="flex-brick title">НЕТ ОБРАЩЕНИЙ</div>
      )}
    </div>
  );
}

export default MonitorTable;
