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
FrontEnd:
- Angular 21
- TypeScript
- Standalone components
- Servicios HTTP
- CSS puro para estilos
## Funcionalidades Principales
- Registro de productos
- Visualización de lista de productos
- Registro de movimientos de inventario (IN / OUT)
- Actualización de stock
- Indicador de estado:
- Ok = stock suficiente
- Alert = stock igual o inferior al mínimo
- Alertas visuales para acciones exitosas
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

## Consideraciones técnicas importantes
El backend utiliza almacenamiento en memoria, por lo que no hay persistencia de datos.

Después de crear productos o registrar movimientos, puede ser necesario refrescar la vista para reflejar el estado más reciente.

Esta decisión fue tomada de forma consciente para garantizar consistencia sin agregar complejidad innecesaria (base de datos o estado global).

En un entorno productivo, este comportamiento se solucionaría con Persistencia en base de datos

