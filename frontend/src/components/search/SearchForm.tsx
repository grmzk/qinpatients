import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import queryString from "query-string";
import { useNavigate } from "react-router";

import { DEFAULT_DEPARTMENT, MAX_YEARS_RANGE_IN_SEARCH_INPUT, MIN_CHARS_IN_SEARCH_INPUT } from "../../configs/config";
import Department from "../../types/Department";
import { ISODate, isISODate } from "../../types/ISODateStrings";
import { SearchQuery } from "../../types/SearchQuery";
import { getDiaryToday, getDiaryYesterday } from "../../utils/getDiaryIsoDate";
import DepartmentSelector from "../common/DepartmentSelector";

import styles from "./SearchForm.module.css";

type SearchFormProps = {
  searchQuery: SearchQuery;
};

function SearchForm({ searchQuery }: SearchFormProps) {
  const [family, setFamily] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [startDate, setStartDate] = useState<ISODate>(getDiaryYesterday());
  const [endDate, setEndDate] = useState<ISODate>(getDiaryToday());
  const [department, setDepartment] = useState<Department>(DEFAULT_DEPARTMENT);
  const [warning, setWarning] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    setFamily(searchQuery.family ?? "");
    setName(searchQuery.name ?? "");
    setSurname(searchQuery.surname ?? "");
    setStartDate(searchQuery.startDate ?? getDiaryYesterday());
    setEndDate(searchQuery.endDate ?? getDiaryToday());
    setDepartment(searchQuery.department ?? DEFAULT_DEPARTMENT);
  }, [searchQuery]);

  function handleDateChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (isISODate(value)) {
      if (e.target.name === "startDate") {
        setStartDate(value);
        return;
      }
      if (e.target.name === "endDate") {
        setEndDate(value);
        return;
      }
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (family.length + name.length + surname.length < MIN_CHARS_IN_SEARCH_INPUT) {
      setWarning(
        `Суммарное количество символов в полях фамилия, имя и отчество должно быть не менее ${MIN_CHARS_IN_SEARCH_INPUT}`
      );
      return;
    }
    if (new Date(endDate).getFullYear() - new Date(startDate).getFullYear() > MAX_YEARS_RANGE_IN_SEARCH_INPUT) {
      setWarning(`Диапазон дат должен быть не более ${MAX_YEARS_RANGE_IN_SEARCH_INPUT} лет`);
      return;
    }
    setWarning("");
    const searchQuery = queryString.stringify({ family, name, surname, department, startDate, endDate });
    navigate(`?${searchQuery}`);
  }

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <div className={styles.searchInputs}>
        <ul>
          <li>
            <label htmlFor="family">Фамилия</label>
            <input type="text" id="family" value={family} onChange={(e) => setFamily(e.target.value)} />
          </li>
          <hr />
          <li>
            <label htmlFor="name">Имя</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </li>
          <hr />
          <li>
            <label htmlFor="surname">Отчество</label>
            <input type="text" id="surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
          </li>
          <hr />
          <li>
            <label htmlFor="startDate">Дата обращения</label>
            <div className={styles.dateInput}>
              <label htmlFor="startDate">с</label>
              <input type="date" id="startDate" name="startDate" value={startDate} onChange={handleDateChange} />
            </div>
            <div className={styles.dateInput}>
              <label htmlFor="startDate">по</label>
              <input type="date" id="endDate" name="endDate" value={endDate} onChange={handleDateChange} />
            </div>
          </li>
        </ul>
      </div>
      <div className={styles.departmentSelector}>
        <DepartmentSelector selectedDepartment={department} setSelectedDepartment={setDepartment} />
      </div>
      <div className={styles.departmentSelectorSlim}>
        <DepartmentSelector selectedDepartment={department} setSelectedDepartment={setDepartment} slim={true} />
      </div>
      <div className={styles.block}>
        <button type="submit">Поиск</button>
      </div>
      {!!warning && <div className={styles.warning}>{warning}</div>}
    </form>
  );
}

export default SearchForm;
