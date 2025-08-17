import MainContentLayout from "../layouts/MainContentLayout";

import AnamnesisGynecological from "./AnamnesisGynecological";
import AnamnesisMorbi from "./AnamnesisMorbi";
import AnamnesisVitae from "./AnamnesisVitae";
import Complaints from "./Complaints";
import EditorPatientInfo from "./EditorPatientInfo";
import Head from "./Head";
import StatusPraesens from "./StatusPraesens";

import styles from "./FirstExamination.module.css";

type FirstExaminationProps = {
  id: string;
};

function FirstExamination({ id }: FirstExaminationProps) {
  console.log("RENDER FIRST EXAMINATION");
  return (
    <MainContentLayout>
      <EditorPatientInfo id={id} />
      <div className={styles.mainArea}>
        <div className={styles.title}>Первичный осмотр</div>
        <div className={styles.block}>
          <Complaints id={id} />
          <AnamnesisMorbi id={id} />
          <AnamnesisVitae id={id} />
          <AnamnesisGynecological id={id} />
          <StatusPraesens id={id} />
        </div>
        <div className={styles.block}>
          <Head id={id} />
          <Complaints id={id} />
        </div>
      </div>
    </MainContentLayout>
  );
}

export default FirstExamination;
