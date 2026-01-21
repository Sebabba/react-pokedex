import { useState, useEffect } from "react";
import { PokemonSpecieDetails } from "../utils/types";
import { getPokemonSpecie } from "../api/pokemonApi";

export function useSinglePokemonSpecie(pokemonId:string | undefined){
    const [pokemonSpecie, setPokemonSpecie] = useState<PokemonSpecieDetails>();
    const [loadingSpecie, setLoading] = useState<boolean>(false);
	const [errorSpecie, setError] = useState<string | null>(null);
    
    useEffect(() => {
        async function fetchPokemonSpecie() {
            try{
                setLoading(true);
                const data = await getPokemonSpecie(pokemonId)
                setPokemonSpecie(data);
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
        
        fetchPokemonSpecie();
    }, [pokemonId])

    return { pokemonSpecie, loadingSpecie, errorSpecie }
}