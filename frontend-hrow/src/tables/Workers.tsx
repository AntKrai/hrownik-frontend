// import { useState } from "react";
import DataTable, { type Column } from "../components/datatable";

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
  setData: (data: Worker[]) => void;
  data: Worker[];
}

export default function WorkersTable({
  selectedRows,
  setSelectedRows,
  isEditing,
  editedData,
  setEditedData,
  setData,
  data,
}: WorkersTableProps) {
  const columns: Column<Worker>[] = [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "name" },
    { header: "Surname", accessor: "surname" },
    { header: "Email", accessor: "email", sortable: false },
    { header: "Phone", accessor: "phone", sortable: false },
    { header: "Index", accessor: "index" },
    { header: "Field of Study", accessor: "fieldOfStudy" },
    { header: "Section", accessor: "section" },
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      selectedRows={selectedRows}
      setSelectedRows={setSelectedRows}
      setData={setData}
      isEditing={isEditing}
      editedData={editedData}
      setEditedData={setEditedData}
    />
  );
}
