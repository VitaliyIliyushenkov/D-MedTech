# D-MedTech

Проект предназначен для автоматизации процесса диагностики и выдачи рекомендаций на основе данных пациентов. Система использует модель машинного обучения (основанную на BERT) для предсказания диагнозов, а затем извлекает связанные с ними рекомендации из базы данных.

Цели проекта:
-Упростить процесс диагностики и повысить точность рекомендаций.
-Обеспечить врачей инструментом для анализа данных пациентов.
-Сократить время на обработку информации и выдачу решений.

## Содержание

- [Описание](#описание)
- [Требования](#требования)
- [Установка](#установка)
- [Использование](#использование)
- [Функциональные возможности](#функциональные-возможности)
- [Технологии](#Стек технологий)
- [Контакты](#контакты)

## Описание

В современной медицине врачи сталкиваются с рядом сложностей:

1. Огромный объем данных: Медицинские истории, жалобы пациентов, результаты обследований и другие данные сложно быстро обрабатывать вручную.
2. Неоднозначность диагностики: Симптомы многих заболеваний могут быть схожи, что затрудняет постановку точного диагноза.
3. Временные ограничения: Врачи вынуждены принимать решения в условиях ограниченного времени, что может приводить к пропуску важных деталей.
4. Доступность знаний: Рекомендации и современные подходы к лечению постоянно обновляются, и врачам сложно быть в курсе всех изменений.

Эти проблемы могут снижать качество медицинской помощи и увеличивать нагрузку на специалистов.

Проект предоставляет автоматизированное решение, которое:

1. Анализирует данные пациентов: Используя современные модели обработки текста (BERT), система анализирует жалобы, историю болезни и другие данные для предсказания диагноза.
2. Генерирует рекомендации: Каждому диагнозу соответствует набор рекомендаций, которые автоматически извлекаются из базы данных. Это помогает врачам быстро принимать решения.
3. Ускоряет рабочий процесс: Система автоматизирует рутинные задачи, оставляя врачам больше времени для взаимодействия с пациентами.
4. Интегрируется в рабочую среду: Через веб-интерфейс и API решение легко интегрируется в существующие системы клиник.

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

## Использование

Инструкции по запуску и использованию приложения:
1. Запустить файл study.py и выбрать нужную опцию 1 - обучение модели, 2 - оценка модели
2. Запустить серверы

## Функциональные возможности

Проект включает разработку API на основе Django, базу данных (PostgreSQL) для хранения данных о диагнозах и рекомендациях, а также фронтенд-интерфейс на React для взаимодействия с системой.

## Стек технологий

Список технологий и инструментов, использованных в проекте:
- Языки программирования
- Библиотеки и фреймворки
- Инструменты разработки

## Контакты

Контактная информация для обратной связи:
- Email: ivi.22uni-dubna.ru
- https://t.me/vitalleti
