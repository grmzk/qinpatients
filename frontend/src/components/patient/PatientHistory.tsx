import { useEffect, useState } from "react";

import CaseDiseaseResponse from "../../types/CaseDiseaseResponse";
import { ContentOfTableContent, TableContent } from "../../types/TableContent";
import Table from "../common/Table";

import styles from "../common/Table.module.css";

type PatientHistoryProps = {
  history: CaseDiseaseResponse[] | undefined;
  isLoading: boolean;
};

function PatientHistory({ history, isLoading }: PatientHistoryProps) {
  const [tableContent, setTableContent] = useState<TableContent<CaseDiseaseResponse>>({
    head: {},
    content: [],
  });

  useEffect(() => {
    setTableContent({
      head: {
        АСУ: "card_id",
        "Стац. номер": "inpatient_id",
        "Время поступления": "admission_date",
        Отделение: "department",
        Диагноз: "diagnosis",
        Врач: "doctor",
        Исход: "result",
      },
      content: history
        ? history.reduce<ContentOfTableContent<CaseDiseaseResponse>[]>((content, case_disease) => {
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
              data: case_disease,
              classList: classList,
            });
            return content;
          }, [])
        : [],
    });
  }, [history]);

  return (
    <Table
      title="СПИСОК ОБРАЩЕНИЙ ПАЦИЕНТА [БД БСМП №1]"
      helpMessage=""
      noDataMessage="НЕТ ОБРАЩЕНИЙ"
      tableContent={tableContent}
      isLoading={isLoading}
    />
  );
}

export default PatientHistory;
