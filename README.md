# Gestor de Gastos 💰

Sistema integral para la gestión de finanzas personales, desarrollado con el stack **MERN** utilizando **TypeScript** para garantizar mayor robustez y mantenibilidad del código.

---

## 🚀 Tecnologías Utilizadas

### 🖥️ Backend (`/server`)

- **Node.js & Express** – Framework base para la API REST.
- **MongoDB & Mongoose** – Base de datos NoSQL y modelado de datos.
- **TypeScript** – Tipado estático para mejorar el desarrollo.
- **JWT (JSON Web Token)** – Manejo de autenticación segura.
- **Zod** – Validación de esquemas de datos.
- **Bcrypt** – Encriptación de contraseñas.

### 🌐 Frontend (`/client`)

- **React + Vite** – Biblioteca de interfaz de usuario y herramienta de construcción rápida.
- **TypeScript** – Tipado para componentes y servicios.
- **Axios** – Cliente HTTP para consumir la API.
- **Tailwind CSS** – Estilizado moderno y responsivo.
- **React Router DOM** – Navegación entre páginas.

---

## 📦 Estructura del Proyecto

```text
gestor-de-gastos/
│
├── server/ # API RESTful (usuarios, ingresos, gastos, categorías)
└── client/ # SPA con dashboard y formularios
```

- `/server`: Gestiona autenticación, usuarios, ingresos, gastos y categorías.
- `/client`: Aplicación SPA con panel visual y formularios interactivos.

---

## 🛠️ Instalación y Configuración

### ✅ Requisitos Previos

- [Node.js](https://nodejs.org/) instalado.
- Instancia de [MongoDB](https://www.mongodb.com/) (local o en la nube).

### 📥 Pasos

#### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/Mateoserafini/gestor-de-gastos
cd gestor-de-gastos
```

#### 2️⃣ Configurar el Backend

```bash
cd server
npm install
```

Crear un archivo `.env` dentro del directorio `/server` con las siguientes variables (ajustar según tu configuración):

```env
PORT=3000
MONGO_URI=tu_cadena_de_conexion
JWT_SECRET=tu_clave_secreta
```

*(Nota: Verifica si tu configuración utiliza variables adicionales como `DB_USER`, `DB_HOST`, `DB_NAME`, etc., e inclúyelas).*

#### 3️⃣ Configurar el Frontend

```bash
cd ../client
npm install
```

*(Recomendación: Puedes actualizar el archivo `/client/README.md` borrando el texto genérico de Vite y dejando instrucciones específicas del frontend).*

---

## 🚦 Cómo Ejecutarlo

Para levantar el proyecto en un entorno de desarrollo, necesitas ejecutar ambos servidores (Backend y Frontend) en terminales separadas.

**▶️ Iniciar el Servidor (Backend)**
```bash
cd server
npm run dev
```

**▶️ Iniciar el Cliente (Frontend)**
```bash
cd client
npm run dev
```

---

## 📋 Funcionalidades Principales

- ✅ **Usuarios:** Registro e inicio de sesión seguro con JWT.
- 💵 **Gestión de Transacciones:** Crear, leer, actualizar y eliminar ingresos y gastos.
- 🗂️ **Categorías:** Clasificación detallada para una mejor organización.
- 📊 **Dashboard:** Panel visual interactivo para el seguimiento financiero.

---

## 📝 Documentación de la API (Endpoints)

Estos son los endpoints principales de la API para facilitar su consumo:

### Autenticación
- `POST /api/auth/register` - Registrar un nuevo usuario
- `POST /api/auth/login` - Iniciar sesión de usuario

### Gastos
- `GET /api/expenses` - Obtener lista de gastos
- `POST /api/expenses` - Registrar un gasto
- `PUT /api/expenses/:id` - Actualizar un gasto existente
- `DELETE /api/expenses/:id` - Eliminar un gasto

### Ingresos
- `GET /api/incomes` - Obtener lista de ingresos
- `POST /api/incomes` - Registrar un ingreso
- `PUT /api/incomes/:id` - Actualizar un ingreso existente
- `DELETE /api/incomes/:id` - Eliminar un ingreso

*(Nota: Se requiere incluir el token de autenticación (Bearer Token) en los headers para las rutas protegidas).*

---

## 👨‍💻 Autor Mateo Serafini

Proyecto desarrollado como gestor de finanzas personales, implementando una arquitectura moderna y escalable basada en el ecosistema **MERN** y **TypeScript**.
