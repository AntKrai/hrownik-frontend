type TableType = "workers" | "attendance" | "partners" | "finance";

interface ToolbarProps {
  activeTable: TableType;
  onChange: (table: TableType) => void;
}

export default function Menu({ activeTable, onChange }: ToolbarProps) {
  return (
    <div className="navigation">
      {(["workers", "attendance", "partners", "finance"] as TableType[]).map(
        (table) => (
          <button
            key={table}
            className={`px-4 py-2 rounded ${
              activeTable === table
                ? "bg-blue-500 text-white"
                : "bg-white border"
            }`}
            onClick={() => onChange(table)}
          >
            {table.toUpperCase()}
          </button>
        )
      )}
    </div>
  );
}
