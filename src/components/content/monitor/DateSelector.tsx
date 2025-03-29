import "./DateSelector.css";
import { SyntheticEvent } from "react";

interface IDateSelectorProps {
  diaryDate: string;
  setDiaryDate: (diaryDate: string) => void;
}

function DateSelector({ diaryDate, setDiaryDate }: IDateSelectorProps) {
  const setValue = (event: SyntheticEvent): void => {
    const dateInput = event.target as HTMLInputElement;
    setDiaryDate(dateInput.value);
  };
  return (
    <div className="flex-brick" id="DateSelector">
      <label id="diaryDate">
        Дата дежурства:
        <input
          type="date"
          value={diaryDate}
          min="2002-11-01"
          max="2050-12-31"
          onChange={setValue}
        />
      </label>
    </div>
  );
}

export default DateSelector;
