import { useNavigate } from "react-router";

import CaseDiseaseResponse from "../../types/CaseDiseaseResponse";
import PatientInfoResponse from "../../types/PatientInfoResponse";
import SummaryResponse from "../../types/SummaryResponse";
import { ContentOfTableContent, TableContent } from "../../types/TableContent";
import Table from "../common/Table";

import styles from "../common/Table.module.css";

type SearchTableProps = {
  searchResponse: SummaryResponse[];
  isLoading: boolean;
};

function SearchTable({ searchResponse, isLoading }: SearchTableProps) {
  const navigate = useNavigate();

  const tableContent: TableContent<PatientInfoResponse & CaseDiseaseResponse> = {
    head: {
      АСУ: "card_id",
      "Ф. И. О.": "full_name",
      Возраст: "age",
      Отделение: "department",
      Диагноз: "diagnosis",
      "Время поступления": "admission_date",
      Врач: "doctor",
      Исход: "result",
    },
    content: searchResponse.reduce<ContentOfTableContent<PatientInfoResponse & CaseDiseaseResponse>[]>(
      (content, { patient, case_disease }) => {
        const classList: string[] = [];
        if (case_disease.is_reanimation) {
          classList.push(styles.reanimation);
        } else if (case_disease.is_inpatient) {
          classList.push(styles.inpatient);
        }
        if (!case_disease.is_outcome) {
          classList.push(styles.processing);
        }
        content.push({
          data: { ...patient, ...case_disease },
          classList: classList,
          onClick: () => navigate(`/patients/${patient.patient_id}`, { relative: "path" }),
        });
        return content;
      },
      []
    ),
  };

  return (
    <></>
    // <Table
    //   title="ПОИСК [БД БСМП №1]"
    //   helpMessage="Выбор пациента"
    //   noDataMessage="ОБРАЩЕНИЯ НЕ НАЙДЕНЫ"
    //   tableContent={tableContent}
    //   isLoading={isLoading}
    // />
  );
}

export default SearchTable;
