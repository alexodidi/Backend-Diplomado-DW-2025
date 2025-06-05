# Sistema de Agendamiento de Citas Médicas

Este proyecto es una **API RESTful** desarrollada con **Node.js**, **Express** y **MongoDB** para gestionar un sistema de agendamiento de citas médicas.  
El **administrador** puede crear citas disponibles, y los **usuarios autenticados** pueden asignarse una, siempre y cuando no tengan otra en la misma fecha y hora.

---

## Tecnologías Utilizadas

- **Node.js**
- **Express.js**
- **MongoDB** + **Mongoose**
- **JWT** (`jsonwebtoken`)
- **bcryptjs**
- **express-validator**
- **dotenv**
- **CORS**

---

## Estructura del Proyecto

```
/backend
│
├── app.js
├── .env
├── package.json
├── README.md
│
├── models/
│   ├── Usuario.js
│   └── Cita.js
│
├── controllers/
│   ├── auth.controller.js
│   ├── usuarios.controller.js
│   └── citas.controller.js
│
├── routes/
│   ├── auth.routes.js
│   ├── usuarios.routes.js
│   └── citas.routes.js
│
├── middlewares/
│   ├── auth.middleware.js
│   ├── rol.middleware.js
│   └── validaciones/
│       ├── auth.validator.js
│       ├── cita.validator.js
│       └── validarCampos.js
```

---

## Variables de Entorno (`.env`)

Crea el archivo `.env` y configura las siguientes variables:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/citas_medicas_db
JWT_SECRET=una_clave_secreta_segura
```

---

## Cómo ejecutar el proyecto

1. **Clona el repositorio:**
    ```bash
    git clone https://github.com/alexodidi/Backend-Diplomado-DW-2025.git
    cd Backend-Diplomado-DW-2025.git
    ```

2. **Instala las dependencias:**
    ```bash
    npm install
    ```

3. **Levanta el servidor:**
    ```bash
    node app.js
    ```

---

## Autenticación

El sistema usa **JWT**.  
El token debe enviarse en los endpoints protegidos mediante el header:

| Key          | Value           |
|--------------|-----------------|
| Content-Type | application/json|
| Authorization| Bearer <token>  |

---

## Roles

- **admin:** puede crear citas médicas
- **usuario:** puede ver y asignarse citas

---

## Endpoints de la API

| Método | Ruta                         | Descripción                                 | Autenticación | Rol Requerido |
|--------|------------------------------|---------------------------------------------|:-------------:|:-------------:|
| POST   | `/api/auth/registro`         | Registrar nuevo usuario                     | NO            | -             |
| POST   | `/api/auth/login`            | Iniciar sesión y obtener token JWT          | NO            | -             |
| GET    | `/api/usuarios`              | Obtener todos los usuarios                  | SI            | admin         |
| GET    | `/api/citas`                 | Ver citas disponibles                       | SI            | usuario       |
| GET    | `/api/citas/mis-citas`       | Ver las citas asignadas por el usuario      | SI            | usuario       |
| DELETE | `/api/citas/mis-citas/:id`   | Elimina la asignación de la cita al usuario | SI            | usuario       |
| POST   | `/api/citas`                 | Crear nueva cita médica                     | SI            | admin         |
| DELETE | `/api/citas/:id`             | Elimina la cita disponible o asignada       | SI            | admin         |
| GET    | `/api/citas/admin`           | Ver todas las listas                        | SI            | admin         |
| POST   | `/api/citas/asignar/:id`     | Asignar una cita al usuario autenticado     | SI            | usuario       |

---

## Reglas del sistema

- Un usuario **no puede asignarse dos citas en la misma fecha y hora**.
- Solo los usuarios con rol **admin** pueden crear citas disponibles.
- **Todos los datos se validan** antes de procesar (formato, campos requeridos, etc).

---

## Buenas Prácticas

- Código modularizado (**MVC**)
- Separación de rutas, controladores, modelos y middlewares
- Validación de entrada con **express-validator**
- Seguridad con **JWT** + **bcrypt**
- `.env` seguro y fuera del control de versiones (`.gitignore`)