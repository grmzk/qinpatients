import PatientInfoResponse from "../../types/PatientInfoResponse";

import styles from "./PatientInfo.module.css";

type PatientInfoProps = {
  patientInfo: PatientInfoResponse | undefined;
};

function PatientInfo({ patientInfo }: PatientInfoProps) {
  return (
    <div className={styles.card}>
      {patientInfo ? (
        <>
          <div className={styles.title}>Ф. И. О.</div>
          <div className={styles.info}>{patientInfo.full_name}</div>
          <hr />
          <div className={styles.title}>Дата рождения</div>
          <div className={styles.info}>
            {patientInfo.birthday} ({patientInfo.age})
          </div>
          <hr />
          <div className={styles.title}>Адрес</div>
          <div className={styles.info}>{patientInfo.address}</div>
          <hr />
          <div className={styles.title}>Работа</div>
          <div className={styles.info}>{patientInfo.workplace}</div>
          <hr />
          <div className={styles.title}>Дополнительная информация</div>
          <div className={styles.info}>{patientInfo.extra_info}</div>
        </>
      ) : (
        <div className={styles.loading}>Загрузка данных</div>
      )}
    </div>
  );
}

export default PatientInfo;
