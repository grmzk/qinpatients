import { Navigate, useParams } from "react-router";

import MainContentLayout from "../layouts/MainContentLayout";
import PatientHistory from "./PatientHistory";
import PatientInfo from "./PatientInfo";

function Patient() {
  const { patientId } = useParams();

  if (!patientId || !isFinite(Number(patientId))) {
    return <Navigate to="/notfound" />;
  }

  return (
    <MainContentLayout>
      <PatientInfo patientId={+patientId} />
      <PatientHistory />
    </MainContentLayout>
  );
}

export default Patient;
