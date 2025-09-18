import express from 'express';
import {router as hoteles} from './rutas/hoteles.js'
import {router as cuentas} from './rutas/cuentas.js'
const app = express();
app.disable('x-powered-by');
app.use(express.json()); 
app.use('/hoteles', hoteles);
app.use('/cuenta', cuentas);

app.listen(3002, () => {
    console.log("Escuchando en http://localhost:3002")
})