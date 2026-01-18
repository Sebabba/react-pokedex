import { useEffect, useState } from "react";
import { PokemonSpecie } from "../utils/types";

export function usePokemon() {
  const [allPokemon, setAllPokemon] = useState<PokemonSpecie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchAllPokemon() {
      try {
        setLoading(true);

        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon-species/?limit=151"
        );

        if (!response.ok) throw new Error("Fetch error");

        const json = await response.json();

        if (!cancelled) {
          setAllPokemon(json.results);
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
