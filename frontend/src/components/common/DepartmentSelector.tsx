import { useCallback, useEffect, useState } from "react";

import DEPARTMENTS from "../../constants/departments";
import Departments from "../../types/Departments";

import styles from "./DepartmentSelector.module.css";

type DepartmentSelectorProps = {
  selectedDepartment: Departments;
  setSelectedDepartment: (department: Departments) => void;
};

type DepartmentRow = {
  name: Departments;
  selected: boolean;
};

function DepartmentSelector({ selectedDepartment, setSelectedDepartment }: DepartmentSelectorProps) {
  const getDepartmentRows = useCallback(() => {
    return DEPARTMENTS.map((department: Departments): DepartmentRow => {
      return { name: department, selected: department === selectedDepartment };
    });
  }, [selectedDepartment]);

  const [departments, setDepartments] = useState<DepartmentRow[]>(getDepartmentRows());

  useEffect(() => {
    setDepartments(getDepartmentRows());
  }, [getDepartmentRows]);

  function handleSelectDepartment(department: Departments) {
    if (department === selectedDepartment) {
      return;
    }
    setDepartments(
      departments.map((departmentRow): DepartmentRow => {
        return { ...departmentRow, selected: departmentRow.name === department };
      })
    );
    setSelectedDepartment(department);
  }

  return (
    <table className={styles.departmentSelector} title="Выбор отделения">
      <tbody>
        {departments.map(({ name, selected }, index) => (
          <tr className={selected ? styles.selected : ""} key={index} onClick={() => handleSelectDepartment(name)}>
            <td>{name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DepartmentSelector;
