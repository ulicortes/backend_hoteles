import { registrarUsuario, ingresarUsuario } from "../modelos/cuenta.js";

export const newUser = async (req, res) => {
    let body = req.body;
    const respuesta = await registrarUsuario(body);
    if (respuesta.name == "Error") res.status(404).send(respuesta.message)
    else res.status(201).send(respuesta);
}

export const loginUser = async (req, res) => {
    let body = req.body;
    const tkn = await ingresarUsuario(body);
    if (tkn.name == 'Error') {
        if(tkn.message == 1) res.status(404).send('No existe este nombre de usuario!');
        else if (tkn.message == 2) res.status(401).send('Contraseña incorrecta');
        else res.status(500).send('Algo salio mal.');
    }
    else res.status(200).json({tkn})
}
