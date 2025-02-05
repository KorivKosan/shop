# Pet Shop - Магазин товаров для животных

Веб-приложение для покупки товаров для домашних животных, разработанное с использованием React, TypeScript и Redux Toolkit.



https://github.com/user-attachments/assets/16012733-4489-4021-8a3b-43883e9ca9a6

## Функциональность

- Просмотр каталога товаров
- Добавление товаров в корзину
- Регистрация и авторизация пользователей
- Уведомления о действиях пользователя
- Адаптивный дизайн

## Технологии

- React 18
- TypeScript
- Redux Toolkit
- React Router DOM
- JSON Server (для имитации backend)
- Vite
- CSS Modules

## Установка и запуск

1. Клонируйте репозиторий:
```bash
git clone [url-репозитория]
```

2. Установите зависимости:
```bash
npm install
```

3. Запустите JSON Server (база данных):
```bash
npm run server
```

4. В отдельном терминале запустите приложение:
```bash
npm run dev
```

## Структура проекта

```
src/
├── components/      # Переиспользуемые компоненты
├── features/        # Redux слайсы и логика
├── hooks/          # Кастомные хуки
├── pages/          # Компоненты страниц
├── types/          # TypeScript типы
└── store.ts        # Конфигурация Redux store
```

## Тестовые аккаунты

- Администратор:
  - Email: admin@test.com
  - Пароль: admin

## API Endpoints

- `GET /products` - получение списка товаров
- `GET /users` - получение пользователей
- `POST /users` - регистрация нового пользователя




