//importamos las librerias necesarias
const express = require('express');
const { Pool } = require('pg');
//instanciamos nuestro objeto de express
const app = express();
//Con esto facilitaremos la comunicacion
app.use(express.json())



app.listen(3000, () => {
    console.log("Servidor en linea en el puerto 3000")
})

//instanciamos nuestro objeto de la libreria pg con los datos de conexion
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'cine',
    password: '1234',
    port: 5432
});

app.post("/crearPelicula", async(req, res)=>{
    const {titulo, descripcion } = req.body;
    // ${varName} nos permite incrustar dentro de nuestros Strings
    const pelicula = await pool.query(`INSERT INTO peliculas(titulo, descripcion) VALUES('${titulo}', '${descripcion}') RETURNING *`);
    return res.status(200).json({
        peliculaInsertada: pelicula.rows
    })
})

app.get('/mostrarPeliculas', async (req, res) => {

    const peliculas = await pool.query("SELECT * FROM peliculas");
    
    return res.status(200).json({
        peliculas: peliculas.rows
    });
   
})

app.put("/actualizarTituloPelicula", async(req, res)=>{
    const {titulo, id_pelicula} = req.body;
    // ${varName} nos permite incrustar dentro de nuestros Strings
    const pelicula = await pool.query(`UPDATE peliculas SET titulo = '${titulo}' WHERE id_pelicula = '${id_pelicula}' RETURNING *`);
    return res.status(200).json({
        peliculaActualizada: pelicula.rows
    })
})


app.delete("/borrarPelicula", async(req, res)=>{
    const {id_pelicula } = req.body;
    // ${varName} nos permite incrustar dentro de nuestros Strings
    const pelicula = await pool.query(`DELETE FROM peliculas WHERE id_pelicula = '${id_pelicula}' RETURNING *`);
    return res.status(200).json({
        peliculaBorrada: pelicula.rows
    })
})









