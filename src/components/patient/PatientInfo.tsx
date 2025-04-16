import { useEffect, useState } from "react";

import { getDataRepository } from "../../repositories/DataRepository";
import PatientTextInfo from "../../types/PatientTextInfo";

import styles from "./PatientInfo.module.css";

type PatientInfoProps = {
  patientId: number;
};

function PatientInfo({ patientId }: PatientInfoProps) {
  const [info, setInfo] = useState<PatientTextInfo>();

  useEffect(() => {
    getDataRepository().getPatientInfo(patientId).then(setInfo).catch(console.warn);
  }, [patientId]);

  return (
    <div className={styles.card}>
      {info ? (
        <>
          <div className={styles.title}>Ф. И. О.</div>
          <div className={styles.info}>{info.full_name}</div>
          <hr />
          <div className={styles.title}>Дата рождения</div>
          <div className={styles.info}>
            {info.birthday} ({info.age})
          </div>
          <hr />
          <div className={styles.title}>Адрес</div>
          <div className={styles.info}>{info.address}</div>
          <hr />
          <div className={styles.title}>Работа</div>
          <div className={styles.info}>{info.workplace}</div>
          <hr />
          <div className={styles.title}>Дополнительная информация</div>
          <div className={styles.info}>{info.extra_info}</div>
        </>
      ) : (
        <div className={styles.loading}>Загрузка данных</div>
      )}
    </div>
  );
}

export default PatientInfo;
