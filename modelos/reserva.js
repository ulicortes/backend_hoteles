import pool from "../config/db.js";

export const agregarReserva = async (body) => {
    let client = await pool.connect();
    try {
        await client.query('begin')
        await client.query('insert into reserva(habitacion, ingreso, salida, cant_ocupantes, responsable, total) values($1, $2, $3, $4, $5, $6)',
            [body.habitacion, body.ingreso, body.salida, body.ocupantes, body.responsable, body.total])
        await client.query('commit')
        return 'Reserva agregada!';
    } catch (error) {
        await client.query('rollback')
        return new Error(error);
    }
    finally {
        (await client).release()
    }
}

export const ocupacion = async (id) => {
    let client = await pool.connect();
    try {
        let rsp = await client.query("select ingreso, salida from reserva where habitacion=$1 and ingreso>=now() and salida <= now()+interval '2 weeks'", [id]);
        return rsp.rows;
    } catch (error) {
        return error;
    } finally {
        (await client).release()
    }
}
