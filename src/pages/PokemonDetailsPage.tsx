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

export default function PokemonDetailsPage():JSX.Element {

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

    if(pokemon && pokemonSpecie){

        const englishTexts = pokemonSpecie.flavor_text_entries.filter(ft => ft.language.name === "en");
        const firstEnglishText = englishTexts.length > 0 ? englishTexts[0].flavor_text : "No English text found";

        const englishGenera = pokemonSpecie.genera.filter(ge => ge.language.name === "en");
        const firstEnglishGenus = englishGenera.length > 0 ? englishGenera[0].genus : "No English genus found";

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
                                <p><i>"{normalizeText(firstEnglishText)}"</i></p>
                            </div>
                            <div>
                                <h3>Genus</h3>
                                <p>{firstEnglishGenus}</p>
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
        return(<p>No Pokemon Selected</p>)
    }
}