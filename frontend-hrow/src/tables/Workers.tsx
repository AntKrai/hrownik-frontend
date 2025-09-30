import { useState } from "react";

export interface Worker {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone: string;
  index: string;
  fieldOfStudy: string;
  section: string;
}

interface WorkersTableProps {
  selectedRows: number[];
  setSelectedRows: (rows: number[]) => void;
  isEditing: boolean;
  editedData: Worker[];
  setEditedData: (data: Worker[]) => void;
  data: Worker[];
}

type SortKey = keyof Worker | "__selected__" | null;
type SortDirection = "asc" | "desc";

export default function WorkersTable({
  selectedRows,
  setSelectedRows,
  isEditing,
  editedData,
  setEditedData,
  data,
}: WorkersTableProps) {
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    direction: SortDirection;
  }>({ key: null, direction: "asc" });

  const toggleSelected = (id: number) => {
    setSelectedRows(
      selectedRows.includes(id)
        ? selectedRows.filter((x) => x !== id)
        : [...selectedRows, id]
    );
  };

  const handleSort = (key: SortKey) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedRows = [...data].sort((a, b) => {
    const key = sortConfig.key;
    if (!key) return 0;

    if (key === "__selected__") {
      const aSel = selectedRows.includes(a.id);
      const bSel = selectedRows.includes(b.id);
      if (aSel === bSel) return 0;
      return sortConfig.direction === "asc" ? (aSel ? -1 : 1) : aSel ? 1 : -1;
    }

    const x = a[key];
    const y = b[key];
    if (x == null && y == null) return 0;
    if (x == null) return sortConfig.direction === "asc" ? -1 : 1;
    if (y == null) return sortConfig.direction === "asc" ? 1 : -1;

    if (typeof x === "number" && typeof y === "number") {
      return sortConfig.direction === "asc" ? x - y : y - x;
    }

    const xs = String(x).toLowerCase();
    const ys = String(y).toLowerCase();
    if (xs < ys) return sortConfig.direction === "asc" ? -1 : 1;
    if (xs > ys) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const handleEditChange = (id: number, key: keyof Worker, value: string) => {
    const updated = editedData.map((row) =>
      row.id === id ? { ...row, [key]: value } : row
    );
    setEditedData(updated);
  };

  const columns: {
    header: string;
    key: keyof Worker;
    sortable?: boolean;
    editable?: boolean;
  }[] = [
    { header: "ID", key: "id", editable: false },
    { header: "Name", key: "name", editable: true },
    { header: "Surname", key: "surname", editable: true },
    { header: "Email", key: "email", sortable: false, editable: true },
    { header: "Phone", key: "phone", sortable: false, editable: true },
    { header: "Index", key: "index", editable: true },
    { header: "Field of Study", key: "fieldOfStudy", editable: true },
    { header: "Section", key: "section", editable: true },
  ];

  return (
    <table className="workers-table">
      <thead>
        <tr>
          <th
            className="select-column"
            onClick={() => handleSort("__selected__")}
          >
            ✔
            {sortConfig.key === "__selected__" &&
              (sortConfig.direction === "asc" ? " ▲" : " ▼")}
          </th>
          {columns.map((col) => (
            <th
              key={col.key}
              className={col.sortable === false ? "" : "sortable"}
              onClick={() =>
                col.sortable === false ? undefined : handleSort(col.key)
              }
            >
              {col.header}
              {sortConfig.key === col.key &&
                (sortConfig.direction === "asc" ? " ▲" : " ▼")}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedRows.map((row) => (
          <tr
            key={row.id}
            className={selectedRows.includes(row.id) ? "selected-row" : ""}
          >
            <td className="select-cell">
              <input
                type="checkbox"
                checked={selectedRows.includes(row.id)}
                onChange={() => toggleSelected(row.id)}
              />
            </td>
            {columns.map((col) => (
              <td key={col.key} className="data-cell">
                {isEditing && col.editable !== false ? (
                  <input
                    type="text"
                    value={
                      editedData.find((r) => r.id === row.id)?.[col.key] ?? ""
                    }
                    onChange={(e) =>
                      handleEditChange(row.id, col.key, e.target.value)
                    }
                  />
                ) : (
                  row[col.key]
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
