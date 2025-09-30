import { useState } from "react";
import Toolbar from "./components/Menu";
import ButtonHolder from "./components/ButtonHolder";

import WorkersTable, { type Worker } from "./tables/Workers";
import AttendanceTable from "./tables/Attendance";
import { getData } from "./helpers/getData";
import FinanceWrapper from "./tables/Finance";
import PartnersWrapper from "./wrappers/PartnersWrapper";

type TableType = "workers" | "attendance" | "finance" | "partners";

export default function TableWithToolbar() {
  const [activeTable, setActiveTable] = useState<TableType>("workers");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  // Workers data
  const [workers, setWorkers] = useState<Worker[]>(getData());

  const [editedWorkers, setEditedWorkers] = useState<Worker[]>(workers);

  // // === Handlers for Workers table ===
  const handleEdit = () => {
    setEditedWorkers([...workers]); // make a copy for editing
    setIsEditing(true);
  };

  const handleApply = () => {
    setWorkers([...editedWorkers]); // save edits
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedWorkers([...workers]); // revert edits
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (selectedRows.length > 0) {
      setWorkers(workers.filter((_, i) => !selectedRows.includes(i)));
      setSelectedRows([]);
    }
  };

  // === Render correct table depending on activeTable ===
  const renderTable = () => {
    switch (activeTable) {
      case "workers":
        return (
          <WorkersTable
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            isEditing={isEditing}
            editedData={editedWorkers}
            setEditedData={setEditedWorkers}
            // setData={setWorkers}
            data={workers}
          />
        );
      case "attendance":
        return <AttendanceTable workers={workers} />;
      case "finance":
        return <FinanceWrapper workers={workers} />;
      case "partners":
        return <PartnersWrapper workers={workers} />;
      default:
        return <div>Select a table</div>;
    }
  };

  return (
    <div className="flex-container">
      <Toolbar
        activeTable={activeTable}
        onChange={(t: TableType) => {
          setActiveTable(t);
          setSelectedRows([]);
        }}
      />
      <div className="main">{renderTable()}</div>
      <ButtonHolder
        hasSelection={selectedRows.length > 0}
        isEditing={isEditing}
        onEdit={handleEdit}
        onApply={handleApply}
        onCancel={handleCancel}
        onDelete={handleDelete}
      />
      <footer>A really nice footer</footer>
    </div>
  );
}
