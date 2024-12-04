const express = require('express');
const path = require('path');

const app = express();

// Configuración del motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para manejar datos del body (si es necesario)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rutas de ejemplo
app.get('/', (req, res) => {
    res.render('index', { title: 'Inicio', mensaje: 'Bienvenido a EJS' });
});

// Puerto de escucha
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
