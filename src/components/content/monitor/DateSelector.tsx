import "./DateSelector.css";
import { SyntheticEvent, useEffect } from "react";
import {
  getDiaryToday,
  getDiaryYesterday,
} from "../../../utils/getDiaryIsoDate";

interface IDateSelectorProps {
  diaryDate: string;
  setDiaryDate: (diaryDate: string) => void;
}

function DateSelector({ diaryDate, setDiaryDate }: IDateSelectorProps) {
  useEffect(() => {
    const dateButtons = document.querySelectorAll("#DateSelector button");
    dateButtons.forEach((button: Element) => {
      button.classList.remove("selected");
    });
    if (diaryDate === getDiaryToday()) {
      const button = document.querySelector(
        '#DateSelector button[name="today"]',
      );
      button && button.classList.add("selected");
      return;
    }
    if (diaryDate === getDiaryYesterday()) {
      const button = document.querySelector(
        '#DateSelector button[name="yesterday"]',
      );
      button && button.classList.add("selected");
    }
  }, [diaryDate]);

  function setValue(event: SyntheticEvent): void {
    const dateInput = event.target as HTMLInputElement;
    setDiaryDate(dateInput.value);
  }

  return (
    <div className="flex-brick" id="DateSelector">
      <label id="diaryDate">
        Дата дежурства:&nbsp;
        <input
          type="date"
          value={diaryDate}
          min="2002-11-01"
          max="2050-12-31"
          onChange={setValue}
        />
      </label>
      <div>
        <button
          name="yesterday"
          onClick={() => setDiaryDate(getDiaryYesterday())}
        >
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
