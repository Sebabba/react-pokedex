import { useState, useEffect } from "react";
import { Pokemon } from "../utils/types";
import { getPokemon } from "../api/pokemonApi";

type UsePokemonResult = {
    pokemon: Pokemon | null;
    loading: boolean;
    error: string | null;
}

export function usePokemon(pokemonId:string | undefined): UsePokemonResult {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        async function fetchPokemon() {
            try {
                setLoading(true);
                setError(null);

                const data = await getPokemon(pokemonId, controller.signal);
                setPokemon(data);
            } catch (err: unknown) {
                if ((err as any)?.name === "AbortError") return;
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError(String(err));
                }
            } finally {
                setLoading(false);
            }
        }

        if(!pokemonId){
            setError(null);
            setLoading(false);
            setPokemon(null);
            return;
        }

        fetchPokemon();

        return () => controller.abort();
    }, [pokemonId])

    return { pokemon, loading, error }
}