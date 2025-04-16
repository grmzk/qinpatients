import CommonContentLayout from "../layouts/CommonContentLayout";

import styles from "./NotFound.module.css";

function NotFound() {
  return (
    <CommonContentLayout>
      <div className={styles.notFound}>Страница не найдена</div>
    </CommonContentLayout>
  );
}

export default NotFound;
