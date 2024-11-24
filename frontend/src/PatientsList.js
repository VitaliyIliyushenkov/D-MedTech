import React, { useState, useEffect } from "react";
import axios from "axios";
import AddPatientModal from "./AddPatientModal";
import "./App.css";

function PatientsList({ onSelectPatient, isPanelVisible, togglePanel }) {
    const [patients, setPatients] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activePatientId, setActivePatientId] = useState(null); // ID активного пациента

    const [newPatient, setNewPatient] = useState({
        full_name: "",
        birth_date: "",
        phone_number: "",
        address: "",
    });

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/patients/")
            .then((response) => setPatients(response.data))
            .catch((error) => console.error(error));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPatient({
            ...newPatient,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://127.0.0.1:8000/api/patients/", newPatient)
            .then((response) => {
                alert("Пациент успешно добавлен");
                setPatients([...patients, response.data]);
                setIsModalOpen(false);
                setNewPatient({ full_name: "", birth_date: "", phone_number: "", address: "" });
            })
            .catch((error) => {
                console.error(error);
                alert("Ошибка при добавлении пациента");
            });
    };

    const filteredPatients = patients.filter((patient) =>
        patient.full_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handlePatientClick = (patient) => {
        setActivePatientId(patient.id); // Устанавливаем ID активного пациента
        onSelectPatient(patient); // Вызываем колбэк с выбранным пациентом
    };

    return (
        <div className={`patients-list ${isPanelVisible ? "" : "collapsed"}`}>
            {isPanelVisible && (
                <div className="header">
                    <div className="title">D-MedTech</div>
                    <div className="buttons">
                        <button onClick={() => setIsModalOpen(true)}>+</button>
                        <button onClick={togglePanel}>⟨⟩</button>
                    </div>
                </div>
            )}

            {isPanelVisible && (
                <>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Поиск пациента..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <ul className="patients-scroll">
                        {filteredPatients.map((patient) => (
                            <li
                                key={patient.id}
                                onClick={() => handlePatientClick(patient)}
                                className={activePatientId === patient.id ? "active" : ""}
                            >
                                {patient.full_name}
                            </li>
                        ))}
                    </ul>
                </>
            )}

            <AddPatientModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>ФИО:</label>
                        <input
                            type="text"
                            name="full_name"
                            value={newPatient.full_name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Дата рождения:</label>
                        <input
                            type="date"
                            name="birth_date"
                            value={newPatient.birth_date}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Телефон:</label>
                        <input
                            type="text"
                            name="phone_number"
                            value={newPatient.phone_number}
                            onChange={handleInputChange}
                            placeholder="+79999999999"
                            required
                        />
                    </div>
                    <div>
                        <label>Адрес проживания:</label>
                        <textarea
                            name="address"
                            value={newPatient.address}
                            onChange={handleInputChange}
                            placeholder="Введите адрес"
                            required
                        />
                    </div>
                    <button type="submit">Сохранить</button>
                    <button type="button" onClick={() => setIsModalOpen(false)}>Отмена</button>
                </form>
            </AddPatientModal>
        </div>
    );
}

export default PatientsList;
