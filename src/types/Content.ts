import { JSX } from "react";

import CONTENT from "../configs/content";

export type Content = {
  [key: string]: {
    title: string;
    component: JSX.Element;
  };
};

export type ContentName = keyof typeof CONTENT;

export function isContentName(entity: unknown): entity is ContentName {
  const contentName = entity as ContentName;
  return contentName in CONTENT;
}
