import { usePokemon } from "../hooks/usePokemon";
import type { JSX } from "react";
import Container from 'react-bootstrap/Container';
import { useParams } from "react-router-dom";
import { usePokemonSpecies } from "../hooks/usePokemonSpecies";
import PokemonDetailsView from "../components/PokemonDetailsView";

export default function PokemonDetailsPage():JSX.Element {

    const { id } = useParams<{ id: string | undefined }>();

    const { pokemon, loading, error } = usePokemon(id)
    const { pokemonSpecies, loadingSpecie, errorSpecie} = usePokemonSpecies(id);

    if(!id) {
        return (
            <Container className="text-center my-5">
                <p>Missing Pokémon identifier.</p>
            </Container>
        )
    }

    if (loading || loadingSpecie) {
        return (
            <Container className="text-center my-5">
                <p>Loading Pokémon data...</p>
            </Container>
        )
    }

    if (error || errorSpecie) {
        return (
            <Container className="text-center my-5">
                <p style={{ color: "red" }}>
                    {error || errorSpecie || "Unknown error"}
                </p>
            </Container>
        );
    }

    if(!pokemon || !pokemonSpecies) {
        return (
            <Container className="text-center my-5">
                <p>Pokémon Data not available</p>
            </Container>
        )
    }

    return <PokemonDetailsView pokemon={pokemon} pokemonSpecies={pokemonSpecies} />
}