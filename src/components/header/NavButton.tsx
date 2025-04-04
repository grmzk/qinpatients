import "./NavButton.css";
import { SyntheticEvent } from "react";

interface INavButtonProps {
  name: string;
  title: string;
  setSelected: (selected: string | null) => void;
}

function NavButton({ name, title, setSelected }: INavButtonProps) {
  function handleClick(event: SyntheticEvent) {
    setSelected(event.currentTarget.getAttribute("name"));
  }

  return (
    <button
      className="NavButton"
      type="button"
      name={name}
      onClick={handleClick}
    >
      {title}
    </button>
  );
}

export default NavButton;
