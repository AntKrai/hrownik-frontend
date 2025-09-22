// // // import * as React from "react";
// // // import Box from "@mui/material/Box";
// // // import { DataGrid, type GridColDef } from "@mui/x-data-grid";

// // // const columns: GridColDef<(typeof rows)[number]>[] = [
// // //   { field: "id", headerName: "ID", width: 90 },
// // //   {
// // //     field: "firstName",
// // //     headerName: "First name",
// // //     width: 150,
// // //     editable: true,
// // //   },
// // //   {
// // //     field: "lastName",
// // //     headerName: "Last name",
// // //     width: 150,
// // //     editable: true,
// // //   },
// // //   {
// // //     field: "number",
// // //     headerName: "Phone Number",
// // //     type: "number",
// // //     width: 170,
// // //     editable: true,
// // //   },
// // //   {
// // //     field: "mail",
// // //     headerName: "E-mail Address",
// // //     width: 200,
// // //     editable: true,
// // //   },
// // //   // specialization
// // //   // {
// // //   //   field: "fullName",
// // //   //   headerName: "Full name",
// // //   //   description: "This column has a value getter and is not sortable.",
// // //   //   sortable: false,
// // //   //   width: 160,
// // //   //   valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
// // //   // },
// // //   {
// // //     field: "index",
// // //     headerName: "Index",
// // //     type: "number",
// // //     width: 110,
// // //     editable: true,
// // //   },
// // //   {
// // //     field: "specialization",
// // //     headerName: "Specialization",
// // //     width: 110,
// // //     editable: true,
// // //   },
// // //   {
// // //     field: "section",
// // //     headerName: "Section",
// // //     width: 110,
// // //     editable: true,
// // //   },
// // // ];

// // // const rows = [
// // //   { id: 1, lastName: "Snow", firstName: "Jon", age: 14, index: "2890" },
// // //   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
// // //   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
// // //   { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
// // //   { id: 5, lastName: "Targaryena", firstName: "Daenerys", age: null },
// // //   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
// // //   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
// // //   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
// // //   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
// // // ];

// // // export default function DataGridDemo() {
// // //   return (
// // //     <Box sx={{ height: 400, width: "100%" }}>
// // //       <DataGrid
// // //         rows={rows}
// // //         columns={columns}
// // //         initialState={{
// // //           pagination: {
// // //             paginationModel: {
// // //               pageSize: 7,
// // //             },
// // //           },
// // //         }}
// // //         pageSizeOptions={[7]}
// // //         checkboxSelection
// // //         disableRowSelectionOnClick
// // //       />
// // //     </Box>
// // //   );
// // // }

// // import * as React from "react";
// // import { alpha } from "@mui/material/styles";
// // import Box from "@mui/material/Box";
// // import Table from "@mui/material/Table";
// // import TableBody from "@mui/material/TableBody";
// // import TableCell from "@mui/material/TableCell";
// // import TableContainer from "@mui/material/TableContainer";
// // import TableHead from "@mui/material/TableHead";
// // import TablePagination from "@mui/material/TablePagination";
// // import TableRow from "@mui/material/TableRow";
// // import TableSortLabel from "@mui/material/TableSortLabel";
// // import Toolbar from "@mui/material/Toolbar";
// // import Typography from "@mui/material/Typography";
// // import Paper from "@mui/material/Paper";
// // import Checkbox from "@mui/material/Checkbox";
// // import IconButton from "@mui/material/IconButton";
// // import Tooltip from "@mui/material/Tooltip";
// // import FormControlLabel from "@mui/material/FormControlLabel";
// // import Switch from "@mui/material/Switch";
// // import DeleteIcon from "@mui/icons-material/Delete";
// // import FilterListIcon from "@mui/icons-material/FilterList";
// // import { visuallyHidden } from "@mui/utils";

// // // interface Data {
// // //   id: number;
// // //   firstname: string;
// // //   lastname: string;
// // //   number: number;
// // //   email: string;
// // //   index: number;
// // //   specialization: string;
// // //   section: string;
// // // }

// // // function createData(
// // //   id: number,
// // //   firstname: string,
// // //   lastname: string,
// // //   number: number,
// // //   email: string,
// // //   index: number,
// // //   specialization: string,
// // //   section: string
// // // ): Data {
// // //   return {
// // //     id,
// // //     firstname,
// // //     lastname,
// // //     number,
// // //     email,
// // //     index,
// // //     specialization,
// // //     section,
// // //   };
// // // }

// // // const rows = [
// // //   createData(1, "test","test", 300, "mail",10,"special", "section"),
// // //     createData(2, "test1","test1", 3001, "mail1",101,"special1", "section1"),

// // // ];

// // interface Data {
// //   id: number;
// //   calories: number;
// //   carbs: number;
// //   fat: number;
// //   name: string;
// //   protein: number;
// // }

// // function createData(
// //   id: number,
// //   name: string,
// //   calories: number,
// //   fat: number,
// //   carbs: number,
// //   protein: number
// // ): Data {
// //   return {
// //     id,
// //     name,
// //     calories,
// //     fat,
// //     carbs,
// //     protein,
// //   };
// // }

// // const rows = [
// //   createData(1, "Cupcake", 305, 3.7, 67, 4.3),
// //   createData(2, "Donut", 452, 25.0, 51, 4.9),
// //   createData(3, "Eclair", 262, 16.0, 24, 6.0),
// //   createData(4, "Frozen yoghurt", 159, 6.0, 24, 4.0),
// //   createData(5, "Gingerbread", 356, 16.0, 49, 3.9),
// //   createData(6, "Honeycomb", 408, 3.2, 87, 6.5),
// //   createData(7, "Ice cream sandwich", 237, 9.0, 37, 4.3),
// //   createData(8, "Jelly Bean", 375, 0.0, 94, 0.0),
// //   createData(9, "KitKat", 518, 26.0, 65, 7.0),
// //   createData(10, "Lollipop", 392, 0.2, 98, 0.0),
// //   createData(11, "Marshmallow", 318, 0, 81, 2.0),
// //   createData(12, "Nougat", 360, 19.0, 9, 37.0),
// //   createData(13, "Oreo", 437, 18.0, 63, 4.0),
// // ];

// // function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
// //   if (b[orderBy] < a[orderBy]) {
// //     return -1;
// //   }
// //   if (b[orderBy] > a[orderBy]) {
// //     return 1;
// //   }
// //   return 0;
// // }

// // type Order = "asc" | "desc";

// // function getComparator<Key extends keyof any>(
// //   order: Order,
// //   orderBy: Key
// // ): (
// //   a: { [key in Key]: number | string },
// //   b: { [key in Key]: number | string }
// // ) => number {
// //   return order === "desc"
// //     ? (a, b) => descendingComparator(a, b, orderBy)
// //     : (a, b) => -descendingComparator(a, b, orderBy);
// // }
// // interface HeadCell {
// //   disablePadding: boolean;
// //   id: keyof Data;
// //   label: string;
// //   numeric: boolean;
// // }

// // const headCells: readonly HeadCell[] = [
// //   {
// //     id: 3,
// //     numeric: false,
// //     disablePadding: true,
// //     label: "Dessert (100g serving)",
// //   },
// //   {
// //     id: "calories",
// //     numeric: true,
// //     disablePadding: false,
// //     label: "Calories",
// //   },
// //   {
// //     id: "fat",
// //     numeric: true,
// //     disablePadding: false,
// //     label: "Fat (g)",
// //   },
// //   {
// //     id: "carbs",
// //     numeric: true,
// //     disablePadding: false,
// //     label: "Carbs (g)",
// //   },
// //   {
// //     id: "protein",
// //     numeric: true,
// //     disablePadding: false,
// //     label: "Protein (g)",
// //   },
// // ];

// // interface EnhancedTableProps {
// //   numSelected: number;
// //   onRequestSort: (
// //     event: React.MouseEvent<unknown>,
// //     property: keyof Data
// //   ) => void;
// //   onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
// //   order: Order;
// //   orderBy: string;
// //   rowCount: number;
// // }

// // function handleClick(){}

// // function EnhancedTableHead(props: EnhancedTableProps) {
// //   const {
// //     onSelectAllClick,
// //     order,
// //     orderBy,
// //     numSelected,
// //     rowCount,
// //     onRequestSort,
// //   } = props;
// //   const createSortHandler =
// //     (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
// //       onRequestSort(event, property);
// //     };

// //   return (
// //     <TableHead>
// //       <TableRow>
// //         <TableCell padding="checkbox">
// //           <Checkbox
// //             color="primary"
// //             indeterminate={numSelected > 0 && numSelected < rowCount}
// //             checked={rowCount > 0 && numSelected === rowCount}
// //             onChange={onSelectAllClick}
// //             inputProps={{
// //               "aria-label": "select all desserts",
// //             }}
// //           />
// //         </TableCell>
// //         {headCells.map((headCell) => (
// //           <TableCell
// //             key={headCell.id}
// //             align={headCell.numeric ? "right" : "left"}
// //             padding={headCell.disablePadding ? "none" : "normal"}
// //             sortDirection={orderBy === headCell.id ? order : false}
// //           >
// //             <TableSortLabel
// //               active={orderBy === headCell.id}
// //               direction={orderBy === headCell.id ? order : "asc"}
// //               onClick={createSortHandler(headCell.id)}
// //             >
// //               {headCell.label}
// //               {orderBy === headCell.id ? (
// //                 <Box component="span" sx={visuallyHidden}>
// //                   {order === "desc" ? "sorted descending" : "sorted ascending"}
// //                 </Box>
// //               ) : null}
// //             </TableSortLabel>
// //           </TableCell>
// //         ))}
// //       </TableRow>
// //     </TableHead>
// //   );
// // }
// // interface EnhancedTableToolbarProps {
// //   numSelected: number;
// // }
// // function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
// //   const { numSelected } = props;
// //   return (
// //     <Toolbar
// //       sx={[
// //         {
// //           pl: { sm: 2 },
// //           pr: { xs: 1, sm: 1 },
// //         },
// //         numSelected > 0 && {
// //           bgcolor: (theme) =>
// //             alpha(
// //               theme.palette.primary.main,
// //               theme.palette.action.activatedOpacity
// //             ),
// //         },
// //       ]}
// //     >
// //       {numSelected > 0 ? (
// //         <Typography
// //           sx={{ flex: "1 1 100%" }}
// //           color="inherit"
// //           variant="subtitle1"
// //           component="div"
// //         >
// //           {numSelected} selected
// //         </Typography>
// //       ) : (
// //         <Typography
// //           sx={{ flex: "1 1 100%" }}
// //           variant="h6"
// //           id="tableTitle"
// //           component="div"
// //         >
// //           Nutrition
// //         </Typography>
// //       )}
// //       {numSelected > 0 ? (
// //         <Tooltip title="Delete">
// //           <IconButton onClick={handleClick}>
// //             <DeleteIcon />
// //           </IconButton>
// //         </Tooltip>
// //       ) : (
// //         <Tooltip title="Filter list">
// //           <IconButton>
// //             <FilterListIcon />
// //           </IconButton>
// //         </Tooltip>
// //       )}
// //     </Toolbar>
// //   );
// // }
// // export default function EnhancedTable() {
// //   const [order, setOrder] = React.useState<Order>("asc");
// //   const [orderBy, setOrderBy] = React.useState<keyof Data>("calories");
// //   const [selected, setSelected] = React.useState<readonly number[]>([]);
// //   const [page, setPage] = React.useState(0);
// //   const [dense, setDense] = React.useState(false);
// //   const [rowsPerPage, setRowsPerPage] = React.useState(5);

// //   const handleRequestSort = (
// //     event: React.MouseEvent<unknown>,
// //     property: keyof Data
// //   ) => {
// //     const isAsc = orderBy === property && order === "asc";
// //     setOrder(isAsc ? "desc" : "asc");
// //     setOrderBy(property);
// //   };

// //   const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
// //     if (event.target.checked) {
// //       const newSelected = rows.map((n) => n.id);
// //       setSelected(newSelected);
// //       return;
// //     }
// //     setSelected([]);
// //   };

// //   const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
// //     const selectedIndex = selected.indexOf(id);
// //     let newSelected: readonly number[] = [];

// //     if (selectedIndex === -1) {
// //       newSelected = newSelected.concat(selected, id);
// //     } else if (selectedIndex === 0) {
// //       newSelected = newSelected.concat(selected.slice(1));
// //     } else if (selectedIndex === selected.length - 1) {
// //       newSelected = newSelected.concat(selected.slice(0, -1));
// //     } else if (selectedIndex > 0) {
// //       newSelected = newSelected.concat(
// //         selected.slice(0, selectedIndex),
// //         selected.slice(selectedIndex + 1)
// //       );
// //     }
// //     setSelected(newSelected);
// //   };

// //   const handleChangePage = (event: unknown, newPage: number) => {
// //     setPage(newPage);
// //   };

// //   const handleChangeRowsPerPage = (
// //     event: React.ChangeEvent<HTMLInputElement>
// //   ) => {
// //     setRowsPerPage(parseInt(event.target.value, 10));
// //     setPage(0);
// //   };

// //   const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
// //     setDense(event.target.checked);
// //   };

// //   // Avoid a layout jump when reaching the last page with empty rows.
// //   const emptyRows =
// //     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

// //   const visibleRows = React.useMemo(
// //     () =>
// //       [...rows]
// //         .sort(getComparator(order, orderBy))
// //         .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
// //     [order, orderBy, page, rowsPerPage]
// //   );

// //   return (
// //     <Box sx={{ width: "100%" }}>
// //       <Paper sx={{ width: "100%", mb: 2 }}>
// //         <EnhancedTableToolbar numSelected={selected.length} />
// //         <TableContainer>
// //           <Table
// //             sx={{ minWidth: 750 }}
// //             aria-labelledby="tableTitle"
// //             size={dense ? "small" : "medium"}
// //           >
// //             <EnhancedTableHead
// //               numSelected={selected.length}
// //               order={order}
// //               orderBy={orderBy}
// //               onSelectAllClick={handleSelectAllClick}
// //               onRequestSort={handleRequestSort}
// //               rowCount={rows.length}
// //             />
// //             <TableBody>
// //               {visibleRows.map((row, index) => {
// //                 const isItemSelected = selected.includes(row.id);
// //                 const labelId = `enhanced-table-checkbox-${index}`;

// //                 return (
// //                   <TableRow
// //                     hover
// //                     onClick={(event) => handleClick(event, row.id)}
// //                     role="checkbox"
// //                     aria-checked={isItemSelected}
// //                     tabIndex={-1}
// //                     key={row.id}
// //                     selected={isItemSelected}
// //                     sx={{ cursor: "pointer" }}
// //                   >
// //                     <TableCell padding="checkbox">
// //                       <Checkbox
// //                         color="primary"
// //                         checked={isItemSelected}
// //                         inputProps={{
// //                           "aria-labelledby": labelId,
// //                         }}
// //                       />
// //                     </TableCell>
// //                     <TableCell
// //                       component="th"
// //                       id={labelId}
// //                       scope="row"
// //                       padding="none"
// //                     >
// //                       {row.name}
// //                     </TableCell>
// //                     <TableCell align="right">{row.calories}</TableCell>
// //                     <TableCell align="right">{row.fat}</TableCell>
// //                     <TableCell align="right">{row.carbs}</TableCell>
// //                     <TableCell align="right">{row.protein}</TableCell>
// //                   </TableRow>
// //                 );
// //               })}
// //               {emptyRows > 0 && (
// //                 <TableRow
// //                   style={{
// //                     height: (dense ? 33 : 53) * emptyRows,
// //                   }}
// //                 >
// //                   <TableCell colSpan={6} />
// //                 </TableRow>
// //               )}
// //             </TableBody>
// //           </Table>
// //         </TableContainer>
// //         <TablePagination
// //           rowsPerPageOptions={[5, 10, 25]}
// //           component="div"
// //           count={rows.length}
// //           rowsPerPage={rowsPerPage}
// //           page={page}
// //           onPageChange={handleChangePage}
// //           onRowsPerPageChange={handleChangeRowsPerPage}
// //         />
// //       </Paper>
// //       <FormControlLabel
// //         control={<Switch checked={dense} onChange={handleChangeDense} />}
// //         label="Dense padding"
// //       />
// //     </Box>
// //   );
// // }
// import { CommonTable } from "./header";

// const data = [
//   { name: "John", age: 25, location: "New York", options: ["Edit", "Delete"] },
//   { name: "Jane", age: 30, location: "London", options: ["Edit", "Archive"] },
// ];

// const staticHeaders = [
//   { id: "name", label: "Name", render: (row) => row.name },
//   { id: "age", label: "Age", render: (row) => row.age },
//   { id: "location", label: "Location", render: (row) => row.location },
//   {
//     id: "action",
//     label: "Action",
//     render: (row) => (
//       <button onClick={() => alert(`Action on ${row.name}`)}>Action</button>
//     ),
//   },
//   {
//     id: "options",
//     label: "Options",
//     render: (row) => (
//       <select>
//         {row.options.map((option, idx) => (
//           <option key={idx} value={option}>
//             {option}
//           </option>
//         ))}
//       </select>
//     ),
//   },
// ];

// export const App = () => {
//   return (
//     <div>
//       <h1>Reusable Table with Render Props</h1>
//       <CommonTable headers={staticHeaders} data={data} />
//     </div>
//   );
// };
// import { useState } from "react";
// import Toolbar from "./header";
// import { ClientTable } from "./client";
// import { PresenceTable } from "./presence";
// import CompanyTable from "./company";
// import BudgetTable from "./budget";

// export default function TableWithToolbar() {
//   const [activeTable, setActiveTable] = useState("Budget Table");
//   const [selectedRow, setSelectedRow] = useState(null);

//   const renderTable = () => {
//     switch (activeTable) {
//       case "Budget Table":
//         return (
//           <BudgetTable selectedRow={selectedRow} onRowSelect={setSelectedRow} />
//         );
//       case "Presence Table":
//         return <PresenceTable />;
//       case "Client Table":
//         return <ClientTable />;
//       case "Company Table":
//         return <CompanyTable />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="p-6">
//       <Toolbar
//         activeTable={activeTable}
//         onChange={(t: string) => {
//           setActiveTable(t);
//           setSelectedRow(null);
//         }}
//         hasSelection={selectedRow !== null}
//         onDelete={() => {}}
//       />
//       <div className="border rounded-lg p-4 shadow">{renderTable()}</div>
//     </div>
//   );
// }
import { useState } from "react";
import Toolbar from "./components/toolbar";
import WorkersTable, { type Worker } from "./tables/Workers";
import { AttendanceTable } from "./tables/Attendance";

export default function TableWithToolbar() {
  const [activeTable, setActiveTable] = useState("workers");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  // Data for workers
  const [workers, setWorkers] = useState<Worker[]>([
    {
      id: 1,
      name: "Alice",
      surname: "Smith",
      email: "alice@example.com",
      phone: "123-456-7890",
      index: "A123",
      fieldOfStudy: "Computer Science",
      section: "A1",
    },
  ]);

  const mockWorkers: Worker[] = [
    {
      id: 1,
      name: "Alice",
      surname: "Smith",
      email: "alice@example.com",
      phone: "123-456-7890",
      index: "A123",
      fieldOfStudy: "Computer Science",
      section: "A1",
    },
    {
      id: 2,
      name: "Bob",
      surname: "Jones",
      email: "bob@example.com",
      phone: "555-555-5555",
      index: "B456",
      fieldOfStudy: "Mathematics",
      section: "B2",
    },
  ];

  <AttendanceTable workers={mockWorkers} />;

  const [editedWorkers, setEditedWorkers] = useState<Worker[]>(workers);

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

  const renderTable = () => {
    if (activeTable === "workers") {
      return (
        <WorkersTable
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          isEditing={isEditing}
          editedData={editedWorkers}
          setEditedData={setEditedWorkers}
          setData={setWorkers}
          data={workers}
        />
      );
    }
    return <div>Select another table placeholder</div>;
  };

  return (
    <div className="p-6">
      <Toolbar
        activeTable={activeTable}
        onChange={(t) => {
          setActiveTable(t);
          setSelectedRows([]);
        }}
        hasSelection={selectedRows.length > 0}
        onDelete={handleDelete}
        isEditing={isEditing}
        onEdit={handleEdit}
        onApply={handleApply}
        onCancel={handleCancel}
      />
      <div className="border rounded-lg p-4 shadow">{renderTable()}</div>
    </div>
  );
}
