import { useEffect, useState } from "react";

import CONTENT from "../../configs/content";
import { ContentName } from "../types/Content";
import NavButton from "./NavButton";

import "./NavBar.css";

function NavBar() {
  const [selected, setSelected] = useState<ContentName | null>("Monitor");

  useEffect(() => {
    const navButtons = document.querySelectorAll(".NavButton");
    navButtons.forEach((button) => {
      if (button.getAttribute("name") !== selected) {
        button.classList.remove("selected");
        return;
      }
      button.classList.add("selected");
    });
  }, [selected]);

  return (
    <div id="NavBar">
      {Object.entries(CONTENT).map(([contentName, { title }]) => {
        return <NavButton name={contentName} title={title} setSelected={setSelected} key={contentName} />;
      })}
    </div>
  );
}

export default NavBar;
