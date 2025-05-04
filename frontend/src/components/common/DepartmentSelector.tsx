import { useCallback, useEffect, useState } from "react";

import DEPARTMENTS from "../../constants/departments";
import Department, { isDepartment } from "../../types/Department";

import styles from "./DepartmentSelector.module.css";

type DepartmentSelectorProps = {
  selectedDepartment: Department;
  setSelectedDepartment: (department: Department) => void;
  slim?: boolean;
};

type DepartmentRow = {
  name: Department;
  selected: boolean;
};

function DepartmentSelector({ selectedDepartment, setSelectedDepartment, slim = false }: DepartmentSelectorProps) {
  const getDepartmentRows = useCallback(() => {
    return DEPARTMENTS.map((department: Department): DepartmentRow => {
      return { name: department, selected: department === selectedDepartment };
    });
  }, [selectedDepartment]);

  const [departmentRows, setDepartmentRows] = useState<DepartmentRow[]>(getDepartmentRows());

  useEffect(() => {
    setDepartmentRows(getDepartmentRows());
  }, [getDepartmentRows]);

  function handleSelectDepartment(department: Department) {
    if (department === selectedDepartment) {
      return;
    }
    setDepartmentRows(
      departmentRows.map((departmentRow): DepartmentRow => {
        return { ...departmentRow, selected: departmentRow.name === department };
      })
    );
    setSelectedDepartment(department);
  }

  return slim ? (
    <select
      className={styles.slim}
      value={selectedDepartment}
      onChange={(event) =>
        handleSelectDepartment(isDepartment(event.target.value) ? event.target.value : selectedDepartment)
      }
    >
      {departmentRows.map(({ name }, index) => (
        <option value={name} key={index}>
          {name}
        </option>
      ))}
    </select>
  ) : (
    <table className={styles.departmentSelector} title="Выбор отделения">
      <tbody>
        {departmentRows.map(({ name, selected }, index) => (
          <tr className={selected ? styles.selected : ""} key={index} onClick={() => handleSelectDepartment(name)}>
            <td>{name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DepartmentSelector;
