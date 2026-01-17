import { usePokemon } from "../hooks/usePokemon"
import type { JSX } from "react";
import { Row } from "react-bootstrap";
import Container from 'react-bootstrap/Container'
import PokemonCard from "./pokemonCard";

export default function PokemonContainer():JSX.Element {
    const { data, loading, error } = usePokemon();

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>
    
    return (
        <Container>
            <Row>
                {data.map((item, index) => {
                    return(
                        <>
                            <PokemonCard pokemonId={index+1} />
                        </>
                    )
                })}
            </Row>
        </Container>
    )
}