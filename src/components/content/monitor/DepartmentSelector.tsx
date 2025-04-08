import { useEffect } from "react";

import { DEPARTMENTS } from "../../../configs/constants";

type DepartmentChooserProps = {
  departmentId: number;
  setDepartmentId: (departmentId: number) => void;
};

function DepartmentSelector({ departmentId, setDepartmentId }: DepartmentChooserProps) {
  useEffect(() => {
    const selectedDepartment = document.querySelector(`#DepartmentSelector .department[data-id="${departmentId}"]`);
    selectedDepartment && selectedDepartment.classList.add("selected");
  }, [departmentId]);

  function selectDepartment(id: number) {
    if (id === departmentId) {
      return;
    }
    const departments = document.querySelectorAll("#DepartmentSelector .department");
    departments.forEach((department) => {
      department.classList.remove("selected");
    });
    setDepartmentId(id);
  }

  return (
    <table id="DepartmentSelector" title="Выбор отделения">
      <tbody>
        {DEPARTMENTS.map((department, id) => (
          <tr className="department" key={id} data-id={id} onClick={() => selectDepartment(id)}>
            <td>{department}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DepartmentSelector;
