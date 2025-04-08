import { JSX, useEffect, useState } from "react";

import Monitor from "../content/monitor/Monitor";
import NavButton from "./NavButton";

import "./NavBar.css";

type Content = {
  [key: string]: {
    title: string;
    component: JSX.Element;
  };
};

const CONTENTS: Content = {
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
      {Object.entries(CONTENTS).map(([contentName, props]) => {
        return <NavButton name={contentName} title={props.title} setSelected={setSelected} key={contentName} />;
      })}
    </div>
  );
}

export default NavBar;
