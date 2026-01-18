import { useSinglePokemon } from "../hooks/useSinglePokemon";
import type { JSX } from "react";
import { Col, Row } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import { useParams } from "react-router-dom";
import Stack from "react-bootstrap/Stack";
import Image from "react-bootstrap/Image";

export default function PokemonDetails():JSX.Element {

    const { id } = useParams<{ id: string | undefined }>();
    const { pokemon, loading, error } = useSinglePokemon(id)

    if(pokemon){
        return(
            <Container>
                <Row>
                    <Stack gap={0}>
                        <h1 className="text-capitalize">{pokemon.name}</h1>
                        <p className="pokemonId caption">#{pokemon.id.toString().padStart(4, "0")}</p>
                    </Stack>
                </Row>
                <Row>
                    <Col xs={12} md={4}>
                        <Image 
                            src={pokemon.sprites.other["official-artwork"].front_default}
                            className="charcoal-5 pokemonDetailsImage"
                            fluid
                        />
                    </Col>
                    <Col xs={12} md={8}>
                        <Stack gap={1}>
                            <div>
                                <h3>Description</h3>
                                <p><i>{pokemon.name}</i></p>
                            </div>
                        </Stack>
                    </Col>
                </Row>
            </Container>
        )
    } else{
        return(<p>No Pokemon Selected</p>)
    }
}