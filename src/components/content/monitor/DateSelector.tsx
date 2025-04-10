import { SyntheticEvent, useEffect } from "react";

import { getDiaryToday, getDiaryYesterday } from "../../../utils/getDiaryIsoDate";
import { DateISODate, isDateISODate } from "../../types/DateISOStrings";

import "./DateSelector.css";

type DateSelectorProps = {
  diaryDate: DateISODate;
  setDiaryDate: (diaryDate: DateISODate) => void;
};

function DateSelector({ diaryDate, setDiaryDate }: DateSelectorProps) {
  useEffect(() => {
    const dateButtons = document.querySelectorAll("#diaryDateInput");
    dateButtons.forEach((button: Element) => {
      button.classList.remove("selected");
    });
    if (diaryDate === getDiaryToday()) {
      const button = document.querySelector('#DateSelector button[name="today"]');
      button && button.classList.add("selected");
      return;
    }
    if (diaryDate === getDiaryYesterday()) {
      const button = document.querySelector('#DateSelector button[name="yesterday"]');
      button && button.classList.add("selected");
    }
  }, [diaryDate]);

  function setValue(event: SyntheticEvent): void {
    const dateInput = event.target as HTMLInputElement;
    if (!isDateISODate(dateInput.value)) {
      console.error(`Value "${dateInput.value}" returned from DateSelector is not in ISO format.`);
      return;
    }
    setDiaryDate(dateInput.value);
  }

  return (
    <div className="flex-brick" id="DateSelector">
      <label id="diaryDate">
        Дата дежурства:&nbsp;
        <input
          id="diaryDateInput"
          type="date"
          value={diaryDate}
          min="2002-11-01"
          max="2050-12-31"
          onChange={setValue}
        />
      </label>
      <div>
        <button name="yesterday" onClick={() => setDiaryDate(getDiaryYesterday())}>
          вчера
        </button>
        <button name="today" onClick={() => setDiaryDate(getDiaryToday())}>
          сегодня
        </button>
      </div>
    </div>
  );
}

export default DateSelector;
