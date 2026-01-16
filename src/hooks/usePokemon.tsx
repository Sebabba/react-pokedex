import { useState, useEffect } from 'react';

export function usePokemon() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPokemon() {
            try {
                setLoading(true);
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/`);
                if(!response.ok) throw new Error('Fetch error');
                const json = await response.json();
                setData(json);
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

        fetchPokemon();
    }, [])

    return { data, loading, error }
}