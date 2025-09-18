import pool from "../config/db.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const registrarUsuario = async (body) => {
    let nuevo = {
        "nombre": body.nombre,
        "email": body.email,
        "password": await bcrypt.hash(body.password, 10)
    }
    let client = await pool.connect();
    try {
        await client.query('begin')
        await client.query('insert into usuario(nombre, email, password) values($1, $2, $3)',
            [nuevo.nombre, nuevo.email, nuevo.password]);
        await client.query('commit')
        return 'Usuario creado!';
    } catch (error) {
        await client.query('rollback')
        return new Error("Algo salio mal :(");
    }
    finally {
        (await client).release()
    }
}

export const ingresarUsuario = async (body) => {
    let client = await pool.connect();
    try {
        let usuario = await client.query('SELECT * from usuario where nombre=$1', [body.nombre])
        if (usuario.rowCount == 0) {
            throw new Error(1);
        }
        let coinciden = await bcrypt.compare(body.password, usuario.rows[0].password);
        if(!coinciden) throw new Error(2);
        return jwt.sign({id:usuario.rows[0].id, rol: usuario.rows[0].tipo}, process.env.JWT_SECRET, {expiresIn: '1h'});
    } catch (error) {
        return error;
    }
    finally {
        (await client).release()
    }
}
