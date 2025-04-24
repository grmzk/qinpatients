import queryString from "query-string";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { DateISODate, isDateISODate } from "../../types/DateISOStrings";
import Departments from "../../types/Departments";
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
  const [startDate, setStartDate] = useState<DateISODate>(getDiaryYesterday());
  const [endDate, setEndDate] = useState<DateISODate>(getDiaryToday());
  const [department, setDepartment] = useState<Departments>("ВСЕ ОТДЕЛЕНИЯ");

  const navigate = useNavigate();

  useEffect(() => {
    setFamily(searchQuery.family ?? "");
    setName(searchQuery.name ?? "");
    setSurname(searchQuery.surname ?? "");
    setStartDate(searchQuery.startDate ?? getDiaryYesterday());
    setEndDate(searchQuery.endDate ?? getDiaryToday());
    setDepartment(searchQuery.department ?? "ВСЕ ОТДЕЛЕНИЯ");
  }, [searchQuery]);

  function handleDateChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (isDateISODate(value)) {
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
      <DepartmentSelector selectedDepartment={department} setSelectedDepartment={setDepartment} />
      <div>
        <button type="submit">Поиск</button>
      </div>
    </form>
  );
}

export default SearchForm;
