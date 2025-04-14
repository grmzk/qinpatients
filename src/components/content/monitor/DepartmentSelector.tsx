import { useState } from "react";

import { DEPARTMENTS } from "../../../configs/constants";
import Departments from "../../../types/Departments";

import styles from "./DepartmentSelector.module.css";

type DepartmentSelectorProps = {
  departmentId: number;
  setDepartmentId: (departmentId: number) => void;
};

type DepartmentRow = {
  id: number;
  name: Departments;
  selected: boolean;
};

function DepartmentSelector({ departmentId, setDepartmentId }: DepartmentSelectorProps) {
  const [departments, setDepartments] = useState<DepartmentRow[]>(
    DEPARTMENTS.map((department: Departments, id): DepartmentRow => {
      return { id: id, name: department, selected: id === departmentId };
    })
  );

  function selectDepartmentHandler(id: number) {
    if (id === departmentId) {
      return;
    }
    setDepartments(
      departments.map((departmentRow): DepartmentRow => {
        return { ...departmentRow, selected: departmentRow.id === id };
      })
    );
    setDepartmentId(id);
  }

  return (
    <table title="Выбор отделения">
      <tbody>
        {departments.map(({ id, name, selected }) => (
          <tr className={selected ? styles.selected : ""} key={id} onClick={() => selectDepartmentHandler(id)}>
            <td>{name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DepartmentSelector;
