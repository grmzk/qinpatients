import { useEffect, useState } from "react";

import { getDataRepository } from "../../repositories/DataRepository";
import SummaryResponse from "../../types/SummaryResponse";
import { getDiaryToday, getDiaryYesterday } from "../../utils/getDiaryIsoDate";
import MainContentLayout from "../layouts/MainContentLayout";
import SearchForm from "./SearchForm";
import SearchTable from "./SearchTable";

function Search() {
  const [family, setFamily] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [startDate, setStartDate] = useState(getDiaryYesterday);
  const [endDate, setEndDate] = useState(getDiaryToday);
  const [response, setResponse] = useState<SummaryResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isLoading) return;
    getDataRepository()
      .search(family, name, surname, startDate, endDate)
      .then(setResponse)
      .catch(console.warn)
      .finally(() => setIsLoading(false));
  }, [isLoading, family, name, surname, startDate, endDate]);

  return (
    <MainContentLayout>
      <SearchForm
        family={family}
        name={name}
        surname={surname}
        startDate={startDate}
        endDate={endDate}
        setFamily={setFamily}
        setName={setName}
        setSurname={setSurname}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setIsLoading={setIsLoading}
      />
      <SearchTable searchResponse={response} isLoading={isLoading} />
    </MainContentLayout>
  );
}

export default Search;
