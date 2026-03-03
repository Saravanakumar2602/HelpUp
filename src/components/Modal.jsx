import React from "react";
import "../styles/modal.css";
export default function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
        <button className="modal-close" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
