const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');

// Middleware para manejar datos del body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Simulación de base de datos (arreglo en memoria)
let usuarios = [
    { id: 1, nombre: 'Usuario1', correo: 'usuario1@example.com' },
    { id: 2, nombre: 'Usuario2', correo: 'usuario2@example.com' },
];

// Ruta principal: Lista de usuarios
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Lista de Usuarios',
        usuarios, // Enviamos la lista de usuarios al frontend
    });
});

// Ruta para manejar la creación de un usuario
app.post('/crear-usuario', (req, res) => {
    const { correo } = req.body;
    const nuevoUsuario = { 
        id: usuarios.length + 1, 
        nombre: `Usuario${usuarios.length + 1}`, 
        correo 
    };
    usuarios.push(nuevoUsuario); // Agregamos el nuevo usuario
    res.redirect('/'); // Redirigimos a la lista de usuarios
});

// Servidor
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
      
