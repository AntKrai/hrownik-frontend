// import { useState } from "react";

export interface ButtonHolderProps {
  hasSelection: boolean;
  isEditing: boolean;
  onEdit: () => void;
  onApply: () => void;
  onCancel: () => void;
  onDelete: () => void;
}

export default function ButtonHolder({
  hasSelection,
  isEditing,
  onEdit,
  onApply,
  onCancel,
  onDelete,
}: ButtonHolderProps) {
  return (
    <div className="button-holder">
      {!isEditing ? (
        <button onClick={onEdit} className="edit">
          Edit
        </button>
      ) : (
        <button onClick={onApply} className="apply">
          Apply
        </button>
      )}

      {!isEditing ? (
        <button onClick={onDelete} className="delete" disabled={!hasSelection}>
          Delete
        </button>
      ) : (
        <button onClick={onCancel} className="cancel">
          Cancel
        </button>
      )}
    </div>
  );
}
