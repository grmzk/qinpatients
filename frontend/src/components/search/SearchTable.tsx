import { useNavigate } from "react-router";

import SummaryResponse from "../../types/SummaryResponse";
import Table from "../common/Table";

import styles from "../common/Table.module.css";

type SearchTableProps = {
  searchResponse: SummaryResponse[];
  isLoading: boolean;
};

function SearchTable({ searchResponse, isLoading }: SearchTableProps) {
  const navigate = useNavigate();

  const headTitles = [
    "№",
    "АСУ",
    "Ф. И. О.",
    "Дата рождения",
    "Отделение",
    "Диагноз",
    "Время поступления",
    "Врач",
    "Исход",
  ];

  const rows = searchResponse.length
    ? searchResponse.map(({ patient, case_disease }, index) => {
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
          <tr
            className={classList.join(" ")}
            key={case_disease.card_id}
            onClick={() => navigate(`/patients/${patient.patient_id}`, { relative: "path" })}
          >
            <td>{index + 1}</td>
            <td>{case_disease.card_id}</td>
            <td>{patient.full_name}</td>
            <td>{patient.birthday}</td>
            <td>{case_disease.department}</td>
            <td>{case_disease.diagnosis}</td>
            <td>{case_disease.admission_date}</td>
            <td>{case_disease.doctor}</td>
            <td>{case_disease.result}</td>
          </tr>
        );
      })
    : [];

  return (
    <Table
      title="ПОИСК [БД БСМП №1]"
      helpMessage="Выбор пациента"
      noDataMessage="ОБРАЩЕНИЯ НЕ НАЙДЕНЫ"
      headTitles={headTitles}
      rows={rows}
      isLoading={isLoading}
    />
  );
}

export default SearchTable;
