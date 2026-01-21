import { PokemonSpecies, Pokemon, PokemonSpeciesDetails } from "../utils/types";

const BASE_URL = "https://pokeapi.co/api/v2";

type ListResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonSpecies[]
}

async function fetchJson<T>(url: string, signal?: AbortSignal): Promise<T> {
    const res = await fetch(url, {signal});
    if(!res.ok) {
        throw new Error(`HTTP ${res.status} - ${res.statusText}`);
    }

    const json = await res.json();
    return json;
}

export function getPokemonList(signal: AbortSignal) {
    const allPokemon = fetchJson<ListResponse>(
        `${BASE_URL}/pokemon-species/?limit=151`,
        signal
    );
    return allPokemon;
}

export function getPokemon(pokemonId: string | undefined, signal: AbortSignal) {
    const pokemon = fetchJson<Pokemon>(
        `${BASE_URL}/pokemon/${pokemonId}`,
        signal
    )
    return pokemon;
}

export function getPokemonSpecies(pokemonId: string | undefined, signal: AbortSignal){
    const PokemonSpecies = fetchJson<PokemonSpeciesDetails>(
        `${BASE_URL}/pokemon-species/${pokemonId}`,
        signal
    )
    return PokemonSpecies;
}