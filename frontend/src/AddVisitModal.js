import React, { useEffect } from "react";
import "./App.css";

function AddVisitModal({
    isOpen,
    onClose,
    formData,
    handleFormChange,
    handlePredict,
    handleSaveVisit,
    isLoading,
    prediction,
    notes,
    setNotes,
}) {
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
            <div className="modal-overlay" onClick={onClose}></div>

            {/* Модальное окно */}
            <div className="modal-content">
                <button className="modal-close-button" onClick={onClose}>
                    ✖
                </button>
                <div className="modal-header">
                    <h2>Добавить новый визит</h2>
                </div>
                <div className="modal-body">
                    <div className="modal-div">
                        {/* Форма для ввода данных */}
                        <form>
                            <label>Жалобы:</label>
                            <textarea
                                name="complaints"
                                value={formData.complaints}
                                onChange={handleFormChange}
                            />

                            <label>История болезни:</label>
                            <textarea
                                name="disease_history"
                                value={formData.disease_history}
                                onChange={handleFormChange}
                            />

                            <label>Объективный статус:</label>
                            <textarea
                                name="objective_status"
                                value={formData.objective_status}
                                onChange={handleFormChange}
                            />

                            <label>Возрастная категория:</label>
                            <select
                                name="age_category"
                                value={formData.age_category}
                                onChange={handleFormChange}
                                required
                            >
                                <option value="">Выберите категорию</option>
                                <option value="младше 18">младше 18</option>
                                <option value="18-35">18-35</option>
                                <option value="36-60">36-60</option>
                                <option value="старше 60">старше 60</option>
                            </select>
                        </form>

                        {/* Кнопка предсказания */}
                        <button className="primary-button" onClick={handlePredict} disabled={isLoading}>
                            {isLoading ? "Загрузка..." : "Предсказать диагноз"}
                        </button>
                    </div>

                    {/* Модуль предсказания */}
                    <div className="modal-div">
                        <label>Результаты предсказания:</label>
                        <div className="prediction-results">
                            {prediction ? (
                                <>
                                    <p>
                                        <strong>Диагноз:</strong> {prediction.diagnosis}
                                    </p>
                                    <p>
                                        <strong>Рекомендации:</strong>{" "}
                                        {prediction.recommendations?.join(", ") || "Нет рекомендаций"}
                                    </p>
                                    <label>Заметки врача:</label>
                                    <textarea
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                    />
                                </>
                            ) : (
                                <div className="prediction-results-wait">
                                    <p>Ожидание предсказания...</p>
                                </div>
                            )}
                        </div>

                        {/* Кнопка сохранения */}
                        {prediction && (
                            <button
                                className="secondary-button"
                                onClick={handleSaveVisit}
                            >
                                Сохранить визит
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddVisitModal;
