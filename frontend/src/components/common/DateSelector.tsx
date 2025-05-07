import { SyntheticEvent, useEffect } from "react";

import { ISODate, isISODate } from "../../types/ISODateStrings";
import { getDiaryToday, getDiaryYesterday } from "../../utils/getDiaryIsoDate";

import styles from "./DateSelector.module.css";

type DateSelectorProps = {
  diaryDate: ISODate;
  setDiaryDate: (diaryDate: ISODate) => void;
};

function DateSelector({ diaryDate, setDiaryDate }: DateSelectorProps) {
  useEffect(() => {
    const dateButtons = document.querySelectorAll(`.${styles.dateButton}`);
    dateButtons.forEach((button: Element) => {
      button.classList.remove(styles.selected);
    });
    if (diaryDate === getDiaryToday()) {
      const button = document.querySelector(`.${styles.dateButton}[name="today"]`);
      if (button) button.classList.add(styles.selected);
      return;
    }
    if (diaryDate === getDiaryYesterday()) {
      const button = document.querySelector(`.${styles.dateButton}[name="yesterday"]`);
      if (button) button.classList.add(styles.selected);
    }
  }, [diaryDate]);

  function setValue(event: SyntheticEvent): void {
    const dateInput = event.target as HTMLInputElement;
    if (!isISODate(dateInput.value)) {
      console.error(`Value "${dateInput.value}" returned from DateSelector is not in ISO format.`);
      return;
    }
    setDiaryDate(dateInput.value);
  }

  return (
    <div className={styles.dateSelectorContainer}>
      <label htmlFor="diaryDate">
        Дата дежурства:&nbsp;
        <input
          id="diaryDate"
          className={styles.diaryDateInput}
          type="date"
          value={diaryDate}
          min="2002-11-01"
          max="2050-12-31"
          onChange={setValue}
        />
      </label>
      <div>
        <button
          className={styles.dateButton}
          type="button"
          name="yesterday"
          onClick={() => setDiaryDate(getDiaryYesterday())}
        >
          вчера
        </button>
        <button className={styles.dateButton} type="button" name="today" onClick={() => setDiaryDate(getDiaryToday())}>
          сегодня
        </button>
      </div>
    </div>
  );
}

export default DateSelector;
