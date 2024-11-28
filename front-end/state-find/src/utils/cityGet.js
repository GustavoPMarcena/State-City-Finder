export async function loadCities(idEstado) {
    try {
        const response = await fetch(`http://servicodados.ibge.gov.br/api/v1/localidades/estados/${idEstado}/municipios`);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const cidades = await response.json();
        return cidades

    } catch (error) {
        console.log(error);
    }
}