import { ReactElement } from "react";

import styles from "./Table.module.css";

type TableProps = {
  title: string;
  headTitles: string[];
  rows: ReactElement[];
  helpMessage: string;
  noDataMessage: string;
  isLoading: boolean;
};

function Table({ title, headTitles, rows, helpMessage, noDataMessage, isLoading = false }: TableProps): ReactElement {
  return (
    <div>
      <div className={styles.title}>{title}</div>
      {isLoading ? (
        <div className={styles.title}>ЗАГРУЗКА ДАННЫХ</div>
      ) : rows.length ? (
        <table>
          <thead>
            <tr>
              {headTitles.map((title, index) => (
                <th key={index}>{title}</th>
              ))}
            </tr>
          </thead>
          <tbody title={helpMessage}>{rows.map((row) => row)}</tbody>
        </table>
      ) : (
        <div className={styles.title}>{noDataMessage}</div>
      )}
    </div>
  );
}

export default Table;
