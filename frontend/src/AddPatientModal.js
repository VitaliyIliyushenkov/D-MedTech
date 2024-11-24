import React, { useEffect } from "react";
import "./App.css";

function AddPatientModal({ isOpen, onClose, children }) {
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("modal-active");
        } else {
            document.body.classList.remove("modal-active");
        }
        return () => document.body.classList.remove("modal-active");
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <>
            {/* Затемняющий фон */}
            <div className="modal-overlay"></div>

            {/* Модальное окно */}
            <div className="modal-content-add">
                <button className="modal-close-button" onClick={onClose}>✖</button>
                <div className="modal-header">
                    <h2>Добавить пациента</h2>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </>
    );
}

export default AddPatientModal;
