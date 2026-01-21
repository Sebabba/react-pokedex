import { PokemonSpecie, Pokemon, PokemonSpecieDetails } from "../utils/types";

const BASE_URL = "https://pokeapi.co/api/v2";

type ListResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonSpecie[]
}

async function fetchJson<T>(url: string): Promise<T> {
    const res = await fetch(url);
    if(!res.ok) {
        throw new Error(`HTTP ${res.status} - ${res.statusText}`);
    }

    const json = await res.json();
    return json;
}

export function getPokemonList() {
    const allPokemon = fetchJson<ListResponse>(
        `${BASE_URL}/pokemon-species/?limit=151`
    );
    return allPokemon;
}

export function getPokemon(pokemonId: string | undefined) {
    const pokemon = fetchJson<Pokemon>(
        `${BASE_URL}/pokemon/${pokemonId}`
    )
    return pokemon;
}

export function getPokemonSpecie(pokemonId: string | undefined){
    const pokemonSpecie = fetchJson<PokemonSpecieDetails>(
        `${BASE_URL}/pokemon-species/${pokemonId}`
    )
    return pokemonSpecie;
}