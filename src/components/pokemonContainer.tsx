import { usePokemon } from "../hooks/usePokemon"
import type { JSX } from "react";

export default function PokemonContainer():JSX.Element {
    const { data, loading, error } = usePokemon();

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>

    return (
        <></>
    )
}