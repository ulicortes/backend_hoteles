import { agregarReserva } from "../modelos/reserva.js";

export const newReserva = async (req, res) => {
    let body = req.body;
    let respuesta = await agregarReserva(body);
    if (respuesta.name == "Error") res.status(404).send(respuesta.message)
    else res.status(201).send(respuesta)
}
