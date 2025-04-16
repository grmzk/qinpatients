import CaseDiseaseResponse from "../../types/CaseDiseaseResponse";
import Table from "../common/Table";

import styles from "../common/Table.module.css";

type PatientHistoryProps = {
  history: CaseDiseaseResponse[] | undefined;
  isLoading: boolean;
};

function PatientHistory({ history, isLoading }: PatientHistoryProps) {
  const headTitles = ["№", "АСУ", "Стац. номер", "Время поступления", "Отделение", "Диагноз", "Врач", "Исход"];

  const rows = history
    ? history.map(
        (
          {
            card_id,
            admission_date,
            department,
            diagnosis,
            inpatient_id,
            doctor,
            result,
            is_inpatient,
            is_outcome,
            is_reanimation,
          },
          index
        ) => {
          const classList: string[] = [];
          if (is_reanimation) {
            classList.push(styles.reanimation);
          } else if (is_inpatient) {
            classList.push(styles.inpatient);
          }
          if (!is_outcome) {
            classList.push(styles.processing);
          }
          return (
            <tr className={classList.join(" ")} key={card_id}>
              <td>{index + 1}</td>
              <td>{card_id}</td>
              <td>{inpatient_id}</td>
              <td>{admission_date}</td>
              <td>{department}</td>
              <td>{diagnosis}</td>
              <td>{doctor}</td>
              <td>{result}</td>
            </tr>
          );
        }
      )
    : [];

  return (
    <Table
      title="СПИСОК ОБРАЩЕНИЙ ПАЦИЕНТА [БД БСМП №1]"
      helpMessage=""
      noDataMessage="НЕТ ОБРАЩЕНИЙ"
      headTitles={headTitles}
      rows={rows}
      isLoading={isLoading}
    />
  );
}

export default PatientHistory;
