// External Pokémon API client and normalisation of responses.

export async function searchPokemon(string) {
    const url = `https://pokeapi.co/api/v2/pokemon/${string}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error - Status : ${response.status}`);
        }
        const data = await response.json();
        //console.log(data);
        //return data;
        return Array.isArray(data) ? data : [data];
    } catch (error) {
        console.error('Search failed : ', error);
        throw error;
    }
}
