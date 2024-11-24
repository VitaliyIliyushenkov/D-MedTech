import React, { useState, useEffect } from "react";
import axios from "axios";
import AddVisitModal from "./AddVisitModal";
import "./App.css";

function ChatInterface({ selectedPatient, isPanelVisible, togglePanel }) {
    const [messages, setMessages] = useState([]);
    const [visits, setVisits] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        complaints: "",
        disease_history: "",
        objective_status: "",
        full_name: "",
        birth_date: "",
        age_category: "",
    });
    const [prediction, setPrediction] = useState(null);
    const [notes, setNotes] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (selectedPatient) {
            setFormData({
                ...formData,
                full_name: selectedPatient.full_name,
                birth_date: selectedPatient.birth_date,
                age_category: selectedPatient.age_category,
            });
            axios
                .get(`http://127.0.0.1:8000/api/patients/${selectedPatient.id}/visits/`)
                .then((response) => setVisits(response.data))
                .catch(() => alert("Ошибка при загрузке визитов."));
        }
    }, [selectedPatient]);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setPrediction(null);
    };

    const handlePredict = () => {
        setIsLoading(true);
        axios
            .post("http://127.0.0.1:8000/api/predict/", formData)
            .then((response) => {
                setPrediction(response.data);
                setIsLoading(false);
            })
            .catch(() => {
                alert("Ошибка при предсказании диагноза.");
                setIsLoading(false);
            });
    };

    const handleSaveVisit = () => {
        const dataToSave = {
            ...formData,
            diagnosis: prediction?.diagnosis,
            recommendations: prediction?.recommendations,
            notes,
        };

        axios
            .post("http://127.0.0.1:8000/api/save_visit/", dataToSave)
            .then(() => {
                alert("Визит успешно сохранен.");
                axios
                    .get(`http://127.0.0.1:8000/api/patients/${selectedPatient.id}/visits/`)
                    .then((response) => setVisits(response.data))
                    .catch(() => alert("Ошибка при загрузке визитов."));
                setIsModalOpen(false);
                setNotes("");
                setPrediction(null);
            })
            .catch(() => alert("Ошибка при сохранении визита."));
    };

    const handleDeleteVisit = (visitId) => {
        axios
            .delete(`http://127.0.0.1:8000/api/patient_visits/${visitId}/`)
            .then(() => {
                alert("Визит успешно удален.");
                setVisits(visits.filter((visit) => visit.id !== visitId));
            })
            .catch(() => alert("Ошибка при удалении визита."));
    };

    return (
        <div className="chat-interface">
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
            <h3>История диагнозов</h3>
            <div className="visits-container chat-scroll">
                {visits.map((visit) => (
                    <div key={visit.id} className="visit-block">
                        {/* Дата в правом верхнем углу */}
                        <div className="visit-date">{visit.visit_date}</div>

                        {/* Основная информация */}
                        <div className="visit-content">
                            <h4 className="visit-diagnosis">
                                {visit.diagnosis ? visit.diagnosis.name : "Не указан"}
                            </h4>
                            <p className="visit-recommendations">
                                <strong>Рекомендации:</strong>{" "}
                                <p>
                                    {visit.recommendations?.length > 0
                                        ? visit.recommendations.join(", ")
                                        : "Нет рекомендаций"}
                                </p>
                            </p>
                            <div className="visit-details">
                                <p>
                                    <strong>Жалобы:</strong> {visit.complaints || "Не указаны"}
                                </p>
                                <p>
                                    <strong>История болезни:</strong>{" "}
                                    {visit.disease_history || "Не указана"}
                                </p>
                                <p>
                                    <strong>Объективный статус:</strong>{" "}
                                    {visit.objective_status || "Не указан"}
                                </p>
                                <p>
                                    <strong>Возрастная категория:</strong>{" "}
                                    {visit.age_category || "Не указана"}
                                </p>
                                <p>
                                    <strong>Заметки врача:</strong> {visit.notes || "Нет заметок"}
                                </p>
                            </div>
                        </div>
                        <div className="delete-button-rlt">
                            {/* Кнопка удаления */}
                            <button
                                className="delete-button"
                                onClick={() => handleDeleteVisit(visit.id)}
                            >
                                Удалить визит
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <button className="add-record-button" onClick={handleOpenModal}>
                Добавить запись
            </button>
            <AddVisitModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                formData={formData}
                handleFormChange={handleFormChange}
                handlePredict={handlePredict}
                handleSaveVisit={handleSaveVisit}
                isLoading={isLoading}
                prediction={prediction}
                notes={notes}
                setNotes={setNotes}
            />
        </div>
    );
}

export default ChatInterface;
