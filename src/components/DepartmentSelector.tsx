import { DEPARTMENTS } from "../constants";
import { SyntheticEvent, useEffect } from "react";

interface IDepartmentChooserProps {
  departmentId: number;
  setDepartmentId: (departmentId: number) => void;
}

function DepartmentSelector({
  departmentId,
  setDepartmentId,
}: IDepartmentChooserProps) {
  useEffect(() => {
    const selectedDepartment = document
      ?.getElementById("DepartmentSelector")
      ?.querySelector(`tr.department[data-id="${departmentId}"]`);
    if (!selectedDepartment) {
      return;
    }
    selectedDepartment.classList.add("selected");
  }, [departmentId]);

  function selectDepartment(event: SyntheticEvent, key: number) {
    const selectedDepartment = event.currentTarget;
    const departments =
      selectedDepartment.parentElement?.querySelectorAll(".department");
    if (!departments) {
      return;
    }
    for (const department of departments) {
      department.classList.remove("selected");
    }
    setDepartmentId(key);
  }

  return (
    <div id="DepartmentSelector">
      <table>
        <tbody>
          {DEPARTMENTS.map((department, key) => (
            <tr
              className="department"
              key={key}
              data-id={key}
              onClick={(event) => selectDepartment(event, key)}
            >
              <td>{department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DepartmentSelector;
