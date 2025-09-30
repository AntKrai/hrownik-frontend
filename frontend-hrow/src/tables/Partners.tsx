import { useState } from "react";
import type { Worker } from "./Workers";

export interface Partner {
  id: number;
  name: string;
  workerId: number | null;
  phone: string;
  email: string;
  status: "Pending" | "Approved" | "Rejected";
  comment: string;
}

interface PartnersTableProps {
  workers: Worker[];
  selectedRows: number[];
  setSelectedRows: (rows: number[]) => void;
  isEditing: boolean;
  editedData: Partner[];
  setEditedData: (data: Partner[]) => void;
  data: Partner[];
  handleAddEntry: () => void;
}

type SortKey = keyof Partner | "__selected__" | null;
type SortDirection = "asc" | "desc";

export default function PartnersTable({
  workers,
  selectedRows,
  setSelectedRows,
  isEditing,
  editedData,
  setEditedData,
  data,
  handleAddEntry,
}: PartnersTableProps) {
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

  const sortedRows = [...(isEditing ? editedData : data)].sort((a, b) => {
    const key = sortConfig.key;
    if (!key) return 0;

    if (key === "__selected__") {
      const aSel = selectedRows.includes(a.id);
      const bSel = selectedRows.includes(b.id);
      if (aSel === bSel) return 0;
      return sortConfig.direction === "asc" ? (aSel ? -1 : 1) : aSel ? 1 : -1;
    }

    const x = a[key as keyof Partner];
    const y = b[key as keyof Partner];
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

  const handleEditChange = (
    rowIndex: number,
    key: keyof Partner,
    value: string | number | null
  ) => {
    const updated = [...editedData];
    updated[rowIndex] = { ...updated[rowIndex], [key]: value };
    setEditedData(updated);
  };

  // const handleAddEntry = () => {
  //   const newEntry: Partner = {
  //     id: Date.now(),
  //     name: "",
  //     workerId: null,
  //     phone: "",
  //     email: "",
  //     status: "Pending",
  //     comment: "",
  //   };
  //   setEditedData([...editedData, newEntry]);
  // };

  const columns: {
    header: string;
    key: keyof Partner | "__selected__";
    sortable?: boolean;
    render?: (row: Partner, i: number) => React.ReactNode;
  }[] = [
    {
      header: "✔",
      key: "__selected__",
      sortable: true,
      render: (row) => (
        <input
          type="checkbox"
          checked={selectedRows.includes(row.id)}
          onChange={() => toggleSelected(row.id)}
        />
      ),
    },
    {
      header: "Name",
      key: "name",
      sortable: true,
      render: (row, i) =>
        isEditing ? (
          <input
            type="text"
            maxLength={64}
            value={editedData[i]?.name ?? ""}
            onChange={(e) => handleEditChange(i, "name", e.target.value)}
          />
        ) : (
          row.name
        ),
    },
    {
      header: "Worker",
      key: "workerId",
      sortable: true,
      render: (row, i) =>
        isEditing ? (
          <select
            value={editedData[i]?.workerId ?? ""}
            onChange={(e) =>
              handleEditChange(
                i,
                "workerId",
                e.target.value ? Number(e.target.value) : null
              )
            }
          >
            <option value="">-- Select Worker --</option>
            {workers.map((w) => (
              <option key={w.id} value={w.id}>
                {w.name} {w.surname}
              </option>
            ))}
          </select>
        ) : (
          workers.find((w) => w.id === row.workerId)?.name ?? ""
        ),
    },
    {
      header: "Phone",
      key: "phone",
      sortable: false,
      render: (row, i) =>
        isEditing ? (
          <input
            type="text"
            value={editedData[i]?.phone ?? ""}
            onChange={(e) => handleEditChange(i, "phone", e.target.value)}
          />
        ) : (
          row.phone
        ),
    },
    {
      header: "Email",
      key: "email",
      sortable: false,
      render: (row, i) =>
        isEditing ? (
          <input
            type="text"
            value={editedData[i]?.email ?? ""}
            onChange={(e) => handleEditChange(i, "email", e.target.value)}
          />
        ) : (
          row.email
        ),
    },
    {
      header: "Status",
      key: "status",
      sortable: true,
      render: (row, i) =>
        isEditing ? (
          <select
            value={editedData[i]?.status ?? "Pending"}
            onChange={(e) =>
              handleEditChange(i, "status", e.target.value as Partner["status"])
            }
          >
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        ) : (
          row.status
        ),
    },
    {
      header: "Comment",
      key: "comment",
      sortable: false,
      render: (row, i) =>
        isEditing ? (
          <input
            type="text"
            value={editedData[i]?.comment ?? ""}
            onChange={(e) => handleEditChange(i, "comment", e.target.value)}
          />
        ) : (
          row.comment
        ),
    },
  ];

  return (
    <div className="partners-table-wrapper">
      <table className="partners-table">
        <thead>
          <tr>
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
          {sortedRows.map((row, i) => (
            <tr
              key={row.id}
              className={selectedRows.includes(row.id) ? "selected-row" : ""}
            >
              {columns.map((col) => (
                <td key={col.key as string}>
                  {col.render
                    ? col.render(row, i)
                    : row[col.key as keyof Partner]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {isEditing && (
        <button className="add-partner-btn" onClick={handleAddEntry}>
          ➕ Add Partner
        </button>
      )}
    </div>
  );
}
