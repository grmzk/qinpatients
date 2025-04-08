import { SyntheticEvent } from "react";

import "./NavButton.css";

type NavButtonProps = {
  name: string;
  title: string;
  setSelected: (selected: string | null) => void;
};

function NavButton({ name, title, setSelected }: NavButtonProps) {
  function handleClick(event: SyntheticEvent) {
    setSelected(event.currentTarget.getAttribute("name"));
  }

  return (
    <button className="NavButton" type="button" name={name} onClick={handleClick}>
      {title}
    </button>
  );
}

export default NavButton;
