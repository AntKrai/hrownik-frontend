import { useState } from "react";
import ButtonHolder from "../components/ButtonHolder";
import PartnersTable, { type Partner } from "../tables/Partners";
import type { Worker } from "../tables/Workers";

interface PartnersWrapperProps {
  workers: Worker[];
}

export default function PartnersWrapper({ workers }: PartnersWrapperProps) {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [editedPartners, setEditedPartners] = useState<Partner[]>([]);
  const [selectedPartners, setSelectedPartners] = useState<number[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  // === Handlers for ButtonHolder ===
  const handleEdit = () => {
    setEditedPartners([...partners]);
    setIsEditing(true);
  };

  const handleApply = () => {
    setPartners([...editedPartners]);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedPartners([...partners]);
    setIsEditing(false);
  };

  // --- Add/Delete helpers ---
  const createNewPartner = (): Partner => ({
    id: Date.now() + Math.floor(Math.random() * 1000),
    name: "",
    workerId: null,
    phone: "",
    email: "",
    status: "Pending",
    comment: "",
  });

  const handleAddPartner = () => {
    setEditedPartners([...editedPartners, createNewPartner()]);
  };

  const handleDeletePartners = () => {
    setPartners(partners.filter((p) => !selectedPartners.includes(p.id)));
    setEditedPartners(
      editedPartners.filter((p) => !selectedPartners.includes(p.id))
    );
    setSelectedPartners([]);
  };

  return (
    <div className="partners-wrapper">
      <PartnersTable
        workers={workers}
        data={partners}
        editedData={editedPartners}
        setEditedData={setEditedPartners}
        selectedRows={selectedPartners}
        setSelectedRows={setSelectedPartners}
        isEditing={isEditing}
        handleAddEntry={handleAddPartner}
      />

      <ButtonHolder
        hasSelection={selectedPartners.length > 0}
        isEditing={isEditing}
        onEdit={handleEdit}
        onApply={handleApply}
        onCancel={handleCancel}
        onDelete={handleDeletePartners}
      />
    </div>
  );
}
