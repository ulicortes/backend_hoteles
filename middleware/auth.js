import jwt from 'jsonwebtoken'

export const autenticacion = (req, res, next) => {
    const tkn = req.headers['authorization']?.split(' ')[1];
    if(!tkn) res.status(401).send('No hay sesion iniciada');
    try {
        const ahora = Math.floor(Date.now() / 1000);
        const decode = jwt.verify(tkn, process.env.JWT_SECRET);
        if(req.body.id != decode.id || ahora > decode.exp) res.status(403).send('Tiempo de autorizacion expirado');
        else next();
    } catch (error) {
        res.status(500).send('Algo salio mal');
    }
}