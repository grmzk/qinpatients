import Monitor from "../components/content/monitor/Monitor";
import { Content } from "../types/Content";

const CONTENT = {
  Monitor: {
    title: "Монитор",
    component: <Monitor />,
  },
  Login: {
    title: "Вход",
    component: <div></div>,
  },
} as const satisfies Content;

export default CONTENT;
