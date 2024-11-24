import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import pickle
import psycopg2

# Загрузка модели и токенизатора
model_path = "../best_model"
model = AutoModelForSequenceClassification.from_pretrained(model_path)
tokenizer = AutoTokenizer.from_pretrained(model_path)
with open(f"{model_path}/label_encoder.pkl", "rb") as file:
    label_encoder = pickle.load(file)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)


# Подключение к базе данных
def get_db_connection():
    return psycopg2.connect(
        dbname="medical_data",
        user="postgres",
        password="01052004",
        host="localhost",
        port="5432"
    )


# Функция для предсказания диагноза
# Функция для предсказания диагноза с учетом id
def predict_with_id(text, model, tokenizer, label_encoder, max_len=512, device=device):
    model.eval()
    encoding = tokenizer(
        text,
        add_special_tokens=True,
        max_length=max_len,
        padding="max_length",
        truncation=True,
        return_tensors="pt"
    )
    input_ids = encoding["input_ids"].to(device)
    attention_mask = encoding["attention_mask"].to(device)
    with torch.no_grad():
        outputs = model(input_ids, attention_mask=attention_mask)
    logits = outputs.logits
    predicted_label = torch.argmax(logits, dim=1).cpu().numpy()

    # Извлекаем id и имя диагноза
    predicted_id = int(predicted_label[0])
    predicted_name = label_encoder.classes_[predicted_id]
    return predicted_id, predicted_name


# Функция для получения рекомендаций по id диагноза
def find_recommendations_by_id(diagnosis_id):
    connection = get_db_connection()
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT recommendations FROM diagnosis WHERE id = %s", (diagnosis_id,))
            row = cursor.fetchone()
            if row:
                recommendations = row[0]
                if isinstance(recommendations, str):
                    recommendations = recommendations.split(", ")
                return recommendations if recommendations else []
    finally:
        connection.close()
    return ["Рекомендации для данного диагноза отсутствуют."]


# Главная функция
def process_prediction(data):
    complaints = data.get("complaints", "")
    disease_history = data.get("disease_history", "")
    objective_status = data.get("objective_status", "")
    age_category = data.get("age_category", "")

    # Формируем текст для модели
    input_text = f"{complaints} | {disease_history} | {objective_status} | возрастная категория: {age_category}"
    diagnosis_id, diagnosis_name = predict_with_id(input_text, model, tokenizer, label_encoder)
    recommendations = find_recommendations_by_id(diagnosis_id)

    return {
        "diagnosis": diagnosis_name,
        "recommendations": recommendations,
        "diagnosis_id": diagnosis_id
    }
