import { useState, useEffect } from "react";
import { Pokemon } from "../utils/types";

export function useSinglePokemon(pokemonId:number) {
    const [pokemon, setPokemon] = useState<Pokemon>();
    const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPokemon() {
            try {
                setLoading(true);
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId.toString()}`);
                if(!response.ok) throw new Error('Fetch single pokemon error');
                const json = await response.json();
                setPokemon(json);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError(String(err));
                }
            } finally {
                setLoading(false);
            }
        }

        fetchPokemon();
    }, [pokemonId])

    return { pokemon, loading, error }
}