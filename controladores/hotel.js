import { traerHoteles, traerUnHotel, agregarHotel, borrarHotel, editarHotel } from "../modelos/hotel.js";

export const getHotels = async (req, res) => {
    const hoteles = await traerHoteles();
    if (hoteles.name == "Error") res.status(404).send(hoteles.message)
    else res.status(200).send(hoteles);
}

export const getHotel = async (req, res) => {
    let { id } = req.params;
    const hotel = await traerUnHotel(id);
    if (hotel.name == "Error") res.status(404).send(hotel.message)
    else res.status(200).send(hotel)
}

export const newHotel = async (req, res) => {
    let body = req.body;
    let respuesta = await agregarHotel(body);
    if (respuesta.name == "Error") res.status(404).send(respuesta.message)
    else res.status(201).send(respuesta)
}

export const deleteHotel = async (req, res) => {
    let { id } = req.params;
    let respuesta = await borrarHotel(id);
    if (respuesta.name == "Error") res.status(500).send(respuesta.message)
    else res.status(200).send(respuesta)
}

export const editHotel = async (req, res) => {
    let { id } = req.params;
    let body = req.body;
    let respuesta = await editarHotel(id, body);
    if (respuesta.name == "Error") res.status(500).send(respuesta.message)
    else res.status(200).send(respuesta)
}