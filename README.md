# Smart Inventory

Aplicación web para la gestión básica de inventario, desarrollada como prueba técnica para práctica profesional (Aprendiz SENA – Análisis y Desarrollo de Software).

Permite:

- Registrar productos
- Controlar entradas y salidas de inventario
- Visualizar stock y alertas por stock mínimo
## Tecnologías utilizadas
BackEnd:
- Node.js
- NestJS
- API REST
- Almacenamiento en memoria (sin base de datos)
- TypeORM (para tipado de entidades)
- Jest (para pruebas unitarias)
- Postgres
- Postman
FrontEnd:
- Angular 21
- TypeScript
- Standalone components
- Servicios HTTP
- CSS puro para estilos
## Funcionalidades Principales
- Registro de productos
- Listado de productos con estado de inventario
- Registro de movimientos de inventario:
  - Entradas (IN)
  - Salidas (OUT)
- Actualización de stock
- Indicador de estado:
  - Ok = stock suficiente
  - Alert = stock igual o inferior al mínimo
- Filtro de productos en estado de alerta
- Alertas visuales para acciones exitosas y de Error
## Estructura del proyecto
Smart_inventory/
├── backend/
│   ├── src/
│   │   ├── products/
│   │   ├── inventory/
│   │   └── app.module.ts
│   └── main.ts
│
├── frontend/
│   ├── src/app/
│   │   ├── product-form/
│   │   ├── product-list/
│   │   ├── inventory-movement/
│   │   ├── services/
│   │   └── app.ts
│   └── main.ts

## Ejecución de la Prueba
Backend:
```bash
cd backend
npm install
npm run start:dev
```
El backend se ejecuta en: http://localhost:3000

Frontend:
```bash
cd frontend
npm install
ng serve
```
El frontend se ejecuta en: http://localhost:4200
## Pruebas
Se implementó una prueba unitaria en el servicio de productos
Uso de TestingModule y mock de repositorio TypeORM
Framework: Jest
Ejecutar Pruebas:
```bash
cd backend
npm run test
```
## Consideraciones técnicas importantes
La aplicación utiliza persistencia en base de datos PostgreSQL

El frontend se actualiza automáticamente al registrar productos o movimientos

La arquitectura separa claramente:

Lógica de negocio (backend)

Presentación y experiencia de usuario (frontend)

## Autor
Freydér Díaz Peñuela  
Aprendiz SENA – Análisis y Desarrollo de Software