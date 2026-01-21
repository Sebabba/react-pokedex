import { useEffect, useState } from "react";
import { PokemonSpecies } from "../utils/types";
import { getPokemonList } from "../api/pokemonApi";

export function usePokemonList() {
  const [allPokemon, setAllPokemon] = useState<PokemonSpecies[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController()
    async function fetchAllPokemon() {
      try {
        setLoading(true);
        setError(null);
        const data = await getPokemonList(controller.signal)

          setAllPokemon(data.results);
      } catch (err) {
          if ((err as any)?.name === "AbortError") return;
          setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    }

    fetchAllPokemon();

    return () => {
      controller.abort();
    };
  }, []);

  return { allPokemon, loading, error };
}
