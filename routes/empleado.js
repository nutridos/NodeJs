const express = require('express');
const empleado = express.Router();
const db = require('../config/database');

empleado.post("/", async (req, res, next) => {
    const {nombre, apellidos, telefono, correo_electronico, direccion} = req.body;
    if(nombre && apellidos && telefono && correo_electronico && direccion){
        let query = "INSERT INTO empleados (nombre, apellidos, telefono, correo_electronico, direccion)";
        query += ` VALUES('${nombre}', '${apellidos}', ${telefono}, '${correo_electronico}', '${direccion}')`;
        
        const rows = await db.query(query);
        if(rows.affectedRows == 1){
            return res.status(201).json({code: 201, message: "empleado insertado correctamente"})
        }
        return res.status(500).json({code: 500, message: "Ocurrio un Error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
})

empleado.delete("/:id([0-9]{1,3})", async (req, res, next) => {
    const query = `DELETE FROM empleados WHERE id_empleado=${req.params.id}`;

    const rows = await db.query(query);
    
    if(rows.affectedRows == 1){
        return res.status(200).json({ code: 200, message: "empleado borrado correctamente"});
    }
    return res.status(404).json({ code: 404, message: "empleado no encontrado"});
});

empleado.put("/:id([0-9]{1,3})", async (req, res, next) => {
    const {nombre, apellidos, telefono, correo_electronico, direccion} = req.body;
    if(nombre && apellidos && telefono && correo_electronico && direccion){
        let query = `UPDATE empleados SET nombre = '${nombre}', apellidos = '${apellidos}',`
        query += `telefono = ${telefono}, correo_electronico = '${correo_electronico}', direccion = '${direccion}' WHERE id_empleado = ${req.params.id}`;
        
        const rows = await db.query(query);
        if(rows.affectedRows == 1){
            return res.status(201).json({code: 201, message: "empleado actualizado correctamente"})
        }
        return res.status(500).json({code: 500, message: "Ocurrio un Error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletosput"});
});

empleado.get("/", async (req, res, next) => {
    const emp = await db.query("SELECT * FROM empleados");
    return res.status(200).json({code: 200, message: emp});
})

empleado.get('/:id([0-9]{1,3})', async (req, res, next) => {
    const id = req.params.id;
    (id > 0 && id < 723) ?
    res.status(200).json(await db.query("SELECT * FROM empleados WHERE id_empleado = " + id))  :
    res.status(404).json({code: 404, message: "empleado no encontrado"});
});

module.exports = empleado;