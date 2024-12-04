const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Simulación de base de datos
let usuarios = [
    { id: 1, nombre: 'Usuario1', correo: 'usuario1@example.com' },
    { id: 2, nombre: 'Usuario2', correo: 'usuario2@example.com' },
];

// Ruta para mostrar el formulario de creación de usuario
app.get('/crear-usuario', (req, res) => {
    res.render('crearUsuario', { title: 'Crear Usuario' });
});

// Ruta para manejar la creación de usuario
app.post('/crear-usuario', (req, res) => {
    const { correo } = req.body;
    const nuevoUsuario = { id: usuarios.length + 1, nombre: `Usuario${usuarios.length + 1}`, correo };
    usuarios.push(nuevoUsuario);
    res.redirect('/listar-usuarios');
});

// Ruta para listar usuarios
app.get('/listar-usuarios', (req, res) => {
    res.render('listarUsuarios', { title: 'Lista de Usuarios', usuarios });
});

// Servidor
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
