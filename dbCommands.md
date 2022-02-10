# Comandos para actualizar la base de datos

### 1) Borrar lo viejo

npx sequelize-cli db:migrate:undo:all

### 2) Crear las tablas

npx sequelize-cli db:migrate

### 3) Poblar las tablas

npx sequelize-cli db:seed:all
