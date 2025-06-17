# 📚 Lendify Frontend - React

Esta es la aplicación frontend de **Lendify**, una plataforma de préstamos de libros entre usuarios. Ha sido desarrollada con **React** y diseñada bajo principios de organización modular, buena experiencia de usuario y facilidad de mantenimiento.

---

## ✨ Características Principales

- CRUD de usuarios y libros
- Préstamos y devoluciones de libros
- Filtro dinámico de libros disponibles y a retornar
- Modales reutilizables para crear, editar y devolver libros
- Permisos de componentes y rutas basados en rol
- Estructura organizada por módulos
- Skeleton loaders para mejor UX
- Paginación, animaciones y vistas de error personalizadas

---

## 🤝 Tecnologías Utilizadas

- React 19+
- React Hook Form
- Tailwind CSS
- React Router DOM
- Framer Motion (animaciones)
- Context API para manejo de estado
- Docker (para despliegue en producción)
- Axios (para peticiones al backend)

---

## 📁 Estructura del Proyecto

```
src/
├── Modules/
│   ├── Books/
│   │   ├── Components/
│   │   ├── Controller/
│   │   └── Model/
│   ├── Users/
│   ├── Borrowings/
│   └── ...
├── Components/              # Componentes globales como modales, skeletons, alerts
├── Context/                 # Manejo global de sesión y permisos
└── Pages/                  # Paginas principales de la aplicación
```

- **Components/**: Contiene los componentes específicos del módulo (ej. modal de edición de libros)
- **Model/**: Encapsula las llamadas a la API mediante un `ApiClient` centralizado
- **Controller/**: Orquesta la lógica del módulo entre el modelo y la vista

---

## 🚀 Ejecución Local

### 1. Clonar el repositorio y configurar

```bash
cp .env.example .env
```

Edita `.env` con tu URL del backend (por ejemplo desde Laravel en `http://localhost:8000` o el puerto expuesto por Docker):

```env
VITE_API_BASE_URL=http://localhost:8081/books-api/public/api/
VITE_PUBLIC_BASE_URL=http://localhost:8081/books-api/public/

```

La ruta publica, nos sirve para obtener las imagenes de los libros.

### 2. Instalar dependencias

```bash
npm install
```

### 3. Iniciar el servidor de desarrollo

```bash
npm run dev
```

La app se ejecutará en `http://localhost:5173`

---

## ✅ Funcionalidades

- Login con validación de token y almacenamiento en contexto
- Listado, creación, edición y eliminación de usuarios y libros
- Modales personalizados reutilizables
- Filtro por título, autor e ISBN
- Vista separada por libros disponibles y libros prestados
- Contexto global para manejo de permisos y sesión
- Páginas personalizadas para rutas no encontradas o sin permiso

---

## 🧪 Testing

Actualmente, la app no cuenta con test automatizados, pero su estructura modular facilita la integración de pruebas unitarias en cada módulo (por ejemplo usando `React Testing Library` o `Vitest`).

---

## 🐳 Docker (opcional)

La aplicación cuenta con configuración para producción mediante Docker:

```bash
docker compose up --build -d
```

La cual expone la aplicacion por el puerto 4003

---

## ☁️ Despliegue en AWS

La app fue desplegada exitosamente en una instancia EC2 de **AWS**, usando:

- **Amazon Linux 2**
- **Docker**
- **Nginx** como servidor web
- **Certbot** para certificados SSL


Nginx funciona como proxy inverso y expone el frontend en el puerto 80/443 apuntando a la imagen Docker construida.

---

## 🌐 Integración con Backend

Todos los módulos consumen endpoints de la API Laravel. El archivo `ApiClient` centraliza los headers, el manejo de errores y la autorización con `Bearer Token`.

La variable `VITE_API_URL` define la URL base.

---


