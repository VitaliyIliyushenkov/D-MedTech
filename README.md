# D-MedTech

## Требования
- Python 3.9 64bit
- PostgreSQL 17
- Node.js и npm (для React)

## Установка
1. Склонируйте репозиторий:
git clone https://github.com/VitaliyIliyushenkov/D-MedTech.git

2. Установите зависимости Python:
venv\Scripts\activate
pip install -r requirements.txt

3. Создайте файл .env в каталоге с manage.py и перенесите SECRET_KEY, настройки базы данных, и другие чувствительные данные (используйте библиотеку python-decouple):
SECRET_KEY=ваш-секретный-ключ
DB_NAME=medical_data
DB_USER=postgres
DB_PASSWORD=12345678
DB_HOST=localhost
DB_PORT=5432

#Создать ключ:
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"

4. Примените миграции:
python manage.py migrate

5. Установите зависимости React:
cd frontend npm install

6. Запустите серверы:
- Django:
  ```
  cd EBM_project
  python manage.py runserver
  ```
- React:
  ```
  cd frontend
  npm start
  ```