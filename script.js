const apiURL = "https://v6.exchangerate-api.com/v6/1eb1f7a56c535d15672b03bf/latest/USD";

document.getElementById("convertir").addEventListener("click", async () => {
    const montoUSD = document.getElementById("monto").value;
    const divResultados = document.getElementById("resultados");

    if (!montoUSD || montoUSD <= 0) {
        divResultados.innerHTML = "<p style='color:red;'>⚠️ Ingrese un monto válido en USD.</p>";
        return;
    }

    try {
        const respuesta = await fetch(apiURL);
        if (!respuesta.ok) throw new Error("Error al conectar con la API");

        const datos = await respuesta.json();
        const tasas = datos.conversion_rates;

        const guaranies = (montoUSD * tasas.PYG).toLocaleString();
        const pesosArg = (montoUSD * tasas.ARS).toLocaleString();
        const reales = (montoUSD * tasas.BRL).toLocaleString();

        divResultados.innerHTML = `
            <h3>Resultados:</h3>
            <p><strong>${montoUSD} USD</strong> equivale a:</p>
            <ul>
                <li>🇵🇾 Guaraníes (PYG): <span style="color:green;">${guaranies}</span></li>
                <li>🇦🇷 Pesos Argentinos (ARS): <span style="color:blue;">${pesosArg}</span></li>
                <li>🇧🇷 Reales Brasileños (BRL): <span style="color:purple;">${reales}</span></li>
            </ul>
        `;
    } catch (error) {
        console.error(error);
        divResultados.innerHTML = "<p style='color:red;'>❌ No se pudieron cargar los datos.</p>";
    }
});
