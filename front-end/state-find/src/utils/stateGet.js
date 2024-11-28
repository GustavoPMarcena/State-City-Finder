export async function loadStates() {
    try {
        const response = await fetch("http://servicodados.ibge.gov.br/api/v1/localidades/estados");
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const estados = await response.json();
        return estados;

    } catch (error) {
        console.log(error);
    }
}