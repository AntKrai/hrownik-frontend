import { useState, type Dispatch, type SetStateAction } from "react";
import DataTable from "../components/datatable";

// interface propsBudget {
//   onRowSelect: Dispatch<SetStateAction<null>>;
//   selectedRow: null;
// }

export default function BudgetTable({ onRowSelect, selectedRow }) {
  const [data, setData] = useState([
    {
      id: 1,
      firstname: "Alice",
      lastname: "Lice",
      email: "alice@example.com",
      phone: "123-456-7890",
      index: "12923",
      fos: "ITE",
      section: "some",
    },
    {
      id: 2,
      firstname: "Bob",
      lastname: "Ob",
      email: "bo@example.com",
      phone: "987-456-7890",
      index: "32132",
      fos: "ITE",
      section: "some",
    },
  ]);

  const columns = [
    { header: "ID", accessor: "id" },
    { header: "First Name", accessor: "firstname" },
    { header: "Last Name", accessor: "lastname" },
    { header: "Email", accessor: "email" },
    { header: "Phone", accessor: "phone" },
    { header: "Index", accessor: "index" },
    { header: "Field of Study", accessor: "fos" },
    { header: "Section", accessor: "section" },
  ];

  const handleDelete = () => {
    if (selectedRow !== null) {
      setData(data.filter((_, i) => i !== selectedRow));
      onRowSelect(null); // clear selection
    }
  };

  return (
    <DataTable
      columns={columns}
      data={data}
      onRowSelect={onRowSelect}
      onDelete={handleDelete}
    />
  );
}
