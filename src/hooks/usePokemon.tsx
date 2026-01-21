import { useState, useEffect } from "react";
import { Pokemon } from "../utils/types";
import { getPokemon } from "../api/pokemonApi";

export function usePokemon(pokemonId:string | undefined) {
    const [pokemon, setPokemon] = useState<Pokemon | null>();
    const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPokemon() {
            try {
                setLoading(true);
                const data = await getPokemon(pokemonId);
                setPokemon(data);
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

        if(!pokemonId){
            setError(null);
            setLoading(false);
            setPokemon(null);
            return;
        }

        fetchPokemon();
    }, [pokemonId])

    return { pokemon, loading, error }
}