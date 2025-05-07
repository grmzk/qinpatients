import { useEffect, useState } from "react";

import queryString from "query-string";
import { useLocation } from "react-router";

import { getDataRepository } from "../../repositories/DataRepository";
import { SearchQuery, isSearchQuery } from "../../types/SearchQuery";
import SummaryResponse from "../../types/SummaryResponse";
import { getDiaryToday, getDiaryYesterday } from "../../utils/getDiaryIsoDate";
import MainContentLayout from "../layouts/MainContentLayout";

import SearchForm from "./SearchForm";
import SearchTable from "./SearchTable";

function Search() {
  const [searchQuery, setSearchQuery] = useState<SearchQuery>({
    startDate: getDiaryYesterday(),
    endDate: getDiaryToday(),
  });
  const [response, setResponse] = useState<SummaryResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const query = queryString.parse(location.search);
    if (isSearchQuery(query)) {
      setSearchQuery(query);
      setIsLoading(true);
    } else if (Object.keys(query).length) {
      console.warn("Incorrect search query");
    }
  }, [location.search]);

  useEffect(() => {
    if (!isLoading) {
      return;
    }
    getDataRepository()
      .search(searchQuery)
      .then(setResponse)
      .catch(console.warn)
      .finally(() => setIsLoading(false));
  }, [searchQuery, isLoading]);

  return (
    <MainContentLayout>
      <SearchForm searchQuery={searchQuery} />
      <SearchTable searchResponse={response} isLoading={isLoading} />
    </MainContentLayout>
  );
}

export default Search;
