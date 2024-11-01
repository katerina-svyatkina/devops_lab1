# Указываем базовый образ Node.js
FROM node:18-alpine

# Устанавливаем рабочую директорию в контейнере
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все остальные файлы проекта в контейнер
COPY . .

# Указываем команду для запуска
CMD ["npm", "start"]

# Пробрасываем порт для работы React
EXPOSE 3000