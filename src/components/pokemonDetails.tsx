import { useSinglePokemon } from "../hooks/useSinglePokemon";
import type { JSX } from "react";
import { Col, Row } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import { useParams } from "react-router-dom";
import Stack from "react-bootstrap/Stack";
import Image from "react-bootstrap/Image";
import { useSinglePokemonSpecie } from "../hooks/useSinglePokemonSpecie";

function normalizeText(text: string | undefined): string | null {
    if(text){
        return text
            .replace(/\f/g, " ")   // rimuove form-feed
            .replace(/\n/g, " ")   // sostituisce newline
            .replace(/\s+/g, " ")  // normalizza spazi
            .trim();
    } else {
        return null;
    }
}

export default function PokemonDetails():JSX.Element {

    const { id } = useParams<{ id: string | undefined }>();
    const { pokemon, loading, error } = useSinglePokemon(id)
    const { pokemonSpecie, loadingSpecie, errorSpecie} = useSinglePokemonSpecie(id);

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

    if(pokemon){
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
                            src={pokemon.sprites.other["official-artwork"].front_default}
                            className="charcoal-5 pokemonDetailsImage"
                            fluid
                        />
                    </Col>
                    <Col xs={12} md={7}>
                        <Stack gap={1}>
                            <div>
                                <h3>Description</h3>
                                <p><i>"{normalizeText(pokemonSpecie?.flavor_text_entries[0].flavor_text)}"</i></p>
                            </div>
                            <div>
                                <h3>Genus</h3>
                                <p>{pokemonSpecie?.genera[7].genus}</p>
                            </div>
                            <div>
                                <h3>Types</h3>
                                <div className="pokemonTypes">
                                    {pokemon.types.map((type) => {
                                        switch(type.type.name) {
                                            case "fire":
                                                return(<span key={type.type.name} className="badge-custom fire">Fire</span>);
                                            case "grass":
                                                return(<span key={type.type.name} className="badge-custom grass">Grass</span>);
                                            case "water":
                                                return(<span key={type.type.name} className="badge-custom water">Water</span>);
                                            case "poison":
                                                return(<span key={type.type.name}  className="badge-custom poison">Poison</span>);
                                            case "flying":
                                                return(<span key={type.type.name} className="badge-custom flying">Flying</span>);
                                            case "bug":
                                                return(<span key={type.type.name} className="badge-custom bug">Bug</span>);
                                            case "electric":
                                                return(<span key={type.type.name} className="badge-custom electric">Electric</span>);
                                            case "fairy":
                                                return(<span key={type.type.name} className="badge-custom fairy">Fairy</span>);
                                            case "psychic":
                                                return(<span key={type.type.name} className="badge-custom psychic">Psychic</span>);
                                            case "fighting":
                                                return(<span key={type.type.name} className="badge-custom fighting">Fighting</span>);
                                            case "rock":
                                                return(<span key={type.type.name} className="badge-custom rock">Rock</span>);
                                            case "ground":
                                                return(<span key={type.type.name} className="badge-custom ground">Ground</span>);
                                            case "steel":
                                                return(<span key={type.type.name} className="badge-custom steel">Steel</span>);
                                            case "ice":
                                                return(<span key={type.type.name} className="badge-custom ice">Ice</span>);
                                            case "ghost":
                                                return(<span key={type.type.name} className="badge-custom ghost">Ghost</span>);
                                            case "dragon":
                                                return(<span key={type.type.name} className="badge-custom dragon">Dragon</span>);
                                            default:
                                                return(<span key={type.type.name} className="badge-custom">Normal</span>)
                                        }

                                    })}
                                </div>
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