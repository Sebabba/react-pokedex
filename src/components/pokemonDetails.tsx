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
                                                return(<span className="badge-custom fire">Fire</span>);
                                            case "grass":
                                                return(<span className="badge-custom grass">Grass</span>);
                                            case "water":
                                                return(<span className="badge-custom water">Water</span>);
                                            case "poison":
                                                return(<span className="badge-custom poison">Poison</span>);
                                            case "flying":
                                                return(<span className="badge-custom flying">Flying</span>);
                                            case "bug":
                                                return(<span className="badge-custom bug">Bug</span>);
                                            case "electric":
                                                return(<span className="badge-custom electric">Electric</span>);
                                            case "fairy":
                                                return(<span className="badge-custom fairy">Fairy</span>);
                                            case "psychic":
                                                return(<span className="badge-custom psychic">Psychic</span>);
                                            case "fighting":
                                                return(<span className="badge-custom fighting">Fighting</span>);
                                            case "rock":
                                                return(<span className="badge-custom rock">Rock</span>);
                                            case "ground":
                                                return(<span className="badge-custom ground">Ground</span>);
                                            case "steel":
                                                return(<span className="badge-custom steel">Steel</span>);
                                            case "ice":
                                                return(<span className="badge-custom ice">Ice</span>);
                                            case "ghost":
                                                return(<span className="badge-custom ghost">Ghost</span>);
                                            case "dragon":
                                                return(<span className="badge-custom dragon">Dragon</span>);
                                            default:
                                                return(<span className="badge-custom">Normal</span>)
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