const express = require('express');
const app = express();
const port = 3000;

// Configurar EJS como motor de vistas
app.set('view engine', 'ejs');

// Middleware para servir archivos estáticos
app.use(express.static('public'));

// Ruta principal
app.get('/', (req, res) => {
    res.render('index', { title: 'Página con EJS', message: '¡Hola, mundo!' });
});

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
