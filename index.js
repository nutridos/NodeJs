//Dependencias
const morgan = require('morgan');
const express =  require('express');
const app = express();
//Routers 
const empleado = require('./routes/empleado');
const user = require('./routes/user');
//Middleware
const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound');
const cors = require('./middleware/cors');

app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// User son los usuarios que se han dado de alta como administradores
app.use("/user", user);
app.use(auth);
// Agregar, modificar, eliminar y buscar empleados
app.use("/empleado", empleado);
app.use(notFound);

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running...");
});