import NavButton from "./NavButton";
import "./NavBar.css";
import { JSX, useEffect, useState } from "react";
import Monitor from "../content/monitor/Monitor";

interface IContent {
  [key: string]: {
    title: string;
    component: JSX.Element;
  };
}

const CONTENTS: IContent = {
  Monitor: {
    title: "Монитор",
    component: <Monitor />,
  },
  Login: {
    title: "Вход",
    component: <div></div>,
  },
};

function NavBar() {
  const [selected, setSelected] = useState<string | null>("Monitor");
  useEffect(() => {
    const navButtons = document.querySelectorAll(".NavButton");
    for (const button of navButtons) {
      if (button.getAttribute("name") !== selected) {
        button.classList.remove("selected");
        continue;
      }
      button.classList.add("selected");
    }
  }, [selected]);

  return (
    <div id="NavBar">
      {Object.entries(CONTENTS).map(([contentName, props]) => {
        return (
          <NavButton
            name={contentName}
            title={props.title}
            setSelected={setSelected}
            key={contentName}
          />
        );
      })}
    </div>
  );
}

export default NavBar;
