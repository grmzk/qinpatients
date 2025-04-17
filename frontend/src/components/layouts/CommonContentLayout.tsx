import { ReactNode } from "react";

import styles from "./CommonContentLayout.module.css";

type CommonContentProps = {
  children: ReactNode | ReactNode[];
};

function CommonContentLayout({ children }: CommonContentProps) {
  return <div className={styles.commonContentLayout}>{children}</div>;
}

export default CommonContentLayout;
