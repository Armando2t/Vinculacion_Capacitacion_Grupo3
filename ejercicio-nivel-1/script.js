const resultado = document.getElementById("resultado");


async function consultarPost() {

    const postId = document.getElementById("postId").value;

    const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;

    resultado.textContent = "Consultando API...";

    try {

        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            throw new Error(
                `Error HTTP: ${respuesta.status}`
            );
        }

        const datos = await respuesta.json();

        resultado.textContent =
            JSON.stringify(datos, null, 4);

        console.log("Método utilizado: GET");
        console.log("Endpoint:", url);
        console.log("Estado HTTP:", respuesta.status);
        console.log("Respuesta:", datos);

    } catch (error) {

        resultado.textContent =
            "No fue posible realizar la consulta.\n\n" +
            error.message;

        console.error(error);
    }
}


async function consultarUsuarios() {

    const url =
        "https://jsonplaceholder.typicode.com/users";

    resultado.textContent = "Consultando usuarios...";

    try {

        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            throw new Error(
                `Error HTTP: ${respuesta.status}`
            );
        }

        const datos = await respuesta.json();

        resultado.textContent =
            JSON.stringify(datos, null, 4);

        console.log("Método utilizado: GET");
        console.log("Endpoint:", url);
        console.log("Estado HTTP:", respuesta.status);
        console.log("Respuesta:", datos);

    } catch (error) {

        resultado.textContent =
            "No fue posible realizar la consulta.\n\n" +
            error.message;

        console.error(error);
    }
}