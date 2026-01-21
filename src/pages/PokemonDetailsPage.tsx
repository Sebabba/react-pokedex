import { usePokemon } from "../hooks/usePokemon";
import type { JSX } from "react";
import { Col, Row } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import { useParams } from "react-router-dom";
import Stack from "react-bootstrap/Stack";
import Image from "react-bootstrap/Image";
import { usePokemonSpecie } from "../hooks/usePokemonSpecie";
import { pickEnglishEntry } from "../utils/pickEnglishEntry";
import { normalizeText } from "../utils/normalizeText";

export default function PokemonDetailsPage():JSX.Element {

    const { id } = useParams<{ id: string | undefined }>();

    const { pokemon, loading, error } = usePokemon(id)
    const { pokemonSpecie, loadingSpecie, errorSpecie} = usePokemonSpecie(id);

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

    if(pokemon && pokemonSpecie){

        const {englishText, englishGenus} = pickEnglishEntry(pokemonSpecie)

        const imageUrl = pokemon.sprites.other?.["official-artwork"]?.front_default
            ?? pokemon.sprites.front_default
            ?? undefined

        return(
            <Container>
                <Row className="pt-3">
                    <Stack gap={0}>
                        <p className="pokemonId caption">#{pokemon.id.toString().padStart(4, "0")}</p>
                        <h1 className="text-capitalize">{pokemon.name}</h1>
                    </Stack>
                </Row>
                <hr className="charcoal-100" style={{border: "1px solid"}} />
                <Row>
                    <Col xs={12} md={5}>
                        <Image 
                            src={imageUrl}
                            className="charcoal-5 pokemonDetailsImage"
                            fluid
                        />
                    </Col>
                    <Col xs={12} md={7}>
                        <Stack gap={1}>
                            <div>
                                <h3>Description</h3>
                                <p><i>"{normalizeText(englishText)}"</i></p>
                            </div>
                            <div>
                                <h3>Genus</h3>
                                <p>{englishGenus}</p>
                            </div>
                            <div>
                                <h3>Types</h3>
                                <div className="pokemonTypes">
                                    {pokemon.types.map((type) => {
                                        return(<span key={type.type.name} className={`text-capitalize badge-custom ${type.type.name}`}>{type.type.name}</span>);
                                    })}
                                </div>
                            </div>
                        </Stack>
                    </Col>
                </Row>
            </Container>
        )
    } else{
        return(
            <Container className="text-center my-5">
                <p>Missing Pokémon identifier.</p>
            </Container>
        )
    }
}