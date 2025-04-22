# Sistema de Ventas 
Este proyecto tiene como proposito poder establecer de manera clara la estructura y desarrollo de un sistema de ventas, contiene un backend construido con Node.js y XAMPP (MySQL), y un frontend desarrollado con React utilizando Material UI (MUI). Su objetivo es gestionar productos, clientes, usuarios y ventas de manera eficiente.

## 🛠️ Tecnologías utilizadas
### Backend:
- Node.js
- Express.js
- MySQL (XAMPP)
- CORS
- body-parser
- jsonwebtoken
- bcrypt

### Frontend:
- React.js
- Axios
- React Router
- React Router Dom
- Material UI (MUI)



# Caracterìsticas Principales
🧑‍💼 Gestión de Usuarios
Permite registrar, actualizar, eliminar y visualizar usuarios del sistema, asignando roles según sus permisos.

📦 Gestión de Productos
Se pueden agregar nuevos productos, actualizar su información, eliminarlos o listarlos para consulta.

👥 Gestión de Clientes
Incluye el registro de clientes, modificación de sus datos, y seguimiento de sus compras.

🧾 Registro de Ventas
Genera ventas asociadas a productos y clientes, calculando automáticamente los totales y detalles por ítem.

🔐 Login y Seguridad
Acceso mediante login con validación y encriptacion de contraseña. Cada usuario inicia sesión según su rol asignado y ademàs verifica si ese usuario este autenticado para que pueda acceder los recursos.

🌐 Frontend moderno con React y MUI
Interfaz intuitiva y responsive que permite una buena experiencia de usuario desde el navegador.

⚙️ API RESTful
Comunicación entre frontend y backend mediante peticiones HTTP con Axios, usando una arquitectura clara y escalable.

## 🛠️ Estructura del Proyecto ( Backend - Frontend)

### Backend
| backend-sistema-ventas |
  |-config
    |--db.js 
  |-controllers  
    |--auth_controller.js 
    |--clientes_controllers.js 
    |--detalle_venta_controllers.js
    |--productos_controllers.js
    |--usuarios_controllers.js
    |--ventas_controllers.js
  |-model
    |--Clientes_Model.js
    |--Detalle_Venta_Model.js
    |--Productos_Model.js
    |--Usuario_Model.js
    |--Venta_Model.js
  |-models
  |-node_modules
  |-routes
    |--clientes_routes.js
    |--detalle_ventas_routes.js
    |--productos_routes.js
    |--usuarios_routes.js
    |--ventas_routes.js
  |-.env
  |-database.sql
  |-index.js
  |-package-lock.json
  |-package.json
  |-routes.js
  
    
### Frontend
| frontend-sistema-ventas |
  |-node_modules
  |-public 
  |-scr  
    |--components 
      |---MNavegacion.js 
    |--pages
      |---Bienvenido.js
      |---Clientes.js
      |---Detalle_Venta.js
      |---Login.js
      |---Productos.js
      |---Registro.js
      |---Usuarios.js
      |---Ventas.js
    |--services
      |---api
      |---apiClientes.js
      |---apiDetalle_Ventas.js
      |---apiProductos.js
      |---apiUsuarios.js
      |---apiVentas.js
      |---auth.js
    |-App.css
    |-App.js
    |-App.test.js
    |-reportWebVitals.js
    |-setupTests.js
    |-package-lock.json
    |-package.json

## 🔐 Funcionalidades implementadas (hasta el momento)

- [x] Backend para gestión de usuarios, productos, clientes y ventas.
- [x] API REST con endpoints para operaciones CRUD.
- [x] Frontend con páginas separadas por entidad.
- [x] Sistema de rutas con React Router.
- [x] Consumo del backend con Axios desde el frontend.
- [x] Consumo del backend con bcrypt para ecriptaciòn de contraseñas.
- [x] Consumo del backend con jsonwebtoken para la autenticación de usuarios. 

## ⚙️ Instalación y ejecución

### Backend

1. Clona el repositorio y abre la carpeta `backend`.
2. Instala las dependencias:
   ```bash
   npm install

3. Asegúrate de tener XAMPP corriendo con MySQL activado.

4. Importa el archivo database.sql en tu servidor MySQL.

5. Ejecuta el servidor:
   ```bash
   node index.js

### Frontend

1. Clona el repositorio y abre la carpeta `frontend`.
2. Instala las dependencias:
   ```bash
   npm install
   
3. Ejecuta el servidor:
   ```bash
   npm start

