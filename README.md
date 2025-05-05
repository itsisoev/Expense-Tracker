# 💸 Expense Tracker

> Персональный трекер расходов с графиками, темами, PWA, десктоп-версией и GraphQL API.

---

## 🧩 Описание проекта

**Expense Tracker** — это современное приложение для учёта доходов и расходов. Подходит как для личного использования, так и для демонстрации навыков fullstack-разработки. Поддерживает графики, историю транзакций, тёмную/светлую тему, десктоп-версию (Electron), PWA и API на GraphQL.

---

## 🔥 Фичи

- ✅ CRUD доходов и расходов
- 📈 Графики трат: неделя, 4 недели, 3/6/12 месяцев
- 🧾 История транзакций с пагинацией
- 🌗 Переключение темы (тёмная / светлая)
- 🧠 Аналитика по категориям (в разработке)
- 🖥️ Десктоп-версия на Electron
- 🛰️ PWA: оффлайн-режим, установка
- 🔐 Аутентификация и роли (в разработке)
- 📁 Импорт / экспорт данных (в разработке)

---

## ⚙️ Стек технологий

| Layer         | Технологии                                                     |
|---------------|----------------------------------------------------------------|
| Frontend      | Angular (standalone components), RxJS, SCSS,  GraphQL (Apollo) |
| Backend       | NestJS, GraphQL (Apollo), REST (auth)                          |
| Database      | PostgreSQL, Prisma ORM                                         |
| DevOps        | Docker, docker-compose, GitHub Actions                         |
| Desktop       | Electron                                                       |
| PWA           | Angular PWA, Service Workers                                   |
| Общие         | TypeScript, ESLint, Prettier                                   |

---

## 🧱 Архитектура

### Frontend (Angular)
- Standalone компоненты
- RxJS для реактивного стейта
- Сервисная архитектура (по фичам)
- Темизация через custom SCSS
- PWA: offline-first, Service Workers
- Apollo Angular для GraphQL

### Backend (NestJS)
- Модули по фичам
- GraphQL API + REST эндпоинты
- DTO, валидация, гварды
- Prisma ORM для PostgreSQL
- JWT аутентификация (в планах)

### Docker
- `docker-compose` для разработки
- Отдельные контейнеры: frontend, backend, db
- Prod-ready конфигурация (в разработке)
