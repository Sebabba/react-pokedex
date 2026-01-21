import { useState, useEffect } from "react";
import { PokemonSpeciesDetails } from "../utils/types";
import { getPokemonSpecies } from "../api/pokemonApi";

export function usePokemonSpecies(pokemonId:string | undefined){
    const [pokemonSpecies, setPokemonSpecies] = useState<PokemonSpeciesDetails>();
    const [loadingSpecie, setLoading] = useState<boolean>(false);
	const [errorSpecie, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const controller = new AbortController()
        async function fetchPokemonSpecies() {
            try{
                setLoading(true);
                const data = await getPokemonSpecies(pokemonId, controller.signal)
                setPokemonSpecies(data);
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
        
        fetchPokemonSpecies();
    }, [pokemonId])

    return { pokemonSpecies, loadingSpecie, errorSpecie }
}