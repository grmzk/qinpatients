import { ReactNode } from "react";

import CommonContentLayout from "./CommonContentLayout";

import styles from "./MainContentLayout.module.css";

type MainContentLayoutProps = {
  children: [ReactNode, ReactNode];
};

function MainContentLayout({ children }: MainContentLayoutProps) {
  return (
    <CommonContentLayout>
      <div className={styles.contentContainer}>
        <div className={styles.stickyPanel}>{children[0]}</div>
        {children[1]}
      </div>
    </CommonContentLayout>
  );
}

export default MainContentLayout;
