import { useEffect, useState } from "react";
import { PokemonSpecie } from "../utils/types";
import { getPokemonList } from "../api/pokemonApi";

export function usePokemonList() {
  const [allPokemon, setAllPokemon] = useState<PokemonSpecie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchAllPokemon() {
      try {
        setLoading(true);
        const data = await getPokemonList()

        if (!cancelled) {
          setAllPokemon(data.results);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : String(err));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchAllPokemon();

    return () => {
      cancelled = true;
    };
  }, []);

  return { allPokemon, loading, error };
}
