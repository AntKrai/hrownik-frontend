import { useState } from "react";

export interface Column<T> {
  header: string;
  accessor: keyof T;
  sortable?: boolean; // allow disabling sorting per column
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  selectedRows: number[];
  setSelectedRows: (rows: number[]) => void;
  setData: (data: T[]) => void;
  isEditing: boolean;
  editedData: T[];
  setEditedData: (data: T[]) => void;
}

export default function DataTable<T extends { [key: string]: any }>({
  columns,
  data,
  selectedRows,
  setSelectedRows,
  setData,
  isEditing,
  editedData,
  setEditedData,
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  // Sorting
  const sortedRows = [...data].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const col = columns.find((c) => c.accessor === sortConfig.key);
    if (col && col.sortable === false) return 0;

    const x = a[sortConfig.key];
    const y = b[sortConfig.key];
    if (x < y) return sortConfig.direction === "asc" ? -1 : 1;
    if (x > y) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (key: keyof T) => {
    const col = columns.find((c) => c.accessor === key);
    if (col && col.sortable === false) return; // skip
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleCheckbox = (rowIndex: number) => {
    let updatedSelection: number[];
    if (selectedRows.includes(rowIndex)) {
      updatedSelection = selectedRows.filter((i) => i !== rowIndex);
    } else {
      updatedSelection = [...selectedRows, rowIndex];
    }
    setSelectedRows(updatedSelection);
  };

  const handleEditChange = (
    rowIndex: number,
    accessor: keyof T,
    value: string
  ) => {
    const updated = [...editedData];
    updated[rowIndex] = { ...updated[rowIndex], [accessor]: value };
    setEditedData(updated);
  };

  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead className="bg-gray-200">
        <tr>
          <th className="border px-2 py-1">✔</th>
          {columns.map((col) => (
            <th
              key={col.accessor as string}
              className={`border px-2 py-1 text-left ${
                col.sortable === false ? "" : "cursor-pointer select-none"
              }`}
              onClick={() => handleSort(col.accessor)}
            >
              {col.header}
              {sortConfig.key === col.accessor &&
                (sortConfig.direction === "asc" ? " ▲" : " ▼")}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedRows.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className={`${
              selectedRows.includes(rowIndex) ? "bg-blue-100" : ""
            }`}
          >
            {/* Checkbox */}
            <td className="border px-2 py-1 text-center">
              <input
                type="checkbox"
                checked={selectedRows.includes(rowIndex)}
                onChange={() => handleCheckbox(rowIndex)}
              />
            </td>

            {/* Data cells */}
            {columns.map((col) => (
              <td key={col.accessor as string} className="border px-2 py-1">
                {isEditing ? (
                  <input
                    type="text"
                    value={editedData[rowIndex][col.accessor]}
                    onChange={(e) =>
                      handleEditChange(rowIndex, col.accessor, e.target.value)
                    }
                    className="w-full border px-1"
                  />
                ) : (
                  row[col.accessor]
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
