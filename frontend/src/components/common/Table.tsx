import { ReactElement, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { isISODate, isISODateTime } from "../../types/ISODateStrings";
import { TableContent } from "../../types/TableContent";
import formatToLocaleDate from "../../utils/formatToLocaleDate";
import Loader from "./Loader";

import styles from "./Table.module.css";

type TableProps = {
  title: string;
  tableContent: TableContent<any>;
  helpMessage: string;
  noDataMessage: string;
  isLoading: boolean;
};

function Table({ title, tableContent, helpMessage, noDataMessage, isLoading = false }: TableProps): ReactElement {
  const [content, setContent] = useState<typeof tableContent.content>(tableContent.content);
  const [orderBy, setOrderBy] = useState<keyof typeof tableContent.head>("");
  const [ascending, setAscending] = useState<boolean>(true);

  useEffect(() => {
    setContent(tableContent.content);
    if (Object.keys(tableContent.head).length && !orderBy) {
      setOrderBy(Object.keys(tableContent.head)[0]);
    }
    if (!tableContent.content.length) {
      return;
    }
    const content = [...tableContent.content];
    const key = tableContent.head[orderBy];
    content.sort((a, b) => {
      if (typeof a.data[key] === "string") {
        if (a.data[key].match(/^\d+ (лет)?(года?)?$/)) {
          return parseInt(a.data[key]) - parseInt(b.data[key]);
        }
        return a.data[key].localeCompare(b.data[key]);
      }
      return a.data[key] - b.data[key];
    });
    ascending ? setContent(content) : setContent(content.reverse());
  }, [tableContent, orderBy, ascending]);

  function handleSort(newOrderBy: keyof typeof tableContent.head) {
    if (orderBy === newOrderBy) {
      setAscending(!ascending);
      return;
    }
    setOrderBy(newOrderBy);
    setAscending(true);
  }

  return (
    <div>
      <div className={styles.title}>{title}</div>
      {isLoading ? (
        <div className={styles.loading}>
          <Loader />
        </div>
      ) : content.length ? (
        <table>
          <thead>
            <tr>
              <th>№</th>
              {Object.keys(tableContent.head).map((title, index) => (
                <th className={styles.sortTh} key={index} onClick={() => handleSort(title)}>
                  {title}
                  {orderBy === title ? (ascending ? " ⇧" : " ⇩") : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody title={helpMessage}>
            {content.map((contentItem, index) => (
              <tr
                className={contentItem.classList ? contentItem.classList.join(" ") : ""}
                key={uuidv4()}
                onClick={contentItem.onClick}
              >
                <td>{index + 1}</td>
                {Object.entries(tableContent.head).map(([_, key]) => (
                  <td key={uuidv4()}>
                    {isISODate(contentItem.data[key]) || isISODateTime(contentItem.data[key])
                      ? formatToLocaleDate(contentItem.data[key])
                      : contentItem.data[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className={styles.title}>{noDataMessage}</div>
      )}
    </div>
  );
}

export default Table;
