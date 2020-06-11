const express = require('express');
const jwt = require('jsonwebtoken');
const user = express.Router();
const db = require('../config/database');

user.post("/login", async (req, res, next) => {
    const { correo_electronico, contrasena } = req.body;

    if(correo_electronico && contrasena){
        const query = `SELECT * FROM administradores WHERE correo_electronico = '${correo_electronico}' AND contrasena = '${contrasena}'`;
        
        const rows = await db.query(query);
        if (rows.length == 1) {
            const token = jwt.sign({
                id_administrador: rows[0].id_administrador,
                correo_electronico: rows[0].correo_electronico        
            }, "debugkey");
            return res.status(200).json({ code: 200, message: token });
        }else{
            return res.status(401).json({ code: 401,  message: "Correo y/o contrasena incorrectos"});
        }
    }
    return res.status(201).json({ code: 201, message: "Campos incompletos"});
});

module.exports = user;