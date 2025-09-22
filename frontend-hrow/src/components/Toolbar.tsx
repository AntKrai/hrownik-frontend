interface ToolbarProps {
  activeTable: string;
  onChange: (table: string) => void;
  onDelete: () => void;
  hasSelection: boolean;
  isEditing: boolean;
  onEdit: () => void;
  onApply: () => void;
  onCancel: () => void;
}

export default function Toolbar({
  activeTable,
  onChange,
  onDelete,
  hasSelection,
  isEditing,
  onEdit,
  onApply,
  onCancel,
}: ToolbarProps) {
  return (
    <div className="flex gap-2 bg-gray-100 p-2 rounded-lg shadow mb-4">
      {["workers", "attendance", "partners", "finance"].map((table) => (
        <button
          key={table}
          className={`px-4 py-2 rounded ${
            activeTable === table ? "bg-blue-500 text-white" : "bg-white border"
          }`}
          onClick={() => onChange(table)}
        >
          {table.toUpperCase()}
        </button>
      ))}

      {hasSelection && !isEditing && (
        <button
          onClick={onDelete}
          className="ml-auto px-4 py-2 rounded bg-red-500 text-white"
        >
          Delete Selected
        </button>
      )}

      {!isEditing ? (
        <button
          onClick={onEdit}
          className="px-4 py-2 rounded bg-yellow-500 text-white"
        >
          Edit
        </button>
      ) : (
        <>
          <button
            onClick={onApply}
            className="px-4 py-2 rounded bg-green-500 text-white"
          >
            Apply
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-500 text-white"
          >
            Cancel
          </button>
        </>
      )}
    </div>
  );
}
