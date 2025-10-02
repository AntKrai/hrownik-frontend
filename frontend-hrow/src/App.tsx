import { useState } from "react";
import Toolbar from "./components/Menu";
import ButtonHolder from "./components/ButtonHolder";

import WorkersTable, { type Worker } from "./tables/Workers";
import AttendanceTable from "./tables/Attendance";
import { getData, getFinance } from "./helpers/getData";
// import FinanceWrapper from "./wrappers/FinanceWrapper";
// import PartnersWrapper from "./wrappers/PartnersWrapper";
import type { FinanceEntry } from "./tables/Finance";
import type { Partner } from "./tables/Partners";
import FinanceTable from "./tables/Finance";
import PartnersTable from "./tables/Partners";

type TableType = "workers" | "attendance" | "finance" | "partners";

export default function TableWithToolbar() {
  const [activeTable, setActiveTable] = useState<TableType>("workers");

  // Generic editing flag and selection
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  // Workers state
  const [workers, setWorkers] = useState<Worker[]>(getData());
  const [editedWorkers, setEditedWorkers] = useState<Worker[]>(workers);

  // Partners state
  const [partners, setPartners] = useState<Partner[]>([]);
  const [editedPartners, setEditedPartners] = useState<Partner[]>([]);

  // Expenses state
  const [expenses, setExpenses] = useState<FinanceEntry[]>(getFinance());
  const [editedExpenses, setEditedExpenses] =
    useState<FinanceEntry[]>(expenses);
  const [selectedExpenses, setSelectedExpenses] = useState<number[]>([]);

  // Revenue state
  const [revenues, setRevenues] = useState<FinanceEntry[]>(getFinance());
  const [editedRevenues, setEditedRevenues] =
    useState<FinanceEntry[]>(revenues);
  const [selectedRevenues, setSelectedRevenues] = useState<number[]>([]);

  // a specific handler for the finance table pair
  const hasSelection =
    activeTable === "finance"
      ? selectedExpenses.length > 0 || selectedRevenues.length > 0
      : selectedRows.length > 0;

  // helpers that switch by activeTable
  const handleEdit = () => {
    switch (activeTable) {
      case "workers":
        setEditedWorkers([...workers]);
        break;
      case "partners":
        setEditedPartners([...partners]);
        break;
      case "finance":
        setEditedExpenses([...expenses]);
        setEditedRevenues([...revenues]);
        break;
    }
    setIsEditing(true);
  };

  //helpers for creating entries
  const createNewWorker = (): Worker => ({
    id: Date.now() + Math.floor(Math.random() * 1000),
    name: "",
    surname: "",
    email: "",
    phone: "",
    index: "",
    fieldOfStudy: "",
    section: "",
  });

  const createNewPartner = (): Partner => ({
    id: Date.now() + Math.floor(Math.random() * 1000),
    name: "",
    workerId: null,
    phone: "",
    email: "",
    status: "Pending", // default status
    comment: "",
  });

  const createNewFinanceEntry = (): FinanceEntry => ({
    id: Date.now() + Math.floor(Math.random() * 1000),
    name: "",
    amount: 0,
    workerId: null,
  });

  const handleApply = () => {
    switch (activeTable) {
      case "workers":
        setWorkers([...editedWorkers]);
        break;
      case "partners":
        setPartners([...editedPartners]);
        break;
      case "finance":
        setExpenses([...editedExpenses]);
        setRevenues([...editedRevenues]);
        break;
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    switch (activeTable) {
      case "workers":
        setEditedWorkers([...workers]);
        break;
      case "partners":
        setEditedPartners([...partners]);
        break;
      case "finance":
        setEditedExpenses([...expenses]);
        setEditedRevenues([...revenues]);
        break;
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    switch (activeTable) {
      case "workers":
        setWorkers(workers.filter((w) => !selectedRows.includes(w.id)));
        setEditedWorkers(
          editedWorkers.filter((w) => !selectedRows.includes(w.id))
        );
        break;
      case "partners":
        setPartners(partners.filter((p) => !selectedRows.includes(p.id)));
        setEditedPartners(
          editedPartners.filter((p) => !selectedRows.includes(p.id))
        );
        break;
      case "finance":
        setExpenses(expenses.filter((e) => !selectedExpenses.includes(e.id)));
        setEditedExpenses(
          editedExpenses.filter((e) => !selectedExpenses.includes(e.id))
        );
        setSelectedExpenses([]);

        setRevenues(revenues.filter((r) => !selectedRevenues.includes(r.id)));
        setEditedRevenues(
          editedRevenues.filter((r) => !selectedRevenues.includes(r.id))
        );
        setSelectedRevenues([]);
        break;
    }
    setSelectedRows([]);
  };

  const handleAdd = (type?: "expense" | "revenue") => {
    switch (activeTable) {
      case "workers": {
        const newWorker = createNewWorker();
        setEditedWorkers([...editedWorkers, newWorker]);
        break;
      }
      case "partners": {
        const newPartner = createNewPartner();
        setEditedPartners([...editedPartners, newPartner]);
        break;
      }
      case "finance": {
        const newEntry = createNewFinanceEntry();
        if (type === "expense") {
          setEditedExpenses([...editedExpenses, newEntry]);
        } else if (type === "revenue") {
          setEditedRevenues([...editedRevenues, newEntry]);
        }
        break;
      }
      case "attendance":
        // Attendance should be reworked
        console.warn("Add not implemented for attendance");
        break;
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
            data={workers}
            handleAddEntry={handleAdd}
          />
        );
      case "attendance":
        return <AttendanceTable workers={workers} />;
      case "finance":
        return (
          <div className="finance-wrapper">
            <div className="finance-tables">
              <FinanceTable
                title="Expenses"
                type="expense"
                workers={workers}
                data={expenses}
                editedData={editedExpenses}
                setEditedData={setEditedExpenses}
                selectedRows={selectedExpenses}
                setSelectedRows={setSelectedExpenses}
                isEditing={isEditing}
                onAdd={() => handleAdd("expense")}
              />

              <div className="divider" />

              <FinanceTable
                title="Revenues"
                type="revenue"
                workers={workers}
                data={revenues}
                editedData={editedRevenues}
                setEditedData={setEditedRevenues}
                selectedRows={selectedRevenues}
                setSelectedRows={setSelectedRevenues}
                isEditing={isEditing}
                onAdd={() => handleAdd("revenue")}
              />
            </div>
          </div>
        );
      case "partners":
        return (
          <PartnersTable
            workers={workers}
            data={partners}
            editedData={editedPartners}
            setEditedData={setEditedPartners}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            isEditing={isEditing}
            handleAddEntry={handleAdd}
          />
        );
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
        hasSelection={hasSelection}
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
