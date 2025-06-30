# Sistema de Gestión de Candidatos ATS

Un sistema completo de gestión de candidatos (Applicant Tracking System) desarrollado con Node.js, React, TypeScript y PostgreSQL.

## 🚀 Características

- **Gestión completa de candidatos**: Crear, leer, actualizar y eliminar candidatos
- **Edición de candidatos**: Modal con campos prellenados para edición
- **Carga de archivos CV**: Soporte para archivos PDF y DOCX
- **Validación de datos**: Validación tanto en frontend como backend
- **Interfaz responsive**: Diseño moderno y accesible
- **Base de datos PostgreSQL**: Con Prisma ORM
- **API REST**: Backend completo con Express y TypeScript
- **Frontend React**: Con TypeScript y Tailwind CSS
- **Pruebas unitarias**: Cobertura completa de frontend y backend

## 📋 Requisitos Previos

- Node.js (v16 o superior)
- PostgreSQL
- Docker (opcional, para la base de datos)

## 🛠️ Instalación

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd AI4Devs-lab-ides-202506
```

### 2. Configurar la base de datos

#### Opción A: Usar Docker (Recomendado)

```bash
docker-compose up -d
```

#### Opción B: PostgreSQL local

Crear una base de datos PostgreSQL y actualizar la URL en `backend/.env`:

```env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/nombre_db"
```

### 3. Configurar el backend

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
```

### 4. Configurar el frontend

```bash
cd frontend
npm install
```

## 🚀 Ejecución

### Backend

```bash
cd backend
npm run dev
```

El servidor se ejecutará en `http://localhost:3010`

### Frontend

```bash
cd frontend
npm start
```

La aplicación se abrirá en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
AI4Devs-lab-ides-202506/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── __tests__/
│   │   │   │   └── candidateController.test.ts
│   │   │   └── candidateController.ts
│   │   ├── middleware/
│   │   │   └── validation.ts
│   │   ├── routes/
│   │   │   └── candidateRoutes.ts
│   │   ├── services/
│   │   │   ├── __tests__/
│   │   │   │   └── candidateService.test.ts
│   │   │   └── candidateService.ts
│   │   ├── tests/
│   │   │   └── app.test.ts
│   │   ├── types/
│   │   │   └── candidate.ts
│   │   └── index.ts
│   ├── prisma/
│   │   ├── migrations/
│   │   │   └── 20250630205625_add_candidates_model/
│   │   │       └── migration.sql
│   │   ├── migration_lock.toml
│   │   └── schema.prisma
│   ├── uploads/
│   ├── jest.config.js
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CandidateForm.tsx
│   │   │   └── CandidateList.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── tests/
│   │   │   ├── App.test.tsx
│   │   │   ├── CandidateForm.test.tsx
│   │   │   └── CandidateList.test.tsx
│   │   ├── types/
│   │   │   └── candidate.ts
│   │   ├── utils/
│   │   │   └── validation.ts
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── public/
│   ├── package.json
│   ├── tailwind.config.js
│   └── tsconfig.json
├── docker-compose.yml
├── LICENSE.md
├── README.md
└── VERSION
```

## 🔧 API Endpoints

### Candidatos

- `GET /api/candidates` - Obtener todos los candidatos
- `GET /api/candidates/:id` - Obtener candidato por ID
- `POST /api/candidates` - Crear nuevo candidato
- `PUT /api/candidates/:id` - Actualizar candidato
- `DELETE /api/candidates/:id` - Eliminar candidato
- `POST /api/candidates/:id/cv` - Subir CV del candidato

### Ejemplo de uso

```bash
# Crear candidato
curl -X POST http://localhost:3010/api/candidates \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Juan",
    "lastName": "Pérez",
    "email": "juan.perez@email.com",
    "phone": "+1234567890",
    "address": "Calle Principal 123",
    "education": "Ingeniería Informática",
    "experience": "5 años como desarrollador"
  }'

# Obtener candidatos
curl http://localhost:3010/api/candidates

# Actualizar candidato
curl -X PUT http://localhost:3010/api/candidates/1 \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Juan Carlos"
  }'
```

## 🎯 Funcionalidades Implementadas

### ✅ Criterios de Aceptación Cumplidos

1. **Accesibilidad de la función**: Botón "Añadir Candidato" visible en el dashboard
2. **Formulario de ingreso de datos**: Formulario completo con todos los campos requeridos
3. **Validación de datos**: Validación en frontend y backend
4. **Carga de documentos**: Soporte para PDF y DOCX
5. **Confirmación de añadido**: Mensajes de éxito/error con react-toastify
6. **Errores y manejo de excepciones**: Manejo completo de errores
7. **Accesibilidad y compatibilidad**: Diseño responsive y accesible

### 🎨 Características Adicionales

- **Dashboard con estadísticas**: Vista general de candidatos
- **Lista de candidatos**: Tabla con información detallada
- **Edición de candidatos**: Modal con campos prellenados
- **Gestión de archivos**: Subida y visualización de CVs
- **Interfaz moderna**: Diseño con Tailwind CSS
- **Validación en tiempo real**: Feedback inmediato al usuario
- **Manejo de estados**: Loading, error y éxito
- **Responsive design**: Funciona en móviles y desktop
- **Pruebas unitarias**: Cobertura completa de componentes y servicios

## 🛡️ Seguridad

- Validación de entrada en frontend y backend
- Límites de tamaño de archivo (5MB)
- Filtrado de tipos de archivo
- Rate limiting
- Headers de seguridad con Helmet
- CORS configurado

## 🧪 Testing

### Backend

```bash
cd backend
npm test
```

**Cobertura de pruebas:**
- Controllers: 56.71%
- Services: 25%
- Middleware: 55.55%
- Routes: 70.83%

### Frontend

```bash
cd frontend
npm test
```

**Pruebas implementadas:**
- `CandidateForm.test.tsx`: Pruebas del formulario de candidatos
- `CandidateList.test.tsx`: Pruebas de la lista de candidatos
- `App.test.tsx`: Pruebas del componente principal

## 📝 Variables de Entorno

### Backend (.env)

```env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5434/LTIdb"
PORT=3010
NODE_ENV=development
```

### Frontend (.env)

```env
REACT_APP_API_URL=http://localhost:3010/api
```

## 🗄️ Base de Datos

### Modelo Candidate

```prisma
model Candidate {
  id          Int      @id @default(autoincrement())
  firstName   String
  lastName    String
  email       String   @unique
  phone       String?
  address     String?
  education   String?
  experience  String?
  cvFileName  String?
  cvFilePath  String?
  cvFileSize  Int?
  cvMimeType  String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## 🎨 Tecnologías Utilizadas

### Backend
- **Node.js** con Express
- **TypeScript** para tipado estático
- **Prisma ORM** para base de datos
- **PostgreSQL** como base de datos
- **Jest** para pruebas unitarias
- **Multer** para manejo de archivos
- **Yup** para validación

### Frontend
- **React 18** con TypeScript
- **Tailwind CSS** para estilos
- **React Hook Form** para formularios
- **Yup** para validación
- **Axios** para llamadas API
- **React Toastify** para notificaciones
- **Jest** y **Testing Library** para pruebas

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE.md` para más detalles.