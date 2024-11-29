export async function loadSvg(cidade, estado) {
    const query = new URLSearchParams({ cidade, estado }).toString();
    try {
        const response = await fetch(`http://localhost:5001/api/map?${query}`, {
            method:'GET',
            credentials: 'include', 
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const svgLegal = await response.json();
        return svgLegal;

    } catch (error) {
        console.log(error);
    }
}