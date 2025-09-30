import { useState } from "react";
import ButtonHolder from "../components/ButtonHolder";
import FinanceTable, { type FinanceEntry } from "../components/Datatable";
import type { Worker } from "./Workers";
import { getFinance } from "../helpers/getData"; // <- your faker helper

interface FinanceWrapperProps {
  workers: Worker[];
}

export default function FinanceWrapper({ workers }: FinanceWrapperProps) {
  // generate fake data
  const initialExpenses = getFinance();
  const initialRevenues = getFinance();

  // state for expenses
  const [expenses, setExpenses] = useState<FinanceEntry[]>(initialExpenses);
  const [editedExpenses, setEditedExpenses] =
    useState<FinanceEntry[]>(initialExpenses);
  const [selectedExpenses, setSelectedExpenses] = useState<number[]>([]);

  // state for revenues
  const [revenues, setRevenues] = useState<FinanceEntry[]>(initialRevenues);
  const [editedRevenues, setEditedRevenues] =
    useState<FinanceEntry[]>(initialRevenues);
  const [selectedRevenues, setSelectedRevenues] = useState<number[]>([]);

  // shared state
  const [isEditing, setIsEditing] = useState(false);

  // === Handlers for ButtonHolder ===
  const handleEdit = () => {
    setEditedExpenses([...expenses]);
    setEditedRevenues([...revenues]);
    setIsEditing(true);
  };

  const handleApply = () => {
    setExpenses([...editedExpenses]);
    setRevenues([...editedRevenues]);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedExpenses([...expenses]);
    setEditedRevenues([...revenues]);
    setIsEditing(false);
  };

  // --- Add/Delete helpers ---
  const createNewEntry = (): FinanceEntry => ({
    id: Date.now() + Math.floor(Math.random() * 1000),
    name: "",
    amount: 0,
    workerId: null,
  });

  const handleAddEntry = (type: "expense" | "revenue") => {
    const newEntry = createNewEntry();
    if (type === "expense") {
      setEditedExpenses([...editedExpenses, newEntry]);
    } else {
      setEditedRevenues([...editedRevenues, newEntry]);
    }
  };

  const handleDelete = (type: "expense" | "revenue") => {
    if (type === "expense" && selectedExpenses.length > 0) {
      setExpenses(expenses.filter((e) => !selectedExpenses.includes(e.id)));
      setEditedExpenses(
        editedExpenses.filter((e) => !selectedExpenses.includes(e.id))
      );
      setSelectedExpenses([]);
    }
    if (type === "revenue" && selectedRevenues.length > 0) {
      setRevenues(revenues.filter((r) => !selectedRevenues.includes(r.id)));
      setEditedRevenues(
        editedRevenues.filter((r) => !selectedRevenues.includes(r.id))
      );
      setSelectedRevenues([]);
    }
  };

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
          onAdd={() => handleAddEntry("expense")}
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
          onAdd={() => handleAddEntry("revenue")}
        />
      </div>

      <ButtonHolder
        hasSelection={
          selectedExpenses.length > 0 || selectedRevenues.length > 0
        }
        isEditing={isEditing}
        onEdit={handleEdit}
        onApply={handleApply}
        onCancel={handleCancel}
        onDelete={() => {
          handleDelete("expense");
          handleDelete("revenue");
        }}
      />
    </div>
  );
}
