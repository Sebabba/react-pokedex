import { useState, useEffect } from "react";
import { PokemonSpecieDetails } from "../utils/types";

export function useSinglePokemonSpecie(pokemonId:string | undefined){
    const [pokemonSpecie, setPokemonSpecie] = useState<PokemonSpecieDetails>();
    const [loadingSpecie, setLoading] = useState<boolean>(false);
	const [errorSpecie, setError] = useState<string | null>(null);
    
    useEffect(() => {
        async function fetchPokemonSpecie() {
            try{
                setLoading(true);
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);

                if(!response.ok) throw new Error('Fetch single pokemon specie error');
                const json = await response.json();
                setPokemonSpecie(json);
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