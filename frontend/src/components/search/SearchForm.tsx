import { ChangeEvent, FormEvent } from "react";

import { DateISODate, isDateISODate } from "../../types/DateISOStrings";

import styles from "./SearchForm.module.css";

type SearchFormProps = {
  family: string;
  setFamily: (family: string) => void;
  name: string;
  setName: (name: string) => void;
  surname: string;
  setSurname: (surname: string) => void;
  startDate: DateISODate;
  setStartDate: (startDate: DateISODate) => void;
  endDate: DateISODate;
  setEndDate: (endDate: DateISODate) => void;
  setIsLoading: (isLoading: boolean) => void;
};

function SearchForm({
  family,
  setFamily,
  name,
  setName,
  surname,
  setSurname,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  setIsLoading,
}: SearchFormProps) {
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
    setIsLoading(true);
  }

  return (
    <div className={styles.searchForm}>
      <form onSubmit={handleSubmit}>
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
              <input type="date" id="startDate" value={startDate} onChange={handleDateChange} />
            </div>
            <div className={styles.dateInput}>
              <label htmlFor="startDate">по</label>
              <input type="date" id="endDate" value={endDate} onChange={handleDateChange} />
            </div>
          </li>
          <hr />
          <li>
            <button type="submit">Поиск</button>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default SearchForm;
