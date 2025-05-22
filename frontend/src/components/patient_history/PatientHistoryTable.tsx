import { useNavigate } from "react-router";

import { useAppDispatch } from "../../hooks/reduxHooks";
import { addEditorTab } from "../../redux/slices/editorSlice";
import CaseDiseaseResponse from "../../types/CaseDiseaseResponse";
import PatientInfoResponse from "../../types/PatientInfoResponse";
import { ContentOfTableContent, TableContent } from "../../types/TableContent";
import Table from "../common/Table";

import styles from "../common/Table.module.css";

type PatientHistoryTableProps = {
  patientInfo: PatientInfoResponse | undefined;
  history: CaseDiseaseResponse[] | undefined;
  isLoading: boolean;
};

function PatientHistoryTable({ patientInfo, history, isLoading }: PatientHistoryTableProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const tableContent = {
    head: {
      АСУ: "card_id",
      "Стац. номер": "inpatient_id",
      "Время поступления": "admission_date",
      Отделение: "department",
      Диагноз: "diagnosis",
      Врач: "doctor",
      Исход: "result",
    },
    content:
      patientInfo && history
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
              onClick: () => {
                dispatch(addEditorTab({ patientInfo, caseDisease: case_disease, editorType: "FIRST_EXAMINATION" }));
                navigate("/editor");
              },
            });
            return content;
          }, [])
        : [],
  } satisfies TableContent<CaseDiseaseResponse>;

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

export default PatientHistoryTable;
