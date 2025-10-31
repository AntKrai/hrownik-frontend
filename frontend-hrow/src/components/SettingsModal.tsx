interface SettingsModalProps {
  onClose: () => void;
  onLogout: () => void;
}

export default function SettingsModal({
  onClose,
  onLogout,
}: SettingsModalProps) {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">Settings</h2>

        <div className="modal-content">
          <button className="logout-button" onClick={onLogout}>
            Logout
          </button>
        </div>

        <button className="close-button" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
}
