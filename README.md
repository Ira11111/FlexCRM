# FlexCRM

![FlexCRM Logo](https://github.com/Ira11111/FlexCRM/blob/assets/logo.png?raw=true)

**Современная CRM-система для эффективного управления бизнесом**

---

## 🔍 Общее описание
**FlexCRM** — это мощная и удобная CRM-система, разработанная для оптимизации работы с клиентами, автоматизации бизнес-процессов и повышения прибыльности.

Подходит для:  
✔ **Стартапов** и малого бизнеса  
✔ **Маркетинговых агентств** и **продающих команд**

---

## 🚀 Почему выбирают FlexCRM?

### 📌 **Централизованное управление клиентами**
Вся информация о клиентах, сделках и коммуникациях — в одной системе.

### 🎯 **Автоматизация рутинных задач**
Уменьшите нагрузку на сотрудников и сосредоточьтесь на важном.

### 📊 **Аналитика и отчеты**
Отслеживайте ключевые метрики, прибыль и эффективность рекламных кампаний.

### 👥 **Гибкие роли и права доступа**
Настройка под разные отделы: продажи, маркетинг, поддержка.

### 💡 **Интуитивно понятный интерфейс**
Быстрый старт без долгого обучения.

---

## 👨‍💼 **Роли пользователей и их права**

| Роль          | Основные возможности                                                                 |
|--------------|-------------------------------------------------------------------------------------|
| **Администраторы** (`Admins`) | Полный контроль: управление пользователями, просмотр всех данных (клиенты, лиды, продукты, реклама, договоры) |
| **Операторы** (`Operators`) | Добавление и редактирование клиентов и лидов, просмотр продуктов, рекламы и договоров |
| **Менеджеры** (`Managers`) | Работа с договорами (создание, изменение), просмотр клиентов, лидов, рекламы и продуктов |
| **Маркетологи** (`Marketers`) | Управление рекламными кампаниями и продуктами, просмотр клиентов, лидов и договоров |

---

## 📈 **Статистика и аналитика**

### 📢 **Рекламные кампании**
- **Самые прибыльные кампании** (по доходу) 
- **Самые успешные кампании** (по привлеченным клиентам)

### 👥 **Клиенты**
- **Самые WOW клиенты** (по активности и лояльности)

### 🛍 **Продукты и услуги**
- **Самые продаваемые продукты**

---
## 🛠 Установка и настройка

### Быстрый старт

1. Клонируйте репозиторий:
```bash
git clone https://github.com/Ira11111/FlexCRM.git
cd FlexCRM
```

2. Создайте файл `.env` на основе примера:
```bash
cp ./backend/env.template ./backend/.env
cp ./frontend/env.template ./frontend/.env

```

3. Запустите сервисы через Docker Compose:
```bash
docker compose up -d --build
```

Система будет доступна по адресу: [http://localhost:80](http://localhost:80)


### Управление сервисами
- Остановить все сервисы: `docker compose down`
- Перезапустить конкретный сервис: `docker compose restart "service_name"`
- Просмотр логов: `docker compose logs -f`


---

## 📞 **Контакты**
По вопросам сотрудничества и поддержки:
  - 📧 **Email**: support@flexcrm.com
  - 📱 **Telegram**: @makeDictionaryBot

---
### ⚡ **FlexCRM — управляйте бизнесом легко и эффективно!**
