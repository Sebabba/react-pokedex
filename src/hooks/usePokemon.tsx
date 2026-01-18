import { useState, useEffect } from 'react';
import { PokemonSpecie } from '../utils/types';

export function usePokemon(offset: number) {
  const [data, setData] = useState<PokemonSpecie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let limit = ((offset + 40) > 151 ? 151 - offset : 40 )

    async function fetchPokemon() {
      try {
        setLoading(true);

        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/?offset=${offset}&limit=${limit}`
        );

        if (!response.ok) throw new Error("Fetch error");

        const json = await response.json();

        if (!cancelled) {
          setData(prev =>
            offset === 0 ? json.results : [...prev, ...json.results]
          );
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : String(err));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchPokemon();

    return () => {
      cancelled = true;
    };
  }, [offset]);

  return { data, loading, error };
}
