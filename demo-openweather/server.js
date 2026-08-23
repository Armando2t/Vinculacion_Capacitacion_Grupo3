const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = 3000;

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

if (!OPENWEATHER_API_KEY) {
    console.error(
        "ERROR: No se encontro OPENWEATHER_API_KEY en el archivo .env"
    );
    process.exit(1);
}


// Publicar los archivos HTML, CSS y JavaScript
app.use(express.static(__dirname));


// Endpoint propio que consulta OpenWeather
app.get("/api/clima", async (req, res) => {

    const ciudad = (req.query.ciudad || "").trim();

    if (!ciudad) {
        return res.status(400).json({
            error: "Debe proporcionar una ciudad."
        });
    }

    const metodo = "GET";

    const endpoint =
        "https://api.openweathermap.org/data/2.5/weather";

    const parametros = {
        q: ciudad,
        appid: OPENWEATHER_API_KEY,
        units: "metric",
        lang: "es"
    };

    const url =
        endpoint +
        "?q=" + encodeURIComponent(parametros.q) +
        "&appid=" + encodeURIComponent(parametros.appid) +
        "&units=" + encodeURIComponent(parametros.units) +
        "&lang=" + encodeURIComponent(parametros.lang);

    try {

        const respuesta = await fetch(url);
        const data = await respuesta.json();

        // URL que puede mostrarse sin revelar la clave
        const urlVisible =
            endpoint +
            "?q=" + encodeURIComponent(ciudad) +
            "&appid=API_KEY_OCULTA" +
            "&units=metric" +
            "&lang=es";


        if (!respuesta.ok) {
            return res.status(respuesta.status).json({
                error:
                    data.message ||
                    "OpenWeather devolvio un error.",
                detalleRest: {
                    metodo,
                    endpoint,
                    urlVisible,
                    estado: respuesta.status
                }
            });
        }


        return res.json({

            clima: {
                ciudad: data.name,
                pais: data.sys.country,
                temperatura: data.main.temp,
                sensacionTermica: data.main.feels_like,
                temperaturaMinima: data.main.temp_min,
                temperaturaMaxima: data.main.temp_max,
                humedad: data.main.humidity,
                presion: data.main.pressure,
                descripcion: data.weather[0].description,
                viento: data.wind.speed
            },

            detalleRest: {
                metodo,
                endpoint,
                urlVisible,
                estado: respuesta.status,

                parametros: {
                    q: ciudad,
                    appid: "API_KEY_OCULTA",
                    units: "metric",
                    lang: "es"
                }
            },

            respuestaOriginal: data
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            error: "Error al comunicarse con OpenWeather."
        });
    }

});


app.listen(PORT, () => {

    console.log("");
    console.log("Demo OpenWeather - Grupo 3");
    console.log("--------------------------------------");
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
    console.log(
        `Abrir: http://localhost:${PORT}/Clima.html`
    );
    console.log("--------------------------------------");
    console.log("");

});