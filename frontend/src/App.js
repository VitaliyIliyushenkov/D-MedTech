import React, { useState } from "react";
import PatientsList from "./PatientsList";
import ChatInterface from "./ChatInterface";

function App() {
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [isPanelVisible, setIsPanelVisible] = useState(true);

    const togglePanel = () => setIsPanelVisible((prev) => !prev);

    return (
        <div style={{ display: "flex" }}>
            <PatientsList
                onSelectPatient={setSelectedPatient}
                isPanelVisible={isPanelVisible}
                togglePanel={togglePanel}
            />
            {selectedPatient ? (
                <ChatInterface
                    selectedPatient={selectedPatient}
                    isPanelVisible={isPanelVisible}
                    togglePanel={togglePanel}
                />
            ) : (
                <div style={{ flex: 1, textAlign: "center", padding: "20px" }}>
                    <div
                        className={`chat-header ${isPanelVisible ? 'hidden' : ''}`}
                    >
                        <button
                            className="chat-header-button"
                            onClick={togglePanel}
                        >
                            ⟨⟩
                        </button>
                        <div className="chat-logo">D-MedTech</div>
                    </div>
                    <div className="chose-patient-wait">
                        <p>Выберите пациента, чтобы открыть историю диагнозов.</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
