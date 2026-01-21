import { useState, useEffect } from "react";
import { PokemonSpeciesDetails } from "../utils/types";
import { getPokemonSpecies } from "../api/pokemonApi";

export function usePokemonSpecies(pokemonId:string | undefined){
    const [pokemonSpecies, setPokemonSpecies] = useState<PokemonSpeciesDetails>();
    const [loadingSpecie, setLoading] = useState<boolean>(false);
	const [errorSpecie, setError] = useState<string | null>(null);
    
    useEffect(() => {
        async function fetchPokemonSpecies() {
            try{
                setLoading(true);
                const data = await getPokemonSpecies(pokemonId)
                setPokemonSpecies(data);
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
        
        fetchPokemonSpecies();
    }, [pokemonId])

    return { pokemonSpecies, loadingSpecie, errorSpecie }
}