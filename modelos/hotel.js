import pool from "../config/db.js";

export const traerHoteles = async (ingreso, salida) => {
    let client = await pool.connect();
    try {
        let r = await client.query("select h.*, array(select ha.id from habitacion ha where ha.hotel=h.id and ha.id not in (select habitacion from reserva where ingreso>=$1 and salida<=$2)) as habit from hotel h", [ingreso, salida])
        // let r = await client.query("select distinct h.* from hotel h join habitacion ha on h.id=ha.hotel where ha.id not in (select habitacion from reserva where ingreso>=$1 and salida<=$2)", [ingreso, salida])
        return r.rows;
    } catch (error) {
        return new Error("Algo salio mal :(");
    }
    finally {
        (await client).release()
    }
}

export const traerUnHotel = async (id, h) => {
    let client = await pool.connect();
    try {
        let r = await client.query(`select * from habitacion where hotel=$1 and id in (${h})`, [id]);
        if (r.rowCount == 0) {
            throw new Error(`No existe hotel con id=${id}`)
        }
        return r.rows;
    } catch (error) {
        return error;
    }
    finally {
        (await client).release()
    }
}

export const agregarHotel = async (body) => {
    let client = await pool.connect();
    try {
        await client.query('begin')
        await client.query('insert into hotel(nombre, direccion, estrellas, ciudad) values($1, $2, $3, $4)',
            [body.nombre, body.direccion, body.estrellas, body.ciudad])
        await client.query('commit')
        return 'Hotel agregado!';
    } catch (error) {
        await client.query('rollback')
        return new Error(error);
    }
    finally {
        (await client).release()
    }
}

export const borrarHotel = async (id) => {
    let client = await pool.connect();
    try {
        await client.query('begin')
        await client.query('delete from hotel where id=$1', [id])
        await client.query('commit')
        return 'Hotel borrado!';
    } catch (error) {
        await client.query('rollback')
        throw new Error(error);
    }
    finally {
        (await client).release()
    }
}

export const editarHotel = async (id, body) => {
    let query = '';
    let size = Object.keys(body).length-1;
    let client = await pool.connect();
    Object.keys(body).forEach(function (key, index) {
        query+=`${key}=${body[key]}`
        if(index < size) query += ', '
    });
    try {
        await client.query('begin')
        await client.query(`update hotel set ${query} where id=$1`, [id])
        await client.query('commit')
        return 'Hotel editado!';
    } catch (error) {
        await client.query('rollback')
        throw new Error(error);
    }
    finally {
        (await client).release()
    }
}