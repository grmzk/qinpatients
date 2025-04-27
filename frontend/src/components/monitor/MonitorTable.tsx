import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { DATE_INPUT_DELAY, SUMMARY_UPDATE_INTERVAL } from "../../configs/config";
import { getDataRepository } from "../../repositories/DataRepository";
import CaseDiseaseResponse from "../../types/CaseDiseaseResponse";
import { DateISODate } from "../../types/DateISOStrings";
import Department from "../../types/Department";
import PatientInfoResponse from "../../types/PatientInfoResponse";
import SummaryResponse from "../../types/SummaryResponse";
import { ContentOfTableContent, TableContent } from "../../types/TableContent";
import Table from "../common/Table";

import styles from "../common/Table.module.css";

type MonitorTableProps = {
  department: Department;
  diaryDate: DateISODate;
};

function MonitorTable({ department, diaryDate }: MonitorTableProps) {
  const [summary, setSummary] = useState<SummaryResponse[]>([]);
  const [tableContent, setTableContent] = useState<TableContent<PatientInfoResponse & CaseDiseaseResponse>>({
    head: {},
    content: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

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

  useEffect(() => {
    setTableContent({
      head: {
        АСУ: "card_id",
        "Ф. И. О.": "full_name",
        Возраст: "age",
        Отделение: "department",
        Диагноз: "diagnosis",
        "Время поступления": "admission_date",
        "Время обследования / исход": "result",
      },
      content: summary.reduce<ContentOfTableContent<PatientInfoResponse & CaseDiseaseResponse>[]>(
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
          if (!["РЕАН. ЗАЛ", "ВСЕ ОТДЕЛЕНИЯ"].includes(department)) {
            if (case_disease.is_inpatient && case_disease.inpatient_department !== department) {
              classList.push(styles.toOtherDepartment);
            }
            if (case_disease.is_inpatient && case_disease.department !== department) {
              classList.push(styles.fromOtherDepartment);
            }
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
    });
  }, [department, navigate, summary]);

  // const tableContent: TableContent<PatientInfoResponse & CaseDiseaseResponse> = {
  //   head: {
  //     АСУ: "card_id",
  //     "Ф. И. О.": "full_name",
  //     Возраст: "age",
  //     Отделение: "department",
  //     Диагноз: "diagnosis",
  //     "Время поступления": "admission_date",
  //     "Время обследования / исход": "result",
  //   },
  //   content: summary.reduce<ContentOfTableContent<PatientInfoResponse & CaseDiseaseResponse>[]>(
  //     (content, { patient, case_disease }) => {
  //       const classList: string[] = [];
  //       if (case_disease.is_reanimation) {
  //         classList.push(styles.reanimation);
  //       } else if (case_disease.is_inpatient) {
  //         classList.push(styles.inpatient);
  //       }
  //       if (!case_disease.is_outcome) {
  //         classList.push(styles.processing);
  //       }
  //       if (!["РЕАН. ЗАЛ", "ВСЕ ОТДЕЛЕНИЯ"].includes(department)) {
  //         if (case_disease.is_inpatient && case_disease.inpatient_department !== department) {
  //           classList.push(styles.toOtherDepartment);
  //         }
  //         if (case_disease.is_inpatient && case_disease.department !== department) {
  //           classList.push(styles.fromOtherDepartment);
  //         }
  //       }
  //       content.push({
  //         data: { ...patient, ...case_disease },
  //         classList: classList,
  //         onClick: () => navigate(`/patients/${patient.patient_id}`, { relative: "path" }),
  //       });
  //       return content;
  //     },
  //     []
  //   ),
  // };

  return (
    <Table
      title="МОНИТОР"
      helpMessage="Выбор пациента"
      noDataMessage="НЕТ ОБРАЩЕНИЙ"
      tableContent={tableContent}
      isLoading={isLoading}
    />
  );
}

export default MonitorTable;
