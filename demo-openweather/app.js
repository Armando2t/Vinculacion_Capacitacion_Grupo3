async function consultarClima() {
    const ciudad = document.getElementById("ciudad").value.trim();

    const resultado = document.getElementById("resultado");
    const explicacionRest = document.getElementById("explicacionRest");
    const jsonPanel = document.getElementById("jsonPanel");

    if (ciudad === "") {
        resultado.innerHTML =
            "<span class='error'>Debe ingresar una ciudad.</span>";
        return;
    }

    resultado.innerHTML = "Consultando clima...";

    explicacionRest.classList.add("oculto");
    jsonPanel.classList.add("oculto");

    try {
        // La API Key ya NO está en el navegador.
        // Se consulta a nuestro servidor local.
        const respuesta = await fetch(
            "/api/clima?ciudad=" + encodeURIComponent(ciudad)
        );

        const data = await respuesta.json();

        if (!respuesta.ok) {
            resultado.innerHTML =
                "<span class='error'>Error: " +
                (data.error || "No fue posible consultar el clima.") +
                "</span>";
            return;
        }

        mostrarDetalleRest(data.detalleRest);
        mostrarJson(data.respuestaOriginal);

        const clima = data.clima;

        resultado.innerHTML =
            "<div class='titulo'>Resultado interpretado</div>" +
            "<div class='dato'><b>Ciudad:</b> " +
            clima.ciudad + ", " + clima.pais + "</div>" +

            "<div class='dato'><b>Temperatura:</b> " +
            clima.temperatura + " °C</div>" +

            "<div class='dato'><b>Sensación térmica:</b> " +
            clima.sensacionTermica + " °C</div>" +

            "<div class='dato'><b>Temperatura mínima:</b> " +
            clima.temperaturaMinima + " °C</div>" +

            "<div class='dato'><b>Temperatura máxima:</b> " +
            clima.temperaturaMaxima + " °C</div>" +

            "<div class='dato'><b>Humedad:</b> " +
            clima.humedad + " %</div>" +

            "<div class='dato'><b>Presión:</b> " +
            clima.presion + " hPa</div>" +

            "<div class='dato'><b>Clima:</b> " +
            clima.descripcion + "</div>" +

            "<div class='dato'><b>Viento:</b> " +
            clima.viento + " m/s</div>";

    } catch (error) {
        console.error(error);

        resultado.innerHTML =
            "<span class='error'>" +
            "No fue posible comunicarse con el servidor. " +
            error.message +
            "</span>";
    }
}


function mostrarDetalleRest(detalle) {
    document
        .getElementById("explicacionRest")
        .classList.remove("oculto");

    document.getElementById("metodoHttp").textContent =
        detalle.metodo;

    document.getElementById("endpointApi").textContent =
        detalle.endpoint;

    document.getElementById("urlFinal").textContent =
        detalle.urlVisible;

    document.getElementById("estadoHttp").textContent =
        detalle.estado;

    const tabla = document.getElementById("tablaParametros");

    tabla.innerHTML =
        "<tr>" +
            "<td>q</td>" +
            "<td>" + detalle.parametros.q + "</td>" +
            "<td>Ciudad que se desea consultar.</td>" +
        "</tr>" +

        "<tr>" +
            "<td>appid</td>" +
            "<td>API Key protegida en el servidor</td>" +
            "<td>Clave que autoriza el consumo de la API.</td>" +
        "</tr>" +

        "<tr>" +
            "<td>units</td>" +
            "<td>" + detalle.parametros.units + "</td>" +
            "<td>La temperatura se devuelve en grados Celsius.</td>" +
        "</tr>" +

        "<tr>" +
            "<td>lang</td>" +
            "<td>" + detalle.parametros.lang + "</td>" +
            "<td>La respuesta se solicita en español.</td>" +
        "</tr>";
}


function mostrarJson(data) {
    document
        .getElementById("jsonPanel")
        .classList.remove("oculto");

    document.getElementById("jsonRespuesta").textContent =
        JSON.stringify(data, null, 4);
}